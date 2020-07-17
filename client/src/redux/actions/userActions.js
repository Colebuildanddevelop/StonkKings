export const FETCH_USER_INFORMATION_BEGIN = "FETCH_USER_INFORMATION_BEGIN";
export const FETCH_USER_INFORMATION_SUCCESS = "FETCH_USER_INFORMATION_SUCCESS";
export const FETCH_USER_INFORMATION_FAILURE = "FETCH_USER_INFORMATION_FAILURE";

export const SIGN_UP = "SIGN_UP"; 
export const SIGN_IN = "SIGN_IN";

export const fetchUserInfoBegin = () => ({
  type: FETCH_USER_INFORMATION_BEGIN
});

export const fetchUserInfoSuccess = userInfo => ({
  type: FETCH_USER_INFORMATION_SUCCESS,
  payload: { userInfo }
});

export const fetchUserInfoFailure = err => ({
  type: FETCH_USER_INFORMATION_FAILURE,
  payload: { err }
});

export const signIn = (credentials) => {
  return dispatch => {
    dispatch(fetchUserInfoBegin());
    return fetch("http://localhost:3000/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password
      })
    })
      .then(res => res.json())
      .then(userInfo => {
        dispatch(fetchUserInfoSuccess(userInfo))
        return userInfo
      })
      .catch(err => dispatch(fetchUserInfoFailure(err)));
  }
}

export const signUp = user => ({
  type: SIGN_IN,
  payload: { user }
});