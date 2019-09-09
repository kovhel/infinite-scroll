import * as React from "react";

export interface ISearchProps {
  search: (query: string) => void;
  minQueryLength?: number;
}

export class Search extends React.PureComponent<ISearchProps> {
  private inputRef = React.createRef<HTMLInputElement>();
  public render() {
    return (
      <form onSubmit={this.doSearch}>
        <input ref={this.inputRef} />
        <button type="submit">Go</button>
      </form>
    );
  }
  private doSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const query = (this.inputRef.current && this.inputRef.current.value) || "";
    if (query.length < this.minQueryLength) {
      return;
    }

    this.props.search(query);
  };
  private get minQueryLength(): number {
    return this.props.minQueryLength || 1;
  }
}
