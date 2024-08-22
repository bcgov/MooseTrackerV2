import "./Map.css"
import { MapContainer, Marker, TileLayer, useMap, Popup, GeoJSON} from 'react-leaflet'
import { LatLngExpression, Icon } from 'leaflet'
import { useSelector } from "react-redux";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import mgmtUnits from '../assets/management_units.json'
import { managementUnitStyle } from "./featureStylers";
import { FeatureCollection, Feature } from "geojson";

interface ChangeViewProps {
  center: LatLngExpression;
}

const mooseIconMale = new Icon({
  iconUrl: "moose.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const mooseIconFemale = new Icon({
  iconUrl: "fmoose.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const mooseIconCalf = new Icon({
  iconUrl: "calf.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const mooseNotSyncIconMale = new Icon({
  iconUrl: "moosered.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const mooseNotSyncIconFemale = new Icon({
  iconUrl: "fmoosered.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const mooseNotSyncIconCalf = new Icon({
  iconUrl: "calfred.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const mooseSyncedIconMale = new Icon({
  iconUrl: "moosegreen.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const mooseSyncedIconFemale = new Icon({
  iconUrl: "fmoosegreen.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const mooseSyncedIconCalf = new Icon({
  iconUrl: "calfgreen.png",
  iconSize: [30, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ChangeView: React.FC<ChangeViewProps> = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

const getFeatureCentroidFromManagementArea = (regionId: string) => {
  const managementUnits = mgmtUnits as any; // a large object including data about wildlife management regions
  const features = managementUnits.features; // an array with entries for each management region
  const feature = features.find(
    (feature: any) => feature.properties.WILDLIFE_MGMT_UNIT_ID === regionId
  );
  if(feature){
  console.log("regionId: ", regionId);
  console.log("feature: ", feature);
  //console.log("centroid: ", calculateCentroid(feature.geometry.coordinates));
  }
  // let centroid : LocationState = {latitude: 0, longitude: 0};
  // const result = feature ? calculateCentroid(feature.geometry.coordinates[0]) : null;
  // centroid.latitude = result ? result[1] : centroid.latitude;
  // centroid.longitude = result ? result[0] : centroid.longitude;
  // return centroid;
  return feature ? calculateCentroid(feature.geometry.coordinates[0]) : null;
};

const calculateCentroid = (coordinates: any) => {
  let xSum = 0;
  let ySum = 0;
  let area = 0;

  for (let i = 0; i < coordinates.length - 1; i++) {
    const [x1, y1] = coordinates[i];
    const [x2, y2] = coordinates[i + 1];

    const crossProduct = x1 * y2 - x2 * y1;
    xSum += (x1 + x2) * crossProduct;
    ySum += (y1 + y2) * crossProduct;
    area += crossProduct;
  }

  area *= 0.5;
  const centroidX = xSum / (6 * area);
  const centroidY = ySum / (6 * area);
  return [centroidY, centroidX];
};

const MapMarkers = (props: any) => {
  const mapState = useMap();
  const [zoomed, setZoomed] = React.useState(0);

  mapState.on("zoomend", () => {
    setZoomed(zoomed + 1);
  });


  // const mooseArray = useSelector(
  //   (state: any) => state.MooseSightingsState.mooseArray
  // ).slice(0, 5);

  const allSightings = useSelector(
    (state: any) => state.MooseSightingsState.allSightings
  );

  // const mooseIcon = new Icon({
  //   iconUrl: 'moose.png',
  //   iconSize: [30, 41],
  //   iconAnchor: [12, 41],
  //   popupAnchor: [1, -34],
  //   shadowSize: [41, 41]
  // })

  const subRegion = useSelector((state: any) => getFeatureCentroidFromManagementArea( state.MooseSightingsState.subRegion));
  const defaultLocation: [number, number] = [48.4284, -123.3656];

  const markerPosition: [number, number] = [
    subRegion ? subRegion[0] : defaultLocation[0],
    subRegion ? subRegion[1] : defaultLocation[1],
  ];


  const getOffsetLocation = (
    index: number,
    baseLocation: [number, number]
  ): [number, number] => {
    const ogLatLng = new L.LatLng(baseLocation[0], baseLocation[1]);
    const ogXY = mapState.latLngToContainerPoint(ogLatLng);
    const offsetDistance = 10;
    const newXY = ogXY.add([offsetDistance * index, 0]);
    const offsetPoint = mapState.containerPointToLatLng(newXY);

    return [offsetPoint.lat, offsetPoint.lng];
  };

  const getMooseIcon = (moose: any, status: any) => {
    if (status && status === "Current") {
      if (moose.age === "Calf" && moose.age !== null) {
        return mooseIconCalf;
      }
      if (moose.gender === "female") {
        return mooseIconFemale;
      } else {
        return mooseIconMale;
      }
    } else if (status && status === "Synced") {
      if (moose.age === "Calf" && moose.age !== null) {
        return mooseSyncedIconCalf;
      }
      if (moose.gender === "male") {
        return mooseSyncedIconMale;
      }
      if (moose.gender === "female") {
        return mooseSyncedIconFemale;
      } else {
        return mooseSyncedIconMale;
      }
    } else {
      if (moose.age === "Calf" && moose.age !== null) {
        return mooseNotSyncIconCalf;
      }
      if (moose.gender === "male") {
        return mooseNotSyncIconMale;
      }
      if (moose.gender === "female") {
        return mooseNotSyncIconFemale;
      } else {
        return mooseNotSyncIconMale;
      }
    }
  };

  // const Meese = (props: any) => (
  //   <>
  //     {mooseArray.map((moose: any, index: number) => {
  //       const position = getOffsetLocation(index, markerPosition);
  //       const mooseIcon = getMooseIcon(moose, "Current");
  //       return (
  //         <Marker key={'meeseMarker' + index} position={position} icon={mooseIcon} />
  //       );
  //     })}
  //   </>
  // );

  // const synchedMeese = (props: any) => (
  //   <>
  //     {allSightings.map((moose: any, index: number) => {
  //       const position = getOffsetLocation(index, markerPosition);
  //       const mooseIcon = getMooseIcon(moose);
  //       return <Marker key={index} position={position} icon={mooseIcon} />;
  //     })}
  //   </>
  // );

  // const NotSynchedMeese = (props: any) => {
    
  //     return(
  //   <>
  //     {allSightings?.map((sighting: any, index: number) => {
  //       return sighting.mooseArray.map((moose: any, mooseIndex: number) => {
  //         const offLoc: [number, number] = sighting?.location?.latitude ? [sighting.location.latitude, sighting.location.longitude] : markerPosition;
  //         const position = getOffsetLocation(index, offLoc);
  //         const mooseIcon = getMooseIcon(moose, sighting?.status);
  //         const mooseDate = new Date(sighting.dateOfSighting).toLocaleDateString();
  //         return (
  //           <Marker key={index.toString() + mooseIndex.toString()} position={position} icon={mooseIcon} >
  //             <Popup>
  //               <div>Date of Sighting: {mooseDate}</div>
  //             </Popup>
  //           </Marker>
  //         )
  //       })
  //     })}
  //   </>
  // )};

  return (
    <>
      {/* <Meese key={zoomed} /> */}
      {/* <synchedMeese key={}/> */}
      {/*<NotSynchedMeese key={zoomed}/>*/}
    </>
  )
};


export const MapPanel: React.FC = () => {

  const defaultLocation: [number, number] = [53.932, -123.912];
  // const [selectedFeature, setSelectedFeature] = useState(null);


  // const mapLocation = useSelector(
  //   (state: any) => state.MooseSightingsState.subRegion
  // );
  const subRegion = useSelector(
    (state: any) => state.MooseSightingsState.subRegion
  );
  const [markerPosition, setMarkerPosition] = useState(defaultLocation);
  // let markerPosition: [number, number] = [defaultLocation[0], defaultLocation[1]];

  useEffect(() => {
    const centroid = getFeatureCentroidFromManagementArea(subRegion);
    setMarkerPosition([
      centroid ? centroid[0] : defaultLocation[0],
      centroid ? centroid[1] : defaultLocation[1],
    ]);
  }, [subRegion]);

  const onEachFeature = (feature: Feature, layer: L.Layer) => {
    if (feature.properties) {
      layer.bindTooltip(feature.properties.WILDLIFE_MGMT_UNIT_ID, {
        permanent: true,
        direction: "center",
        className: `mgmtUnitLabel-${feature.properties.WILDLIFE_MGMT_UNIT_ID}`,
      });
    }
  }

  return (
    <div className="MapPanel">
      <MapContainer
        className="MapContainer"
        center={defaultLocation}
        zoom={5}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={mgmtUnits as FeatureCollection} style={managementUnitStyle} onEachFeature={onEachFeature}/>
        <MapMarkers />
        <ChangeView center={markerPosition} />
      </MapContainer>
      <Outlet />
    </div>
  );
};
