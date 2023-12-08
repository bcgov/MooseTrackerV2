import "./SubmitSightingDialog.css";

import { useDispatch, useSelector } from "react-redux";
import { TOGGLE_SIGHTING_DIALOG, USER_CLICK_SUBMIT_SIGHTING } from "../state/actions/index";

export const SubmitSightingDialog = (props: any) => {
  const toggle = useSelector((state: any) => state.Activity.sightingDialogToggle);
  const dispatch = useDispatch();
  return (<>
    {toggle ? 
    <div className="submit-sighting-background">
      <div className="submit-sighting-dialog">
        <h1>Sighting Info</h1>
        <h2>Info about meeses</h2>
        
        <button onClick={() => {
          dispatch({type: USER_CLICK_SUBMIT_SIGHTING});
          dispatch({type: TOGGLE_SIGHTING_DIALOG});
        }}>
          Confirm Submit
        </button>
      </div>
    </div>
      :
      <></>
    }
  </>);
}
