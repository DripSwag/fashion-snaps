export abstract class ComponentData {
  private width: number;
  private height: number;
  private x: number;
  private y: number;
  private z: number;

  constructor(width: number, height: number, x: number, y: number, z = 0) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  getZ() {
    return this.z;
  }

  setZ(z: number) {
    this.z = z;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  setHeight(height: number) {
    this.height = height;
  }

  setWidth(width: number) {
    this.width = width;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  asObject(): Object {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  }

  abstract asPayload(): Object;
}
