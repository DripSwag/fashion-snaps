import { ComponentData } from "../_classes/ComponentData";
import { UpdateComponent } from "../_types/UpdateComponent";

export interface ComponentParams<T extends ComponentData> {
  updateComponent: UpdateComponent<T>;
  removeComponent: () => void;
}
