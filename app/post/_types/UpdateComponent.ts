import { ComponentData } from "../_classes/ComponentData";
import { EditComponent } from "./EditComponent";

export type UpdateComponent<T extends ComponentData> = (
  editComponent: EditComponent<T>,
) => void;

export type UpdateComponentMinimal<T extends ComponentData> = (
  editComponent: EditComponent<T>,
  component: T,
) => void;
