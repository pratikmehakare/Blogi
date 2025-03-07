import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../api";
import { login as loginAction, logout as logoutAction } from "../../redux/Slices/UserSlice"; // adjust path if needed

const { LOGIN_API, SIGNUP_API } = authEndpoints;

export function register(username, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Wait Connecting to backend..");
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        username,
        password,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
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

      if (!response.data.token) {
        throw new Error(response.data.error || "Invalid response from server");
      }

      toast.success("Login Successful");
      localStorage.setItem("token", JSON.stringify(response.data.token));
      
      // Dispatch the user login action to update Redux state.
      // Here, response.data can include additional user info along with the token.
      dispatch(loginAction(response.data));
      navigate("/");
    } catch (error) {
      toast.error("Login Failed: " + error.message);
    }
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutAction());
    toast.success("Logged Out");
    navigate("/");
  };
}
