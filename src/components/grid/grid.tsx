import * as React from "react";

export interface IGridProps<ItemType> {
  items: ItemType[];
  colNumber: number;
  renderItem: (item: ItemType) => React.ReactNode;
}

export class Grid<ItemType> extends React.PureComponent<IGridProps<ItemType>> {
  public render() {
    const { items, renderItem, colNumber } = this.props;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: new Array(colNumber).fill("1fr").join(" "),
          gridGap: "2vw"
        }}
      >
        {items.map(item => renderItem(item))}
      </div>
    );
  }
}
