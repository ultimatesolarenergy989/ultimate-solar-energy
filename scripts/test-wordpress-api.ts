// scripts/test-wordpress-api.ts
// Test WordPress REST API accessibility

const WORDPRESS_SITE_URL = 'https://ultimatesolarenergy.com.au';

async function testAPI() {
  console.log('🔍 Testing WordPress REST API...\n');
  
  const endpoints = [
    '/wp-json',
    '/wp-json/wp/v2/posts',
    '/wp-json/wp/v2/posts?per_page=1',
  ];

  for (const endpoint of endpoints) {
    const url = `${WORDPRESS_SITE_URL}${endpoint}`;
    console.log(`Testing: ${url}`);
    
    try {
      const response = await fetch(url);
      console.log(`  Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`  ✅ Success! Data type: ${Array.isArray(data) ? 'Array' : 'Object'}`);
        if (Array.isArray(data)) {
          console.log(`  📊 Items found: ${data.length}`);
        }
      } else {
        console.log(`  ❌ Failed: ${response.status}`);
        const text = await response.text();
        console.log(`  Response: ${text.substring(0, 200)}`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error}`);
    }
    console.log('');
  }

  // Also test the actual website
  console.log(`Testing main site: ${WORDPRESS_SITE_URL}`);
  try {
    const response = await fetch(WORDPRESS_SITE_URL);
    console.log(`  Status: ${response.status} ${response.statusText}`);
    if (response.ok) {
      console.log(`  ✅ Main site is accessible`);
    }
  } catch (error) {
    console.log(`  ❌ Error: ${error}`);
  }
}

testAPI();

