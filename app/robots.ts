export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/control/", "/api/internal/", "/invite/", "/r/"],
    },
    sitemap: "https://eliyo.app/sitemap.xml",
  };
}
