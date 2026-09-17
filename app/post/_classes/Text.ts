import { Component } from "./Component";

export class Text extends Component {
  private value: string;

  constructor(
    width: number = 1,
    height: number = 1,
    x: number = 0,
    y: number = 0,
    value: string = "Text",
  ) {
    super(width, height, x, y);
    this.value = value;
  }

  setValue(value: string): void {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  override asObject(): Object {
    var temp = super.asObject();
    return {
      ...temp,
      value: this.value,
    };
  }

  asPayload(): Object {
    return {
      component: "text",
      body: this.asObject(),
    };
  }
}
