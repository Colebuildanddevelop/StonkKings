import { 
  FETCH_USER_INFORMATION_BEGIN,
  FETCH_USER_INFORMATION_SUCCESS,
  FETCH_USER_INFORMATION_FAILURE,
} from "../actions/auth.actions";

const initialState = {
  currentUser: null,
  loggedIn: false,
  loading: false,
  error: null
}

const authReducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_USER_INFORMATION_BEGIN: 
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_USER_INFORMATION_SUCCESS:
      return {
        loading: false,
        loggedIn: true,
        error: false,
        currentUser: action.payload.userInfo
      }
    case FETCH_USER_INFORMATION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error
        }
    default:
      return state;
  }  
}

export default authReducer;