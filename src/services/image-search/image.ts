export enum ImageSize {
  Medium,
  Small
}

export class Image {
  constructor(
    public id: string,
    public url: string,
    public width = 0,
    public height = 0,
    public title = ""
  ) {}
}
