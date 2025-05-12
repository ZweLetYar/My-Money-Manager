import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { UserDataContextProvider } from "./Context/UserDataContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <UserDataContextProvider>
      <App />
    </UserDataContextProvider>
  </AuthContextProvider>
);
