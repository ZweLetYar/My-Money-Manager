//ThemeContext

import { children, createContext, useReducer } from "react";

const ThemeContext = createContext();

//ThemeContext Provider Component

let themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};

const ThemeContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(themeReducer, { theme: "light" });

  let changeTheme = (theme) => {
    //action --> type + payload
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };

  const isDark = state.theme === "dark";

  return (
    <ThemeContext.Provider value={{ ...state, changeTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
