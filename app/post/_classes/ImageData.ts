import { ComponentData } from "./ComponentData";

export class ImageData extends ComponentData {
  private image: File;

  constructor(
    image: File,
    width: number = 200,
    height: number = 200,
    x: number = 0,
    y: number = 0,
  ) {
    super(width, height, x, y);
    this.image = image;
  }

  getImage() {
    return this.image;
  }

  getImageString() {
    return URL.createObjectURL(this.image);
  }

  override asObject(): Object {
    return {
      ...super.asObject(),
      image: this.image,
    };
  }

  asPayload(): Object {
    return {
      component: "image",
      body: this.asObject(),
    };
  }
}
