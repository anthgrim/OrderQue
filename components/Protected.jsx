import { useRouter } from "next/router";
import Router from "next/router";

const isBrowser = () => typeof window !== "undefined";

const Protected = ({ children }) => {
  const router = useRouter();
  let pathIsProtected = false;
  let currentUser;

  let unprotectedRoutes = [
    "/",
    "/about",
    "/signIn",
    "/signUp",
    "/user/signIn",
    "/user/signUp",
    "/restaurant/signIn",
    "/restaurant/signUp",
    "/api-doc",
  ];

  if (typeof window !== "undefined") {
    pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;
    currentUser = localStorage.getItem("currentUser");
  }

  if (isBrowser && !currentUser && pathIsProtected) {
    Router.push({ pathname: "/signIn" });
  } else {
    return children;
  }
};

export default Protected;
