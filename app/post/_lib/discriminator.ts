import { TextPayload } from "../_interfaces/text";

export function isText(object: any): object is TextPayload {
  return object.component === "text";
}
