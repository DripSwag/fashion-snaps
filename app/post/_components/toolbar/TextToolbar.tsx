"use client";

import useSWR from "swr";
import { Text } from "../../_classes/Text";
import { UpdateComponent } from "../../_types/UpdateComponent";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { loadFont } from "@/utils/loadFont";
import { simpleFetcher } from "@/utils/fetcher";

interface Params {
  updateComponent: UpdateComponent<Text>;
  componentData: Text;
}

export default function TextToolbar({
  componentData,
  updateComponent,
}: Params) {
  const sizeRef = useRef<HTMLInputElement>(null);

  const { data } = useSWR("/api/fonts", simpleFetcher);

  let fontFaces = createFontFaces(data);

  function handleFontOnChange(
    event: ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) {
    for (let font of fontFaces) {
      if (font.family === event.currentTarget.value) {
        loadFont(font);
        updateComponent((component) => {
          component.setFont(event.currentTarget.value);
        });
      }
    }
  }

  function setSize(size: number) {
    updateComponent((value) => {
      value.setSize(size);
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && sizeRef.current !== null) {
      sizeRef.current.blur();
    }
  }

  return (
    <>
      <span className="flex items-center gap-2">
        <label className="text-neutral-500">Font Size</label>
        <input
          ref={sizeRef}
          defaultValue={componentData.getSize()}
          onKeyDown={handleKeyDown}
          onBlur={(event) => {
            setSize(parseInt(event.currentTarget.value));
          }}
        />
      </span>
      <select onChange={handleFontOnChange} className="hover:cursor-pointer">
        {fontFaces &&
          fontFaces.map((value) => (
            <option value={value.family} key={value.family}>
              {value["family"]}
            </option>
          ))}
      </select>
    </>
  );
}

function createFontFaces(data: any): FontFace[] {
  if (data !== undefined) {
    return data.items.map((font) => {
      return new FontFace(
        font.family,
        `url(${font.files.regular})`,
        font.options,
      );
    });
  }
  return [];
}
