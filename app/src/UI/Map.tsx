import "./Map.css";
import { LatLngExpression } from "leaflet";
import { useSelector } from "react-redux";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import mgmtUnits from "../assets/management_units.json";
import { managementUnitStyle, selectedFeatureStyle } from "./featureStylers";
import { FeatureCollection, Feature } from "geojson";
import {
  MapLibreMap,
  MlImageMarkerLayer,
  MlMarker,
  MlNavigationTools,
  MlWmsLayer,
  useMap,
  MlGeoJsonLayer,
} from "@mapcomponents/react-maplibre";
import maplibregl, { Marker } from "maplibre-gl";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
interface ChangeViewProps {
  center: LatLngExpression;
}

// const mooseIconMale = new Icon({
//   iconUrl: "moose.png",
//   iconSize: [30, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// const ChangeView: React.FC<ChangeViewProps> = ({ center }) => {
//   const map = useMap();
//   map.setView(center, 8);
//   return null;
// };

const getFeatureCentroidFromManagementArea = (regionId: string) => {
  const managementUnits = mgmtUnits as any; // a large object including data about wildlife management regions
  const features = managementUnits.features; // an array with entries for each management region
  const feature = features.find(
    (feature: any) => feature.properties.WILDLIFE_MGMT_UNIT_ID === regionId
  );

  if (feature) {
    const layer = L.geoJSON(feature);
    const bounds = layer.getBounds();
    const center = bounds.getCenter();
    return [center.lat, center.lng];
  }

  return null;
};

// const MapEventHandler: React.FC = () => {
//   const map = useMap();

//   const handleZoomEnd = () => {
//     const zoomLevel = map.getZoom();
//     const tooltips = document.querySelectorAll(".mgmt-unit-label");
//     tooltips.forEach((tooltip) => {
//       if (zoomLevel < 7.5) {
//         (tooltip as HTMLElement).style.visibility = "hidden";
//       } else {
//         (tooltip as HTMLElement).style.visibility = "visible";
//       }
//     });
//   };
//   map.on("zoomend", handleZoomEnd);

//   return null;
// };

export const MapPanel: React.FC = () => {
  const defaultLocation: [number, number] = [-123.912, 55.25];

  // const subRegion = useSelector(
  //   (state: any) => state.MooseSightingsState.subRegion
  // );
  // const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
  //   null
  // );

  // useEffect(() => {
  //   const centroid = getFeatureCentroidFromManagementArea(subRegion);
  //   if (centroid) setMarkerPosition([centroid[0], centroid[1]]);
  // }, [subRegion]);

  // const getFeatureStyle: L.StyleFunction = (feature: any) => {
  //   if (
  //     feature.properties &&
  //     feature.properties.WILDLIFE_MGMT_UNIT_ID === subRegion
  //   ) {
  //     return selectedFeatureStyle;
  //   }
  //   return managementUnitStyle;
  // };

  // const onEachFeature = (feature: Feature, layer: L.Layer) => {
  //   if (feature.properties) {
  //     layer.bindTooltip(feature.properties.WILDLIFE_MGMT_UNIT_ID, {
  //       permanent: true,
  //       direction: "center",
  //       className: `mgmt-unit-label`,
  //     });
  //   }
  // };
  return (
    <div className="MapPanel">
      <MapLibreMap
        mapId="map"
        options={{
          center: defaultLocation,
          zoom: 5,
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
        }}
      />
      <MlNavigationTools
        showCenterLocationButton={false}
        show3DButton={false}
        showFollowGpsButton={false}
      />

      <MlGeoJsonLayer
        type="symbol"
        options={{
          layout: {
            "text-field": [
              "format",
              ["upcase", ["get", "WILDLIFE_MGMT_UNIT_ID"]],
              { "font-scale": 0.9 },
            ],
            // the actual font names that work are here https://github.com/openmaptiles/fonts/blob/gh-pages/fontstacks.json
            "text-font": ["literal", ["Open Sans Bold"]],
          },
          paint: {
            "text-color": "black",
            "text-halo-color": "white",
            "text-halo-width": 5,
            "text-halo-blur": 1,
          },
        }}
        geojson={mgmtUnits}
      />

      <MlGeoJsonLayer
        type="line"
        defaultPaintOverrides={{
          line: {
            "line-color": "#2F9366",
            "line-width": 1,
            "line-opacity": 1,
          },
        }}
        geojson={mgmtUnits}
      />
      {/* <MapContainer
        className="MapContainer"
        center={defaultLocation}
        zoom={5}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={mgmtUnits as FeatureCollection}
          style={getFeatureStyle}
          onEachFeature={onEachFeature}
        />
        {markerPosition && <ChangeView center={markerPosition} />}
        <MapEventHandler />
      </MapContainer>
      <Outlet /> */}
    </div>
  );
};
