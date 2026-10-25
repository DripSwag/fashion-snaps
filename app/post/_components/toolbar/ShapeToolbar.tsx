import { ChangeEvent } from "react";
import { ShapeData } from "../../_classes/ShapeData";
import { UpdateComponent } from "../../_types/UpdateComponent";

interface Params {
  updateComponent: UpdateComponent<ShapeData>;
  color: string;
}

export default function ShapeToolbar({ color, updateComponent }: Params) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    updateComponent((component) => {
      component.setColor(event.currentTarget.value);
    });
  }

  return (
    <>
      <input type="color" value={color} onChange={handleChange} />
    </>
  );
}
