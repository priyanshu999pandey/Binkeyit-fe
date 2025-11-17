// src/api/FetchUserDetails.js
import Axios from "./Axios"; // ✅ use your interceptor-based Axios

const FetchUserDetails = async () => {
  try {
    const res = await Axios.get("user/user-detail"); // baseURL already set in Axios.js
    // console.log("response :::", res.data);

    return res.data; // only return useful data
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null; // or handle it however you want
  }
};

export default FetchUserDetails;
