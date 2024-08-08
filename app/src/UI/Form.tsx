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
  // console.log("%FormPanel render:" + ref.current.toString(), "color: yellow");

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

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="FormPanel">
      <div className={showModal ? 'showModal' : 'hideModal'} >
        <button
          className="formButton modalCloseButton"
          onClick={() => {setShowModal(false)}}
        >
          X
        </button>
        <div className="modal">
          <h3>Record a sighting</h3>
          <div>
            <label>
              <span className="modalContent">How many moose?</span>
              <input type="number" name="mooseCount" min="1" 
                onChange={handleMooseCountChange}/>
            </label>
          </div>
          <div>
            <label>
            <span className="modalContent">Where did you see the moose(s)?</span>
              <RegionSelector/>
            </label>
          </div>
          <div>
            <label>
              <span className="modalContent">When did you see the moose(s)?</span>
              <input type="date" id="dateFrom" onChange={handlefromDateChange}/>
              <input type="date" id="dateTo" onChange={handleToDateChange}/>
            </label>
          </div>
          <button
            className="formButton"
            onClick={() => {
              dispatch({ 
                type: USER_SAVE_SIGHTINGS
              });
              setShowModal(false);
            }}
          >
            Save sighting
          </button>
        </div>
      </div>
      <div className="inputsContainer">
        <div className="headerBar">
          <h2 className="formHeading">Add a Moose Sighting</h2>
          <div className="headerButtons">
            <button
              className="formButton"
              onClick={() => {
                dispatch({ type: CLEAR_CURRENT_MOOSE_SIGHTING });
              }}
            >
              Clear current sighting
            </button>
            <button
              className="formButton"
              onClick={() => {setShowModal(true)}}
            >
              Add
            </button>

            <div className="popup" >?
              <span className="popuptext" id="myPopup">Use this form to record moose sightings. Will save locally until you synch once connected to the internet.</span>
            </div>
          </div>
        </div>
        
        <div className="formFooter">
        </div>
      </div>
    </div>
  );
};
