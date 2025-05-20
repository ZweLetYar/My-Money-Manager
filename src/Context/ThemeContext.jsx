//ThemeContext

import { children, createContext, useReducer, useState } from "react";

const ThemeContext = createContext();

//ThemeContext Provider Component

let themeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_THEME":
      localStorage.setItem("theme", action.payload);
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};

const getInitialTheme = () => {
  return { theme: localStorage.getItem("theme") || "teal" };
};

const ThemeContextProvider = ({ children }) => {
  let [state, dispatch] = useReducer(themeReducer, {}, getInitialTheme);

  let changeTheme = (theme) => {
    //action --> type + payload
    dispatch({ type: "CHANGE_THEME", payload: theme });
  };

  const isPink = state.theme === "pink";
  const isOrange = state.theme === "orange";
  const isSkyblue = state.theme === "skyblue";
  const isIndigo = state.theme === "indigo";

  return (
    <ThemeContext.Provider
      value={{ ...state, changeTheme, isPink, isOrange, isSkyblue, isIndigo }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
