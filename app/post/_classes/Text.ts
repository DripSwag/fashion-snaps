import { ComponentData } from "./ComponentData";

export class Text extends ComponentData {
  private value: string;
  private font: string;
  private size: number;

  constructor(
    width: number = 200,
    height: number = 200,
    x: number = 0,
    y: number = 0,
    value: string = "Text",
    font = "Roboto",
    size = 12,
  ) {
    super(width, height, x, y);
    this.value = value;
    this.font = font;
    this.size = size;
  }

  setFont(font: string) {
    this.font = font;
  }

  getFont() {
    return this.font;
  }

  setValue(value: string): void {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  getSize() {
    return this.size;
  }

  setSize(size: number) {
    this.size = size;
  }

  override asObject(): Object {
    var temp = super.asObject();
    return {
      ...temp,
      value: this.value,
      size: this.size,
      font: this.font,
    };
  }

  asPayload(): Object {
    return {
      component: "text",
      body: this.asObject(),
    };
  }
}
