import "./Header.css"
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Capacitor } from '@capacitor/core';
import { useEffect, useState } from "react";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import MapIcon from '@mui/icons-material/Map';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const Header = (props: any) => {
  const navigate = useNavigate();
  const location = useLocation();


  const [headerWrapperClass, setHeaderWrapperClass] = useState("headerWrapper")
  useEffect( () => {
    const platform = Capacitor.getPlatform()
    console.log("*******" + platform)
    switch(platform) {
      case "ios":
        setHeaderWrapperClass("headerWrapper headerWrapperIOS")
        break
      default:
        setHeaderWrapperClass("headerWrapper")
    }
  }, []);

  const goHome = () => {
    navigate('/');
  }
  
  const goToRegs = () => {
    navigate('/Regulations');
  }

  const goToAddMoose = () => {
    navigate('/Form');
  }

  const goToMap = () => {
    navigate('/Map');
  }

  const goToSightings = () => {
    navigate("/Sightings");
  }


    return(
      <header className="headerMain">
        <div className="headerWrapper">
          <div className="headingwrapper">
            <div className="iconContainer">
                  <img className="bcgovIcon" src="BC Moose Tracker logo.svg" alt="Government of British Columbia" onClick={goToAddMoose}/>
              </div>
              <div className="titleContainer" onClick={goToAddMoose}>
                <p className="headerText">Moose Tracker</p>
              </div>
          </div>
          <div className="headerButtonContainer">

          {/* <Route path="/Map" element={<MapPanel />} />
          <Route path="/Form" element={<FormPanel />} />
          <Route path="/Sightings" element={<Sightings />} />
          <Route path="/Regulations" element={<Regs />} />
          <Route path="/" element={<About />} /> */}


            <div className="navTab">
              <a onClick={goToMap}>
                <MapIcon className="buttonIcon"/>
              </a>
              <NavLink className={`headerButton ${location.pathname === "/Map" ? 'header-selected ' : ''}`} to="/Map">
                Map
              </NavLink>
            </div>
            <div className="navTab">
              <img className="buttonIcon" id="mooseIcon" src="moose_bar_icon.svg" alt="Moose Icon" onClick={goToAddMoose}/>
              <NavLink className={`headerButton ${location.pathname === "/Form" ? 'header-selected ' : ''}`} to="/Form"  id="addMooseButton">
                Add Moose
              </NavLink>
            </div>
            <div className="navTab">
              <a onClick={goToSightings}>
                <AssignmentIcon className="iconButton"/>
              </a>
              <NavLink className={`headerButton ${location.pathname === "/Sightings" ? 'header-selected ' : ''}`} to="/Sightings">
                Sightings
              </NavLink>
            </div>
            <div className="navTab">
              <a onClick={goToRegs}>
                <LibraryBooksIcon className="buttonIcon"/>
              </a>
              <NavLink className={`headerButton ${location.pathname === "/Regulations" ? 'header-selected ' : ''}`} to="/Regulations">
                Regulations
              </NavLink>
            </div>
            <div className="navTab">
              <a onClick={goHome}>
                <InfoIcon className="buttonIcon"/>
              </a>
              <NavLink className={`headerButton ${location.pathname === "/" ? 'header-selected ' : ''}`} to="/">
                About
              </NavLink>
            </div>
          </div>
        </div>
      </header>
    )
}