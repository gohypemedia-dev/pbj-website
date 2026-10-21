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
    "Abstract paintings shaped by memory, ecological fragility, and the quiet, persistent movement of water.",
  extendedIntro:
    "Prakash Bal Joshi translates the currents of time, ecological memory, and contemplation into intuitive oil and acrylic abstractions. Based in his Mumbai studio, his practice reflects decades of keen observation as both a painter and journalist.",
  biography: {
    lead:
      "Prakash Bal Joshi is a contemporary Indian abstract painter and writer whose work bridges literary depth, keen social observation, and spontaneous visual expression.",
    paragraphs: [
      "Born in Achalpur, Maharashtra, Joshi felt an early affinity for visual expression and light, complementing his painting with formal studies in photography. Through an intuitive practice in abstract expressionism, he developed a painterly language defined by energetic impasto, fluid glazes, and bold brushwork.",
      "Alongside his decades-long art career, Joshi served as a senior journalist with The Times of India, observing the social, political, and cultural currents of Mumbai. This analytical eye and quiet sensibility subtly underpin his ink drawings and complex spatial compositions.",
      "A defining motif across his oeuvre is water—specifically the living metaphor of rivers. Following a childhood incident near Mumbai where he narrowly escaped drowning, water became for Joshi an enduring conduit. He perceives rivers not merely as geographical arteries, but as currents carrying human memory, ecological fragility, and renewal.",
      "His paintings have been exhibited in cultural institutions across Europe, the United States, and Asia, holding places in international museum and university collections."
    ],
    themes: [
      {
        title: "The Metaphor of Rivers",
        description:
          "Rivers serve as visual and philosophical conduits for the passage of time, human memory, and the quiet remembrance of ancient watercourses such as the mythical Saraswati."
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
    studioLocation: "Mumbai Studio",
    city: "Mumbai",
    country: "India",
    email: "studio@prakashbaljoshi.com",
    representationNote: "Represented internationally by partner galleries. Direct studio enquiries welcome for acquisitions and curatorial collaborations.",
    visitingPolicy: "Studio visits in Mumbai are arranged by prior appointment for curators, collectors, and researchers."
  }
};
