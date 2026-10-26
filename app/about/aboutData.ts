export interface ArchiveEntry {
  text: string;
  year?: number;
  editorialNote?: string;
}

export interface YearGroup {
  year: number;
  entries: ArchiveEntry[];
}

export const aboutBiography: string[] = [
  "Born in 1951, based in Mumbai, Prakash Bal Joshi is an independently trained artist. His work explores the transience of nature, the psychological complexity of human experience, and the contradictions of a rapidly changing society.",
  "Across his practice, rivers have a recurring presence, through which he questions the idea of spirituality, ecological loss, and impermanence. His preoccupation, particularly with the mythical River Saraswati, delves into its cultural memory and spiritual imagination. In his work, the river becomes both a physical presence and a metaphor for the passage of time: a force that carries, transforms, and erases.",
  "His relationship with water is shaped, in part, by a childhood experience of nearly drowning in a river, an encounter that lends the subject a deeply personal dimension.",
  "He further explores the contradictions of material development coexisting with ecological loss and the erosion of social values. Joshi, through his praxis, raises larger questions about what societies choose to preserve and what they allow to disappear.",
  "Beyond his practice as a visual artist, Prakash Bal Joshi has cultivated a longstanding engagement with the world through journalism and Marathi literature. These parallel pursuits have informed his understanding of urban life, human relationships and the shifting social values of a rapidly changing society. As a political journalist and columnist, he has worked with newspapers including Sakal, The Indian Express and The Times of India. His contributions to journalism were recognised with the Excellence in Journalism Award from the Mantralaya Vidhimandal Vartahar Sangh in 2019, followed by the K. P. Samak Lifetime Achievement Award, presented by Maharashtra Governor Bhagat Singh Koshyari at Raj Bhavan, Mumbai, in 2021.",
  "Writing in Marathi, Joshi brings a similar attentiveness to the complexities of everyday life, exploring strained relationships, changing values and women’s empowerment among middle-class communities in rural and urban India. His fifteen-story collection, Mirror in the Hall and Other Stories (Ratna Books), translated by Smita Karandikar from the Marathi Arsa Baithakitalaa Aani Itar Katha, examines these concerns through intimate human narratives, each accompanied by an author sketch. His other books include Maitrinichi Goshta, a collection of short stories, and Gateway, a sketch-illustrated portrait of urban life in Mumbai.",
  "Recognising the breadth of his creative pursuits, reviewer Sumit Paul described him as a “versatile genius” in the Free Press Journal.",
  "Though journalism, literature and painting remain distinct pursuits, Joshi is grounded in a sustained attentiveness to the world and to the meanings concealed within ordinary experience. Across these disciplines, observation becomes a means of asking fundamental questions about existence, memory and change.",
  "Currently based in Mumbai, Joshi serves as chairman of the Artists’ Centre and the Visual Arts Committee of the Trans-Asian Chamber of Commerce and Industry."
];

export const soloExhibitions: ArchiveEntry[] = [
  { year: 2024, text: "“Inner-Impressions”, solo, ArtQuest Art Gallery, Vadala, Mumbai, India, Aug–Sept 2024." },
  { year: 2024, text: "Exhibition (title not given), solo, Nitya Artist Centre Gallery, Prabhadevi, Mumbai, India, Mar 2024." },
  { year: 2017, text: "“Beyond Blue”, solo, Kokontan Gallery, Venice, Italy, Jul–Aug 2017." },
  { year: 2016, text: "“Mind Scape”, solo, Lalit Kala Kendra, New Delhi, India, Mar 2016." },
  { year: 2015, text: "“Space 4”, solo, Jehangir Art Gallery, Mumbai, India, Sept–Oct 2015." },
  { year: 2014, text: "“PBJ Black and White Art”, solo, Artistree Gallery, Mumbai, India, Nov 2014." },
  { year: 2013, text: "Solo exhibition, Brush Strokes Art Gallery, Pune, Maharashtra, India, Nov 2013." },
  { year: 2011, text: "Solo exhibition (inaugurated on World Environment Day by Sumitra Gandhi Kulkarni, Mahatma Gandhi's granddaughter), Leela Kempinski, Bangalore, India, June 2011." },
  { year: 2010, text: "Solo exhibition, Florida Art Gallery, Lisbon, Portugal, Nov 2010." },
  { year: 2009, text: "“Subtle Changes”, solo, India Art Gallery (Contemporary Art Series), Pune, Maharashtra, India, 2009." },
  { year: 2006, text: "Solo exhibition of drawings of PBJ's paintings, Artist Centre, Mumbai, India, May 2006." }
];

