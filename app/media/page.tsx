import React from "react";
import type { Metadata } from "next";
import { artistData } from "@/data/artist";
import MediaPageClient from "./MediaPageClient";

export const metadata: Metadata = {
  title: `Media & Archive | ${artistData.name}`,
  description:
    "Explore press features, videos, books and exhibition records from Prakash Bal Joshi’s practice.",
  openGraph: {
    title: `Media & Archive | ${artistData.name}`,
    description:
      "Explore press features, videos, books and exhibition records from Prakash Bal Joshi’s practice.",
    type: "website",
  },
};

export default function MediaPage() {
  return <MediaPageClient />;
}
