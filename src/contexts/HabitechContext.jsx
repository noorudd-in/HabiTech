import { createContext, useReducer, useState } from "react";

// Initial State
const initialState = {
  user: {},
  habits: [],
  goals: [],
  lastEdited: "",
  availableTags: [],
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "FETCH_DATA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

// Context
export const HabitechContext = createContext();

// Providing Habitech Context Provider to Global Component
export const HabitechContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [appLoading, setAppLoading] = useState(true);
  return (
    <HabitechContext.Provider
      value={{ state, dispatch, appLoading, setAppLoading }}
    >
      {children}
    </HabitechContext.Provider>
  );
};
