import { GiphyImageService, giphyImageSizes } from "./giphy-image-service";
import { ImageSize } from "./image";

describe("GiphyImageService", () => {
  const fetchSpy = jest.spyOn(window, "fetch");
  const instance = new GiphyImageService();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should perform correct request according to passed params", () => {
    instance.get("my_query", 30, 8);
    const requestedURL = fetchSpy.mock.calls[0][0];
    expect(requestedURL).toEqual(expect.stringContaining(`q=my_query`));
    expect(requestedURL).toEqual(expect.stringContaining(`limit=30`));
    expect(requestedURL).toEqual(expect.stringContaining(`offset=8`));
  });
  test("should return images of selected size if request was successful", async () => {
    const response = {
      ok: true,
      json: jest.fn().mockReturnValue({
        data: [
          {
            title: "some title",
            images: {
              [giphyImageSizes[ImageSize.Small]]: {
                width: 73,
                height: 23,
                webp: "link"
              }
            }
          }
        ]
      })
    } as any;
    fetchSpy.mockResolvedValue(response);
    instance.setSize(ImageSize.Small);
    const images = await instance.get("test", 1, 0);
    expect(images[0]).toEqual(
      expect.objectContaining({
        url: "link",
        title: "some title",
        width: 73,
        height: 23
      })
    );
  });
  test("should return empty array if request failed", async () => {
    const response = {
      ok: false
    } as any;
    fetchSpy.mockResolvedValue(response);
    const images = await instance.get("test", 1, 0);
    expect(images.length).toBe(0);
  });
  test("should return empty array if request rejected", async () => {
    const error = {
      message: "rejected"
    } as any;
    fetchSpy.mockRejectedValue(error);
    const images = await instance.get("test", 1, 0);
    expect(images.length).toBe(0);
  });
  test("should not perform request if query is empty", () => {
    instance.get("", 1, 0);
    expect(fetchSpy).not.toBeCalled();
  });
});
