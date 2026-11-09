export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/control/", "/api/internal/", "/invite/"],
    },
    sitemap: "https://eliyo.app/sitemap.xml",
  };
}
