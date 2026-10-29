export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/control/", "/api/internal/"],
    },
    sitemap: "https://eliyo.app/sitemap.xml",
  };
}
