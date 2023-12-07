import { useRef } from "react";
import "./App.css";
import { FormPanel } from "./UI/Form";
import { MapPanel } from "./UI/Map";
import './index.css'
import { SubmitSightingDialog } from "./UI/SubmitSightingDialog";


function App() {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%cParent render:" + ref.current.toString(), "color: yellow");

  return (
      <div className="rootContainer">
        <MapPanel/>
        <FormPanel/>
        <SubmitSightingDialog/>
      </div>
  );
}

export default App;
