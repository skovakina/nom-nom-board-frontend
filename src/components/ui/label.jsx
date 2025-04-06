import React from 'react';

const Label = ({ children, htmlFor, ...props }) => {
  return <label htmlFor={htmlFor} {...props}>{children}</label>;
};

export { Label };