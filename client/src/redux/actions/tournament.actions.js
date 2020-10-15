import { SERVER_URL } from "../../config";
export const FETCH_TOURNAMENTS_BEGIN = "FETCH_TOURNAMENTS_BEGIN";
export const FETCH_TOURNAMENTS_SUCCESS = "FETCH_TOURNAMENTS_SUCCESS";
export const FETCH_TOURNAMENTS_FAILURE = "FETCH_TOURNAMENTS_FAILURE";

const fetchTouranmentsBegin = () => ({
  type: FETCH_TOURNAMENTS_BEGIN,
});

const fetchTournamentsSuccess = (tournamentsArr) => ({
  type: FETCH_TOURNAMENTS_SUCCESS,
  payload: { tournamentsArr },
});

const fetchTournamentsFailure = (err) => ({
  type: FETCH_TOURNAMENTS_FAILURE,
  payload: { err },
});

export const getTournaments = () => (dispatch) => {
  dispatch(fetchTouranmentsBegin());
  return fetch(`${SERVER_URL}/api/tournaments`)
    .then((res) => res.json())
    .then((tournamentsArr) => {
      dispatch(fetchTournamentsSuccess(tournamentsArr));
    })
    .catch((err) => dispatch(fetchTournamentsFailure(err)));
};