export const groupExhibitions: ArchiveEntry[] = [
  // 2025
  { year: 2025, text: "“The Spectrum of Colour”, group exhibition, by Art Vista, Simroza Gallery, Mumbai, India, Feb 2025." },
  { year: 2025, text: "India Art Festival, group, Nehru Centre, Mumbai, India, Jan 2025.", editorialNote: "also listed under Art Camps" },
  // 2024
  { year: 2024, text: "India Art Festival, group, Bangalore, India, Dec 2024." },
  { year: 2024, text: "India Art Festival, group, Delhi, India, Nov 2024." },
  { year: 2024, text: "“Amalgation-12”, group, Simroza Art Gallery, Mumbai, India, Sept 2024." },
  { year: 2024, text: "India Art Festival, First Edition, group, Hyderabad, India, June 2024." },
  { year: 2024, text: "Mumbai Art Fair Contemporary Art Celebration, group, Nehru Centre, Worli, Mumbai, India, May 2024.", editorialNote: "also listed under Art Camps" },
  { year: 2024, text: "India Art Festival, group, Nehru Centre, Mumbai, India, Feb 2024." },
  { year: 2024, text: "International Painting Exhibition, Indian Art, group, Swami Vivekananda Cultural Centre, High Commission of India, Colombo, Sri Lanka, Feb 2024." },
  // 2023
  { year: 2023, text: "India Art Festival, group, Constitutional Club of India, New Delhi, India, Nov 2023." },
  { year: 2023, text: "Art exhibition, Lalit Kala Art Gallery, Puri, Odisha, India, Nov 2023." },
  { year: 2023, text: "“Art on Wheel”, exhibition of painting, Valikhodjav Art Gallery, Tashkent, Uzbekistan, Oct 2023." },
  { year: 2023, text: "“Hues”, group exhibition, Jehangir Art Gallery, Mumbai, India, June 2023." },
  { year: 2023, text: "Mumbai Art Fair, group, Nehru Centre, Worli, Mumbai, India, May 2023." },
  { year: 2023, text: "Indo-Sri Lankan Group Show, Gallery for Life, Colombo University, Sri Lanka, Mar 2023." },
  { year: 2023, text: "Nagpur Group Show, V.R. Nagpur, Rambagh, Nagpur, India, Mar 2023." },
  { year: 2023, text: "“Chitrasangam 2023”, national group art exhibition, Ujjawal Art Gallery, Art Street, Goa, India, Feb 2023." },
  { year: 2023, text: "Exhibition, Discovery of India Building, Dr. A.B. Road, Worli, Mumbai, India, Jan 2023." },
  // 2022
  { year: 2022, text: "India Art Festival, group, Bengaluru, India, Dec 2022." },
  { year: 2022, text: "“Anugoonj”, 19th Annual National Art and Cultural Show, Chaturdik Art Gallery, Jawahar Kala Kendra (JKK), Jaipur, India, Dec 2022." },
  { year: 2022, text: "Group exhibition of Indian and Egyptian artists, Cairo, Egypt, Dec 2022." },
  { year: 2022, text: "Mumbai Art Fair, group, Nehru Centre, Mumbai, India, Oct 2022." },
  { year: 2022, text: "India Art Festival (India's Contemporary Art Festival), group, Constitutional Club of India, Rafi Marg, New Delhi, India, Oct 2022." },
  { year: 2022, text: "“Amalgamation-8”, exhibition of paintings, prints, sculpture and ceramics, Simroza Art Gallery, Mumbai, India, Sept 2022." },
  { year: 2022, text: "India Art Festival, group, Nehru Centre, Worli, Mumbai, India, May 2022." },
  { year: 2022, text: "“Truth Remains”, group, Prithvi Fine Art and Cultural Centre (with India Art Fair), Delhi, India, May 2022." },
  { year: 2022, text: "“Swadesh Times”, online art exhibition, May 2022." },
  { year: 2022, text: "India Art Festival (India's Contemporary Art Fair), group, New Delhi, India, Apr 2022." },
  { year: 2022, text: "International Contemporary Art Festival, group, Ras Llain Art Gallery, Amman, Jordan, Apr 2022." },
  { year: 2022, text: "River Nile International Art Festival (with Luxor University and SMD Foundation), group, Egypt, Mar 2022." },
  { year: 2022, text: "“Samanvay – Confluence of Creative”, contemporary group exhibition of painting and sculpture, Jehangir Art Gallery, Mumbai, India, Mar 2022." },
  { year: 2022, text: "“Art that appeals to Alternative Senses”, group, The Gallery, Ahmedabad, Gujarat, India, Jan 2022." },
  { year: 2022, text: "India Art Festival (India's Contemporary Art Fair), group, New Delhi, India, Jan 2022." },
  // 2021
  { year: 2021, text: "International Art Festival, group, National Art Gallery, Maldives, Oct 2021." },
  { year: 2021, text: "Virtual India Art Festival: 3rd Edition (http://www.indiaartfest.in/), online group, Aug–Oct 2021." },
  { year: 2021, text: "“INVISIBLE”, online painting show, organised by A.S. Art Gallery, Mumbai, India, July 2021." },
  { year: 2021, text: "Virtual India Art Festival: 2nd Edition (http://www.indiaartfest.in/), online group, Apr–June 2021." },
  { year: 2021, text: "“ART-Black Box”, online national art exhibition, India, Jan 2021." },
  // 2020
  { year: 2020, text: "Online group exhibition, Rainbow Art Foundation (http://www.rafoundation.co.in/), Sept 2020." },
  { year: 2020, text: "“Spiritual Blue”, group exhibition, Global Art Environment, Aundh, Pune, India, Feb 2020." },
  { year: 2020, text: "India Art Festival, group, Mumbai, India, Jan 2020." },
  { year: 2020, text: "“Amalgamation-7”, group show, Simroza Art Gallery, Mumbai, India, Jan 2020." },
  // 2019
  { year: 2019, text: "Affordable Art Fair, group, Singapore, Nov 2019." },
  { year: 2019, text: "India Art Festival (India's Contemporary Art Fair), group, New Delhi, India, Nov 2019." },
  { year: 2019, text: "“Art for Humanity”, charity art exhibition, Art Gallery, Mumbai, India, Oct 2019." },
  { year: 2019, text: "Mumbai Art Fair, group, Mumbai, India, Oct 2019." },
  { year: 2019, text: "Oman-India Art Exhibition, Oman Society for Fine Arts, Saruj, Muscat, Oman, Sept 2019." },
  { year: 2019, text: "Art-Expo, group, New York, USA, Apr 2019." },
  { year: 2019, text: "India Art Festival, group, Nehru Centre, Mumbai, India, Jan 2019." },
  // 2018
  { year: 2018, text: "India Art Festival (India's Contemporary Art Fair), group, New Delhi, India, Nov 2018." },
  { year: 2018, text: "Affordable Art Fair Singapore, group, Singapore, Nov 2018." },
  { year: 2018, text: "International Art Festival, group, Yekaterinburg Gallery of Modern Art, Russia, Apr 2018.", editorialNote: "also listed under Art Camps" },
  { year: 2018, text: "India Art Festival, group, Mumbai, India, Feb 2018." },
  // 2017
  { year: 2017, text: "Affordable Art Fair, group, Singapore, Nov 2017." },
  { year: 2017, text: "“Chitrasangam”, national show, exhibition of paintings and sculpture, India, Nov 2017." },
  { year: 2017, text: "India Art Festival, group, New Delhi, India, Jan 2017." },
  // 2016
  { year: 2016, text: "“Pigment – Colours with Purpose”, group, The Nargis Dutt Foundation, Bandra, Mumbai, India, June 2016." },
  // 2014
  { year: 2014, text: "India Art Festival, group, Nehru Centre, Worli, Mumbai, India, Dec 2014." },
  { year: 2014, text: "Group exhibition, The Institute of Chicago, Chicago, USA, Jan 2014." },
  { year: 2014, text: "India Arts Festival, group, Asiamania, Korea, Jan 2014." },
  // 2013
  { year: 2013, text: "Group show, Arterie Fine Arts, Chicago, USA, Dec 2013." },
  { year: 2013, text: "India Art Festival, group, Nehru Centre, Worli, Mumbai, India, Dec 2013." },
  { year: 2013, text: "“Art Gate – A Gateway to the World of Art”, group, Mumbai, India, Nov 2013." },
  { year: 2013, text: "Bienal Izmir 2013, Izmir International Arts Festival, Turkey, Apr 2013." },
  { year: 2013, text: "Group show, Nehru Wangchuk Cultural Centre, Thimphu, Bhutan, Apr 2013." },
  { year: 2013, text: "Kala Ghoda Art Festival, group, Mumbai, Maharashtra, India, Feb 2013." },
  // 2012
  { year: 2012, text: "India Art Festival (India's Contemporary Art Fair), group, Mumbai, India, Nov 2012." },
  { year: 2012, text: "GZ Art Basel, art festival, Basel, Switzerland, June 2012." },
  { year: 2012, text: "“WOSSUP” art festival, Lokhandwala Complex, Andheri, Mumbai, India, Mar 2012." },
  { year: 2012, text: "Kala Ghoda Art Festival, group, Mumbai, India, Feb 2012." },
  // 2011
  { year: 2011, text: "Mumbai Art Kallective (MARK), group, Mumbai, India, Nov 2011." },
  { year: 2011, text: "“Worlds with in word”, group show, Bajaj Art Gallery, Mumbai, India, Nov 2011." },
  { year: 2011, text: "India Art Festival, group, Mumbai, India, Oct–Nov 2011." },
  // 2010
  { year: 2010, text: "Las Vegas International Group Exhibition, Southern Nevada Museum of Fire Art, Nevada, USA, Feb 2010." },
  { year: 2010, text: "Kala Ghoda Art Festival, group, Mumbai, India, Feb 2010." },
  // 2009
  { year: 2009, text: "“Subtle Changes”, Artist Centre member group show, Artistree Gallery, Mumbai, India, Nov 2009." },
  { year: 2009, text: "International group show, Galerija Vernissage, Osijek, Croatia, June 2009." },
  { year: 2009, text: "“Project Dharavi”, group show, Mumbai, Maharashtra, India, Mar 2009." },
  { year: 2009, text: "IV Biennial of Coruche, Portugal, Mar 2009." },
  // 2008
  { year: 2008, text: "“Affordable Abstract”, Artistree Gallery, Bangalore, India, Aug 2008." },
  { year: 2008, text: "Annual Art Exhibition, Artist Centre, Mumbai, India, July 2008." },
  { year: 2008, text: "“Women and Water Rights, Reverse of Regeneration”, Minneapolis University, USA, July 2008." },
  { year: 2008, text: "Artist Centre Group Show 2008, Artist Centre, Mumbai, India, July 2008." },
  { year: 2008, text: "Gallery-G Bengaluru, group show, Bangalore, India, June 2008." },
  // 2006
  { year: 2006, text: "Artist Centre Group Show 2006, Artist Centre, Mumbai, India, June 2006." }
];

