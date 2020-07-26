import { 
  CREATE_ENTRY_BEGIN,
  CREATE_ENTRY_SUCCESS,
  CREATE_ENTRY_FAILURE,
  FETCH_ENTRY_INFORMATION_BEGIN,
  FETCH_ENTRY_INFORMATION_SUCCESS,
  FETCH_ENTRY_INFORMATION_FAILURE,
  FETCH_ENTRIES_BY_TOURNAMENT_ID_BEGIN,
  FETCH_ENTRIES_BY_TOURNAMENT_ID_SUCCESS,
  FETCH_ENTRIES_BY_TOURNAMENT_ID_FAILURE
} from "../actions/entry.actions";

const initialState = {
  createdEntry: null,
  currentEntry: null,
  tournamentEntries: [],
  loadingCurrentEntry: false,
  loadingCreatedEntry: false,
  loadingTournamentEntries: false,
  currentEntryError: null,
  createdEntryError: null,
  tournamentEntriesError: null
}
// make errors false on success and null on begin
const entryReducer = (state=initialState, action) => {
  switch(action.type) {
    case FETCH_ENTRY_INFORMATION_BEGIN: 
      return {
        ...state,
        loadingCurrentEntry: true,
        currentEntryError: null
      };
    case FETCH_ENTRY_INFORMATION_SUCCESS:
      return {
        ...state,
        loadingCurrentEntry: false,
        currentEntry: action.payload.entryInfo,
        currentEntryError: false
      }
    case FETCH_ENTRY_INFORMATION_FAILURE:
      return {
        ...state,
        loadingCurrentEntry: false,
        currentEntryError: action.payload.error
      }
    case CREATE_ENTRY_BEGIN:
      return {
        ...state,
        loadingCreatedEntry: true,
        createdEntryError: null
      }
    case CREATE_ENTRY_SUCCESS:
      return {
        ...state,
        loadingCreatedEntry: false,
        createdEntry: action.payload.entryInfo,
        createdEntryError: false
      }
    case CREATE_ENTRY_FAILURE:
      return {
        ...state,
        loadingCreatedEntry: false,
        createdEntryError: action.payload.error
      }
    case FETCH_ENTRIES_BY_TOURNAMENT_ID_BEGIN: 
      return {
        ...state,
        loadingTournamentEntries: true,
        tournamentEntriesError: null
      }
    case FETCH_ENTRIES_BY_TOURNAMENT_ID_SUCCESS:
      return {
        ...state,
        loadingTournamentEntries: false,
        tournamentEntries: action.payload.entriesArr,
        tournamentEntriesError: false
      }
    case FETCH_ENTRIES_BY_TOURNAMENT_ID_FAILURE: 
      return {
        ...state,
        loadingTournamentEntries: false,
        tournamentEntriesError: action.payload.error
      }
    default:
      return state;
  }  
}

export default entryReducer;