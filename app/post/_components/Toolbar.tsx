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
    <div className="flex flex-col gap-2">
      <span className="rounded-md flex items-center gap-2">
        <label className="text-neutral-500">Z-Index</label>
        <input
          type="number"
          value={editingComponent ? editingComponent.getZ() : 0}
          onChange={handleChange}
        />
      </span>
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
