export interface ApiAirbnbResults {
  links: any[];
  records: Records[];
  total_count: number;
}

export interface Records {
  links: any[],
  record: Record;
}
export interface Record {
  fields: Fields;
  id: string;
  size: number;
  timestamps: Date;
}
export interface PictureUrl {
  thumbnail: boolean;
  filename: string;
  format: string;
  width: number;
  mimetype: string;
  etag: string;
  id: string;
  last_synchronized: Date;
  color_summary: string[];
  height: number;
  url: string;
}

export interface Geolocation {
  lon: number;
  lat: number;
}

export interface Fields {
  id: string;
  listing_url: string;
  scrape_id: string;
  last_scraped: string;
  name: string;
  summary: string;
  space?: any;
  description: string;
  experiences_offered: string;
  neighborhood_overview?: any;
  notes?: any;
  transit?: any;
  access?: any;
  interaction?: any;
  house_rules?: any;
  thumbnail_url: string;
  medium_url: string;
  picture_url: PictureUrl;
  xl_picture_url: string;
  host_id: string;
  host_url: string;
  host_name: string;
  host_since: string;
  host_location: string;
  host_about: string;
  host_response_time: string;
  host_response_rate: number;
  host_acceptance_rate?: any;
  host_thumbnail_url: string;
  host_picture_url: string;
  host_neighbourhood: string;
  host_listings_count: number;
  host_total_listings_count: number;
  host_verifications: string[];
  street: string;
  neighbourhood: string;
  neighbourhood_cleansed: string;
  neighbourhood_group_cleansed?: any;
  city: string;
  state: string;
  zipcode: string;
  market: string;
  smart_location: string;
  country_code: string;
  country: string;
  latitude: string;
  longitude: string;
  property_type: string;
  room_type: string;
  accommodates: number;
  bathrooms: number;
  bedrooms: number;
  beds: number;
  bed_type: string;
  amenities: string[];
  square_feet?: any;
  price: number;
  weekly_price?: any;
  monthly_price?: any;
  security_deposit: number;
  cleaning_fee: number;
  guests_included: number;
  extra_people: number;
  minimum_nights: number;
  maximum_nights: number;
  calendar_updated: string;
  has_availability?: any;
  availability_30: number;
  availability_60: number;
  availability_90: number;
  availability_365: number;
  calendar_last_scraped: string;
  number_of_reviews: number;
  first_review: string;
  last_review: string;
  review_scores_rating: number;
  review_scores_accuracy: number;
  review_scores_cleanliness: number;
  review_scores_checkin: number;
  review_scores_communication: number;
  review_scores_location: number;
  review_scores_value: number;
  license?: any;
  jurisdiction_names: string;
  cancellation_policy: string;
  calculated_host_listings_count: number;
  reviews_per_month: number;
  geolocation: Geolocation;
  features: string[];
}

export interface RootObject {
  id: string;
  timestamp: Date;
  size: number;
  fields: Fields;
}
