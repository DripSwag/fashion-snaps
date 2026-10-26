import { ComponentVariants } from "../_types/ComponentVariants";
import { Text } from "../_classes/Text";
import { submit } from "../actions";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ImageData } from "../_classes/ImageData";
import { ShapeData } from "../_classes/ShapeData";
import { ShapeType } from "../_enum/ShapeType";

interface Params {
  addComponent: (component: ComponentVariants) => void;
  components: ComponentVariants[];
  setPageColor: Dispatch<SetStateAction<string>>;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
  backgroundColor: string;
  pageColor: string;
}

export default function Sidebar({
  addComponent,
  components,
  setPageColor,
  setBackgroundColor,
  backgroundColor,
  pageColor,
}: Params) {
  function addImage(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ): void {
    if (event.target.files !== null && event.target.files.item(0) !== null) {
      addComponent(new ImageData(event.target.files.item(0)));
    }
  }

  return (
    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col">
      <input type="file" onChange={addImage} />
      <button
        onClick={() => {
          addComponent(new Text());
        }}
      >
        Create Text
      </button>
      <button
        onClick={() => {
          addComponent(new ShapeData());
        }}
      >
        Create Square
      </button>
      <button
        onClick={() => {
          addComponent(new ShapeData(ShapeType.Circle));
        }}
      >
        Create Circle
      </button>
      <button
        onClick={() => {
          addComponent(new ShapeData(ShapeType.Triangle));
        }}
      >
        Create Triangle
      </button>
      <input
        type="color"
        onChange={(event) => {
          setPageColor(event.currentTarget.value);
        }}
      />
      <input
        type="color"
        onChange={(event) => {
          setBackgroundColor(event.currentTarget.value);
        }}
      />
      <button
        onClick={async () => {
          await handlePost(components, backgroundColor, pageColor);
        }}
      >
        Post
      </button>
    </div>
  );
}

async function handlePost(
  components: ComponentVariants[],
  backgroundColor: string,
  pageColor: string,
) {
  var temp = components.map((cur) => cur.asPayload());
  await submit(temp, backgroundColor, pageColor);
}
