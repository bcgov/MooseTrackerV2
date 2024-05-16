import * as turf from "@turf/turf";
import featuresGeoJson from "./management-units-geojson.json";

export const getLabelPoints = () => {
  let labelPoints: any = [];
  featuresGeoJson?.features?.map((feature: any) => {
    try {
      const mgmtUnitID = feature?.properties?.WILDLIFE_MGMT_UNIT_ID;
      let centerPoint = turf.center(feature);
      centerPoint.properties.id= mgmtUnitID;
      labelPoints.push(centerPoint);
    } catch (e) {
      console.log(e);
    }
  });
  return labelPoints;
};
