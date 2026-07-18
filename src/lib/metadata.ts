import type { Metadata } from "next";
import { siteConfig } from "@/config/meta";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 1200,
          alt: `${siteConfig.name} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: siteConfig.twitterHandle,
    },
  };
}

export function pageTitle(label: string) {
  return `${label} | ${siteConfig.name}`;
}
