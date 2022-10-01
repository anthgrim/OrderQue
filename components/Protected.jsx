import { useRouter } from "next/router";

const isBrowser = () => typeof window !== "undefined";

const Protected = ({ children }) => {
  const router = useRouter();
  let token;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("accessToken");
  }

  let unprotectedRoutes = [
    "/",
    "/about",
    "/signIn",
    "/signUp",
    "/user/signIn",
    "/user/signUp",
    "/restaurant/signIn",
    "/restaurant/signUp",
  ];

  let pathIsProtected = unprotectedRoutes.indexOf(router.pathname) === -1;

  if (isBrowser && !token && pathIsProtected) {
    router.push({ pathname: "/signIn" });
  }

  return children;
};

export default Protected;
