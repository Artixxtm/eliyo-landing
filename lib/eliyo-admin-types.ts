export type FeedbackStatus = "new" | "reviewed" | "planned" | "closed";
export type IdeaStatus = "pending" | "approved" | "rejected" | "published";

export type AdminFeedback = {
  id: string;
  userId: string;
  type: "bug" | "idea" | "question";
  message: string;
  screenshotUrl: string | null;
  appVersion: string | null;
  buildVersion: string | null;
  platform: "ios" | "android" | "web";
  osVersion: string | null;
  deviceModel: string | null;
  locale: string | null;
  vehicleId: string | null;
  wantsReply: boolean;
  replyEmail: string | null;
  runtime: string | null;
  status: FeedbackStatus;
  createdAt: string;
};

export type AdminIdea = {
  id: string;
  title: string;
  description: string | null;
  locale: string;
  attributionName: string | null;
  attributionUrl: string | null;
  consentToPublishAttribution: boolean;
  status: IdeaStatus;
  createdAt: string;
  reviewedAt: string | null;
  publishedFeatureId: string | null;
};

export type AdminCatalogRequest = {
  dedupeKey: string;
  make: string;
  model: string;
  year: number;
  requestingUsers: number;
  totalRequests: number;
  lastRequestedAt: string;
};

export type AdminFeature = {
  id: string;
  title: string;
  status: "considering" | "planned" | "building" | "shipped";
  source: "product" | "community";
  published: boolean;
  voteCount: number;
  updatedAt: string;
};

export type AdminActivationMetrics = {
  totalUsers: number;
  vehicleUsers: number;
  setupUsers: number;
  returnEligibleUsers: number;
  returnedUsers: number;
  source: "instrumented" | "auth_proxy";
};

export type AdminVehicleModel = {
  key: string;
  make: string;
  model: string;
  total: number;
  active: number;
  archived: number;
  minYear: number;
  maxYear: number;
};

export type AdminVehicleInventory = {
  total: number;
  active: number;
  archived: number;
  uniqueMakes: number;
  uniqueModels: number;
  models: AdminVehicleModel[];
};

export type AdminDashboardData = {
  generatedAt: string;
  counts: {
    newFeedback: number;
    pendingIdeas: number;
    totalVotes: number;
    catalogRequests: number;
  };
  feedback: AdminFeedback[];
  ideas: AdminIdea[];
  catalog: AdminCatalogRequest[];
  features: AdminFeature[];
  activation: AdminActivationMetrics;
  vehicleInventory: AdminVehicleInventory;
};
