import { useRouter } from "next/router";
import axios from "axios";

const isBrowser = () => typeof window !== "undefined";

const Protected = ({ children }) => {
  const router = useRouter();
  let token;
  let isValid;

  const validateToken = async (token) => {
    const res = await axios.get("/api/verifyToken", { token });
    return res.data.isValid;
  };

  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("jwt");
    isValid = validateToken(token);
    console.log(isValid);
  }

  let unprotectedRoutes = [
    "/",
    "/signIn",
    "/signUp",
    "/user/signIn",
    "/user/signUp",
    "/restaurant/signIn",
    "/restaurant/signUp",
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser && token === "" && pathIsProtected) {
    router.push({ pathname: "/signIn" });
  }

  return children;
};

export default Protected;
