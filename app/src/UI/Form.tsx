import React, { useRef, useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTIVITY_UPDATE_SIGHTING,
  CLEAR_CURRENT_MOOSE_SIGHTING,
  USER_SAVE_SIGHTINGS
} from "../state/actions";
import { RegionSelector } from "./RegionSelector";

export const FormPanel = () => {
  const ref = useRef(0);
  ref.current += 1;

  const bullCount = useSelector((state: any) => state.MooseSightingsState.bullCount)
  const cowCount = useSelector((state: any) => state.MooseSightingsState.cowCount)
  const calfCount = useSelector((state: any) => state.MooseSightingsState.calfCount)
  const unknownCount = useSelector((state: any) => state.MooseSightingsState.unknownCount)
  const hoursOut = useSelector((state: any) => state.MooseSightingsState.hoursOut)
  // const [cowCount, setCowCount] = useState(0);
  // const [calfCount, setCalfCount] = useState(0);
  // const [unknownCount, setUnknownCount] = useState(0);
  // const [hoursOut, sethoursOut] = useState(0);
  
  /**
   * Increments/decrements the observation count for a given counter.
   * @param useStateVar the state variable to increment
   * @param useStateSetter the setter associated with the state variable
   * @param incrementBool true if incrementing, false if decrementing
   */
  const updateCount = (stateVar: any, incrementBool: boolean, payloadName: string) => {
    let payload: any = {}
    if (incrementBool) {
      payload[payloadName] = stateVar + 1
    }
    else {
      if (stateVar > 0)
        payload[payloadName] = stateVar - 1
    }
      dispatch({type: ACTIVITY_UPDATE_SIGHTING, payload: payload})
  }

  const dispatch = useDispatch();

  const date = useSelector(
    (state: any) => state.MooseSightingsState.date
  );

  const handlefromDateChange = (event: any) => {
    dispatch({ type: ACTIVITY_UPDATE_SIGHTING, payload: { date: event.target.valueAsDate }});
  };

  const handleSubmit = () => {
    dispatch({ type: USER_SAVE_SIGHTINGS });
  };

  return (
    <div className="formPanel">
      <div className="formContainer" >
        <div className="formHeader">
          <h2>Record Moose Sighting</h2>
          <p>Please enter your moose sightings for your day</p>
        </div>
        <div className="formInput">
          <div>
            <label>
              <span className="formContent">Bulls: </span>
              <span>{bullCount} </span>
            </label>
          </div>
          <div>
              <button className="countBtn" onClick={() => updateCount(bullCount, false, "bullCount")}>-</button>
              <button className="countBtn" onClick={() => updateCount(bullCount, true, "bullCount")}>+</button>
          </div>
          <div>
            <label>
              <span className="formContent">Cows: </span>
              <span>{cowCount} </span>
              <button className="countBtn" onClick={() => updateCount(cowCount, false, "cowCount")}>-</button>
              <button className="countBtn" onClick={() => updateCount(cowCount, true, "cowCount")}>+</button>
            </label>
          </div>
          <div>
            <label>
              <span className="formContent">Calf: </span>
              <span>{calfCount} </span>
              <button className="countBtn" onClick={() => updateCount(calfCount, false, "calfCount")}>-</button>
              <button className="countBtn" onClick={() => updateCount(calfCount, true, "calfCount")}>+</button>
            </label>
          </div>
          <div>
            <label>
              <span className="formContent">Unidentified: </span>
              <span>{unknownCount} </span>
              <button className="countBtn" onClick={() => updateCount(unknownCount, false, "unknownCount")}>-</button>
              <button className="countBtn" onClick={() => updateCount(unknownCount, true, "unknownCount")}>+</button>
            </label>
          </div>
          <div>
            <label>
            <span className="formContent"/>
              <RegionSelector/>
            </label>
          </div>
          <div>
            <label>
              <span className="formContent">Date: </span>
              <input type="date" id="date" value={date ? date.toISOString().split('T')[0] : ''} onChange={handlefromDateChange}/>
            </label>
          </div>          
          <div>
            <label>
              <span className="formContent">Hours Out: </span>
              <span>{hoursOut} </span>
              <button className="countBtn" onClick={() => updateCount(hoursOut, false, "hoursOut")}>-</button>
              <button className="countBtn" onClick={() => updateCount(hoursOut, true, "hoursOut")}>+</button>
            </label>
          </div>
       
        </div>
        <div className="formButtons">
          <button className="formButton" onClick={() => { dispatch({ type: CLEAR_CURRENT_MOOSE_SIGHTING })}}>
            Reset
          </button>
          <button className="formButton" onClick={handleSubmit} >
            Save sighting
          </button>
        </div>
      </div>
    </div>
  );
};
