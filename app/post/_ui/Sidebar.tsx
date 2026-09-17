import { ComponentVariants } from "../_types/ComponentVariants";
import { Text } from "../_classes/Text";
import { submit } from "../actions";
import { Dispatch, SetStateAction } from "react";

interface Params {
  addComponent: (component: ComponentVariants) => void;
  components: ComponentVariants[];
  setPageColor: Dispatch<SetStateAction<string>>;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
}

export default function Sidebar({
  addComponent,
  components,
  setPageColor,
  setBackgroundColor,
}: Params) {
  return (
    <div className="absolute top-1/2 -translate-y-1/2">
      <button
        onClick={() => {
          addComponent(new Text());
        }}
      >
        Create Text
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
          await handlePost(components);
        }}
      >
        Post
      </button>
    </div>
  );
}

async function handlePost(components: ComponentVariants[]) {
  var temp = components.map((cur) => cur.asPayload());
  await submit(temp);
}
