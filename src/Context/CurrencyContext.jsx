import { createContext, useEffect, useReducer } from "react";

const CurrencyContext = createContext();

// Reducer function
const currencyReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CURRENCY":
      return { ...state, currency: action.payload };
    default:
      return state;
  }
};

// Get initial state from localStorage
const getInitialCurrency = () => {
  return { currency: localStorage.getItem("currency") || "MMK" };
};

// Context Provider
const CurrencyContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(currencyReducer, {}, getInitialCurrency);

  // Sync to localStorage when visible changes
  useEffect(() => {
    localStorage.setItem("currency", state.currency);
  }, [state.currency]);

  const changeCurrency = (currency) => {
    dispatch({ type: "CHANGE_CURRENCY", payload: currency });
  };

  const cur = state.currency;
  return (
    <CurrencyContext.Provider value={{ ...state, changeCurrency, cur }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyContextProvider };
