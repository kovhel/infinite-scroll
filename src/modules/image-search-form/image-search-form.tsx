import * as React from "react";
import { Grid, InfiniteScroll, Search } from "../../components";
import { Image } from "../../services/image-search";
import { IImageSearch } from "../../services/image-search/image-search.interface";

export interface IImageSearchFormProps {
  getSearchService: () => IImageSearch;
}

interface IImageSearchFormState {
  query: string;
  items: Image[];
  columns: number;
  isLoading: boolean;
  allLoaded: boolean;
}

export const limit = 20;

export class ImageSearchForm extends React.PureComponent<
  IImageSearchFormProps,
  IImageSearchFormState
> {
  private searchService: IImageSearch;

  private offset = 0;
  constructor(props: IImageSearchFormProps) {
    super(props);

    this.searchService = props.getSearchService();
    this.state = {
      query: "",
      items: [],
      columns: 1,
      isLoading: false,
      allLoaded: false
    };
  }

  public render(): React.ReactNode {
    return (
      <>
        <Search search={this.startNewSearch} />
        {this.renderColumnOptions()}
        <InfiniteScroll load={this.loadNextImages}>
          <Grid
            colNumber={this.state.columns}
            items={this.state.items}
            renderItem={this.renderImage}
          />
          {this.state.isLoading && "Loading..."}
          {this.state.allLoaded &&
            (!this.state.items.length
              ? "Nothing found. Please, try another query!"
              : "Looks like you have seen all images!")}
        </InfiniteScroll>
      </>
    );
  }

  private startNewSearch = (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery === this.state.query) {
      return;
    }
    this.offset = 0;
    this.setState(
      {
        query: trimmedQuery,
        items: [],
        isLoading: false,
        allLoaded: false
      },
      () => {
        this.loadNextImages();
      }
    );
  };

  private loadNextImages = () => {
    if (this.state.isLoading || this.state.allLoaded) {
      return;
    }
    this.setState(
      {
        isLoading: true
      },
      () => {
        this.searchService
          .get(
            this.state.query,
            limit * this.state.columns,
            this.offset * this.state.columns
          )
          .then(images => {
            this.offset = this.offset + images.length;
            this.setState({
              items: this.state.items.concat(images),
              allLoaded: images.length < limit * this.state.columns,
              isLoading: false
            });
          });
      }
    );
  };

  private renderImage = (image: Image) => (
    <img
      src={image.url}
      alt={image.title}
      title={image.title}
      width={image.width}
      height={image.height}
      key={image.id}
      style={{ backgroundColor: "grey", margin: "auto" }}
    />
  );

  private renderColumnOptions(): React.ReactNode {
    const { columns } = this.state;
    return (
      <>
        <p>Number of columns:</p>
        <label>
          <input
            onChange={this.updateColumns}
            type="radio"
            name="columns"
            value={1}
            checked={columns === 1}
          />
          {"1 column"}
        </label>
        <label>
          <input
            onChange={this.updateColumns}
            type="radio"
            name="columns"
            value={3}
            checked={columns === 3}
          />
          {"3 columns"}
        </label>
      </>
    );
  }

  private updateColumns = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      columns: parseInt(event.target.value)
    });
  };
}
