import { Text } from "../_classes/Text";
import { ComponentParams } from "../_interfaces/componentParams";
import Component from "./Component";
import { ChangeEvent } from "react";
import { SetEditingComponent } from "../_types/SetEditingComponent";

interface Params extends ComponentParams<Text> {
  value: Text;
  setEditingComponent: SetEditingComponent;
}

export const instant = false;

export default function TextComponent({
  value,
  updateComponent,
  removeComponent,
  setEditingComponent,
}: Params) {
  function handleChange(
    event: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
  ) {
    updateComponent((component: Text) => {
      component.setValue(event.currentTarget.value);
    });
  }

  return (
    <Component
      setEditingComponent={setEditingComponent}
      componentData={value}
      updateComponent={updateComponent}
      removeComponent={removeComponent}
    >
      <textarea
        className="w-full h-full resize-none border-none outline-none text-nowrap overflow-hidden"
        style={{
          fontSize: value.getSize(),
          fontFamily: value.getFont(),
        }}
        value={value.getValue()}
        onChange={handleChange}
      />
    </Component>
  );
}
