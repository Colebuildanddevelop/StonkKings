import { 
  CREATE_ENTRY_BEGIN,
  CREATE_ENTRY_SUCCESS,
  CREATE_ENTRY_FAILURE,
  FETCH_ENTRY_INFORMATION_BEGIN,
  FETCH_ENTRY_INFORMATION_SUCCESS,
  FETCH_ENTRY_INFORMATION_FAILURE
} from "../actions/entry.actions";

const initialState = {
  entries: [],
  createdEntry: [],
  loading: false,
  error: null
}

const entryReducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_ENTRY_INFORMATION_BEGIN: 
      return {
        ...state,
        loading: true
      };
    case FETCH_ENTRY_INFORMATION_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload.entries
      }
    case FETCH_ENTRY_INFORMATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case CREATE_ENTRY_BEGIN:
      return {
        ...state,
        loading: true
      }
    case CREATE_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        createdEntry: action.payload.entryInfo
      }
    case CREATE_ENTRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }  
}

export default entryReducer;