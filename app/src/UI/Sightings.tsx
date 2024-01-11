import { useRef } from "react";
import "./Sightings.css";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


export const Sightings = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%Sightings render:" + ref.current.toString(), "color: yellow");
  
  const storedSightings = [
    {
      id: 'uidstringgoeshere',
      status: 'synced',
      syncDate: '2019-01-01T00:00:00.000Z',
      dateOfSighting: '2019-01-01T00:00:00.000Z',
      location: [1, 2],
      mooseArray: [
        {
          id: 1,
          age: "calf",
          gender: "Male",
        },
        {
          id: 2,
          age: "calf",
          gender: "Female",
        }
      ]
    },
    {
      id: 'uidstringgoesre',
      status: 'error',
      syncDate: '2019-01-01T00:00:00.000Z',
      dateOfSighting: '2019-01-01T00:00:00.000Z',
      location: [3, 4],
      mooseArray: [
        {
          id: 1,
          age: "Calf",
          gender: "Male",
        },
        {
          id: 2,
          age: "Calf",
          gender: "Female",
        },
        {
          id: 2,
          age: "Adult",
          gender: "Female",
        }
      ]
    }
  ]

  return (
    <div className="sightings-container">
      <h1>All Sightings</h1>
      {storedSightings.map((sighting: any) => {
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
      })}
    </div>
  );
};
