import React from "react";
import DocIframe from "./doc.js";

export default function App() {
  return (
    <div className="App">
      <h1>Sample Doc file:</h1>
      <DocIframe source="https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.doc" />
    </div>
  );
}