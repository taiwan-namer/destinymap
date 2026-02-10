/**
 * User input for destiny analysis.
 * Spec: Name, Birth Date/Time; isUnknownTime when user does not know birth time.
 */
export interface UserInput {
  name: string;
  birthDate: string;
  birthTime: string;
  isUnknownTime: boolean;
}

/**
 * Single recommendation item from DeepSeek.
 * Spec: Exactly 3 items in recommendations array.
 */
export interface DeepSeekRecommendationItem {
  type?: string;
  city: string;
  country: string;
  reason: string;
  coordinates?: { lat: number; lng: number };
}

/**
 * DeepSeek API JSON response structure.
 * Spec v2.0: personality_summary (max 60 chars), lucky_elements, lucky_direction, fortune_score (1-100), recommendations (3 items).
 */
export interface DeepSeekResponse {
  personality_summary: string;
  lucky_elements: string[];
  lucky_direction: string;
  fortune_score: number;
  recommendations: [DeepSeekRecommendationItem, DeepSeekRecommendationItem, DeepSeekRecommendationItem];
}

/**
 * Travel recommendation with affiliate URLs for display.
 * Used after matching AI output to destinations.json or fallback URL.
 */
export interface TravelRecommendation {
  city: string;
  country: string;
  reason: string;
  affiliateUrl: string;
  hotel_url: string;
  activity_url: string;
  flight_url: string;
}