export const charityEvents: ArchiveEntry[] = [
  { year: 2022, text: "International Auction for Charity in Africa, Africa, 2022." },
  { year: 2021, text: "Affordable Online Exhibition, by the Art Society of India, for artists affected by the Corona crisis, India, 2021." },
  { year: 2017, text: "Annual Charity Art Exhibition, for the Nargis Dutt Foundation, 2017." },
  { year: 2009, text: "Art auction, Norway, for needy children of Malawi, Malawi/Norway, 2009." }
];

export const awardsAndRecognitions: ArchiveEntry[] = [
  { year: 2025, text: "Invited Guest of Honour at the 7th International Festival of Fine Arts (FIAP), Morocco, 2025." },
  { year: 2024, text: "Yashwantrao Chavan State Award, Maharashtra, India, 2024. Awarded for the Marathi book Prakash Bal Joshi’s Stories (Prakash Bal Joshi Yanchya Katha)." },
  { year: 2022, text: "Honoured by the Governor of Maharashtra, Shri Bhagat Singh Koshyari, Raj Bhavan, Mumbai, India, 18 May 2022." },
  { year: 2022, text: "Lifetime Achievement Award, 2022." },
  { year: 2021, text: "Certificate of Appreciation, Art Society of India, 2021." },
  { year: 2021, text: "Maldives International Peace Award, 2021." },
  { year: 2021, text: "Vagdhara Navratna Honour, 27 February 2021." },
  { year: 2021, text: "K. P. Samak Lifetime Achievement Award, 2021." },
  { year: 2020, text: "Artist Excellence Award, World Art Fair and Art for Awareness Foundation, 2020." },
  { year: 2020, text: "Jeevan Gaurav Award (Lifetime Achievement Award), Mantralaya and Vidhi Mandal Vartahar Sangh, India, 2020." },
  { year: 2016, text: "State Government Award, Maharashtra, India, 2016. Awarded for the book Prakash Bal Joshi Maanchya Katha." },
  { year: 2015, text: "Best Literary Work Award, Maharashtra State Board of Literature and Culture, Government of Maharashtra, India, 2015." }
];

