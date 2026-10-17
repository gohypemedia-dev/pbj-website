export interface ExhibitionRecord {
  id: string;
  year: number;
  type: "Solo Exhibition" | "Museum Exhibition" | "International Biennial Collateral" | "Selected Group Exhibition";
  title: string;
  venue: string;
  city: string;
  country: string;
  dates?: string;
  description: string;
  curatorialHighlight?: string;
  selectedWorks?: string[];
}

export const exhibitionsData: ExhibitionRecord[] = [
  {
    id: "exh-2023-lisbon",
    year: 2023,
    type: "Solo Exhibition",
    title: "Flowing Memories: The River Metaphor",
    venue: "Colorida Art Gallery",
    city: "Lisbon",
    country: "Portugal",
    dates: "October 7 – October 28, 2023",
    description:
      "A comprehensive solo presentation of Joshi's large-scale fluid acrylic canvases, contemplating water as an archival vessel for human history and ecological conscience.",
    curatorialHighlight:
      "Included works from the 'Rivers of Life' and 'Mindscape' series, receiving wide acclaim from European critics."
  },
  {
    id: "exh-2022-izmir",
    year: 2022,
    type: "Solo Exhibition",
    title: "Unseen Currents & Inner Topographies",
    venue: "Seba Art Gallery",
    city: "Izmir",
    country: "Turkey",
    dates: "May 14 – June 12, 2022",
    description:
      "Showcasing spontaneous abstract works exploring the crossroads of Mediterranean coastal light and ancient river mythology.",
    curatorialHighlight:
      "Permanent acquisition of two major works into the gallery's contemporary international archive."
  },
  {
    id: "exh-2019-venice",
    year: 2019,
    type: "International Biennial Collateral",
    title: "Personal Structures: Identities & Time",
    venue: "Palazzo Mora / European Cultural Centre",
    city: "Venice",
    country: "Italy",
    dates: "May 11 – November 24, 2019",
    description:
      "Presented during the 58th International Art Exhibition of La Biennale di Venezia, showcasing meditative oil and acrylic abstractions addressing universal temporal flow.",
    curatorialHighlight:
      "Dialogued with international contemporary masters on themes of human displacement, water memory, and transient existence."
  },
  {
    id: "exh-2017-basel",
    year: 2017,
    type: "Selected Group Exhibition",
    title: "Contemporary Horizons: South Asian Abstraction",
    venue: "Basel Art Center",
    city: "Basel",
    country: "Switzerland",
    dates: "June 12 – June 24, 2017",
    description:
      "Curated international exhibition examining gestural non-objective painting from the Indian subcontinent alongside modern European counterparts.",
    curatorialHighlight:
      "Feature presentation of Joshi's heavy impasto oil compositions."
  },
  {
    id: "exh-2015-las-vegas",
    year: 2015,
    type: "Museum Exhibition",
    title: "Masters of Mystery & Gesture",
    venue: "Southern Nevada Museum of Fine Art",
    city: "Las Vegas",
    country: "USA",
    dates: "September 18 – November 21, 2015",
    description:
      "Museum showcase celebrating Joshi's distinctive textural handling and deep spiritual symbiosis with water bodies.",
    curatorialHighlight:
      "Induction into the permanent institutional museum collection."
  },
  {
    id: "exh-2012-india-art-fest",
    year: 2012,
    type: "Solo Exhibition",
    title: "God's Particle: Monumental Installation & Paintings",
    venue: "Nehru Centre / India Art Festival",
    city: "Mumbai",
    country: "India",
    dates: "November 28 – December 2, 2012",
    description:
      "An ambitious conceptual installation and suite of abstract paintings responding to subatomic physics, consciousness, and cosmic genesis.",
    curatorialHighlight:
      "Critically reviewed in national press for harmonizing scientific inquiry with meditative abstraction."
  },
  {
    id: "exh-2006-artists-centre",
    year: 2006,
    type: "Solo Exhibition",
    title: "Inaugural Expressions: Early Abstractions",
    venue: "Artists' Centre, Kala Ghoda",
    city: "Mumbai",
    country: "India",
    dates: "March 14 – March 20, 2006",
    description:
      "The historic first major solo exhibition of Prakash Bal Joshi in Mumbai's premier historic art precinct, establishing his unique visual voice.",
    curatorialHighlight:
      "Marked the public debut of the seminal 'Rivers of Life' motif."
  }
];
