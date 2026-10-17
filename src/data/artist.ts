export interface ArtistProfile {
  name: string;
  diacriticName: string;
  tagline: string;
  conciseIntro: string;
  extendedIntro: string;
  biography: {
    lead: string;
    paragraphs: string[];
    themes: {
      title: string;
      description: string;
    }[];
    collections: string[];
    literaryWorks: string[];
  };
  contact: {
    studioLocation: string;
    city: string;
    country: string;
    email: string;
    representationNote: string;
    visitingPolicy: string;
  };
}

export const artistData: ArtistProfile = {
  name: "Prakash Bal Joshi",
  diacriticName: "PRĀKASH BĀL JOSHI",
  tagline: "Contemporary Indian Abstract Artist & Writer",
  conciseIntro:
    "Exploring the transient layers of human consciousness, memory, and nature through spontaneous abstract expressionism and the fluid metaphor of rivers.",
  extendedIntro:
    "Prakash Bal Joshi translates the ephemeral currents of time, ecological memory, and spiritual contemplation into spontaneous oil and acrylic abstractions. Based in Mumbai, his practice reflects decades of keen observation as both a master painter and veteran journalist.",
  biography: {
    lead:
      "Prakash Bal Joshi is an acclaimed contemporary Indian artist, abstract painter, and veteran journalist whose work bridges literature, media observation, and visual expression.",
    paragraphs: [
      "Born in Achalpur, Maharashtra, Joshi felt an early affinity for visual expression and light, complementing his painting with formal studies in photography. As a largely self-taught master in abstract expressionism, he developed an intuitive painterly language defined by energetic impasto, fluid glazes, and bold brushwork.",
      "Alongside his decades-long art career, Joshi served as a senior journalist with The Times of India, observing the social, political, and cultural currents of Mumbai. This analytical eye and socio-critical sensibility subtly underpin his ink drawings and complex spatial compositions.",
      "A defining motif across his oeuvre is water—specifically the living metaphor of rivers. Following a childhood incident near Mumbai where he narrowly escaped drowning, water became for Joshi a profound existential conduit. He perceives rivers not merely as geographical arteries, but as eternal currents carrying human memory, ecological fragility, and spiritual renewal.",
      "His paintings have been exhibited in major cultural institutions across Europe, the United States, and Asia, holding permanent places in international museum and university collections."
    ],
    themes: [
      {
        title: "The Metaphor of Rivers",
        description:
          "Rivers serve as visual and philosophical conduits for the passage of time, human memory, and contemplative contemplation of ancient watercourses such as the mythical Saraswati."
      },
      {
        title: "Urban Realities & Climate",
        description:
          "Mixed media works and structural ink drawings that explore the paradox of urban expansion—technological convenience existing alongside spiritual and ecological disorientation."
      },
      {
        title: "Spontaneous Consciousness",
        description:
          "A meditative, unplanned painting practice answering core human inquiries: 'Who am I, why am I here, and where am I going?'"
      }
    ],
    collections: [
      "Southern Nevada Museum of Fine Art, Las Vegas, USA",
      "Yekaterinburg Gallery of Modern Art, Russia",
      "Minneapolis University Permanent Collection, USA",
      "Colorida Art Gallery, Lisbon, Portugal",
      "Seba Art Gallery, Izmir, Turkey",
      "Private and institutional collections across Switzerland, Italy, and India"
    ],
    literaryWorks: [
      "Prakash Bal Joshi yanchya Katha (Award-winning short story collection, translated into English, French, German, and major Indian languages)",
      "Gateway (Exploration of Mumbai's complex urban life and human resilience)"
    ]
  },
  contact: {
    studioLocation: "Kala Ghoda Arts District / Worli",
    city: "Mumbai",
    country: "India",
    email: "studio@prakashbaljoshi.com",
    representationNote: "Represented internationally by select partner galleries. Direct studio enquiries welcome for museum acquisitions and curatorial collaborations.",
    visitingPolicy: "Studio visits in Mumbai are arranged by prior appointment for curators, collectors, and researchers."
  }
};
