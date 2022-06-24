import React from "react";
import { MapPart } from "./MapPart";
import MapData from "../map.json";

interface IIndexable {
  [pokrajina: string]: string
}

export const Map = ((props: { data: { [pokrajina: string]: { Date: string, Status: number }} }) => {
  const mapData: IIndexable = MapData;
  return (
    <svg viewBox="0 0 201.64064 132.83197">
      <g style={{display: "inline"}} transform="translate(-9.3549998,-78.660421)">
        <path
          className="stroke-map-border"
          style={{opacity:"1", fill: "none", strokeWidth: "1.5", strokeOpacity: "1", strokeLinejoin: "round"}}
          d={mapData.SLOVENIJA}
        />
        {
          Object.entries(mapData).map(([pokrajina, obris]) => {
              return <MapPart path={obris} status={props.data[pokrajina]?.Status || 0} />
          })
        }
      </g>
    </svg>
  );
});