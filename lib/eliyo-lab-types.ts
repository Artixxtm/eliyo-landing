export const labLocales = ["en", "uk", "pl", "ru"] as const;
export type LabLocale = (typeof labLocales)[number];

export const labStatuses = ["considering", "planned", "building", "shipped"] as const;
export type LabStatus = (typeof labStatuses)[number];

export type LabFeature = {
  id: string;
  title: string;
  description: string;
  status: LabStatus;
  source: "product" | "community";
  attributionName: string | null;
  attributionUrl: string | null;
  voteCount: number;
  voted: boolean;
};
