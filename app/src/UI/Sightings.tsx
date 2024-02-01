import { useEffect, useRef } from "react";
import "./Sightings.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useSelector, useDispatch } from "react-redux";
import { SYNC_SIGHTINGS_TO_DB } from "../state/actions";


export const Sightings = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;

  const dispatch = useDispatch();
  console.log("%Sightings render:" + ref.current.toString(), "color: yellow");

  const storedSightings = useSelector((state: any) => state.MooseSightingsState.allSightings);

  console.log(JSON.stringify({ sightings: storedSightings }))

  return (
    <div className="sightings-container">
      <h1>All Sightings</h1>
      <span>
        <button onClick={() => dispatch({ type: SYNC_SIGHTINGS_TO_DB, payload: {} })}>
          Sync
        </button>
      </span>
      {storedSightings?.length > 0 ?
        storedSightings?.map((sighting: any) => {
          return (
            <Accordion key={sighting.id} className="sighting">
              <AccordionSummary className="sighting-header" aria-controls="panel-content">
                <div className="sighting-date">{sighting.dateOfSighting}</div>
                <div className="sighting-status">status: {sighting.status}</div>
              </AccordionSummary>
              <AccordionDetails>
                {sighting.mooseArray.map((moose: any) => {
                  return (<p>{moose.id} | {moose.age} - {moose.gender}</p>);
                })}
              </AccordionDetails>
            </Accordion>
          );
        })
        :
        <p>No stored sightings currently</p>
      }
    </div>
  );
};
