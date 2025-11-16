// scripts/import-wordpress-blogs.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

// Configuration
const WORDPRESS_SITE_URL = 'https://ultimatesolarenergy.com.au';
const SUPABASE_BUCKET = 'ultimate-project';
const SUPABASE_PATH = 'blog-images';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Color console helpers
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg: string) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg: string) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg: string) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warning: (msg: string) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  progress: (msg: string) => console.log(`${colors.cyan}→${colors.reset} ${msg}`),
};

// Download image from URL and return buffer
async function downloadImage(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      log.error(`Failed to download image: ${url}`);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    log.error(`Error downloading image from ${url}: ${error}`);
    return null;
  }
}

// Upload image to Supabase and return public URL
async function uploadImageToSupabase(
  imageBuffer: Buffer,
  originalUrl: string
): Promise<string | null> {
  try {
    // Extract file extension from URL
    const urlParts = originalUrl.split('.');
    const extension = urlParts[urlParts.length - 1].split('?')[0] || 'jpg';
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${timestamp}-${randomString}.${extension}`;
    const filePath = `${SUPABASE_PATH}/${fileName}`;

    // Determine content type
    const contentTypeMap: { [key: string]: string } = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
    };
    const contentType = contentTypeMap[extension.toLowerCase()] || 'image/jpeg';

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from(SUPABASE_BUCKET)
      .upload(filePath, imageBuffer, {
        contentType,
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      log.error(`Supabase upload error: ${error.message}`);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(SUPABASE_BUCKET)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    log.error(`Error uploading to Supabase: ${error}`);
    return null;
  }
}

// Fetch all WordPress posts with pagination
async function fetchAllWordPressPosts(): Promise<any[]> {
  let allPosts: any[] = [];
  let page = 1;
  let hasMore = true;

  log.info('Fetching posts from WordPress...');

  while (hasMore) {
    try {
      const url = `${WORDPRESS_SITE_URL}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed`;
      log.progress(`Fetching page ${page}...`);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 400) {
          // No more pages
          hasMore = false;
          break;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const posts = await response.json();
      
      if (posts.length === 0) {
        hasMore = false;
      } else {
        allPosts = allPosts.concat(posts);
        log.success(`Fetched ${posts.length} posts from page ${page}`);
        page++;
      }
    } catch (error) {
      log.error(`Error fetching page ${page}: ${error}`);
      hasMore = false;
    }
  }

  log.success(`Total WordPress posts fetched: ${allPosts.length}`);
  return allPosts;
}

// Extract tags from WordPress post
function extractTags(wpPost: any): string[] {
  try {
    if (wpPost._embedded?.['wp:term']) {
      const tagTerms = wpPost._embedded['wp:term'].flat();
      return tagTerms
        .filter((term: any) => term.taxonomy === 'post_tag')
        .map((term: any) => term.name);
    }
    return [];
  } catch (error) {
    return [];
  }
}

// Get featured image URL from WordPress post
function getFeaturedImageUrl(wpPost: any): string | null {
  try {
    if (wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
      return wpPost._embedded['wp:featuredmedia'][0].source_url;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Main import function
async function importWordPressPosts() {
  try {
    log.info('🚀 Starting WordPress to Next.js Blog Import...\n');

    // Step 1: Find admin user
    log.info('Step 1: Finding admin user...');
    const adminUser = await prisma.user.findFirst({
      where: { role: 'admin' },
      orderBy: { createdAt: 'asc' },
    });

    if (!adminUser) {
      log.error('No admin user found in database!');
      log.warning('Please create an admin user first by registering at /sign-up');
      process.exit(1);
    }

    log.success(`Found admin user: ${adminUser.email} (${adminUser.id})\n`);

    // Step 2: Fetch all WordPress posts
    const wpPosts = await fetchAllWordPressPosts();
    
    if (wpPosts.length === 0) {
      log.warning('No posts found to import.');
      process.exit(0);
    }

    console.log('');

    // Step 3: Import each post
    log.info(`Step 2: Importing ${wpPosts.length} posts...\n`);
    
    let successCount = 0;
    let errorCount = 0;
    let imageSuccessCount = 0;
    let imageErrorCount = 0;

    for (let i = 0; i < wpPosts.length; i++) {
      const wpPost = wpPosts[i];
      const postNumber = `[${i + 1}/${wpPosts.length}]`;
      
      log.progress(`${postNumber} Processing: "${wpPost.title.rendered}"`);

      try {
        // Handle featured image
        let featuredImageUrl: string | null = null;
        const wpImageUrl = getFeaturedImageUrl(wpPost);

        if (wpImageUrl) {
          log.progress(`  └─ Downloading image...`);
          const imageBuffer = await downloadImage(wpImageUrl);
          
          if (imageBuffer) {
            log.progress(`  └─ Uploading to Supabase...`);
            featuredImageUrl = await uploadImageToSupabase(imageBuffer, wpImageUrl);
            
            if (featuredImageUrl) {
              log.success(`  └─ Image uploaded successfully`);
              imageSuccessCount++;
            } else {
              log.error(`  └─ Failed to upload image`);
              imageErrorCount++;
            }
          } else {
            log.error(`  └─ Failed to download image`);
            imageErrorCount++;
          }
        }

        // Extract data
        const tags = extractTags(wpPost);
        const status = wpPost.status === 'publish' ? 'published' : 'draft';
        const publishedAt = wpPost.status === 'publish' ? new Date(wpPost.date) : null;

        // Create or update blog post
        await prisma.blog.upsert({
          where: { slug: wpPost.slug },
          update: {
            title: wpPost.title.rendered,
            content: wpPost.content.rendered,
            excerpt: wpPost.excerpt.rendered || '',
            featuredImage: featuredImageUrl,
            tags: tags,
            metaDescription: wpPost.yoast_head_json?.description || wpPost.excerpt.rendered?.substring(0, 160) || '',
            status: status,
            publishedAt: publishedAt,
          },
          create: {
            title: wpPost.title.rendered,
            slug: wpPost.slug,
            content: wpPost.content.rendered,
            excerpt: wpPost.excerpt.rendered || '',
            featuredImage: featuredImageUrl,
            tags: tags,
            metaDescription: wpPost.yoast_head_json?.description || wpPost.excerpt.rendered?.substring(0, 160) || '',
            status: status,
            publishedAt: publishedAt,
            authorId: adminUser.id,
          },
        });

        log.success(`${postNumber} ✓ Imported: "${wpPost.title.rendered}"\n`);
        successCount++;
      } catch (error) {
        log.error(`${postNumber} Failed: ${error}\n`);
        errorCount++;
      }
    }

    // Final summary
    console.log('\n' + '='.repeat(60));
    log.info('📊 Import Summary:');
    console.log('='.repeat(60));
    log.success(`Total posts imported: ${successCount}`);
    if (errorCount > 0) log.error(`Failed posts: ${errorCount}`);
    log.success(`Images uploaded: ${imageSuccessCount}`);
    if (imageErrorCount > 0) log.error(`Images failed: ${imageErrorCount}`);
    console.log('='.repeat(60) + '\n');
    log.success('🎉 Import completed!');
  } catch (error) {
    log.error(`Fatal error: ${error}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importWordPressPosts();

