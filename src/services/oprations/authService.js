import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../api";

const { LOGIN_API, SIGNUP_API } = authEndpoints;

export function register(username, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Wait Connecting to backend..");
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        password,
      });

      console.log("SIGNUP API RESPONSE............", response);

      // Check if the backend returned an error
      if (response.data.error) {
        throw new Error(response.data.error);
      }

      // Assuming a successful signup returns { message: 'Signup successful' }
      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error("Signup Failed: " + error.message);
      navigate("/signup");
    }
    toast.dismiss(toastId);
  };
}

export function login(username, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Wait Connecting to backend..");
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        username,
        password,
      });

      console.log("LOGIN API RESPONSE............", response);

      // Check if the token exists in the response
      if (!response.data.token) {
        throw new Error(response.data.error || "Invalid response from server");
      }

      toast.success("Login Successful");
      localStorage.setItem("token", JSON.stringify(response.data.token));
      // You can dispatch additional actions to set user state if needed
      // Navigate based on user role or default route
      navigate("/");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed: " + error.message);
    }
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
}
