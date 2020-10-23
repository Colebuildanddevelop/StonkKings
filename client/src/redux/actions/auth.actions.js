import { SERVER_URL } from "../../config";
export const FETCH_USER_INFORMATION_BEGIN = "FETCH_USER_INFORMATION_BEGIN";
export const FETCH_USER_INFORMATION_SUCCESS = "FETCH_USER_INFORMATION_SUCCESS";
export const FETCH_USER_INFORMATION_FAILURE = "FETCH_USER_INFORMATION_FAILURE";
export const END_USER_SESSION = "END_USER_SESSION";

const fetchUserInfoBegin = () => ({
  type: FETCH_USER_INFORMATION_BEGIN,
});

const fetchUserInfoSuccess = (userInfo) => ({
  type: FETCH_USER_INFORMATION_SUCCESS,
  payload: { userInfo },
});

const fetchUserInfoFailure = (error) => ({
  type: FETCH_USER_INFORMATION_FAILURE,
  payload: { error },
});

const endUserSession = () => ({
  type: END_USER_SESSION,
});

export const auth = (credentials, signInOrUp) => {
  return async (dispatch) => {
    dispatch(fetchUserInfoBegin());
    try {
      const result = await fetch(`${SERVER_URL}/api/auth/${signInOrUp}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...credentials,
        }),
      });
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.token = userInfo.accessToken;
        localStorage.userId = userInfo._id;
        dispatch(fetchUserInfoSuccess(userInfo));
      } else {
        const error = await result.json();
        dispatch(fetchUserInfoFailure(error));
      }
    } catch (err) {
      dispatch(fetchUserInfoFailure(err));
    }
  };
};

export const loginWithToken = (token) => {
  return async (dispatch) => {
    dispatch(fetchUserInfoBegin());
    try {
      const result = await fetch(`${SERVER_URL}/api/auth/loginWithToken`, {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.token = userInfo.accessToken;
        localStorage.userId = userInfo._id;
        dispatch(fetchUserInfoSuccess(userInfo));
      } else {
        const error = await result.json();
        dispatch(fetchUserInfoFailure(error));
      }
    } catch (err) {
      dispatch(fetchUserInfoFailure(err));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    dispatch(endUserSession());
    localStorage.clear();
  };
};
