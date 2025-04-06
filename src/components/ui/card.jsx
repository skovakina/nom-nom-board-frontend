import React from 'react';

const Card = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const CardHeader = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

const CardTitle = ({ children, ...props }) => {
  return <h3 {...props}>{children}</h3>;
};

const CardContent = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export { Card, CardHeader, CardTitle, CardContent };