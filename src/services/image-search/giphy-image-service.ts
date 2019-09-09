import { v4 as uuid } from "uuid";
import { IImageSearch } from "./image-search.interface";
import { Image, ImageSize } from "./image";

export const giphyImageSizes = {
  [ImageSize.Medium]: "fixed_width",
  [ImageSize.Small]: "fixed_width_small"
};

const mapToImage = (giphyImageData: any, size: ImageSize): Image => {
  const image = giphyImageData["images"][giphyImageSizes[size]];
  return new Image(
    uuid(),
    image["webp"],
    image["width"],
    image["height"],
    giphyImageData["title"]
  );
};

export class GiphyImageService implements IImageSearch {
  private preferredSize = ImageSize.Medium;
  private static readonly url = "https://api.giphy.com/v1/gifs/search";
  private static readonly tokenParam = [
    "api_key",
    "CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6"
  ];

  public get(query: string, limit: number, offset: number): Promise<Image[]> {
    if (!query) {
      return Promise.resolve([]);
    }
    offset = Math.max(offset, 0);
    limit = Math.max(limit, 1);

    const url = GiphyImageService.getURL(query, limit, offset);
    return new Promise<Image[]>(resolve => {
      fetch(url.toString())
        .then(async response => {
          if (!response.ok) {
            console.error(`${response.status}: ${response.statusText}`);
            resolve([]);
            return;
          }

          const parsedResponse = await response.json();
          resolve(
            parsedResponse.data.map((imageData: any) =>
              mapToImage(imageData, this.preferredSize)
            )
          );
        })
        .catch(error => {
          console.error(error.message);
          resolve([]);
        });
    });
  }
  public setSize(size: ImageSize) {
    this.preferredSize = size;
  }
  private static getURL(query: string, limit: number, offset: number) {
    const params = new URLSearchParams([
      GiphyImageService.tokenParam,
      ["q", query],
      ["limit", limit.toString()],
      ["offset", offset.toString()]
    ]);
    const url = new URL(GiphyImageService.url);
    url.search = params.toString();
    return url;
  }
}
