import "./Map.css";
import { useSelector } from "react-redux";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import mgmtUnits from "../assets/management_units.json";
import { managementUnitStyle, selectedFeatureStyle } from "./featureStylers";
import { FeatureCollection, Feature } from "geojson";
import {
  MapLibreMap,
  MlNavigationTools,
  useMap,
  MlGeoJsonLayer,
  useSource,
  MlWmsLayer,
} from "@mapcomponents/react-maplibre";
import maplibregl, { Marker } from "maplibre-gl";

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

export const MapPanel = () => {
  const defaultLocation: [number, number] = [-123.912, 55.25];

  const mapInstance = useMap({
    mapId: "map",
  });

  const subRegion = useSelector(
    (state: any) => state.MooseSightingsState.subRegion
  );
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
        showFollowGpsButton={true}
      />

      {mapInstance.mapIsReady && (
        <>
          <MlWmsLayer
            mapId="map"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
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
                "line-color": "#013366",
                "line-width": 1,
                "line-opacity": 1,
              },
            }}
            geojson={mgmtUnits}
          />

          <MlGeoJsonLayer
            type="fill"
            defaultPaintOverrides={{
              fill: {
                "fill-color": [
                  "case",
                  ["==", ["get", "WILDLIFE_MGMT_UNIT_ID"], subRegion],
                  "#f28f3b", // Selected subRegion color
                  "rgba(0,0,0,0)", // Default color for unselected
                ],
                "fill-opacity": 0.5,
              },
            }}
            geojson={mgmtUnits}
          />
        </>
      )}
    </div>
  );
};
