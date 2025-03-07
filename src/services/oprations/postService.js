import { apiConnector } from "../apiConnector";
import { blogEndpoints } from "../api";

const { GET_POST_API, UPDATE_POST_API, DELETE_POST_API, CREATE_POST_API } = blogEndpoints;

export const updatePost = async (id, updatedData,token) => {
  let result = null;
  try {
    const response = await apiConnector("PUT", `${UPDATE_POST_API}/${id}`, updatedData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response || !response.data) {
      throw new Error("Unexpected response format.");
    }
    result = response.data;
  } catch (error) {
    console.error("UPDATE_POST_API ERROR:", error);
    throw error;
  }
  return result;
};

export const createPost = async (data,token) => {
  let result = null;
  try {
    console.log("code reach here",CREATE_POST_API)
    const response = await apiConnector("POST", CREATE_POST_API, data,{
      Authorization: `Bearer ${token}`,
    });
    console.log("code reach here 2")
    if (!response || !response.data) {
      throw new Error("Unexpected response format.");
    }
    result = response.data;
  } catch (error) {
    console.error("CREATE_POST_API ERROR:", error);
    throw error;
  }
  return result;
};

export const deletePost = async (id,token) => {
  let result = null;
  try {
    const response = await apiConnector("DELETE", `${DELETE_POST_API}/${id}`,null,{
      Authorization: `Bearer ${token}`,
    });
    // Check if the response contains the expected message from the backend.
    if (!response?.data?.message || response.data.message !== "Post deleted") {
      throw new Error(response?.data?.message || "Failed to delete post");
    }
    result = response.data;
  } catch (error) {
    console.error("DELETE_POST_API ERROR:", error);
    throw error;
  }
  return result;
};

export const getAllPost = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_POST_API);
    if (!response?.data?.posts) {
      throw new Error("Unexpected response format.");
    }
    result = response.data.posts;
  } catch (error) {
    console.error("GET_POST_API ERROR:", error);
    throw error;
  }
  return result;
};
