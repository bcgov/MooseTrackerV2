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
        </div>
        <div className="formInput">
          <div>
            <label>
              <span className="formContent">Moose: </span>
              <input type="number" name="mooseCount" min="1" value={mooseCount || ''} onChange={handleMooseCountChange}/>
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
              <span className="formContent">Date from: </span>
              <input type="date" id="dateFrom" value={dateFrom ? dateFrom.toISOString().split('T')[0] : ''} onChange={handlefromDateChange}/>
            </label>
          </div>
          <div>
            <label>
              <span className="formContent">Date to: </span>
              <input type="date" id="dateTo" value={dateTo ? dateTo.toISOString().split('T')[0] : ''} onChange={handleToDateChange}/>
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
