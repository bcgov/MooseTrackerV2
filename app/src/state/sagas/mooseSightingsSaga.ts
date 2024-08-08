import { all, put, call, takeEvery, select } from "redux-saga/effects";
import {
  USER_SAVE_SIGHTINGS,
  WRITE_SIGHTINGS_TO_DISK,
  USER_SAVE_SIGHTINGS_SUCCESS,
  USER_SAVE_SIGHTINGS_FAIL,
  SYNC_SIGHTINGS_TO_DB,
  SIGHTING_SYNC_SUCCESSFUL,
  CLEAR_CURRENT_MOOSE_SIGHTING,
} from "../actions";
import { json } from 'react-router-dom';

const apiUrl = "http://api-a3e022-dev.apps.silver.devops.gov.bc.ca"; //localhost:7080

function* write_sightings_to_disk(action: any): Generator<any> {
  const sightings: any = yield select(
    (state: any) => state.MooseSightingsState.allSightings
  );
  localStorage.setItem("Sightings", JSON.stringify(sightings));
  yield put({ type: CLEAR_CURRENT_MOOSE_SIGHTING });
}

function* handle_USER_SAVE_SIGHTINGS(action: any) {
  const mooseSightings: any = yield select(
    (state: any) => state.MooseSightingsState
  );

  // const mooseArray = mooseSightings.mooseArray;

  let errors = [];

  // if (mooseArray.length < 1) {
  //   errors.push("Moose array cannot be empty.");
  // }

  // location validation
  const mooseRegion = mooseSightings.region;
  const mooseSubregion = mooseSightings.subRegion;
  if (!mooseRegion || mooseRegion === undefined || mooseRegion === 0) {
    errors.push("Moose region cannot be empty.");
  }
  if (!mooseSubregion || mooseSubregion === undefined || mooseSubregion === 0) {
    errors.push("Moose subRegion cannot be empty.");
  }

  // date validation
  const dateFrom = mooseSightings.dateFrom;
  const dateTo = mooseSightings.dateTo;
  if (!dateFrom || dateFrom === undefined || !dateTo || dateTo === undefined){
    errors.push("A 'From' date and a 'To' date must be selected");
  }
  const currentDate = new Date();
  if(dateFrom > currentDate || dateTo > currentDate){
    errors.push("Dates that are in the future are not valid selections")
  }
  if(dateFrom > dateTo){
    errors.push("The 'From' date must be before or the same as the 'To' date")
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
      location: [sighting.location.latitude, sighting.location.longitude]
      /*mooseArray: sighting.mooseArray.map((moose) => ({
        id: moose.id,
        age: moose.age,
        gender: moose.gender || "unknown",
      })), */
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
      takeEvery(USER_SAVE_SIGHTINGS, handle_USER_SAVE_SIGHTINGS),
      takeEvery(WRITE_SIGHTINGS_TO_DISK, write_sightings_to_disk),
      takeEvery(
        USER_SAVE_SIGHTINGS_SUCCESS,
        handle_USER_SAVE_SIGHTINGS_SUCCESS
      ),
      takeEvery(SYNC_SIGHTINGS_TO_DB, handle_SYNC_SIGHTINGS_TO_DB),
      takeEvery(SIGHTING_SYNC_SUCCESSFUL, write_sightings_to_disk),
    ]);
  } catch (e) {
    console.log(e);
  }
}

export default mooseSightingSaga;
