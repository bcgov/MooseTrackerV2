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
import { MooseSighting } from "../../interfaces/interfaces";
import { CapacitorHttp } from "@capacitor/core";

const apiUrl = import.meta.env.VITE_API_ENDPOINT;

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
  const errors: Set<string> = new Set();
  const {
    bullCount,
    cowCount,
    calfCount,
    unknownCount,
    region,
    subRegion,
    date,
  } = mooseSightings;
  const currentDate = new Date();
  const totalMooseCount =
    Number(bullCount) +
    Number(cowCount) +
    Number(calfCount) +
    Number(unknownCount);
  if (Number(totalMooseCount) < 0) {
    errors.add("Sighting must contain at least 1 moose.");
  }
  if (!region) {
    errors.add("Moose region cannot be empty.");
  }
  if (!subRegion) {
    errors.add("Moose subregion cannot be empty.");
  }
  if (date === undefined) {
    errors.add("A date must be selected");
  } else if (date > currentDate) {
    errors.add("Dates that are in the future are not valid selections");
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

function prepareSightingsForApi(sightings: MooseSighting[]) {
  return sightings
    .filter((sighting: MooseSighting) => !sighting.syncDate)
    .map((sighting: MooseSighting) => {
      const [region, subRegion] = sighting.subRegion.split("-");
      return {
        clientSightingId: sighting.id,
        date: sighting.date,
        hoursOut: Number(sighting.hoursOut),
        region: Number(region),
        subRegion: Number(subRegion),
        tickHairLoss: Number(sighting.tickHairLoss),
        bullCount: Number(sighting.bullCount),
        cowCount: Number(sighting.cowCount),
        calfCount: Number(sighting.calfCount),
        unknownCount: Number(sighting.unknownCount),
      };
    });
}

async function fetchSightings(validatedSightings: any) {
  try {
    const response = await CapacitorHttp.post({
      url: `${apiUrl}/recordSightings`,
      headers: {
        "Content-Type": "application/json",
      },
      data: validatedSightings, // No need to stringify the body, CapacitorHttp handles it
    });

    if (response.status !== 200) {
      throw new Error(response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

//prepare and post sightings to db
function* handle_SYNC_SIGHTINGS_TO_DB(action: any) {
  try {
    const storedSightings: MooseSighting[] = yield select(
      (state) => state.MooseSightingsState.allSightings
    );
    const validatedSightings = prepareSightingsForApi(storedSightings);

    const data: any[] = yield call(fetchSightings, validatedSightings);

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
