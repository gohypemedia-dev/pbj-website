import React from "react";
import type { Metadata } from "next";
import { artistData } from "@/data/artist";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: `About Prakash Bal Joshi | Visual Artist, Journalist & Marathi Writer`,
  description:
    "Comprehensive biography, solo and group exhibitions, awards, permanent collections, and creative practice of Prakash Bal Joshi.",
};

export default function AboutPage() {
  return <AboutClient />;
}
