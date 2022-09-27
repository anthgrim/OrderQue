import Meta from "./Meta";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <main>{children}</main>
    </>
  );
};

export default Layout;
