// scripts/import-from-xml.ts
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { XMLParser } from 'fast-xml-parser';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

// Configuration
const XML_FILE_PATH = path.join(process.cwd(), 'public', 'blogs-import', 'ultimatesolarenergy.WordPress.2025-11-16.xml');
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
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch (error) {
    return null;
  }
}

// Upload image to Supabase and return public URL
async function uploadImageToSupabase(
  imageBuffer: Buffer,
  originalUrl: string
): Promise<string | null> {
  try {
    const urlParts = originalUrl.split('.');
    const extension = urlParts[urlParts.length - 1].split('?')[0] || 'jpg';
    
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileName = `${timestamp}-${randomString}.${extension}`;
    const filePath = `${SUPABASE_PATH}/${fileName}`;

    const contentTypeMap: { [key: string]: string } = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
    };
    const contentType = contentTypeMap[extension.toLowerCase()] || 'image/jpeg';

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

    const { data: urlData } = supabase.storage
      .from(SUPABASE_BUCKET)
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    return null;
  }
}

// Clean HTML content
function cleanContent(content: string): string {
  if (!content) return '';
  // Remove CDATA tags if present
  return content.replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1').trim();
}

// Extract slug from WordPress post name or generate from title
function generateSlug(postName: string | undefined, title: string): string {
  if (postName && postName !== '' && postName !== 'null') {
    return postName;
  }
  // Generate slug from title
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Parse WordPress XML export
async function parseWordPressXML(): Promise<any[]> {
  try {
    log.info('Reading XML file...');
    const xmlContent = fs.readFileSync(XML_FILE_PATH, 'utf-8');
    
    log.info('Parsing XML...');
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      textNodeName: '#text',
      parseTagValue: false,
      parseAttributeValue: false,
      trimValues: true,
    });

    const result = parser.parse(xmlContent);
    
    // Navigate to the items array
    const channel = result?.rss?.channel;
    if (!channel) {
      throw new Error('Invalid WordPress export file structure');
    }

    let items = channel.item;
    if (!items) {
      throw new Error('No items found in export file');
    }

    // Ensure items is an array
    if (!Array.isArray(items)) {
      items = [items];
    }

    // Filter only posts (not pages, attachments, etc.)
    const posts = items.filter((item: any) => {
      const postType = item['wp:post_type'];
      const status = item['wp:status'];
      return postType === 'post' && (status === 'publish' || status === 'draft');
    });

    log.success(`Found ${posts.length} posts in XML file`);
    return posts;
  } catch (error) {
    log.error(`Error parsing XML: ${error}`);
    throw error;
  }
}

// Extract categories/tags from post
function extractTags(item: any): string[] {
  try {
    let categories = item.category;
    if (!categories) return [];
    
    if (!Array.isArray(categories)) {
      categories = [categories];
    }

    return categories
      .filter((cat: any) => cat['@_domain'] === 'post_tag')
      .map((cat: any) => cat['@_nicename'] || cat['#text'])
      .filter((tag: string) => tag && tag !== '');
  } catch (error) {
    return [];
  }
}

// Extract featured image URL from post meta or content
function extractFeaturedImageUrl(item: any): string | null {
  try {
    // Try to find featured image in post meta
    let postmeta = item['wp:postmeta'];
    if (postmeta) {
      if (!Array.isArray(postmeta)) {
        postmeta = [postmeta];
      }
      
      const featuredImageMeta = postmeta.find(
        (meta: any) => meta['wp:meta_key'] === '_thumbnail_id'
      );
      
      if (featuredImageMeta) {
        // We have the attachment ID, but we need to find the actual URL
        // This is complex, so we'll try to extract from content
      }
    }

    // Try to find image in content
    const content = item['content:encoded'] || '';
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }

    return null;
  } catch (error) {
    return null;
  }
}

