export type Achievement = {
  slug: string;
  title: string;
  organization: string;
  year: string;
  periodShort: string;
  periodLong: string;
  details?: string[];
  /** Cover image for cards and detail header */
  image?: string;
  /** Pinterest-style photo gallery on the detail page */
  gallery?: string[];
  featured?: boolean;
};

export const achievements: Achievement[] = [
  {
    slug: "sih-2025",
    title: "Runner-Up",
    organization: "Smart India Hackathon 2025",
    year: "2025",
    periodShort: "Aug 25",
    periodLong: "August 2025",
    details: [
      "National-level hackathon runner-up with team BruteForce_X.",
      "Built and demoed an AI-powered solution under tight deadlines.",
      "Protsahan Award — ₹25,000 at the SIH Software Edition Grand Finale.",
    ],
    image: "/assets/achievements/sih-2025/01.png",
    gallery: [
      "/assets/achievements/sih-2025/01.png",
      "/assets/achievements/sih-2025/02.png",
      "/assets/achievements/sih-2025/03.png",
      "/assets/achievements/sih-2025/04.png",
      "/assets/achievements/sih-2025/05.png",
      "/assets/achievements/sih-2025/06.png",
      "/assets/achievements/sih-2025/07.png",
    ],
    featured: true,
  },
  {
    slug: "sih-2024",
    title: "Finalist",
    organization: "Smart India Hackathon 2024",
    year: "2024",
    periodShort: "Dec 24",
    periodLong: "December 2024",
    details: [
      "Finalist at SIH 2024 Grand Finale with Team AURA (PS ID: SIH1620).",
      "Represented IPS Academy Institute of Engineering & Science, Indore.",
      "Shipped a working prototype under pressure — focused on scope, speed, and clear communication.",
    ],
    image: "/assets/achievements/sih-2024/01.png",
    gallery: [
      "/assets/achievements/sih-2024/02.png",
      "/assets/achievements/sih-2024/03.png",
      "/assets/achievements/sih-2024/04.png",
      "/assets/achievements/sih-2024/05.png",
      "/assets/achievements/sih-2024/06.png",
      "/assets/achievements/sih-2024/07.png",
      "/assets/achievements/sih-2024/08.png",
    ],
    featured: true,
  },
];

export function getAchievement(slug: string) {
  return achievements.find((item) => item.slug === slug);
}
