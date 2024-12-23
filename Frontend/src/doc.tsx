import React from "react";

const DocIframe = ({ source } : { source: string }) => {
  if (!source) {
    return <div>Loading...</div>;
  }

  const src = source;
  return (
    <div>
      <iframe loading="lazy" style={{ width: "100vw", height: "100vh" }}
      src="https://www.canva.com/design/DAGaCKdmoe0/I0udAk8YnIXOz6fIHFTNrg/view?embed" allow="fullscreen">
    </iframe>
    <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGaCKdmoe0&#x2F;I0udAk8YnIXOz6fIHFTNrg&#x2F;view?utm_content=DAGaCKdmoe0&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Design</a> by Ajinkya Singh
    </div>
  );
};

export default DocIframe;
