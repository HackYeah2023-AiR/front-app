export interface AnimalResponse {
  images: Blob[];
  id: number;
  latitude: number;
  longitude: number;
  date: string;
  animalName: string;
  relatedUserId: number;
}

export interface AnimalRequest {
  latitude: number;
  longitude: number;
  date: string;
  isLost: boolean;
  image: string | null;
  speciesName: string;
}
