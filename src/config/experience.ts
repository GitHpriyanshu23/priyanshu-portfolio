export type ExperienceItem = {
  company: string;
  role: string;
  periodShort: string;
  periodLong: string;
  locationShort: string;
  locationLong: string;
  working?: boolean;
  details?: string[];
  tech?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Valency Energy",
    role: "AI/ML Intern",
    periodShort: "Jun 25 – Aug 25",
    periodLong: "June 2025 – August 2025",
    locationShort: "Remote, IN",
    locationLong: "Remote, India ",
    details: [
      "Developed and optimized machine learning models for renewable energy demand forecasting using Python with real-time IoT data.",
      "Built automated data pipelines and performed feature engineering to enhance analytics accuracy and system performance.",
    ],
    tech: ["Python", "Machine Learning", "IoT", "Data Pipelines", "Feature Engineering"],
  },
];
