import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://eliyo.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const localePrefixes = { en: "", uk: "/ua", pl: "/pl", ru: "/ru" } as const;
  const resources = ["", "/privacy", "/terms", "/support", "/delete-account"] as const;

  return resources.flatMap((resource) => {
    const languages = Object.fromEntries(
      Object.entries(localePrefixes).map(([language, prefix]) => [language, `${SITE_URL}${prefix}${resource}`]),
    );
    languages["x-default"] = `${SITE_URL}${resource}`;

    return Object.values(localePrefixes).map((prefix) => ({
      url: `${SITE_URL}${prefix}${resource}`,
      lastModified,
      changeFrequency: resource ? "monthly" as const : "weekly" as const,
      priority: resource ? 0.6 : 1,
      alternates: { languages },
    }));
  });
}
