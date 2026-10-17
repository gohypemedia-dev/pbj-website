import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { artistData } from "@/data/artist";

export default function NotFound() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32 text-center">
      <span className="eyebrow-label text-[#1B2A49] block mb-3">
        404 &middot; Page Not Found
      </span>
      <h1 className="font-heading text-4xl sm:text-6xl font-bold text-[#1B2A49] mb-4">
        Archive Entry Not Found
      </h1>
      <p className="font-body text-lg text-[#38435C] max-w-lg mx-auto mb-8 leading-relaxed">
        The requested artwork or archival document does not exist or may have been relocated in the digital catalogue raisonné.
      </p>
      <div className="flex flex-wrap justify-center gap-4 font-heading text-xs uppercase tracking-wider">
        <Link
          href="/"
          className="px-6 py-3 bg-[#1B2A49] text-[#E9ECEF] font-semibold rounded-sm hover:bg-[#1B2A49]/90 transition-all inline-flex items-center space-x-2"
        >
          <ArrowLeft size={14} />
          <span>Return to Homepage</span>
        </Link>
        <Link
          href="/works"
          className="px-6 py-3 bg-white/70 text-[#1B2A49] border border-[#1B2A49]/20 font-semibold rounded-sm hover:bg-white transition-all"
        >
          Browse Selected Works
        </Link>
      </div>
    </div>
  );
}
