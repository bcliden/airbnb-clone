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