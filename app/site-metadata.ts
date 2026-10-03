import type { Metadata } from "next";

const socialImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Eliyo personal car assistant",
};

export function createPageMetadata({
  title,
  description,
  path,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  locale: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Eliyo",
      locale,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
