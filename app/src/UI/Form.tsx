import { useRef, useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_GEOLOCATION, USER_CLICK_ADD_MOOSE } from "../state/actions";
import { ACTIVITY_UPDATE_MOOSE } from "../state/actions/index";

export const FormPanel = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%FormPanel render:" + ref.current.toString(), "color: yellow");
  
  const dispatch = useDispatch();

  const handleChange = (mooseId: number, mooseAge: number) => {
    dispatch({ type: ACTIVITY_UPDATE_MOOSE, payload: { id: mooseId, age: mooseAge } });
  };

  const mooseArray = useSelector((state: any) => state.MooseSightingsState.mooseArray);

  return (
    <div className="FormPanel">
      <div className="inputsContainer">
        <div className="headerBar">
          <button
            className="addMooseButton"
            onClick={() => {
              dispatch({ type: USER_CLICK_ADD_MOOSE });
            }}
          >
            Add Moose
          </button>
          <button
            className="recordLocationButton"
            onClick={() => {
              dispatch({ type: GET_GEOLOCATION});
            }}
          >
            Mark Location
          </button>
        </div>
        <div className="meese">
          {mooseArray.map((moose: any) => {
            return (
              <>
                <div className="moose" key={moose.id}>
                  blanabba
                  <select
                  id="ageSelector"
                  value={moose.age}
                  onChange={(event) => {
                    handleChange(moose.id, event.target.value.toString())
                  }}
                >
                  {Array.from({ length: 25 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};
