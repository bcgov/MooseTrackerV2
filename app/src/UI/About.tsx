import { useRef } from "react";

import "./About.css";

export const About = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%About render:" + ref.current.toString(), "color: green");

  return (
    <div className="aboutContainer">
      <div className="spacer"></div>
      <div className="aboutWrapper">
        <div className="about">
          <h1>Welcome to Moose Tracker v2!</h1>
          <p>
            B.C. Moose Tracker is an official Government of British Columbia app
            that allows hunters to play an important part in moose conservation
            and management.
          </p>
          <p>
            The app, available through Google Play and the App store, lets users
            upload information on the number and management region of moose they
            encounter in the wild directly to a province-wide database. The
            collected data helps monitor moose populations and alert wildlife
            staff to emerging issues.
          </p>
          <p>
            The app supports the government’s ongoing efforts to strengthen the
            provincial moose management strategy through the modernization of
            licensing, inventory and research methods.
          </p>
          <p>
            As an added bonus, the app includes a digital version of 2024-2026
            Hunting & Trapping Regulations Synopsis. It’s an indispensable
            searchable summary of hunting seasons and regulations throughout
            B.C.
          </p>
          <p>
            <small>
              <strong style={{ color: "red" }}>Warning: </strong>
              The British Columbia Hunting and Trapping Regulations Synopsis is
              intended for general information purposes only. Where there is a
              discrepancy between this synopsis and the Regulations, the
              Regulations are the final authority. Regulations are subject to
              change from time to time, and it is the responsibility of an
              individual to be informed of the current Regulations. To ensure
              you have the most up to date hunting regulations please refer to
              the&nbsp;
              <a
                href="https://www2.gov.bc.ca/gov/content/sports-culture/recreation/fishing-hunting/hunting/regulations-synopsis"
                target="_blank"
                style={{ zIndex: 10 }}
              >
                online version
              </a>
              .
            </small>
          </p>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};
