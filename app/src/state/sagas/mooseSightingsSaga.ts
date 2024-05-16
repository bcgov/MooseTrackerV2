import { Geolocation } from '@capacitor/geolocation';
import { channel } from "redux-saga";
import { useDispatch } from "react-redux";
import { all, put, call, take, takeEvery, select } from "redux-saga/effects";
import {
  ACTIVITY_LOCATION_SET,
  USER_SAVE_SIGHTINGS,
  GET_GEOLOCATION,
  ACTIVITY_CLEAR_MOOSE_ARRAY,
  WRITE_SIGHTINGS_TO_DISK,
  USER_SAVE_SIGHTINGS_SUCCESS,
  USER_SAVE_SIGHTINGS_FAIL,
  SYNC_SIGHTINGS_TO_DB,
  SIGHTING_SYNC_SUCCESSFUL,
  MANUAL_REGION_CHOICE,
} from "../actions";
import { json } from 'react-router-dom';

const apiUrl = "http://api-a3e022-dev.apps.silver.devops.gov.bc.ca"; //localhost:7080

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
    coordChannel.put({
      type: ACTIVITY_LOCATION_SET,
      payload: { latitude: crd.latitude, longitude: crd.longitude },
    });
  }

  function error(err: any) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  Geolocation.checkPermissions().then((permissionReturnval)=> {
    console.log(JSON.stringify(permissionReturnval))
    Geolocation.getCurrentPosition(options).then((returnval) => {
      success(returnval);
    });
  });

  //navigator.geolocation.getCurrentPosition(success, error, options);

  while (true) {
    const action: any = yield take(coordChannel);
    yield put(action);
    return;
  }
}

function* handle_MANUAL_REGION_CHOICE(action:any) {
  yield put({ type: MANUAL_REGION_CHOICE, payload: { data: data } });
}

function* write_sightings_to_disk(action: any): Generator<any> {
  const sightings: any = yield select(
    (state: any) => state.MooseSightingsState.allSightings
  );
  localStorage.setItem("Sightings", JSON.stringify(sightings));
}

function* handle_USER_SAVE_SIGHTINGS(action: any) {
  const mooseSightings: any = yield select(
    (state: any) => state.MooseSightingsState
  );

  const mooseArray = mooseSightings.mooseArray;
  const mooseLocation = mooseSightings.location;

  let errors = [];

  if (mooseArray.length < 1) {
    errors.push("Moose array cannot be empty.");
  }
  if (!mooseLocation || mooseLocation === undefined || mooseLocation === "") {
    errors.push("Moose location cannot be empty.");
  }

  if (errors.length) {
    yield put({ type: USER_SAVE_SIGHTINGS_FAIL, payload: { errors: errors } });
  } else {
    yield put({ type: USER_SAVE_SIGHTINGS_SUCCESS });
  }
}

function* handle_USER_SAVE_SIGHTINGS_SUCCESS(action: any) {
  yield put({ type: WRITE_SIGHTINGS_TO_DISK });
}

function prepareSightingsForApi(sightings: any) {
  return sightings.map((sighting) => {
    return {
      id: sighting.id,
      dateOfSighting: sighting.dateOfSighting,
      status: sighting.status,
      syncDate: Date.now(),
      location: [sighting.location.latitude, sighting.location.longitude],
      mooseArray: sighting.mooseArray.map((moose) => ({
        id: moose.id,
        age: moose.age,
        gender: moose.gender || "unknown",
      })),
    };
  });
}

function fetchSightings(validatedSightings: any) {
  return fetch(`${apiUrl}/recordSightings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sightings: validatedSightings }),
  }).then((response) => {
    if (!response.ok) {
      return response
        .json()
        .then((errorResponse) => Promise.reject(new Error(errorResponse)));
    }
    return response.json();
  });
}

function* handle_SYNC_SIGHTINGS_TO_DB(action: any) {
  try {
    const storedSightings = yield select(
      (state) => state.MooseSightingsState.allSightings
    );
    const validatedSightings = prepareSightingsForApi(storedSightings);

    const data = yield call(fetchSightings, validatedSightings);

    yield put({ type: SIGHTING_SYNC_SUCCESSFUL, payload: { data: data } });
    console.log("Sightings synced successfully:", data);
  } catch (error) {
    console.log(error);
  }
}

function* mooseSightingSaga() {
  try {
    yield all([
      takeEvery(GET_GEOLOCATION, getGeoLocation),
      takeEvery(USER_SAVE_SIGHTINGS, handle_USER_SAVE_SIGHTINGS),
      takeEvery(WRITE_SIGHTINGS_TO_DISK, write_sightings_to_disk),
      takeEvery(
        USER_SAVE_SIGHTINGS_SUCCESS,
        handle_USER_SAVE_SIGHTINGS_SUCCESS
      ),
      takeEvery(SYNC_SIGHTINGS_TO_DB, handle_SYNC_SIGHTINGS_TO_DB),
      takeEvery(SIGHTING_SYNC_SUCCESSFUL, write_sightings_to_disk),
      takeEvery(MANUAL_REGION_CHOICE, handle_MANUAL_REGION_CHOICE),
    ]);
  } catch (e) {
    console.log(e);
  }
}

export default mooseSightingSaga;
