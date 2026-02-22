// ==========================================
// RSS Feed Route
// ==========================================

export default defineEventHandler(() => {
    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>ProjectHub Updates</title>
    <link>https://projecthub.example.com</link>
    <description>Latest updates from ProjectHub</description>
    <language>th</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <item>
      <title>Welcome to ProjectHub</title>
      <link>https://projecthub.example.com</link>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <description>ProjectHub is now live!</description>
    </item>
  </channel>
</rss>`

    return feed
})
