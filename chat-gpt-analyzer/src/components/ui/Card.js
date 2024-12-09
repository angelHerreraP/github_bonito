import React from 'react';

// Componente Card
const Card = ({ children, className }) => {
  return (
    <div className={`shadow-md p-4 bg-white rounded ${className}`}>
      {children}
    </div>
  );
};

// Componente CardHeader
const CardHeader = ({ children, className }) => {
  return (
    <div className={`text-xl font-semibold ${className}`}>
      {children}
    </div>
  );
};

// Componente CardTitle
const CardTitle = ({ children, className }) => {
  return (
    <div className={`text-lg font-medium ${className}`}>
      {children}
    </div>
  );
};

// Componente CardContent
const CardContent = ({ children, className }) => {
  return (
    <div className={`text-base ${className}`}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardContent };
