import "./Header.css"
import { useNavigate } from "react-router-dom";

export const Header = (props: any) => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/About');
  }

  const goToRegs = () => {
    navigate('/Regulations');
  }

  const goToForm = () => {
    navigate('/');
  }

  const goToSightings = () => {
    navigate("/Sightings");
  }

    return(
      <header className="headerMain">
        <div className="headerWrapper">
            <div className="iconContainer">
                <img className="bcgovIcon" src="BC_logo.png" alt="Government of British Columbia" onClick={goToForm}/>
            </div>
            <div className="titleContainer" onClick={goToForm}>
                <p className="headerText">Moose Tracker</p>
            </div>
            <div className="headerButtonContainer">
              <button className="headerButton" onClick={goToForm}>
                Add a Moose Sighting
              </button>
              <button className="headerButton" onClick={goToRegs}>
                Regulations
              </button>
              <button className="headerButton" onClick={goHome}>
                About
              </button>
              <button className="headerButton" onClick={goToSightings}>
                Sightings
              </button>
            </div>
        </div>
        <span className="horizontal-line"></span>
      </header>
    )
}