import React from 'react';

const DefaultRouteComponent: React.FC<{ name: string }> = ({ name }) => {
  return <div>-- {name} --</div>;
};

export default DefaultRouteComponent;
