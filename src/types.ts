export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "Tourist" | "Admin";
  country: string;
  preferences: string[];
  cohort?: string;
  submittedAt?: string;
  createdAt: string;
}

export interface UserSession {
  token: string;
  user: User;
}

export interface Trip {
  id: string;
  userId: string;
  destination: string;
  duration: string;
  budget: string;
  itinerary: ItineraryOutput;
  createdAt: string;
}

export interface ItineraryOutput {
  destination: string;
  duration: string;
  budget: string;
  hotels: string[];
  activities: string[];
  restaurants: string[];
  transportation: string[];
  daily_plan: { day: number; title: string; events: string[] }[];
}

export interface RecommendationItem {
  id: string;
  title: string;
  category: "Hotel" | "Restaurant" | "Attraction" | "Shopping" | "Entertainment" | "Transport";
  emirate: string;
  priceRange: string;
  rating: number;
  description: string;
  isPopular: boolean;
}

export interface SentimentFeed {
  id: string;
  userName: string;
  comment: string;
  sentiment: "Positive" | "Negative" | "Neutral";
  sentimentScore: number; // 0 to 1
  date: string;
  experienceType: string;
}

export interface AlignmentUAE {
  makeItEmiratesScore: number;
  aiVisionScore: number;
  analysisSummary: string;
}

export interface ResponsibleAIPractice {
  practiceName: string;
  description: string;
}

export interface MarketDemandMetric {
  month: string;
  historicalDemand: number;
  predictedDemand: number;
}

export interface SegmentMetric {
  name: string;
  value: number;
}

export interface KPIs {
  predictedMarketCapture: string;
  avgTravelerSatisfactionScore: string;
  annualStartupRevenueProjection: string;
  carbonOffsetEstimateKg: string;
}

export interface BIAnalyticsData {
  alignmentUAE: AlignmentUAE;
  responsibleAIPractices: ResponsibleAIPractice[];
  marketDemandMetrics: MarketDemandMetric[];
  segmentBreakdown: SegmentMetric[];
  kpis: KPIs;
  predictiveRecommendations: string[];
}

export interface TravelPreferences {
  destination: string;
  duration: string;
  budget: "Budget" | "Mid-Range" | "Luxury";
  activities: string[];
}
