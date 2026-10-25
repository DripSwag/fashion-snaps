import { ShapeData } from "../_classes/ShapeData";
import { ComponentVariants } from "../_types/ComponentVariants";
import { EditComponent } from "../_types/EditComponent";
import ShapeToolbar from "./toolbar/ShapeToolbar";
import { UpdateComponent } from "../_types/UpdateComponent";
import { Text } from "../_classes/Text";
import TextToolbar from "./toolbar/TextToolbar";
import { ChangeEvent } from "react";

interface Params<T extends ComponentVariants> {
  editingComponent: undefined | T;
  updateComponent: UpdateComponent<T>;
}

export default function Toolbar<T extends ComponentVariants>({
  editingComponent,
  updateComponent,
}: Params<T>) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) {
    updateComponent((component) => {
      component.setZ(parseInt(event.currentTarget.value));
    });
  }

  return (
    <div className="absolute right-0 flex flex-col">
      <input
        type="number"
        value={editingComponent ? editingComponent.getZ() : 0}
        onChange={handleChange}
      />
      <CreateToolbar
        editingComponent={editingComponent}
        updateComponent={updateComponent}
      />
    </div>
  );
}

interface ToolbarParams<T extends ComponentVariants> {
  editingComponent: undefined | T;
  updateComponent: UpdateComponent<T>;
}

function CreateToolbar<T extends ComponentVariants>({
  editingComponent,
  updateComponent,
}: ToolbarParams<T>) {
  if (editingComponent instanceof ShapeData) {
    return (
      <ShapeToolbar
        //@ts-ignore NOTE: T becomes ShapData so function signature matches
        updateComponent={updateComponent}
        color={editingComponent.getColor()}
      />
    );
  } else if (editingComponent instanceof Text) {
    return (
      <TextToolbar
        componentData={editingComponent}
        //@ts-ignore NOTE: T becomes Text so function signature matches
        updateComponent={updateComponent}
      />
    );
  }
  return <></>;
}
