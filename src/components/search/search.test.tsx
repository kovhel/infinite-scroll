import * as React from "react";
import { mount } from "enzyme";
import { ISearchProps, Search } from "./search";

describe("Search", () => {
  const props = {
    search: jest.fn(),
    minQueryLength: 5
  };
  const getWrapper = (props: ISearchProps) => mount(<Search {...props} />);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("should trigger search on submit", () => {
    const wrapper = getWrapper(props);
    wrapper.find("input").instance().value = "query string";
    wrapper.find("form").simulate("submit");
    expect(props.search).toBeCalledWith("query string");
  });
  test("should not trigger search on submit if query is empty or its length is less than min", () => {
    const wrapper = getWrapper(props);
    wrapper.find("input").instance().value = "sm";
    wrapper.find("form").simulate("submit");
    expect(props.search).not.toBeCalled();
  });
});
