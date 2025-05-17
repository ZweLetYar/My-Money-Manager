import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./Context/AuthContext";
import AppRoutes from "./router/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  let { AuthReady } = useContext(AuthContext);

  return (
    AuthReady && (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    )
  );
}

export default App;
