// ==========================================
// Robots.txt Route
// ==========================================

export default defineEventHandler(() => {
    return `User-agent: *
Allow: /

Sitemap: https://projecthub.example.com/sitemap.xml
`
})
