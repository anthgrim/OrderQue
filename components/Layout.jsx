import Meta from "./Meta";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
