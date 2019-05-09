export interface Home {
  type: HomeTypes;
  title: string;
  location: string;
  price: number;
  image_url: string;
  rating: {
    count: number;
    stars: number;
  };
}

export type HomeTypes = 'Entire Apartment' 
  | 'Private Room' 
  | 'Tree House' 
  | 'Hotel Room';

export type SortTypes = ''
  | 'price_high'
  | 'price_low'
  | 'rating_high'
  | 'rating_low'
  | 'most_ratings'
  | 'least_ratings'

export interface PriceFilter {
  min?: number;
  max?: number;
}