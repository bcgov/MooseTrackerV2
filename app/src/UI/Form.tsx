import React, { useRef, useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTIVITY_UPDATE_SIGHTING,
  CLEAR_CURRENT_MOOSE_SIGHTING,
  USER_SAVE_SIGHTINGS,
} from "../state/actions";
import { RegionSelector } from "./RegionSelector";

export const FormPanel = () => {
  const ref = useRef(0);
  ref.current += 1;

  const bullCount = useSelector(
    (state: any) => state.MooseSightingsState.bullCount
  );
  const cowCount = useSelector(
    (state: any) => state.MooseSightingsState.cowCount
  );
  const calfCount = useSelector(
    (state: any) => state.MooseSightingsState.calfCount
  );
  const unknownCount = useSelector(
    (state: any) => state.MooseSightingsState.unknownCount
  );
  const hoursOut = useSelector(
    (state: any) => state.MooseSightingsState.hoursOut
  );

  /**
   * Increments/decrements the observation count for a given counter.
   * @param useStateVar the state variable to increment
   * @param useStateSetter the setter associated with the state variable
   * @param incrementBool true if incrementing, false if decrementing
   */
  const updateCount = (
    stateVar: any,
    incrementBool: boolean,
    payloadName: string
  ) => {
    let payload: any = {};
    if (incrementBool) {
      payload[payloadName] = stateVar + 1;
    } else {
      if (stateVar > 0) payload[payloadName] = stateVar - 1;
    }
    dispatch({ type: ACTIVITY_UPDATE_SIGHTING, payload: payload });
  };

  const dispatch = useDispatch();

  const date = useSelector((state: any) => state.MooseSightingsState.date);

  const handlefromDateChange = (event: any) => {
    dispatch({
      type: ACTIVITY_UPDATE_SIGHTING,
      payload: { date: event.target.valueAsDate },
    });
  };

  const handleSubmit = () => {
    dispatch({ type: USER_SAVE_SIGHTINGS });
  };

  return (
    <div className="formPanel">
      <div className="formContainer">
        <div className="formHeader">
          <h2>Record Moose Sighting</h2>
          <p>Please enter your moose sightings for your day</p>
        </div>
        <div className="formInput">
          <label>
            <span className="formContent">Bulls: </span>
          </label>
          <div>{bullCount} </div>
        <div className="columnRight">
            <button
              className="countBtn"
              onClick={() => updateCount(bullCount, true, "bullCount")}
            >
              +
            </button>
            <button
              className="countBtn"
              onClick={() => updateCount(bullCount, false, "bullCount")}
            >
              -
            </button>
          </div>

          <label>
            <span className="formContent">Cows: </span>
          </label>
          <div>{cowCount} </div>
        <div className="columnRight">
            <button
              className="countBtn"
              onClick={() => updateCount(cowCount, true, "cowCount")}
            >
              +
            </button>
            <button
              className="countBtn"
              onClick={() => updateCount(cowCount, false, "cowCount")}
            >
              -
            </button>
          </div>

          <label>
            <span className="formContent">Calf: </span>
          </label>
          <div>{calfCount} </div>
        <div className="columnRight">
            <button
              className="countBtn"
              onClick={() => updateCount(calfCount, true, "calfCount")}
            >
              +
            </button>
            <button
              className="countBtn"
              onClick={() => updateCount(calfCount, false, "calfCount")}
            >
              -
            </button>
          </div>

          <label>
            <span className="formContent">Unidentified: </span>
          </label>
          <div>{unknownCount} </div>
        <div className="columnRight">
            <button
              className="countBtn"
              onClick={() => updateCount(unknownCount, true, "unknownCount")}
            >
              +
            </button>
            <button
              className="countBtn"
              onClick={() => updateCount(unknownCount, false, "unknownCount")}
            >
              -
            </button>
          </div>


          <label>
            <span className="formContent">Date: </span>
          </label>
          <input
            type="date"
            id="date"
            value={date ? date.toISOString().split("T")[0] : ""}
            onChange={handlefromDateChange}
          />
          <div></div>

        <label>
          <span className="formContent">Hours Out: </span>
        </label>
        <div>{hoursOut} </div>
        <div className="columnRight">
          <button
            className="countBtn"
            onClick={() => updateCount(hoursOut, true, "hoursOut")}
          >
            +
          </button>
          <button
            className="countBtn"
            onClick={() => updateCount(hoursOut, false, "hoursOut")}
          >
            -
          </button>
        </div>

        </div>
            <label>
              <span className="formContent" />
            </label>
              <RegionSelector />

      </div>
      <button
        className="formButton"
        onClick={() => {
          dispatch({ type: CLEAR_CURRENT_MOOSE_SIGHTING });
        }}
      >
        Reset
      </button>
      <button className="formButton" onClick={handleSubmit}>
        Save sighting
      </button>
    </div>
  );
};
