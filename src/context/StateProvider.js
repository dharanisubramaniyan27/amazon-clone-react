import React, { createContext, useContext, useReducer } from "react";

// 1. Create Context
export const StateContext = createContext();

// 2. Wrap App with Provider
export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// 3. Custom hook
export const useStateValue = () => useContext(StateContext);
