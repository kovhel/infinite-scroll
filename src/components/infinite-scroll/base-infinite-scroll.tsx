import * as React from "react";

export interface IBaseInfiniteScrollProps {
  load: () => void;
}

export class BaseInfiniteScroll extends React.PureComponent<
  IBaseInfiniteScrollProps
> {
  private ref = React.createRef<any>();
  public render() {
    return (
      <div
        ref={this.ref}
        onScroll={this.doScroll}
        style={{ overflowY: "auto" }}
      >
        {this.props.children}
      </div>
    );
  }

  private doScroll = () => {
    let element = this.ref.current;
    if (
      element.scrollHeight - (element.offsetHeight + element.scrollTop) <
      element.offsetHeight / 2
    ) {
      this.props.load();
    }
  };
}
