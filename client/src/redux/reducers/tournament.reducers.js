import { 
  FETCH_TOURNAMENTS_BEGIN,
  FETCH_TOURNAMENTS_SUCCESS,
  FETCH_TOURNAMENTS_FAILURE,
} from "../actions/tournament.actions";

const initialState = {
  tournamentsArr: [],
  loading: false,
  error: null
}

const tournamentReducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_TOURNAMENTS_BEGIN: 
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TOURNAMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        tournamentsArr: action.payload.tournamentsArr
      }
    case FETCH_TOURNAMENTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        }
    default:
      return state;
  }  
}

export default tournamentReducer;