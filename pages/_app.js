import Layout from "../components/Layout";
import Protected from "../components/Protected";
import { AuthProvider } from "../context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Protected>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Protected>
      </AuthProvider>
      <ToastContainer theme="dark" />
    </>
  );
}

export default MyApp;
