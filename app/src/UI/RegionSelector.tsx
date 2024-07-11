import { useRef, useState } from "react";
import Select from "react-select";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import  { MANUAL_REGION_CHOICE } from "../state/actions";
import * as mgmtUnits from "../assets/management_units.json";

let options = mgmtUnits as any;
const features = options.features;
console.dir(features);
options = features.map((feature:any) => {
    return feature.properties;
})

let regionNamesArr = features.map(
  (feature: any) => feature.properties.REGION_RESPONSIBLE_NAME
);

let regionSet = new Set(regionNamesArr);
regionNamesArr = Array.from(regionSet)



export default () => {
    const [selectedRegion, setSelectedRegion ] = useState('');
    const selectedSubregion = useSelector(
      (state: any) => state.MooseSightingsState.location
    );

    const dispatch = useDispatch();

    function handleRegionSelect(event: any) {
      setSelectedRegion(event.target.value);
    }

    function handleSubRegionSelect(event: any){
        dispatch({ type: MANUAL_REGION_CHOICE, payload: event.target.value });
    }

    return (
      <div>
        <label>
          Select your Region  : 
          <select
            name="regionSelector"
            value={selectedRegion}
            onChange={handleRegionSelect}
          >
            <option selected>
              -- select an option --
            </option>
            {regionNamesArr.map((region: any) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select your Sub-Region  :  
          <select
            name="subRegionSelector"
            value={selectedSubregion}
            onChange={handleSubRegionSelect}
          >
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
    );
};

/* {
    "WILDLIFE_MGMT_UNIT_ID": "1-6",
    "FEATURE_CODE": "WI02800110",
    "REGION_RESPONSIBLE": 1,
    "REGION_RESPONSIBLE_NAME": "Vancouver Island",
    "GAME_MANAGEMENT_ZONE_ID": "1a",
    "GAME_MANAGEMENT_ZONE_NAME": "Southern Vancouver Island",
    "FEATURE_AREA_SQM": 4014262107.1476,
    "FEATURE_LENGTH_M": 358041.9776,
    "OBJECTID": 653,
    "SE_ANNO_CAD_DATA": null
} */
