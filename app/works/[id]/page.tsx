import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { artworksData, getArtworkById } from "@/data/artworks";
import { artistData } from "@/data/artist";
import ArtworkDetailClient from "./ArtworkDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return artworksData.map((artwork) => ({
    id: artwork.id
  }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    return {
      title: "Artwork Not Found | " + artistData.diacriticName
    };
  }

  return {
    title: `${artwork.title} (${artwork.year}) | ${artistData.diacriticName}`,
    description: `${artwork.title}, ${artwork.medium}, ${artwork.dimensions}. ${artwork.description}`,
    openGraph: {
      title: `${artwork.title} | ${artistData.diacriticName}`,
      description: artwork.description,
      images: [
        {
          url: artwork.image,
          alt: artwork.title
        }
      ]
    }
  };
}

export default async function ArtworkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const artwork = getArtworkById(id);

  if (!artwork) {
    notFound();
  }

  return <ArtworkDetailClient artwork={artwork} />;
}
