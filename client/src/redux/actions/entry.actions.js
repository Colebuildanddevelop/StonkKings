export const FETCH_ENTRY_INFORMATION_BEGIN = "FETCH_ENTRY_INFORMATION_BEGIN";
export const FETCH_ENTRY_INFORMATION_SUCCESS = "FETCH_ENTRY_INFORMATION_SUCCESS";
export const FETCH_ENTRY_INFORMATION_FAILURE = "FETCH_ENTRY_INFORMATION_FAILURE";

const fetchEntryInfoBegin = () => ({
  type: FETCH_ENTRY_INFORMATION_BEGIN 
});

const fetchEntryInfoSuccess = entryInfo => ({
  type: FETCH_ENTRY_INFORMATION_SUCCESS,
  payload: { entryInfo }
});

const fetchEntryInfoFailure = err => ({
  type: FETCH_ENTRY_INFORMATION_FAILURE,
  payload: { err }
});

export const getEntryByUsernameAndTournamentName = (userId, tournamentId) => {
  return dispatch => {
    dispatch(fetchEntryInfoBegin());
    return fetch(`http://localhost:3000/api/entries/${userId}/${tournamentId}`)
    .then(res => res.json())
    .then(entryInfo => {
      console.log(entryInfo)
      dispatch(fetchEntryInfoSuccess(entryInfo));
      return entryInfo;
    })
   .catch(err => {
     dispatch(fetchEntryInfoFailure(err))
    });
  };
};

// export const getEntrants = (credentials, signInOrUp) => {
  // return dispatch => {
    // dispatch(fetchUserInfoBegin());
    // return fetch(`http://localhost:3000/api/auth/${signInOrUp}`, {
      // method: "POST",
      // headers: {
        // "Content-Type": "application/json"
      // },
      // body: JSON.stringify({
        // ...credentials
      // })
    // })
    // .then(res => res.json())
    // .then(userInfo => {
      // dispatch(fetchUserInfoSuccess(userInfo))
      // console.log(userInfo)
      // localStorage.token = userInfo.accessToken
      // return userInfo
    // })
    // .catch(err => dispatch(fetchUserInfoFailure(err)));
  // };
// };

export const CREATE_ENTRY_BEGIN = "CREATE_ENTRY_BEGIN";
export const CREATE_ENTRY_SUCCESS = "CREATE_ENTRY_SUCCESS";
export const CREATE_ENTRY_FAILURE = "CREATE_ENTRY_FAILURE";

const createEntryBegin = () => ({
  type: CREATE_ENTRY_BEGIN
});

const createEntrySuccess = entryInfo => ({
  type: CREATE_ENTRY_SUCCESS,
  payload: { entryInfo }
});

const createEntryFailure = err => ({
  type: CREATE_ENTRY_FAILURE,
  payload: { err }
});

export const createEntry = (tournamentId, token) => {
  return dispatch => {
    dispatch(createEntryBegin());
    return fetch("http://localhost:3000/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({
        tournamentId: tournamentId
      })
    })
    .then(res => res.json())
    .then(entryInfo => {
      dispatch(createEntrySuccess(entryInfo))
      return entryInfo;
    })
    .catch(err => {
      console.log(err.body)
      dispatch(createEntryFailure(err))
    });
  };
};

export const FETCH_ENTRIES_BY_TOURNAMENT_ID_BEGIN = "FETCH_ENTRIES_BY_TOURNAMENT_ID_BEGIN";
export const FETCH_ENTRIES_BY_TOURNAMENT_ID_SUCCESS = "FETCH_ENTRIES_BY_TOURNAMENT_ID_SUCCESS";
export const FETCH_ENTRIES_BY_TOURNAMENT_ID_FAILURE = "FETCH_ENTRIES_BY_TOURNAMENT_ID_FAILURE";

const fetchEntriesByTournamentIdBegin = () => ({
  type: FETCH_ENTRIES_BY_TOURNAMENT_ID_BEGIN 
});

const fetchEntriesByTournamentIdSuccess = entriesArr => ({
  type: FETCH_ENTRIES_BY_TOURNAMENT_ID_SUCCESS,
  payload: { entriesArr }
});

const fetchEntriesByTournamentIdFailure = error => ({
  type: FETCH_ENTRIES_BY_TOURNAMENT_ID_FAILURE,
  payload: { error }
});

export const getEntriesByTournamentId = (tournamentId) => dispatch => {
  dispatch(fetchEntriesByTournamentIdBegin())
  return fetch(`http://localhost:3000/api/entries/tournament/${tournamentId}`)
    .then(res => res.json())
    .then(entriesArr => {
      dispatch(fetchEntriesByTournamentIdSuccess(entriesArr))
    })
    .catch(error => dispatch(fetchEntriesByTournamentIdFailure(error)));
};