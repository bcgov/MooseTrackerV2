import { useEffect, useRef } from "react";
import "./Sightings.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useSelector } from "react-redux";


export const Sightings = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%Sightings render:" + ref.current.toString(), "color: yellow");
  
  const storedSightings = useSelector((state: any) => state.MooseSightingsState.allSightings);

  console.log(JSON.stringify({ sightings: storedSightings.sightings }))

  function prepareSightingsForApi(sightings: any) {
    return sightings.map(sighting => {
      return {
        id: sighting.id,
        dateOfSighting: sighting.dateOfSighting,
        status: sighting.status,
        syncDate: sighting.syncDate,
        location: [sighting.location.latitude, sighting.location.longitude],
        mooseArray: sighting.mooseArray.map(moose => ({
          id: moose.id,
          age: moose.age,
          gender: moose.gender || "unknown"
        }))
      };
    });
  }

  const syncToDb = async () => {
    try {
      const validatedSightings = prepareSightingsForApi(storedSightings.sightings)
      const response = await fetch('http://localhost:7080/recordSightings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sightings: validatedSightings }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Sightings synced successfully:', data);
    } catch (error) {
      console.error('Failed to sync sightings:', error);
    }
  };

  return (
    <div className="sightings-container">
      <h1>All Sightings</h1>
      <span>
        <button onClick={() => syncToDb()}>
          Sync
        </button>
      </span>
      {storedSightings.sightings.length > 0 ?
      storedSightings.sightings.map((sighting: any) => {
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
