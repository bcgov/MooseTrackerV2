import { useRef } from "react";
import "./App.css";
import { FormPanel } from "./UI/Form";
import { MapPanel } from "./UI/Map";
import "./index.css";
import { Header } from "./UI/Header";
import { Footer } from "./UI/Footer";
import { Regs } from "./UI/Regs";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { About } from "./UI/About";
import { Sightings } from "./UI/Sightings";
import { UserSaveSnackbar } from "./UI/UserSaveSnackbar";
//import { Breadcrumb } from "./UI/Breadcrumb";

function App() {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%cParent render:" + ref.current.toString(), "color: yellow");

  return (
    <div className="rootContainer">
      <BrowserRouter>
        <Header />
        <UserSaveSnackbar />
        <Routes>
          <Route path="/Map" element={<MapPanel />}>
            <Route index element={<FormPanel />} />
            <Route path="Sightings" element={<Sightings />} />
          </Route>
          <Route path="/Regulations" element={<Regs />} />
          <Route path="/" element={<About />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
