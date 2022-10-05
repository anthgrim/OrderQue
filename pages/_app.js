import { AuthProvider } from "../context/AuthProvider";
import { DataProvider } from "../context/DataProvider";
import Layout from "../components/Layout";
import Protected from "../components/Protected";
import { ToastContainer } from "react-toastify";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Protected>
          <DataProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DataProvider>
        </Protected>
      </AuthProvider>
      <ToastContainer theme="dark" />
    </>
  );
}

export default MyApp;
