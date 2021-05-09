import React from "react";
import { observer } from "mobx-react";
import { entries } from "mobx";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { useStore } from "stores";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export const Dashboard = observer(() => {
  const position = [55.54184666, 37.721185];
  const { app } = useStore();
  return (
    <Map center={position} zoom={14} style={{ width: "100%", height: 700 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {entries(app.trackers).map(([, tr]) => (
        <Marker
          key={tr.num}
          position={[tr.lon, tr.lat]}
          title="sdfsf"
          alt="sdffdg"
        >
          <Popup>{tr.num}</Popup>
        </Marker>
      ))}
    </Map>
  );
});
