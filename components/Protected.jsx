import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

const isBrowser = () => typeof window !== "undefined";

const Protected = ({ children }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  console.log(router.pathname);

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

  if (isBrowser && !currentUser && pathIsProtected) {
    router.push({ pathname: "/" });
  }

  return children;
};

export default Protected;
