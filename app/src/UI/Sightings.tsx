import { useEffect, useRef } from "react";
import "./Sightings.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useSelector, useDispatch } from "react-redux";
import { SYNC_SIGHTINGS_TO_DB } from "../state/actions";
import { formatDateString } from "../util";

export const Sightings = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;

  const dispatch = useDispatch();
  console.log("%Sightings render:" + ref.current.toString(), "color: yellow");

  const storedSightings = useSelector((state: any) => state.MooseSightingsState.allSightings);

  const currentPage = window.location.href;

  return (
    <div className="sightingContainer">
      <span className="wrapper">
        <div className="sightingHeader">
          <h2 className="sightingHeadingText">All Sightings</h2>
        </div>
        <div className="sightingText">
          {storedSightings?.length > 0 ?
            storedSightings?.map((sighting: any) => {
              return (
                <Accordion key={sighting.id} className="sighting">
                  <AccordionSummary className="sightingHeader" aria-controls="panel-content">
                    <div className="sightingDate">{formatDateString(sighting.date)} ({sighting.hoursOut} {sighting.hoursOut === 1 ? 'hour' : 'hours'})</div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>{sighting.region} {sighting.subRegion}</div>
                    <div>Bulls: {sighting.bullCount ?? 0}</div>
                    <div>Cows: {sighting.cowCount ?? 0}</div>
                    <div>Calves: {sighting.calfCount ?? 0}</div>
                    <div>Unknown: {sighting.unknownCount ?? 0}</div>
                    {/* TODO: tick hair loss not yet implemented */}
                    {/* <div>Tick hair loss: {sighting.tickHairLoss} </div> */}
                  </AccordionDetails>
                </Accordion>
              );
            })
            :
            <p className="noSightings">No stored sightings currently</p>
          }
        </div>
      </span>
    </div>
  );
};
