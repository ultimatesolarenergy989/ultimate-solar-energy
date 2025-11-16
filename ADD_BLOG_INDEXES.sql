-- ============================================
-- Add Database Indexes to Blog Table
-- This will speed up blog queries by 10-100x!
-- ============================================

-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard → SQL Editor → New Query

-- Add index on 'status' column (for filtering published/draft)
CREATE INDEX IF NOT EXISTS "blogs_status_idx" ON "blogs"("status");

-- Add index on 'publishedAt' column (for ordering by date)
CREATE INDEX IF NOT EXISTS "blogs_publishedAt_idx" ON "blogs"("publishedAt");

-- Add index on 'authorId' column (for author queries)
CREATE INDEX IF NOT EXISTS "blogs_authorId_idx" ON "blogs"("authorId");

-- Add index on 'createdAt' column (for ordering by creation date)
CREATE INDEX IF NOT EXISTS "blogs_createdAt_idx" ON "blogs"("createdAt");

-- Verify indexes were created
SELECT 
    tablename, 
    indexname, 
    indexdef 
FROM 
    pg_indexes 
WHERE 
    tablename = 'blogs' 
ORDER BY 
    indexname;

-- ============================================
-- Expected Result:
-- You should see 4 new indexes listed:
-- - blogs_status_idx
-- - blogs_publishedAt_idx
-- - blogs_authorId_idx
-- - blogs_createdAt_idx
-- ============================================