export const collections: string[] = [
  "Yekaterinburg Gallery of Modern Art, Russia.",
  "Southern Nevada Museum of Fine Art, Las Vegas, USA.",
  "Galerija Vernissage, Osijek, Croatia.",
  "Seba Art Gallery, Izmir, Türkiye.",
  "Colorida Art Gallery, Lisbon, Portugal.",
  "Priyadarshini Park Foundation, Mumbai, India.",
  "Clarence Fernandes Collection, Singapore."
];

export const artCampsAndWorkshops: ArchiveEntry[] = [
  { year: 2025, text: "Art camp by ISB, Hyderabad, India, Mar 2025.", editorialNote: "printed as “International Business School”" },
  { year: 2022, text: "Nairobi Art Camp, Appasaheb Pant Wall, Indian Embassy, Nairobi, Kenya, Dec 2022." },
  { year: 2022, text: "“Bridge of Friendship”, painting workshop with Indian and Egyptian artists, Helwan University, Cairo, Egypt, Dec 2022." },
  { year: 2022, text: "International Art Exhibition in Cairo, Artist Residency Program, Sharm-El-Sheikh, Egypt, Nov 2022." },
  { year: 2022, text: "Live painting workshop, Balasaheb Thackeray Memorial, Thane, Mumbai, India, Jan 2022." },
  { year: 2017, text: "Art camp, VIBE Art, Pattaya, Thailand, 2017." },
  { year: 2016, text: "Art camp organised by Camlin–Kokuyo, Rachana Sandad Campus, Mumbai, India, May 2016." }
];

export function groupByYear(entries: ArchiveEntry[]): YearGroup[] {
  const map = new Map<number, ArchiveEntry[]>();
  for (const entry of entries) {
    const yr = entry.year || 0;
    if (!map.has(yr)) {
      map.set(yr, []);
    }
    map.get(yr)!.push(entry);
  }
  // Sort newest year first
  const sortedYears = Array.from(map.keys()).sort((a, b) => b - a);
  return sortedYears.map((yr) => ({
    year: yr,
    entries: map.get(yr)!
  }));
}
