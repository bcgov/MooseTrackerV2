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

  const [bullCount, setBullCount] = useState(0);
  const [cowCount, setCowCount] = useState(0);
  const [calfCount, setCalfCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);
  const [outHours, setOutHours] = useState(0);
  
  /**
   * Increments/decrements the observation count for a given counter.
   * @param useStateVar the state variable to increment
   * @param useStateSetter the setter associated with the state variable
   * @param incrementBool true if incrementing, false if decrementing
   */
  const updateCount = (useStateVar: any, useStateSetter: any, incrementBool: boolean) => {
    if (incrementBool) {
      useStateSetter(useStateVar + 1);
    }
    else {
      if (useStateVar > 0)
        useStateSetter(useStateVar - 1);
    }
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
              <button className="countBtn" onClick={() => updateCount(bullCount, setBullCount, false)}>-</button>
              <button className="countBtn" onClick={() => updateCount(bullCount, setBullCount, true)}>+</button>
          </div>
          <div>
            <label>
              <span className="formContent">Cows: </span>
              <span>{cowCount} </span>
              <button className="countBtn" onClick={() => updateCount(cowCount, setCowCount, false)}>-</button>
              <button className="countBtn" onClick={() => updateCount(cowCount, setCowCount, true)}>+</button>
            </label>
          </div>
          <div>
            <label>
              <span className="formContent">Calf: </span>
              <span>{calfCount} </span>
              <button className="countBtn" onClick={() => updateCount(calfCount, setCalfCount, false)}>-</button>
              <button className="countBtn" onClick={() => updateCount(calfCount, setCalfCount, true)}>+</button>
            </label>
          </div>
          <div>
            <label>
              <span className="formContent">Unidentified: </span>
              <span>{unknownCount} </span>
              <button className="countBtn" onClick={() => updateCount(unknownCount, setUnknownCount, false)}>-</button>
              <button className="countBtn" onClick={() => updateCount(unknownCount, setUnknownCount, true)}>+</button>
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
              <input type="date" id="dateFrom" value={date ? date.toISOString().split('T')[0] : ''} onChange={handlefromDateChange}/>
            </label>
          </div>          
          <div>
            <label>
              <span className="formContent">Hours Out: </span>
              <span>{outHours} </span>
              <button className="countBtn" onClick={() => updateCount(outHours, setOutHours, false)}>-</button>
              <button className="countBtn" onClick={() => updateCount(outHours, setOutHours, true)}>+</button>
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
