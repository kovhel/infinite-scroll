import React from "react";
import { shallow } from "enzyme";
import { App } from "./app";
import { ImageSearchForm } from "./modules/image-search-form";

it("renders ImageSearchForm", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(ImageSearchForm).length).toBe(1);
});
