import React from 'react';

const Progress = ({ value, max = 100, className }) => {
  const percentage = (value / max) * 100;

  return (
    <div className={`w-full bg-gray-200 rounded ${className}`}>
      <div
        className="bg-blue-500 h-4 rounded"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Progress;
