# WordPress to Next.js Blog Import

## 📋 What This Script Does

This script imports all your WordPress blogs from `https://ultimatesolarenergy.com.au` into your Next.js application database.

### Features:
- ✅ Fetches ALL posts from WordPress (handles pagination automatically)
- ✅ Downloads featured images from WordPress
- ✅ Uploads images to Supabase storage
- ✅ Maps WordPress data to your Prisma Blog schema
- ✅ Handles duplicates safely (uses upsert by slug)
- ✅ Preserves all HTML content and formatting
- ✅ Extracts and stores tags
- ✅ Shows colorful progress output

---

## 🚀 How to Run

### Step 1: Verify Environment Variables

Make sure these are in your `.env` file:

```env
POSTGRES_URL="your-postgres-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

### Step 2: Ensure You Have an Admin User

The script requires at least one admin user in your database. If you haven't created one:

1. Go to `http://localhost:3000/sign-up`
2. Register an account
3. The script will use this user as the author for all imported posts

### Step 3: Run the Import

```bash
pnpm import-blogs
```

---

## 📊 What to Expect

The script will:

1. **Find your admin user** - Automatically locates the first admin user in your database
2. **Fetch WordPress posts** - Downloads all posts with pagination
3. **Process each post**:
   - Downloads the featured image
   - Uploads image to Supabase `ultimate-project` bucket
   - Creates/updates blog post in database
4. **Show progress** - Colorful output with success/error counts
5. **Display summary** - Final statistics when complete

### Example Output:

```
ℹ 🚀 Starting WordPress to Next.js Blog Import...

ℹ Step 1: Finding admin user...
✓ Found admin user: admin@example.com (uuid-here)

ℹ Fetching posts from WordPress...
→ Fetching page 1...
✓ Fetched 100 posts from page 1
→ Fetching page 2...
✓ Fetched 50 posts from page 2
✓ Total WordPress posts fetched: 150

ℹ Step 2: Importing 150 posts...

→ [1/150] Processing: "Solar Energy Benefits"
→   └─ Downloading image...
→   └─ Uploading to Supabase...
✓   └─ Image uploaded successfully
✓ [1/150] ✓ Imported: "Solar Energy Benefits"

... (continues for all posts)

============================================================
ℹ 📊 Import Summary:
============================================================
✓ Total posts imported: 150
✓ Images uploaded: 145
✗ Images failed: 5
============================================================

✓ 🎉 Import completed!
```

---

## 🔄 Running Multiple Times

The script is **safe to run multiple times**:

- Uses `upsert` by slug - updates existing posts instead of creating duplicates
- Each image gets a unique filename with timestamp
- Won't delete any existing data

If you need to re-import:
1. Delete imported posts from `/dashboard/blogs` (optional)
2. Run `pnpm import-blogs` again

---

## 🗑️ After Import

Once you're satisfied with the import, you can:

### Option 1: Keep the Script (Recommended)
Leave it in case you need to re-import or update posts

### Option 2: Delete the Script
1. Remove this line from `package.json`:
   ```json
   "import-blogs": "tsx scripts/import-wordpress-blogs.ts"
   ```
2. Delete the `scripts/` folder

---

## 🛠️ Troubleshooting

### Error: "No admin user found"
**Solution**: Create a user account at `/sign-up` first

### Error: "Supabase credentials not configured"
**Solution**: Check your `.env` file has `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`

### Error: "Failed to fetch WordPress posts"
**Solution**: 
- Verify WordPress site is accessible
- Check the URL: `https://ultimatesolarenergy.com.au/wp-json/wp/v2/posts`
- Ensure WordPress REST API is enabled

### Some images fail to upload
**Note**: This is normal if WordPress images are deleted or inaccessible. The post will still be imported without the image.

---

## 📝 What Gets Imported

| WordPress Field | Next.js Database Field |
|----------------|------------------------|
| `title.rendered` | `title` |
| `slug` | `slug` |
| `content.rendered` | `content` |
| `excerpt.rendered` | `excerpt` |
| Featured image | `featuredImage` (Supabase URL) |
| Tags | `tags` (string array) |
| Yoast meta description | `metaDescription` |
| `status` (publish/draft) | `status` (published/draft) |
| `date` | `publishedAt` |

---

## 🔒 Configuration

To change the WordPress URL or Supabase settings, edit `scripts/import-wordpress-blogs.ts`:

```typescript
// Configuration
const WORDPRESS_SITE_URL = 'https://ultimatesolarenergy.com.au';
const SUPABASE_BUCKET = 'ultimate-project';
const SUPABASE_PATH = 'blog-images';
```

---

## ✅ Post-Import Checklist

1. [ ] Go to `/dashboard/blogs` and verify all posts imported
2. [ ] Check images are displaying correctly
3. [ ] Visit a few blog post pages (e.g., `/{slug}`) to verify content
4. [ ] Check Supabase storage bucket has all images
5. [ ] Verify tags and meta descriptions are correct

---

## 📞 Support

If you encounter issues:
1. Check the error message in the terminal
2. Verify all environment variables are set
3. Ensure WordPress REST API is accessible
4. Check Supabase bucket permissions

Happy importing! 🎉

