import React from 'react';

const AnotherRouteComponent: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <>
      <div>-- {name} --</div>
      {children}
    </>
  );
};

export default AnotherRouteComponent;
