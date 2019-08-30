import React from 'react';

const DefaultRouteComponent: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <>
      <div>-- {name} --</div>
      {children}
    </>
  );
};

export default DefaultRouteComponent;
