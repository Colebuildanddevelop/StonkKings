import {
  FETCH_TOURNAMENTS_BEGIN,
  FETCH_TOURNAMENTS_SUCCESS,
  FETCH_TOURNAMENTS_FAILURE,
} from "../actions/tournament.actions";

const initialState = {
  tournamentsArr: [],
  loadingTournaments: false,
  tournamentsError: null,
};

const tournamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOURNAMENTS_BEGIN:
      return {
        ...state,
        loadingTournaments: true,
        tournamentsError: null,
      };
    case FETCH_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        loadingTournaments: false,
        tournamentsError: false,
        tournamentsArr: action.payload.tournamentsArr,
      };
    case FETCH_TOURNAMENTS_FAILURE:
      return {
        ...state,
        loadingTournaments: false,
        tournamentsError: action.payload.error,
      };
    default:
      return state;
  }
};

export default tournamentReducer;
