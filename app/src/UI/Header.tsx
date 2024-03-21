import "./Header.css"
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { Capacitor } from '@capacitor/core';
import { useEffect, useState } from "react";

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

  // const goHome = () => {
  //   navigate('/About');
  // }
  
  // const goToRegs = () => {
  //   navigate('/Regulations');
  // }

  const goToForm = () => {
    navigate('/');
  }

  // const goToSightings = () => {
  //   navigate("/Sightings");
  // }


    return(
      <header className="headerMain">
        <div className={headerWrapperClass}>
            <div className="iconContainer">
                <img className="bcgovIcon" src="BC_logo.png" alt="Government of British Columbia" onClick={goToForm}/>
            </div>
            <div className="titleContainer" onClick={goToForm}>
              <p className="headerText">Moose Tracker</p>
            </div>
            <div className="headerButtonContainer">
              <NavLink className={`headerButton ${location.pathname === "/" ? 'header-selected ' : ''}`} to="/">
                Add a Moose Sighting
              </NavLink>
              <NavLink className={`headerButton ${location.pathname === "/Sightings" ? 'header-selected ' : ''}`} to="/Sightings">
                Sightings
              </NavLink>
              <NavLink className={`headerButton ${location.pathname === "/Regulations" ? 'header-selected ' : ''}`} to="/Regulations">
                Regulations
              </NavLink>
              <NavLink className={`headerButton ${location.pathname === "/About" ? 'header-selected ' : ''}`} to="/About">
                About
              </NavLink>
            </div>
          </div>
        <span className="horizontal-line"></span>
      </header>
    )
}