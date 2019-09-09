import * as React from "react";
import { mount } from "enzyme";
import {
  BaseInfiniteScroll,
  IBaseInfiniteScrollProps
} from "./base-infinite-scroll";

describe("BaseInfiniteScroll", () => {
  const props = {
    load: jest.fn()
  };
  const getWrapper = (props: IBaseInfiniteScrollProps) =>
    mount(<BaseInfiniteScroll {...props} />);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should not load next data if scrolled to top", () => {
    const wrapper = getWrapper(props);
    wrapper.instance().ref.current.scrollTop = 0;
    wrapper.first().simulate("scroll");
    expect(props.load).not.toBeCalled();
  });
  test("should load next data if scrolled to bottom", () => {
    const wrapper = getWrapper(props);
    wrapper.instance().ref.current.scrollTop = 1;
    wrapper.first().simulate("scroll");
    expect(props.load).toBeCalledTimes(1);
  });
});