// Main import function
async function importFromXML() {
  try {
    log.info('🚀 Starting WordPress XML Import...\n');

    // Check if XML file exists
    if (!fs.existsSync(XML_FILE_PATH)) {
      log.error(`XML file not found: ${XML_FILE_PATH}`);
      log.warning('Please place your WordPress export XML file in: public/blogs-import/');
      process.exit(1);
    }

    // Step 1: Find admin user
    log.info('Step 1: Finding admin user...');
    const adminUser = await prisma.user.findFirst({
      where: { role: 'admin' },
      orderBy: { createdAt: 'asc' },
    });

    if (!adminUser) {
      log.error('No admin user found in database!');
      log.warning('Run: pnpm make-admin');
      process.exit(1);
    }

    log.success(`Found admin user: ${adminUser.email}\n`);

    // Step 2: Parse XML file
    log.info('Step 2: Parsing XML export file...');
    const posts = await parseWordPressXML();
    
    if (posts.length === 0) {
      log.warning('No posts found to import.');
      process.exit(0);
    }

    console.log('');

    // Step 3: Import each post
    log.info(`Step 3: Importing ${posts.length} posts...\n`);
    
    let successCount = 0;
    let errorCount = 0;
    let imageSuccessCount = 0;
    let imageErrorCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < posts.length; i++) {
      const item = posts[i];
      const postNumber = `[${i + 1}/${posts.length}]`;
      
      const title = cleanContent(item.title);
      
      if (!title || title === '') {
        log.warning(`${postNumber} Skipping post with no title`);
        skippedCount++;
        continue;
      }

      log.progress(`${postNumber} Processing: "${title}"`);

      try {
        // Extract data
        const content = cleanContent(item['content:encoded'] || '');
        const excerpt = cleanContent(item['excerpt:encoded'] || '');
        const postName = item['wp:post_name'];
        const slug = generateSlug(postName, title);
        const postDate = item['wp:post_date'];
        const status = item['wp:status'] === 'publish' ? 'published' : 'draft';
        const tags = extractTags(item);

        // Handle featured image
        let featuredImageUrl: string | null = null;
        const imageUrl = extractFeaturedImageUrl(item);

        if (imageUrl) {
          log.progress(`  └─ Found image, downloading...`);
          const imageBuffer = await downloadImage(imageUrl);
          
          if (imageBuffer) {
            log.progress(`  └─ Uploading to Supabase...`);
            featuredImageUrl = await uploadImageToSupabase(imageBuffer, imageUrl);
            
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

        // Parse publish date
        let publishedAt: Date | null = null;
        if (status === 'published' && postDate) {
          publishedAt = new Date(postDate);
        }

        // Generate meta description from excerpt or content
        let metaDescription = excerpt.substring(0, 160);
        if (!metaDescription && content) {
          // Strip HTML tags and get first 160 chars
          metaDescription = content
            .replace(/<[^>]*>/g, '')
            .substring(0, 160);
        }

        // Create or update blog post
        await prisma.blog.upsert({
          where: { slug: slug },
          update: {
            title: title,
            content: content,
            excerpt: excerpt,
            featuredImage: featuredImageUrl,
            tags: tags,
            metaDescription: metaDescription,
            status: status,
            publishedAt: publishedAt,
          },
          create: {
            title: title,
            slug: slug,
            content: content,
            excerpt: excerpt,
            featuredImage: featuredImageUrl,
            tags: tags,
            metaDescription: metaDescription,
            status: status,
            publishedAt: publishedAt,
            authorId: adminUser.id,
          },
        });

        log.success(`${postNumber} ✓ Imported: "${title}"\n`);
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
    if (skippedCount > 0) log.warning(`Skipped posts: ${skippedCount}`);
    log.success(`Images uploaded: ${imageSuccessCount}`);
    if (imageErrorCount > 0) log.error(`Images failed: ${imageErrorCount}`);
    console.log('='.repeat(60) + '\n');
    log.success('🎉 Import completed!');
    log.info('\n📌 Next steps:');
    log.info('   1. Visit /dashboard/blogs to see your imported posts');
    log.info('   2. Check your blog pages at /{slug}');
    log.info('   3. Verify images are displaying correctly\n');
  } catch (error) {
    log.error(`Fatal error: ${error}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the import
importFromXML();

