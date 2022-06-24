import React from 'react';

export const MapPart = ((props: { path: string, status: number }) => {
  const getColor = (status: number) => {
    switch (status) {
      case 0:
        return "fill-map stroke-map";
      case 1:
        return "fill-low stroke-low";
      case 2:
        return "fill-medium stroke-medium";
      case 3:
        return "fill-high stroke-high";
    }
  }

  return (
    <path
      onClick={() => {}}
      className={'hover:brightness-90 ' + getColor(props.status)}
      style={{
        fillOpacity: "1",
        strokeWidth: "0.2",
        strokeLinejoin: "round"
      }}
      d={props.path}
    />
  );
});