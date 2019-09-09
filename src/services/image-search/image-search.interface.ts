import { Image, ImageSize } from "./image";

export interface IImageSearch {
  get: (query: string, limit: number, offset: number) => Promise<Image[]>;
  setSize: (size: ImageSize) => void;
}
