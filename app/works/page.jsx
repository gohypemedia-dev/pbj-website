import WorksGallery from "./WorksGallery";

export const metadata = {
  title: "Selected Works | Prakash Bal Joshi",
  description:
    "Original abstract paintings in oil and acrylic by Indian contemporary artist Prakash Bal Joshi. Curated catalogue exploring abstraction, nature, artificial intelligence, and river metaphors.",
  keywords: [
    "Prakash Bal Joshi paintings",
    "Indian contemporary artist",
    "Indian abstract artist",
    "Contemporary abstract painter India",
    "Mumbai-based artist",
    "Original abstract paintings India",
    "Buy original paintings by Prakash Bal Joshi",
    "Contemporary Indian art for collectors",
    "Abstract art on artificial intelligence",
    "Consciousness in contemporary art",
    "River-inspired paintings"
  ],
  openGraph: {
    title: "Selected Works | Prakash Bal Joshi",
    description:
      "Original abstract paintings in oil and acrylic by Indian contemporary artist Prakash Bal Joshi.",
    images: [
      {
        url: "/artworks/pbj/pbj-abstraction-316-2026.jpg",
        alt: "PBJ Abstraction 316 by Prakash Bal Joshi"
      }
    ]
  }
};

export default function WorksPage() {
  return <WorksGallery />;
}

