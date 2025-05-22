import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";
import { UserDataContextProvider } from "./Context/UserDataContext.jsx";
import { ThemeContextProvider } from "./Context/ThemeContext.jsx";
import { VisibleContextProvider } from "./Context/VisibleContext.jsx";
import { CurrencyContextProvider } from "./Context/CurrencyContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <UserDataContextProvider>
        <CurrencyContextProvider>
          <VisibleContextProvider>
            <App />
          </VisibleContextProvider>
        </CurrencyContextProvider>
      </UserDataContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
);
