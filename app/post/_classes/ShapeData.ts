import { ShapeType } from "../_enum/ShapeType";
import { ComponentData } from "./ComponentData";

export class ShapeData extends ComponentData {
  private shapeType: ShapeType;
  private color: string;

  constructor(
    shapeType = ShapeType.Square,
    color = "#000000",
    width = 200,
    height = 200,
    x = 0,
    y = 0,
  ) {
    super(width, height, x, y);
    this.shapeType = shapeType;
    this.color = color;
  }

  getShapeType() {
    return this.shapeType;
  }

  setShapeType(shapeType: ShapeType) {
    this.shapeType = shapeType;
  }

  setColor(color: string) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  override asObject(): Object {
    return {
      ...super.asObject(),
      type: this.shapeType,
      color: this.color,
    };
  }

  asPayload(): Object {
    return {
      component: "shape",
      body: this.asObject(),
    };
  }
}
