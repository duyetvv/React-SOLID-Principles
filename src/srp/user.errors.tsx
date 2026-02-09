import React from 'react';

import './styles/errors.scss';

interface ErrorsProps {
  errors: string[];
}

const UserErrors: React.FC<ErrorsProps> = ({ errors }) => {
  return (
    <div className="srp">
      <div className="srp__error">
        <h3>Error Loading Users</h3>
        <ul className="srp__error-list">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserErrors;
