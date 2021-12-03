import "regenerator-runtime/runtime.js";
import React, { useState, useEffect, useRef } from "react";
import { NodeEditor, Engine } from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";

import BooleanComponent from "./components/Boolean";
import NumComponent from "./components/Number";
import AddComponent from "./components/Add";

import ContextMenuPlugin, { ReactMenu } from "rete-context-menu-plugin-react";

export async function createEditor(container) {
  var components = [
    new NumComponent(),
    new AddComponent(),
    new BooleanComponent(),
  ];

  var editor = new NodeEditor("demo@0.1.0", container);
  editor.use(ConnectionPlugin);
  editor.use(ReactRenderPlugin);
  editor.use(ContextMenuPlugin, {
    Menu: ReactMenu,
  });

  var engine = new Engine("demo@0.1.0");

  components.map((c) => {
    editor.register(c);
    engine.register(c);
  });

  var n1 = await components[0].createNode({ num: 2 });
  var n2 = await components[0].createNode({ num: 3 });
  var n3 = await components[2].createNode({ bool: false });
  var add = await components[1].createNode();

  n1.position = [80, 200];
  n2.position = [80, 400];
  add.position = [500, 240];

  editor.addNode(n1);
  editor.addNode(n2);
  editor.addNode(n3);
  editor.addNode(add);

  editor.connect(n1.outputs.get("num"), add.inputs.get("num1"));
  editor.connect(n2.outputs.get("num"), add.inputs.get("num2"));

  editor.on(
    "process nodecreated noderemoved connectioncreated connectionremoved",
    async () => {
      console.log("process");
      await engine.abort();
      await engine.process(editor.toJSON());
    }
  );

  editor.view.resize();
  editor.trigger("process");
  AreaPlugin.zoomAt(editor, editor.nodes);

  return editor;
}

export function useRete() {
  const [container, setContainer] = useState(null);
  const editorRef = useRef();

  useEffect(() => {
    if (container) {
      createEditor(container).then((value) => {
        console.log("created");
        editorRef.current = value;
      });
    }
  }, [container]);

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        console.log("destroy");
        editorRef.current.destroy();
      }
    };
  }, []);

  return [setContainer];
}
