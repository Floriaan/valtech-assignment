import { ImageDetails } from "./ImageDetails";

export interface Album {
  id: string;
  title: string;
  images: ImageDetails[];
  createdAt: string;
}
