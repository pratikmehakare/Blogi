const BASE_URL = process.env.REACT_APP_BASE_URL
//const BASE_URL = "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",

}

// BLOG ENDPOINTS
export const blogEndpoints = {
    CREATE_POST_API: BASE_URL + "/posts",
    UPDATE_POST_API: BASE_URL + "/posts",
    GET_POST_API: BASE_URL + "/posts",
    DELETE_POST_API: BASE_URL + "/posts",
}