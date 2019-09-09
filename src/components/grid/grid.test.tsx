import * as React from "react";
import { shallow } from "enzyme";
import { Grid, IGridProps } from "./grid";

describe("Grid", () => {
  let props: IGridProps<string>;
  const getWrapper = (props: IGridProps<string>) =>
    shallow(<Grid {...props} />);
  beforeEach(() => {
    props = {
      items: ["item1", "item2", "item3"],
      renderItem: (item: string) => <span key={item} id={item} />,
      colNumber: 2
    };
  });
  test("should render all items provided", () => {
    const wrapper = getWrapper(props);
    expect(wrapper.find(`#${props.items[0]}`).length).toBe(1);
    expect(wrapper.find(`#${props.items[0]}`).length).toBe(1);
  });

  test("should provide correct grid columns template", () => {
    const wrapper = getWrapper(props);
    expect(wrapper.first().prop("style")).toEqual(
      expect.objectContaining({ gridTemplateColumns: "1fr 1fr" })
    );
  });
});
