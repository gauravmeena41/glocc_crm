import Navbar from "../components/Navbar";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <div>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </div>
  );
};

export default MyApp;
