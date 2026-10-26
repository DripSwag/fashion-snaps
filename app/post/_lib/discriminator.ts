import { ImagePayload } from "../_interfaces/payloads";

export function isImage(object: any): object is ImagePayload {
  return object.component === "image";
}
