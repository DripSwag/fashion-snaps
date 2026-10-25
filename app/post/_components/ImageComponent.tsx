import Image from "next/image";
import { ImageData } from "../_classes/ImageData";
import { ComponentParams } from "../_interfaces/componentParams";
import Component from "./Component";
import { ComponentVariants } from "../_types/ComponentVariants";
import { SetEditingComponent } from "../_types/SetEditingComponent";

interface Params extends ComponentParams<ImageData> {
  value: ImageData;
  setEditingComponent: SetEditingComponent;
}

export const instant = false;

export default function ImageComponent({
  value,
  updateComponent,
  removeComponent,
  setEditingComponent,
}: Params) {
  return (
    <Component
      setEditingComponent={setEditingComponent}
      componentData={value}
      updateComponent={updateComponent}
      removeComponent={removeComponent}
    >
      <img
        onDragStart={(event) => {
          event.preventDefault();
        }}
        className="h-auto w-auto select-none"
        src={value.getImageString()}
        draggable={false}
        alt="Image Component"
        sizes="100vw"
        width={0}
        height={0}
        style={{ width: "100%", height: "100%" }}
      />
    </Component>
  );
}
