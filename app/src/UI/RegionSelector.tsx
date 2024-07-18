import { useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import  { MANUAL_REGION_CHOICE } from "../state/actions";
import * as mgmtUnits from "../assets/management_units.json";

const managementUnits = mgmtUnits as any; // a large object including data about wildlife management regions
const features = managementUnits.features; // an array with entries for each management region

let options = features.map((feature:any) => {   // an array with the data we're actually using for each managment region
    return feature.properties;
})

let regionNamesArray = features.map(
  (feature: any) => feature.properties.REGION_RESPONSIBLE_NAME
);

let regionSet = new Set(regionNamesArray);
regionNamesArray = Array.from(regionSet) // an array of all the unique regions


/**
 * A component with two selectors for choosing a wildlife management area
 * When a subregion is selected, an action is dispatched to update the location state
 * 
 * @component
 * @returns {React.ReactElement} a div with 2 selectors
 */
export default () => {
    const [selectedRegion, setSelectedRegion ] = useState(''); //only used in this component so not sent to the store
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
          Select your Region :
          <select
            name="regionSelector"
            value={selectedRegion}
            onChange={handleRegionSelect}
          >
            <option selected>-- select an option --</option>
            {regionNamesArray.map((region: any) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select your Sub-Region :
          <select
            name="subRegionSelector"
            value={selectedSubregion}
            onChange={handleSubRegionSelect}
          >
            {/* This section filters the options array so only subregions of the selected region are shown*/}
            {/* The result is then sorted based on management region id (ex id : "1-12") and an option entry generated for each*/}
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
