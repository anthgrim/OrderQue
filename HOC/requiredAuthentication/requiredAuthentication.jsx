export function requiredAuthentication(gssp) {
  return async (ctx) => {
    const { req } = ctx;
    const authHeaders = req.headers.authorization || req.headers.Authorization;

    if (!authHeaders?.startsWith("Bearer ")) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    const jwt = authHeaders.split(" ")[1];

    if (!jwt) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    return await gssp(ctx);
  };
}
