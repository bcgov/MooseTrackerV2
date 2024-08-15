import { useRef, useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTIVITY_UPDATE_SIGHTING,
  CLEAR_CURRENT_MOOSE_SIGHTING,
  USER_SAVE_SIGHTINGS
} from "../state/actions";
import { RegionSelector } from "./RegionSelector";

export const FormPanel = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;

  const dispatch = useDispatch();

  const mooseCount = useSelector(
    (state: any) => state.MooseSightingsState.mooseCount
  );

  const dateFrom = useSelector(
    (state: any) => state.MooseSightingsState.dateFrom
  );
  const dateTo = useSelector(
    (state: any) => state.MooseSightingsState.dateTo
  );

  const handleMooseCountChange = (event: any) => {
    dispatch({ type: ACTIVITY_UPDATE_SIGHTING, payload: { mooseCount: event.target.value }});
  };

  const handlefromDateChange = (event: any) => {
    dispatch({ type: ACTIVITY_UPDATE_SIGHTING, payload: { dateFrom: event.target.valueAsDate }});
  };

  const handleToDateChange = (event: any) => {
    dispatch({ type: ACTIVITY_UPDATE_SIGHTING, payload: { dateTo: event.target.valueAsDate }});
  };

  const handleSubmit = (event: any) => {
    dispatch({ type: USER_SAVE_SIGHTINGS });
  };

  return (
    <div className="formPanel">
      <div className="formContainer" >
        <div className="formHeader">
          <h2>Record Moose Sighting</h2>
          <p>Use this form to record moose sightings. Will save locally until you synch once connected to the internet.</p>
        </div>
        <div className="formInput">
          <div>
            <label>
              <span className="formContent">How many moose?</span>
              <input type="number" name="mooseCount" min="1" value={mooseCount || ''} onChange={handleMooseCountChange}/>
            </label>
          </div>
          <div>
            <label>
            <span className="formContent">Where did you see the moose(s)?</span>
              <RegionSelector/>
            </label>
          </div>
          <div>
            <label>
              <span className="formContent">What were the start and end dates of your trip where you saw moose(s)?</span>
              <input type="date" id="dateFrom" value={dateFrom ? dateFrom.toISOString().split('T')[0] : ''} onChange={handlefromDateChange}/>
              <input type="date" id="dateTo" value={dateTo ? dateTo.toISOString().split('T')[0] : ''} onChange={handleToDateChange}/>
            </label>
          </div>
        </div>
        <button className="formButton" onClick={() => { dispatch({ type: CLEAR_CURRENT_MOOSE_SIGHTING })}}>
          Reset
        </button>
        <button className="formButton" onClick={handleSubmit} >
          Save sighting
        </button>
      </div>
    </div>
  );
};
