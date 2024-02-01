import { channel } from "redux-saga";
import { useDispatch } from "react-redux";
import {
  all,
  put,
  call,
  take,
  takeEvery,
  select
} from "redux-saga/effects";
import {
  ACTIVITY_LOCATION_SET,
  USER_SAVE_SIGHTINGS,
  GET_GEOLOCATION,
  ACTIVITY_CLEAR_MOOSE_ARRAY,
  WRITE_SIGHTINGS_TO_DISK,
  SYNC_SIGHTINGS_TO_DB,
  SIGHTING_SYNC_SUCCESSFUL,
} from "../actions";

function* handle_USER_CLICK_RECORD_MOOSE(action: any) {
  yield put({ type: ACTIVITY_LOCATION_SET, payload: location });
}


function* getGeoLocation(action: any) {
  const coordChannel = channel();

  console.log("in the get geo function");
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos: any) {
    console.log("in the success function");
    const crd = pos.coords;
    console.dir(crd);
    coordChannel.put({
      type: ACTIVITY_LOCATION_SET,
      payload: { latitude: crd.latitude, longitude: crd.longitude },
    });
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  navigator.geolocation.getCurrentPosition(success, error, options);



  while (true) {
    const action: any = yield take(coordChannel);
    yield put(action);
    return;
  }
}



function* write_sightings_to_disk(): Generator<any> {
  const sightings: any = yield select((state: any) => state.MooseSightingsState.allSightings);
  localStorage.setItem("Sightings", JSON.stringify(sightings));
}


function* handle_USER_SAVE_SIGHTINGS(action: any) {

  // validate input

  yield put({ type: WRITE_SIGHTINGS_TO_DISK });
}


function* handle_SYNC_SIGHTINGS_TO_DB(action: any): any {

  const dispatch = useDispatch()

  const storedSightings: any = yield select((state: any) => state.MooseSightingsState.allSightings);

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

  (async () => {
    try {
      const validatedSightings = prepareSightingsForApi(storedSightings)
      const response = await fetch('http://localhost:7080/recordSightings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sightings: validatedSightings }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(errorResponse)
      }

      const data = await response.json();
      dispatch({ type: SIGHTING_SYNC_SUCCESSFUL, payload: { data: data }})
      console.log('Sightings synced successfully:', data);
    } catch (error: any) {
      console.log(error)
    }
  })()


}

function* mooseSightingSaga() {
  try {
    yield all([
      takeEvery(GET_GEOLOCATION, getGeoLocation),
      takeEvery(USER_SAVE_SIGHTINGS, handle_USER_SAVE_SIGHTINGS),
      takeEvery(WRITE_SIGHTINGS_TO_DISK, write_sightings_to_disk),
      takeEvery(SYNC_SIGHTINGS_TO_DB, handle_SYNC_SIGHTINGS_TO_DB),
    ]);

  }
  catch (e) {
    console.log(e)
  }
}



export default mooseSightingSaga;