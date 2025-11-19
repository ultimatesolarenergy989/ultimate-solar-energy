import { Metadata } from "next";

export function createMetadata({
  title,
  description,
  keywords,
  path = "",
  image = "/img/og-image.jpg",
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `https://ultimatesolarenergy.com.au${path}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Ultimate Solar Energy" }],
    openGraph: {
      title,
      description,
      url,
      siteName: "Ultimate Solar Energy",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_AU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

