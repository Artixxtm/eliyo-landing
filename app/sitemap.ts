import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://eliyo.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const languages = {
    en: SITE_URL,
    uk: `${SITE_URL}/ua`,
    pl: `${SITE_URL}/pl`,
    ru: `${SITE_URL}/ru`,
    "x-default": SITE_URL,
  };

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages,
      },
    },
    {
      url: `${SITE_URL}/ua`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages,
      },
    },
    {
      url: `${SITE_URL}/pl`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages,
      },
    },
    {
      url: `${SITE_URL}/ru`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages,
      },
    },
  ];
}