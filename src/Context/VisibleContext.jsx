import { createContext, useEffect, useReducer } from "react";

const VisibleContext = createContext();

// Reducer function
const visibleReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VISIBLE":
      return { ...state, visible: action.payload };
    default:
      return state;
  }
};

// Get initial state from localStorage
const getInitialVisible = () => {
  const stored = localStorage.getItem("visible");
  return { visible: stored === null ? true : stored === "true" };
};

// Context Provider
const VisibleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(visibleReducer, {}, getInitialVisible);

  // Sync to localStorage when visible changes
  useEffect(() => {
    localStorage.setItem("visible", state.visible);
  }, [state.visible]);

  const changeVisible = (visible) => {
    dispatch({ type: "CHANGE_VISIBLE", payload: visible });
  };

  const isNotVisible = state.visible === false;

  return (
    <VisibleContext.Provider value={{ ...state, changeVisible, isNotVisible }}>
      {children}
    </VisibleContext.Provider>
  );
};

export { VisibleContext, VisibleContextProvider };
