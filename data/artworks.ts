export interface Artwork {
  id: string;
  title: string;
  year: number;
  medium: string;
  dimensions: string;
  series: string;
  description: string;
  curatorNote?: string;
  image: string;
  aspectRatio: "landscape" | "portrait" | "square" | "panoramic";
  featuredInHero?: boolean;
  featuredInLowerRow?: boolean;
  lowerRowPosition?: 1 | 2 | 3; // 1 = left, 2 = center, 3 = right (wider)
  status: "Available" | "Private Collection" | "Permanent Museum Collection";
  collectionId: "rivers" | "mindscapes" | "abstractions" | "oil" | "urban";
}

export const artworkCategories = [
  { id: "all", label: "All Works" },
  { id: "rivers", label: "Rivers of Life" },
  { id: "mindscapes", label: "Mindscapes" },
  { id: "abstractions", label: "Abstractions" },
  { id: "oil", label: "Oil on Canvas" },
  { id: "urban", label: "Urban Realities" }
] as const;

export const artworksData: Artwork[] = [
  {
    id: "river-returns-186",
    title: "River Returns 186",
    year: 2024,
    medium: "Acrylic on canvas",
    dimensions: "152 × 228 cm (60 × 90 in)",
    series: "Rivers of Life",
    description:
      "A monumental exploration of flowing water, eddy currents, and ecological resonance. Swirling cobalt and lapis pigments collide with rich sediment ochres, embodying the perpetual motion and timeless memory of natural riverbeds.",
    curatorNote:
      "A dynamic chromatic dialogue between deep river blues and raw earth pigments.",
    image: "/artworks/hero-featured.jpg",
    aspectRatio: "landscape",
    featuredInHero: true,
    status: "Available",
    collectionId: "rivers"
  },
  {
    id: "mindscape-4",
    title: "Mindscape 4",
    year: 2023,
    medium: "Acrylic and ink on archival paper",
    dimensions: "102 × 76 cm (40 × 30 in)",
    series: "Mindscape Series",
    description:
      "A meditative vertical composition synthesizing structural ink hatchings with ethereal watercolor-like indigo washes. The work examines the inner architecture of human consciousness as it navigates temporal existence.",
    curatorNote:
      "A quiet contemplative vertical study in line, wash, and spatial equilibrium.",
    image: "/artworks/mindscape-4.jpg",
    aspectRatio: "portrait",
    featuredInLowerRow: true,
    lowerRowPosition: 1,
    status: "Available",
    collectionId: "mindscapes"
  },
  {
    id: "close-encounter-193",
    title: "Close Encounter 193",
    year: 2024,
    medium: "Oil on canvas",
    dimensions: "100 × 100 cm (39.4 × 39.4 in)",
    series: "Close Encounter",
    description:
      "Vigorous impasto palette knife applications create dramatic physical topography on square canvas. Rich Prussian blues fracture against raw terracotta and burnished ochres, capturing tension and sudden spiritual awakening.",
    curatorNote:
      "Sculptural palette-knife impasto contrasting deep Prussian blues with raw terracotta.",
    image: "/artworks/close-encounter-193.jpg",
    aspectRatio: "square",
    featuredInLowerRow: true,
    lowerRowPosition: 2,
    status: "Available",
    collectionId: "oil"
  },
  {
    id: "abstraction-228",
    title: "Abstraction 228",
    year: 2024,
    medium: "Acrylic on canvas",
    dimensions: "120 × 210 cm (47.2 × 82.7 in)",
    series: "Abstraction Series",
    description:
      "A panoramic horizontal field displaying spontaneous, sweeping strokes of marine blue and raw umber. The composition breathes with spaciousness, drawing the eye across waves of visual resonance akin to an expansive coastal estuary.",
    curatorNote:
      "A sweeping panoramic field of marine blues and raw umber exploring spatial resonance.",
    image: "/artworks/abstraction-228.jpg",
    aspectRatio: "panoramic",
    featuredInLowerRow: true,
    lowerRowPosition: 3,
    status: "Available",
    collectionId: "abstractions"
  },
  {
    id: "saraswati-flow-112",
    title: "Saraswati Flow 112",
    year: 2023,
    medium: "Acrylic on canvas",
    dimensions: "122 × 163 cm (48 × 64 in)",
    series: "Rivers of Life",
    description:
      "Dedicated to the mythical subterranean Saraswati river, this work employs swirling vortices of deep ultramarine, cyan, and ivory foam. It visualizes the unseen currents beneath tangible reality.",
    curatorNote:
      "Exhibited in Basel and Lisbon, celebrated for its fluid poetic rhythm and lyrical dynamism.",
    image: "/artworks/saraswati-flow-112.jpg",
    aspectRatio: "landscape",
    status: "Private Collection",
    collectionId: "rivers"
  },
  {
    id: "enlightenment",
    title: "Enlightenment",
    year: 2023,
    medium: "Oil on canvas",
    dimensions: "91 × 91 cm (36 × 36 in)",
    series: "Spiritual Inquiry",
    description:
      "A radiant burst of warm ochre and burnished gold emerges from dense midnight blue and charcoal borders. A painterly contemplation on the inner illumination achieved through disciplined, spontaneous meditation.",
    curatorNote:
      "Exemplifies the artist's masterful handling of heavy impasto oil technique and light emergence.",
    image: "/artworks/enlightenment.jpg",
    aspectRatio: "square",
    status: "Permanent Museum Collection",
    collectionId: "oil"
  },
  {
    id: "urban-realities-08",
    title: "Urban Realities & Climate 08",
    year: 2022,
    medium: "Ink, graphite and acrylic on raw linen",
    dimensions: "115 × 170 cm (45.3 × 66.9 in)",
    series: "Urban Realities",
    description:
      "Drawing directly from Joshi's journalistic investigations of Mumbai's relentless metropolitan growth, this work merges scaffolding-like linear webs with atmospheric smoky washes.",
    curatorNote:
      "Highlights the artist's acute socio-critical capacity, balancing structural order with atmospheric fragility.",
    image: "/artworks/urban-realities-08.jpg",
    aspectRatio: "landscape",
    status: "Available",
    collectionId: "urban"
  }
];

export function getArtworkById(id: string): Artwork | undefined {
  return artworksData.find((a) => a.id === id);
}

export function getAdjacentArtworks(currentId: string): {
  prev: Artwork;
  next: Artwork;
} {
  const currentIndex = artworksData.findIndex((a) => a.id === currentId);
  const prevIndex =
    currentIndex <= 0 ? artworksData.length - 1 : currentIndex - 1;
  const nextIndex =
    currentIndex >= artworksData.length - 1 ? 0 : currentIndex + 1;

  return {
    prev: artworksData[prevIndex],
    next: artworksData[nextIndex]
  };
}
