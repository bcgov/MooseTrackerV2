import { useRef, useState } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVITY_CLEAR_MOOSE_ARRAY, ACTIVITY_DELETE_MOOSE, GET_GEOLOCATION, USER_CLICK_ADD_MOOSE, USER_CLICK_RECORD_GENDER } from "../state/actions";
import { ACTIVITY_UPDATE_MOOSE } from "../state/actions/index";
import { Age } from "./Enums";

export const FormPanel = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%FormPanel render:" + ref.current.toString(), "color: yellow");

  const dispatch = useDispatch();

  const handleAgeChange = (mooseId: number, mooseAge: string) => {
    dispatch({ type: ACTIVITY_UPDATE_MOOSE, payload: { id: mooseId, age: mooseAge } });
  };
  const handleGenderChange = (mooseId: number, mooseGender: string) => {
    dispatch({ type: ACTIVITY_UPDATE_MOOSE, payload: { id: mooseId, gender: mooseGender } });
  };

  const mooseArray = useSelector((state: any) => state.MooseSightingsState.mooseArray);
  const location = useSelector((state: any) => state.MooseSightingsState.location);

  const saveSightingToDisk = () => {

    let storedSightings = JSON.parse(localStorage.getItem("Sightings"))

    if (storedSightings) {
      const newSighting: object = {
        id: crypto.randomUUID(),
            status: 'synced',
            syncDate: Date.now(),
            dateOfSighting: Date.now(),
            location: location,
            mooseArray: mooseArray
      }

      storedSightings.sightings.push(newSighting)
      localStorage.setItem("Sightings", JSON.stringify(storedSightings))

      dispatch({ type: ACTIVITY_CLEAR_MOOSE_ARRAY });
    }

    else {
      const firstSighting: object = {
        sightings: [
          {
            id: crypto.randomUUID(),
            status: 'synced',
            syncDate: Date.now(),
            dateOfSighting: Date.now(),
            location: location,
            mooseArray: mooseArray
          }
        ]
      }

      localStorage.setItem("Sightings", JSON.stringify(firstSighting))
      dispatch({ type: ACTIVITY_CLEAR_MOOSE_ARRAY });
    }
  }

  return (
    <div className="FormPanel">
      <div className="inputsContainer">
        <div className="headerBar">
          <h2 className="formHeading">Add a Moose Sighting</h2>
          <div className="headerButtons">
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
                dispatch({ type: GET_GEOLOCATION });
              }}
            >
              Mark Location
            </button>
          <button
            className='saveSightingsButton'
            onClick={() => {
              saveSightingToDisk()
            }}>
            Save
          </button>
          </div>
        </div>
        <div className="meese">
          {mooseArray.map((moose: any) => {
            return (
              <>
                <div className="moose" key={moose.id}>
                  {moose.id}
                  <select
                    id="ageSelector"
                    value={moose.age}
                    onChange={(event) => {
                      console.log(moose.id);
                      handleAgeChange(moose.id, event.target.value)
                    }}
                  >
                    {
                      Object.values(Age).map((age, i) => {
                        return (
                          <option key={i + 1} value={age}>
                            {age}
                          </option>
                        );
                      })
                    }
                  </select>
                  <select
                    id="genderSelector"
                    value={moose.gender}
                    onChange={(event) => {
                      handleGenderChange(moose.id, event.target.value.toString())
                    }}
                  >
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                    <option value='unknown'>Unknown</option>
                  </select>
                  <button onClick={() => {
                    dispatch({ type: ACTIVITY_DELETE_MOOSE, payload: { id: moose.id } })
                  }}>
                    Delete
                  </button>
                </div>
              </>
            );
          })}
        </div>
        <div className="formFooter">
          <button
            className="saveMooseButton"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

