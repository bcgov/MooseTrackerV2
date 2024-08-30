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
import { MooseSighting } from "./../../../../api/src/interfaces";

// const apiUrl = "https://api-a3e022-dev.apps.silver.devops.gov.bc.ca"; //localhost:7080
const apiUrl = "https://api-a3e022-dev.apps.silver.devops.gov.bc.ca";

function* write_sightings_to_disk(action: any): Generator<any> {
  const sightings: any = yield select(
    (state: any) => state.MooseSightingsState.allSightings
  );
  localStorage.setItem("Sightings", JSON.stringify(sightings));
  yield put({ type: CLEAR_CURRENT_MOOSE_SIGHTING });
}

function* handle_USER_SAVE_SIGHTINGS(action: any) {
  const mooseSightings: MooseSighting = yield select(
    (state: any) => state.MooseSightingsState
  );
  const errors: Set<string> = new Set();
  const { mooseCount, region, subRegion, dateFrom, dateTo } = mooseSightings;
  const currentDate = new Date();
  if (!mooseCount || Number(mooseCount) <= 0) {
    errors.add("Sighting must contain at least 1 moose.");
  }
  if (!region) {
    errors.add("Moose region cannot be empty.");
  }
  if (!subRegion) {
    errors.add("Moose subregion cannot be empty.");
  }
  if (!dateFrom || dateFrom === undefined || !dateTo || dateTo === undefined) {
    errors.add("A 'From' date and a 'To' date must be selected");
  } else {
    if (dateFrom > currentDate || dateTo > currentDate) {
      errors.add("Dates that are in the future are not valid selections");
    }
    if (dateFrom > dateTo) {
      errors.add("The 'From' date must be before or the same as the 'To' date");
    }
  }
  if (errors.size > 0) {
    const errorMessage = Array.from(errors).join(" ");
    yield put({
      type: USER_SAVE_SIGHTINGS_FAIL,
      payload: { errors: errorMessage },
    });
  } else {
    yield put({ type: USER_SAVE_SIGHTINGS_SUCCESS });
  }
}

function* handle_USER_SAVE_SIGHTINGS_SUCCESS(action: any) {
  yield put({ type: SYNC_SIGHTINGS_TO_DB });
}

function prepareSightingsForApi(sightings: any) {
  return sightings
    .filter((sighting: any) => !sighting.syncDate)
    .map((sighting: any) => {
      const [region, subRegion] = sighting.subRegion.split("-");
      return {
        clientSightingId: sighting.id,
        dateFrom: sighting.dateFrom,
        dateTo: sighting.dateTo,
        region: parseInt(region),
        subRegion: parseInt(subRegion),
        tickHairLoss: sighting.tickHairLoss,
        mooseCount: parseInt(sighting.mooseCount),
      };
    });
}

function fetchSightings(validatedSightings: any) {
  return fetch(`${apiUrl}/recordSightings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedSightings),
  }).then((response) => {
    if (!response.ok) {
      return response
        .json()
        .then((errorResponse) => Promise.reject(new Error(errorResponse)));
    }
    return response.json();
  });
}

//prepare and post sightings to db
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
