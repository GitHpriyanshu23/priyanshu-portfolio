import type { Metadata } from "next";
import { siteConfig } from "@/config/meta";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  imageWidth = siteConfig.ogImageWidth,
  imageHeight = siteConfig.ogImageHeight,
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;
  const imageType = imageUrl.endsWith(".png")
    ? "image/png"
    : imageUrl.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";

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
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: `${siteConfig.name} — ${title}`,
          type: imageType,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function pageTitle(label: string) {
  return `${label} | ${siteConfig.name}`;
}
