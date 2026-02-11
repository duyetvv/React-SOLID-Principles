import React from "react";

import "../styles/errors.scss";

const EmptyData: React.FC = () => {
  return (
    <div className="srp">
      <div className="srp__empty">
        <p>No users found</p>
      </div>
    </div>
  );
};

export default EmptyData;
