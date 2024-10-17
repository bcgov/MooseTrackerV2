import "./Map.css";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import mgmtUnits from "../assets/management_units.json";
import {
  MapLibreMap,
  MlNavigationTools,
  useMap,
  MlGeoJsonLayer,
  MlWmsLayer,
} from "@mapcomponents/react-maplibre";
import maplibregl from "maplibre-gl";
import { SET_SELECTED_MAP_LAYER } from "../state/actions";
import { ClosedLayerIcon, ClosedLayerToggle } from "./LayerControl";

export const MapPanel = () => {
  const defaultLocation: [number, number] = [-123.912, 55.25];
  const selectedMapLayer = useSelector(
    (state) => state.Configuration.selectedMapLayer
  );
  const dispatch = useDispatch();

  const [addedAttribution, setAddedAttribution] = useState(false);

  const handleLayerChange = (event: any) => {
    dispatch({
      type: SET_SELECTED_MAP_LAYER,
      payload: { selectedMapLayer: !selectedMapLayer },
    });
  };

  const mapInstance = useMap({
    mapId: "map",
  });

  useEffect(() => {
    if (!addedAttribution && mapInstance?.mapIsReady) {
      mapInstance?.map?.addControl(
        new maplibregl.AttributionControl(),
        "top-left"
      );
      setAddedAttribution(true);
    }
  }, [mapInstance]);

  const subRegion = useSelector(
    (state: any) => state.MooseSightingsState.subRegion || ""
  );

  const getLineColor = () => {
    if (!selectedMapLayer) {
      return "#013366";
    } else {
      return "#f27e18";
    }
  };

  return (
    <div className="MapPanel">
      <MapLibreMap
        mapId="map"
        options={{
          center: defaultLocation,
          zoom: 6,
          style: "https://wms.wheregroup.com/tileserver/style/osm-bright.json",
          attributionControl: false,
          minZoom: 6,
        }}
      />
      <MlNavigationTools
        showCenterLocationButton={false}
        show3DButton={false}
        showFollowGpsButton={true}
      >
        <ClosedLayerToggle onClick={handleLayerChange}>
          <ClosedLayerIcon src={"/stack.svg"} />
        </ClosedLayerToggle>
      </MlNavigationTools>

      {mapInstance.mapIsReady && mgmtUnits?.features?.length > 0 && (
        <>
          <MlWmsLayer
            mapId="map"
            url="https://openmaps.gov.bc.ca/geo/ows?format=image/png&service=WMS&version=1.3.0&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&raster-opacity=0&layers=WHSE_WILDLIFE_MANAGEMENT.WAA_WILDLIFE_MGMT_UNITS_SVW"
            attribution="BC"
          />
          <MlWmsLayer
            mapId="map"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            visible={selectedMapLayer}
            attribution="Powered by Esri"
          />
          {/* <MlGeoJsonLayer
            layerId="polygons"
            type="line"
            defaultPaintOverrides={{
              line: {
                "line-color": getLineColor(),
                "line-width": 1,
                "line-opacity": 1,
              },
            }}
            geojson={mgmtUnits}
          /> */}
          {/* 
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
          /> */}
          <MlGeoJsonLayer
            layerId="labels"
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
        </>
      )}
    </div>
  );
};
