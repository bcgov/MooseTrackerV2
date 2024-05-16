import "./Map.css"
import { MapContainer, Marker, TileLayer, useMap, Popup, WMSTileLayer, LayersControl, LayerGroup} from 'react-leaflet'
import { LatLngExpression, Icon } from 'leaflet'
import { useSelector } from "react-redux";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

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

const MapMarkers = (props: any) => {
  const mapState = useMap();
  const [zoomed, setZoomed] = React.useState(0);

  mapState.on("zoomend", () => {
    setZoomed(zoomed + 1);
  });


  const mooseArray = useSelector(
    (state: any) => state.MooseSightingsState.mooseArray
  ).slice(0, 5);

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

  const markerState = useSelector((state: any) => state.MooseSightingsState.location) as LocationState;
  const defaultLocation: [number, number] = [48.4284, -123.3656];

  const markerPosition: [number, number] = [
      markerState.latitude ?? defaultLocation[0],
      markerState.longitude ?? defaultLocation[1]
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


  const Meese = (props: any) => (
    <>
      {mooseArray.map((moose: any, index: number) => {
        const position = getOffsetLocation(index, markerPosition);
        const mooseIcon = getMooseIcon(moose, "Current");
        return (
          <Marker key={index} position={position} icon={mooseIcon} />
        );
      })}
    </>
  );

  // const synchedMeese = (props: any) => (
  //   <>
  //     {allSightings.map((moose: any, index: number) => {
  //       const position = getOffsetLocation(index, markerPosition);
  //       const mooseIcon = getMooseIcon(moose);
  //       return <Marker key={index} position={position} icon={mooseIcon} />;
  //     })}
  //   </>
  // );

  const NotSynchedMeese = (props: any) => {
    
      return(
    <>
      {allSightings?.map((sighting: any, index: number) => {
        return sighting.mooseArray.map((moose: any, mooseIndex: number) => {
          const offLoc: [number, number] = sighting?.location?.latitude ? [sighting.location.latitude, sighting.location.longitude] : markerPosition;
          const position = getOffsetLocation(index, offLoc);
          const mooseIcon = getMooseIcon(moose, sighting?.status);
          const mooseDate = new Date(sighting.dateOfSighting).toLocaleDateString();
          return (
            <Marker key={index + mooseIndex} position={position} icon={mooseIcon} >
              <Popup>
                <div>Date of Sighting: {mooseDate}</div>
              </Popup>
            </Marker>
          )
        })
      })}
    </>
  )};

  return (
    <>
      <Meese key={zoomed} />
      {/* <synchedMeese key={}/> */}
      <NotSynchedMeese key={zoomed}/>
    </>
  )
};


export const MapPanel: React.FC = () => {
  const defaultLocation: [number, number] = [48.4284, -123.3656];
  const mapLocation = useSelector(
    (state: any) => state.MooseSightingsState.location
  );
  const markerState = useSelector(
    (state: any) => state.MooseSightingsState.location
  ) as LocationState;
  const [markerPosition, setMarkerPosition] = useState(defaultLocation);
  // let markerPosition: [number, number] = [defaultLocation[0], defaultLocation[1]];

  useEffect(() => {
    setMarkerPosition( [
      markerState.latitude ?? defaultLocation[0],
      markerState.longitude ?? defaultLocation[1],
    ])
  }, [markerState]);

  return (
    <div className="MapPanel">
      <MapContainer
        className="MapContainer"
        center={defaultLocation}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
            <WMSTileLayer
              key={Math.random()}
              transparent={true}
              opacity={.2}
              format={'image/png'}
              layers="pub:WHSE_WILDLIFE_MANAGEMENT.WAA_WILDLIFE_MGMT_UNITS_SVW"
              url="http://openmaps.gov.bc.ca/geo/ows"
              zIndex={9999}
            />
        <MapMarkers />
        <ChangeView center={markerPosition} />
      </MapContainer>
      <Outlet />
    </div>
  );
};
