import { request } from "../utils/request";

export function loginUser(user) {
  return dispatch => {
    return request().post("/users/login", user)
    .then(res => {
      const curUser = JSON.parse(window.atob(res.data.token.split(".")[1]));
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: "LOGIN_USER",
        payload: { ...curUser, isAuthentiation: true },
      });
    });
  };
}

export function registerUser(user) {
  return () => {
    return request().post("/users/register", user);
  };
}

export function forgotPassword(email) {
  return () => {
    return request().get(`/users/forgotpassword/${email}`);
  };
}

export function logoutUser() {
  return dispatch => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT_USER",
      payload: { isAuthentiation: false },
    });
  };
}

export function checkAuth() {
  return dispatch => {
    return request().get("/users/checkAuth")
    .then(() => {
      const token = localStorage.getItem("token");
      const curUser = JSON.parse(window.atob(token.split(".")[1]));
      dispatch({
        type: "LOGIN_USER",
        payload: { ...curUser, isAuthentiation: true },
      });
    })
    .catch(() => {
      dispatch({
        type: "LOGIN_USER",
        payload: { isAuthentiation: false },
      });
    });
  };
}

export function changePassword(user, token) {
  return () => {
    return request({
      Authorization: `Bearer ${token}`,
    })
    .put("/users/changePassword", user)
    .then(res => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
    });
  };
}

export function checkToken(token) {
  return request({
    Authorization: `Bearer ${token}`,
  }).get("/users/checkAuth");
}

export function confirmAccount(token) {
  localStorage.setItem("token", token);
  return request().put("/users/confirm")
  .then(res => {
    localStorage.setItem("token", res.data.token);
  });
}
