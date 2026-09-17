import Draggable, { DraggableData } from "react-draggable";
import { useRef } from "react";
import { Text } from "../_classes/Text";
import { EditComponent } from "../_types/EditComponent";

interface Params {
  value: Text;
  updateComponent: (editComponent: EditComponent) => void;
  removeComponent: () => void;
}

export const instant = false;

export default function TextComponent({
  value,
  updateComponent,
  removeComponent,
}: Params) {
  const nodeRef = useRef(null);

  function handleOnStop(_: Event, data: DraggableData) {
    if (data.x < 0 || data.y < 0 || data.x > 400 || data.y > 650) {
      removeComponent();
    }
  }

  function handleDrag(_: Event, data: DraggableData): void {
    updateComponent((component) => {
      component.setX(data.x);
      component.setY(data.y);
    });
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      onDrag={handleDrag}
      onStop={handleOnStop}
      defaultPosition={{ x: 0, y: 0 }}
    >
      <input
        ref={nodeRef}
        value={value.getValue()}
        onChange={(event) => {
          updateComponent((component: Text) => {
            component.setValue(event.currentTarget.value);
          });
        }}
      />
    </Draggable>
  );
}
