import React from 'react';
import { useRete } from "./rete";

/* import "./styles.css"; */

function Editor() {
    const [setContainer] = useRete();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh"
      }}
      ref={(ref: any) => ref && setContainer(ref)}
    />
  );
}

export default function App() {
  return (
    <div className="App">
        <Editor />
      </div>
  );
}
