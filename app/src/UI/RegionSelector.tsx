import { useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import  { ACTIVITY_UPDATE_SIGHTING } from "../state/actions";
import * as mgmtUnits from "../assets/management_units.json";

const managementUnits = mgmtUnits as any; // a large object including data about wildlife management regions
const features = managementUnits.features; // an array with entries for each management region

const options = features.map((feature:any) => {   // an array with the data we're actually using for each managment region
    return feature.properties;
})
/* feature example -> {
    "WILDLIFE_MGMT_UNIT_ID": "1-1",
    "FEATURE_CODE": "WI02800110",
    "REGION_RESPONSIBLE": 1,
    "REGION_RESPONSIBLE_NAME": "Vancouver Island",
    "GAME_MANAGEMENT_ZONE_ID": "1a",
    "GAME_MANAGEMENT_ZONE_NAME": "Southern Vancouver Island",
    "FEATURE_AREA_SQM": 2918835016.2245,
    "FEATURE_LENGTH_M": 315188.8094,
    "OBJECTID": 657,
    "SE_ANNO_CAD_DATA": null,
    "GEOMETRY.AREA": 0,
    "GEOMETRY.LEN": 0,
    "fme_feature_type": "WHSE_WILDLIFE_MANAGEMENT.WAA_WILDLIFE_MGMT_UNITS_SVW"
} */

let regionNamesArray = features.map(
  (feature: any) => feature.properties.REGION_RESPONSIBLE_NAME
);

const regionSet = new Set(regionNamesArray);
regionNamesArray = Array.from(regionSet) // an array of all the unique regions


/**
 * A component with two selectors for choosing a wildlife management area
 * When a subregion is selected, an action is dispatched to update the location state
 * 
 * @component
 * @returns {React.ReactElement} a div with 2 selectors
 */
export const RegionSelector = (props: any) => {

    const selectedRegion= useSelector(
      (state: any) => state.MooseSightingsState.region
    );
    const selectedSubregion = useSelector(
      (state: any) => state.MooseSightingsState.subRegion
    );

    const dispatch = useDispatch();
    
    function handleRegionSelect(event: any) {
      dispatch({ type: ACTIVITY_UPDATE_SIGHTING, payload: {region: event.target.value }});
    }

    function handleSubRegionSelect(event: any){
      dispatch({ type: ACTIVITY_UPDATE_SIGHTING, payload: {subRegion: event.target.value}});
    }

    return (
      <div>
        <div>
          <label>
            <span>Region: </span>
            <select
              name="regionSelector"
              value={selectedRegion}
              onChange={handleRegionSelect}
            >
              <option>-- select an option --</option>
              {regionNamesArray.map((region: any) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            <span>Sub-Region: </span>
            <select
              name="subRegionSelector"
              value={selectedSubregion}
              onChange={handleSubRegionSelect}
              disabled={!selectedRegion}
              key={Math.random()}
            >
              {/* This section filters the options array so only subregions of the selected region are shown*/}
              {/* The result is then sorted based on management region id (ex id : "1-12") and an option entry generated for each*/}
              <option value="">-- select a subregion --</option>
              {options
                .filter(
                  (property: any) =>
                    property.REGION_RESPONSIBLE_NAME === selectedRegion
                )
                .sort(
                  (a: any, b: any) =>
                    parseInt(a.WILDLIFE_MGMT_UNIT_ID.substring(2)) -
                    parseInt(b.WILDLIFE_MGMT_UNIT_ID.substring(2))
                )
                .map((property: any) => (
                  <option
                    key={property.OBJECTID}
                    value={property.WILDLIFE_MGMT_UNIT_ID}
                  >
                    {property.GAME_MANAGEMENT_ZONE_NAME +
                      " - " +
                      property.WILDLIFE_MGMT_UNIT_ID}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </div>
    );
};
