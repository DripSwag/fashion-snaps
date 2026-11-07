import { ComponentVariants } from "../_types/ComponentVariants";
import { Text } from "../_classes/Text";
import { submit } from "../actions";
import { ChangeEvent, Dispatch, SetStateAction, useRef } from "react";
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
  EditingComponent: React.ReactNode | undefined;
}

export default function Sidebar({
  addComponent,
  components,
  setPageColor,
  setBackgroundColor,
  backgroundColor,
  pageColor,
  EditingComponent,
}: Params) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function addImage(
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ): void {
    let files = event.target.files;
    if (files !== null) {
      let image = files.item(0);
      if (image !== null) {
        addComponent(new ImageData(image));
      }
    }
  }

  return (
    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col gap-2 justify-center p-8 h-full bg-white backdrop-blur-md border-r border-black/10">
      <span className="flex gap-2 items-center">
        <input
          type="color"
          autoComplete="off"
          value={pageColor}
          onChange={(event) => {
            setPageColor(event.currentTarget.value);
          }}
          className="hover:cursor-pointer"
        />
        <label>Page Color</label>
      </span>
      <span className="flex gap-2 items-center">
        <input
          type="color"
          autoComplete="off"
          value={backgroundColor}
          onChange={(event) => {
            setBackgroundColor(event.currentTarget.value);
          }}
          className="hover:cursor-pointer"
        />
        <label>Background Color</label>
      </span>
      <Divider />
      <input
        type="file"
        onChange={addImage}
        className="hover:cursor-pointer file:overflow-hidden"
        hidden
        ref={inputRef}
        accept="image/*"
      />
      <button
        className="border-2 border-blue-300 rounded-full hover:cursor-pointer"
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Add Image
      </button>
      <button
        className="border-2 border-blue-300 rounded-full hover:cursor-pointer"
        onClick={() => {
          addComponent(new Text());
        }}
      >
        Add Text
      </button>
      <button
        className="border-2 border-blue-300 rounded-full hover:cursor-pointer"
        onClick={() => {
          addComponent(new ShapeData());
        }}
      >
        Add Square
      </button>
      <button
        className="border-2 border-blue-300 rounded-full hover:cursor-pointer"
        onClick={() => {
          addComponent(new ShapeData(ShapeType.Circle));
        }}
      >
        Add Circle
      </button>
      <button
        className="border-2 border-blue-300 rounded-full hover:cursor-pointer"
        onClick={() => {
          addComponent(new ShapeData(ShapeType.Triangle));
        }}
      >
        Add Triangle
      </button>
      <Divider />
      {EditingComponent ? (
        <>
          {EditingComponent}
          <Divider />
        </>
      ) : (
        <></>
      )}
      <button
        onClick={async () => {
          await handlePost(components, backgroundColor, pageColor);
        }}
        className="bg-blue-300 p-2 rounded-full hover:cursor-pointer"
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

function Divider() {
  return <div className="w-full h-0.5 bg-neutral-100 rounded-full my-4"></div>;
}
