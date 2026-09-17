"use client";

import { useState } from "react";
import TextComponent from "./_components/TextComponent";
import { Text } from "./_classes/Text";
import { EditComponent } from "./_types/EditComponent";
import { ComponentVariants } from "./_types/ComponentVariants";
import Sidebar from "./_ui/Sidebar";

export default function Post() {
  const [components, setComponents] = useState<ComponentVariants[]>([]);
  const [pageColor, setPageColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  function updateComponent(
    component: ComponentVariants,
    editComponent: EditComponent,
  ) {
    let newComponents = generateAddedComponent(
      components,
      component,
      editComponent,
    );

    setComponents(newComponents);
  }

  function createComponent(component: Text, index: number) {
    return (
      <TextComponent
        key={index}
        value={component}
        updateComponent={(editComponent: EditComponent) => {
          updateComponent(component, editComponent);
        }}
        removeComponent={() => {
          removeComponent(component);
        }}
      />
    );
  }

  function addComponent(component: ComponentVariants) {
    setComponents([...components, component]);
  }

  function removeComponent(component: ComponentVariants) {
    setComponents(generateRemovedComponent(components, component));
  }

  return (
    <main className="h-screen" style={{ backgroundColor: backgroundColor }}>
      <Sidebar
        addComponent={addComponent}
        components={components}
        setBackgroundColor={setBackgroundColor}
        setPageColor={setPageColor}
      />
      <div
        className="w-[400px] h-[650px] overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl"
        style={{ backgroundColor: pageColor }}
      >
        {components.map((component, index) =>
          createComponent(component, index),
        )}
      </div>
    </main>
  );
}

function generateAddedComponent(
  components: ComponentVariants[],
  component: ComponentVariants,
  editComponent: EditComponent,
) {
  var newComponents = [];
  for (var cur of components) {
    if (cur == component) {
      editComponent(component);
    }
    newComponents.push(cur);
  }

  return newComponents;
}

function generateRemovedComponent(
  components: ComponentVariants[],
  component: ComponentVariants,
) {
  var newComponents = [];
  for (var cur of components) {
    if (cur === component) {
      continue;
    }
    newComponents.push(cur);
  }
  return newComponents;
}
