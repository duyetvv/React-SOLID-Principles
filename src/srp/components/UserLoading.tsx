import React from "react";

import "../styles/loading.scss";

const Loading: React.FC = () => {
  return (
    <div className="srp">
      <div className="srp__loading">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    </div>
  );
};

export default Loading;
