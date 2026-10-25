import {
  ImagePayload,
  TextPayload,
  ShapePayload,
} from "../_interfaces/payloads";

export function isText(object: any): object is TextPayload {
  return object.component === "text";
}

export function isImage(object: any): object is ImagePayload {
  return object.component === "image";
}

export function isShape(object: any): object is ShapePayload {
  return object.component === "shape";
}
