import { channel } from "redux-saga";
import { all, put, take, takeEvery, select } from "redux-saga/effects";
import {
  ACTIVITY_LOCATION_SET,
  GET_GEOLOCATION,
  USER_CLICK_SUBMIT_SIGHTING,
  USER_UPDATE_SIGHTINGS,
} from "../actions";
import { selectActivity } from "../reducers/activity";

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

function* handle_USER_CLICK_SUBMIT_SIGHTING() {
  const activityState = yield select(selectActivity);
  const sighting = {
    clientId: null,
    sightingId: null,
    date: Date.now(),
    lat: activityState.lat,
    long: activityState.long,
    mooseArray: activityState.mooseArray,
  };

  yield put({
    type: USER_UPDATE_SIGHTINGS,
    payload: {
      sighting: sighting,
    },
  });
}

function* mooseSightingSaga() {
  yield all([
    takeEvery(GET_GEOLOCATION, getGeoLocation),
    takeEvery(USER_CLICK_SUBMIT_SIGHTING, handle_USER_CLICK_SUBMIT_SIGHTING),
  ]);
}

export default mooseSightingSaga;
