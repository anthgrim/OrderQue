import axios from "../utils/axios";
import useAuth from "./useAuth";
const USER_REFRESH_TOKEN_ENDPOINT = "/api/user/refreshToken";
const RESTAURANT_REFRESH_TOKEN_ENDPOINT = "/api/restaurant/refreshToken";

/**
 * @desc   Use refresh token endpoint
 */
const useRefreshToken = () => {
  const { setAuth } = useAuth();
  let endpoint;
  let accountType;

  if (typeof window !== "undefined") {
    accountType = localStorage.getItem("accountType");
  }

  if (accountType === "User") {
    endpoint = USER_REFRESH_TOKEN_ENDPOINT;
  } else if (accountType === "Restaurant") {
    endpoint = RESTAURANT_REFRESH_TOKEN_ENDPOINT;
  } else {
    return;
  }

  const refresh = async () => {
    const response = await axios.get(endpoint, {
      withCredentials: true,
    });

    setAuth((prev) => ({ ...prev, accessToken: response.data.accessToken }));
    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
