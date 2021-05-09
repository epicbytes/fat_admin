import React from "react";
import { observer } from "mobx-react";
import { NavigatorBaseField } from "./NavigatorBaseField";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";

const {
  SearchBox
} = require("react-google-maps/lib/components/places/SearchBox");

const MapWithAMarker = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={11}
        defaultCenter={{ lat: 55.7558, lng: 37.6173 }}
      >
        <SearchBox
          ref={props.onSearchBoxMounted}
          bounds={props.bounds}
          //controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={props.onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: "border-box",
              border: "1px solid transparent",
              width: "240px",
              height: "32px",
              marginTop: "27px",
              padding: "0 12px",
              borderRadius: "3px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              fontSize: "14px",
              outline: "none",
              textOverflow: "ellipses"
            }}
          />
        </SearchBox>
        <Marker position={{ lat: 55.7558, lng: 37.6173 }} />
      </GoogleMap>
    );
  })
);

export const MapsInput = observer(({ addonAfter = () => {}, ...props }) => {
  return (
    <NavigatorBaseField
      {...props}
      render={({ field }) => (
        <MapWithAMarker
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6rjfI21PLomOFBJE_pNye8dDQfXuaxCQ&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "500px" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      )}
    />
  );
});
