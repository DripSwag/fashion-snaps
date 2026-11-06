"use client";

import { useState } from "react";
import TextComponent from "./_components/TextComponent";
import { Text } from "./_classes/Text";
import { EditComponent } from "./_types/EditComponent";
import { ComponentVariants } from "./_types/ComponentVariants";
import Sidebar from "./_ui/Sidebar";
import { ImageData } from "./_classes/ImageData";
import ImageComponent from "./_components/ImageComponent";
import { ShapeData } from "./_classes/ShapeData";
import ShapeComponent from "./_components/ShapeComponent";
import Toolbar from "./_components/Toolbar";

export default function Post() {
  const [components, setComponents] = useState<ComponentVariants[]>([]);
  const [pageColor, setPageColor] = useState("#ffffff");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [editingComponent, setEditingComponent] = useState<
    undefined | ComponentVariants
  >(undefined);

  function updateComponent<T extends ComponentVariants>(
    component: T,
    editComponent: EditComponent<T>,
  ) {
    let newComponents = generateAddedComponent(
      components,
      component,
      editComponent,
    );

    setComponents(newComponents);
  }

  function setEditingComponentWrapper(component: ComponentVariants) {
    setEditingComponent(component);
  }

  function createComponent(component: ComponentVariants, index: number) {
    if (component instanceof Text) {
      return (
        <TextComponent
          key={index}
          setEditingComponent={setEditingComponentWrapper}
          value={component}
          updateComponent={(editComponent: EditComponent<Text>) => {
            updateComponent(component, editComponent);
          }}
          removeComponent={() => {
            removeComponent(component);
          }}
        />
      );
    } else if (component instanceof ImageData) {
      return (
        <ImageComponent
          key={index}
          setEditingComponent={setEditingComponentWrapper}
          value={component}
          updateComponent={(editComponent: EditComponent<ImageData>) => {
            updateComponent(component, editComponent);
          }}
          removeComponent={() => {
            removeComponent(component);
          }}
        />
      );
    } else if (component instanceof ShapeData) {
      return (
        <ShapeComponent
          key={index}
          setEditingComponent={setEditingComponentWrapper}
          value={component}
          updateComponent={(editComponent: EditComponent<ShapeData>) => {
            updateComponent(component, editComponent);
          }}
          removeComponent={() => {
            removeComponent(component);
          }}
        />
      );
    }
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
        pageColor={pageColor}
        backgroundColor={backgroundColor}
        EditingComponent={generateEditingComponent(
          editingComponent,
          updateComponent,
        )}
      />
      <div className="page" style={{ backgroundColor: pageColor }}>
        {components.map((component, index) =>
          createComponent(component, index),
        )}
      </div>
    </main>
  );
}

type UpdateComponent = <T extends ComponentVariants>(
  component: T,
  editComponent: EditComponent<T>,
) => void;

function generateEditingComponent(
  editingComponent: undefined | ComponentVariants,
  updateComponent: UpdateComponent,
) {
  if (editingComponent) {
    return (
      <Toolbar
        editingComponent={editingComponent}
        updateComponent={(editComponent: EditComponent<ComponentVariants>) => {
          updateComponent(editingComponent, editComponent);
        }}
      />
    );
  }
  return undefined;
}

function generateAddedComponent<T extends ComponentVariants>(
  components: ComponentVariants[],
  component: T,
  editComponent: EditComponent<T>,
) {
  var newComponents = [];
  for (var cur of components) {
    if (cur === component) {
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
