import * as React from "react";
import { shallow } from "enzyme";
import { ImageSearchServiceMock } from "../../services/image-search/index.mock";
import { Image } from "../../services/image-search";
import {
  IImageSearchFormProps,
  ImageSearchForm,
  limit
} from "./image-search-form";
import { Grid, InfiniteScroll, Search } from "../../components";

describe("ImageSearchForm", () => {
  const props = {
    getSearchService: jest.fn().mockReturnValue(ImageSearchServiceMock)
  };
  const getWrapper = (props: IImageSearchFormProps) =>
    shallow(<ImageSearchForm {...props} />);
  describe("start new search", () => {
    const wrapper = getWrapper(props);
    const loadedImages = new Array(limit).fill(new Image("id", "url"));
    beforeAll(() => {
      jest.clearAllMocks();
    });

    test("should perform get request", () => {
      wrapper.find(Search).prop("search")("new query");
      wrapper.update();
      expect(ImageSearchServiceMock.get).toBeCalledTimes(1);
    });

    test("should clear previous images", () => {
      expect(wrapper.find(Grid).prop("items")).toEqual([]);
    });

    test("should show loading", () => {
      expect(wrapper.findWhere(n => n.text() === "Loading...").length).toBe(1);
    });

    test("should not start new get request before old one is completed", () => {
      wrapper.find(InfiniteScroll).prop("load")();
      expect(ImageSearchServiceMock.get).toBeCalledTimes(1);
    });

    test("should render newly loaded images", async () => {
      await ImageSearchServiceMock.resolveGetPromise(loadedImages);
      wrapper.update();
      expect(wrapper.find(Grid).prop("items")).toEqual(loadedImages);
    });

    test("should not show loading", () => {
      expect(wrapper.findWhere(n => n.text() === "Loading...").length).toBe(0);
    });

    test("should not start new search if query has not changed", () => {
      wrapper.find(Search).prop("search")("new query");
      wrapper.update();
      expect(ImageSearchServiceMock.get).toBeCalledTimes(1);
    });
  });
});
