import Draggable, { DraggableData } from "react-draggable";
import ResizeBox from "./ResizeBox";
import {
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { ComponentData } from "../_classes/ComponentData";
import { ComponentParams } from "../_interfaces/componentParams";
import { ComponentVariants } from "../_types/ComponentVariants";
import {
  Resizable,
  ResizeCallbackData,
  ResizeHandleAxis,
} from "react-resizable";
import { Dimension } from "../_interfaces/dimension";
import { Position } from "../_interfaces/position";
import { SetEditingComponent } from "../_types/SetEditingComponent";

interface Params extends ComponentParams<ComponentVariants> {
  componentData: ComponentVariants;
  children: ReactNode;
  setEditingComponent: SetEditingComponent;
}

export const instant = false;

export default function Component({
  children,
  componentData,
  updateComponent,
  removeComponent,
  setEditingComponent,
}: Params) {
  const nodeRef = useRef<HTMLDivElement>(null);

  const [focused, setFocused] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 200, height: 200 });

  function handleOnStop(_: Event, data: DraggableData) {
    if (
      data.x + componentData.getWidth() < 0 ||
      data.y + componentData.getHeight() < 0 ||
      data.x > 400 ||
      data.y > 650
    ) {
      removeComponent();
    }
  }

  function handleStart() {
    setFocused(true);
    setEditingComponent(componentData);
  }

  function handleDrag(_: Event, data: DraggableData): void {
    setEditingComponent(componentData);
    updateComponent((component) => {
      component.setX(data.x);
      component.setY(data.y);
    });
  }

  function handleClickOutside(event: MouseEvent) {
    if (nodeRef.current && !nodeRef.current.contains(event.target as Node)) {
      setFocused(false);
    }
  }

  function handleResize(_: SyntheticEvent, data: ResizeCallbackData) {
    const newPosition = calculateNewPosition(
      data.size,
      dimensions,
      { x: componentData.getX(), y: componentData.getY() },
      data.handle,
    );

    componentData.setX(newPosition.x);
    componentData.setY(newPosition.y);

    setDimensions(data.size);
    componentData.setHeight(data.size.height);
    componentData.setWidth(data.size.width);
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  return (
    <Draggable
      onStart={handleStart}
      onStop={handleOnStop}
      nodeRef={nodeRef}
      cancel=".handle, .no-drag *"
      position={{ x: componentData.getX(), y: componentData.getY() }}
      onDrag={handleDrag}
    >
      <Resizable
        width={dimensions.width}
        height={dimensions.height}
        onResize={handleResize}
        handle={(handle, ref) => (
          <span
            className={`handle-${handle} handle cursor-pointer`}
            ref={ref}
          />
        )}
        resizeHandles={
          focused ? ["w", "n", "e", "s", "ne", "se", "sw", "nw"] : []
        }
      >
        <div
          ref={nodeRef}
          className="ontop"
          style={{
            width: componentData.getWidth() + "px",
            height: componentData.getHeight() + "px",
            position: "absolute",
            zIndex: componentData.getZ(),
          }}
        >
          <span
            className="ontop"
            style={{
              zIndex: componentData.getZ(),
            }}
          >
            {children}
          </span>
          {focused && <ResizeBox />}
        </div>
      </Resizable>
    </Draggable>
  );
}

function calculateNewPosition(
  newDimension: Dimension,
  oldDimension: Dimension,
  position: Position,
  handle: ResizeHandleAxis,
) {
  const deltaHeight = newDimension.height - oldDimension.height;
  const deltaWidth = newDimension.width - oldDimension.width;

  if (handle[0] === "n") {
    position.y -= deltaHeight;
  }

  if (handle[handle.length - 1] === "w") {
    position.x -= deltaWidth;
  }

  return position;
}
