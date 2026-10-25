import { ShapeData } from "../_classes/ShapeData";
import { ShapeType } from "../_enum/ShapeType";
import { ComponentParams } from "../_interfaces/componentParams";
import { SetEditingComponent } from "../_types/SetEditingComponent";
import Component from "./Component";
import Circle from "./shapes/Circle";
import Square from "./shapes/Square";
import Triangle from "./shapes/Triangle";

interface Params extends ComponentParams<ShapeData> {
  value: ShapeData;
  setEditingComponent: SetEditingComponent;
}

export default function ShapeComponent({
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
      <CreateShape value={value} />
    </Component>
  );
}

interface CreateShapeParams {
  value: ShapeData;
}

function CreateShape({ value }: CreateShapeParams) {
  switch (value.getShapeType()) {
    case ShapeType.Square:
      return <Square color={value.getColor()} />;
    case ShapeType.Circle:
      return <Circle color={value.getColor()} />;
    case ShapeType.Triangle:
      return <Triangle color={value.getColor()} />;
    default:
      return <></>;
  }
}
