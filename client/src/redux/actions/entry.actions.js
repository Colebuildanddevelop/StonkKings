import { SERVER_URL } from "../../config";
export const FETCH_ENTRY_INFORMATION_BEGIN = "FETCH_ENTRY_INFORMATION_BEGIN";
export const FETCH_ENTRY_INFORMATION_SUCCESS =
  "FETCH_ENTRY_INFORMATION_SUCCESS";
export const FETCH_ENTRY_INFORMATION_FAILURE =
  "FETCH_ENTRY_INFORMATION_FAILURE";

const fetchEntryInfoBegin = () => ({
  type: FETCH_ENTRY_INFORMATION_BEGIN,
});

const fetchEntryInfoSuccess = (entryInfo) => ({
  type: FETCH_ENTRY_INFORMATION_SUCCESS,
  payload: { entryInfo },
});

const fetchEntryInfoFailure = (err) => ({
  type: FETCH_ENTRY_INFORMATION_FAILURE,
  payload: { err },
});

export const getEntryByUsernameAndTournamentName = (userId, tournamentId) => {
  return async (dispatch) => {
    dispatch(fetchEntryInfoBegin());
    try {
      const result = await fetch(
        `${SERVER_URL}/api/entries/${userId}/${tournamentId}`
      );
      const entryInfo = await result.json();
      dispatch(fetchEntryInfoSuccess(entryInfo));
    } catch (err) {
      dispatch(fetchEntryInfoFailure(err));
    }
  };
};

export const CREATE_ENTRY_BEGIN = "CREATE_ENTRY_BEGIN";
export const CREATE_ENTRY_SUCCESS = "CREATE_ENTRY_SUCCESS";
export const CREATE_ENTRY_FAILURE = "CREATE_ENTRY_FAILURE";

const createEntryBegin = () => ({
  type: CREATE_ENTRY_BEGIN,
});

const createEntrySuccess = (entryInfo) => ({
  type: CREATE_ENTRY_SUCCESS,
  payload: { entryInfo },
});

const createEntryFailure = (err) => ({
  type: CREATE_ENTRY_FAILURE,
  payload: { err },
});

export const createEntry = (tournamentId, token) => {
  return async (dispatch) => {
    dispatch(createEntryBegin());
    try {
      const result = await fetch(`${SERVER_URL}/api/entries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          tournamentId: tournamentId,
        }),
      });
      const entryInfo = await result.json();
      dispatch(createEntrySuccess(entryInfo));
    } catch (err) {
      dispatch(createEntryFailure(err));
    }
  };
};

export const FETCH_ENTRIES_BY_TOURNAMENT_ID_BEGIN =
  "FETCH_ENTRIES_BY_TOURNAMENT_ID_BEGIN";
export const FETCH_ENTRIES_BY_TOURNAMENT_ID_SUCCESS =
  "FETCH_ENTRIES_BY_TOURNAMENT_ID_SUCCESS";
export const FETCH_ENTRIES_BY_TOURNAMENT_ID_FAILURE =
  "FETCH_ENTRIES_BY_TOURNAMENT_ID_FAILURE";

const fetchEntriesByTournamentIdBegin = () => ({
  type: FETCH_ENTRIES_BY_TOURNAMENT_ID_BEGIN,
});

const fetchEntriesByTournamentIdSuccess = (entriesArr) => ({
  type: FETCH_ENTRIES_BY_TOURNAMENT_ID_SUCCESS,
  payload: { entriesArr },
});

const fetchEntriesByTournamentIdFailure = (error) => ({
  type: FETCH_ENTRIES_BY_TOURNAMENT_ID_FAILURE,
  payload: { error },
});

export const getEntriesByTournamentId = (tournamentId) => async (dispatch) => {
  dispatch(fetchEntriesByTournamentIdBegin());
  try {
    const result = await fetch(
      `${SERVER_URL}/api/entries/tournament/${tournamentId}`
    );
    const entriesArr = await result.json();
    dispatch(fetchEntriesByTournamentIdSuccess(entriesArr));
  } catch (err) {
    dispatch(fetchEntriesByTournamentIdFailure(err));
  }
};
