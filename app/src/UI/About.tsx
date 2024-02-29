import { useRef } from "react";
import "./About.css";

export const About = (props: any) => {
  const ref = useRef(0);
  ref.current += 1;
  console.log("%About render:" + ref.current.toString(), "color: green");

  return (
  <div className="about-container">
    <h1>British Columbia Moose Tracker Application</h1>
    <p>
      B.C. Moose Tracker is an official Government of British Columbia app that allows hunters to play an important part in moose conservation and management.
    </p>
    <p>
      The app, available through Google Play and the App store, lets users upload information on the number, sex and location of moose they encounter in the wild directly to a province-wide database. The collected data helps monitor moose populations and alert wildlife staff to emerging issues.
    </p>
    <p>
      The app supports the government’s ongoing efforts to strengthen the provincial moose management strategy through the modernization of licensing, inventory and research methods.
    </p>
    <p>
      As an added bonus, the app includes a digital version of <a href="https://www2.gov.bc.ca/assets/download/EA20F1184A4349EEB9D6D70F60B9DB79">2022-2024 Hunting & Trapping Regulations Synopsis (pdf 16.1 MB)</a>.  It’s an indispensable, searchable summary of hunting seasons and regulations throughout B.C. – including interactive maps.
    </p>
  </div>
  )
};
