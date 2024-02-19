import { createContext, useReducer } from "react";

// Initial State
const initialState = {
  loading: true,
  user: {},
  habits: [],
  goals: [],
  lastEdited: "",
  state1: 1,
  state2: "State Two",
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, user: action.payload };
    case "UPDATE_LOADING":
      return { ...state, loading: action.payload };
    case "FETCH_DATA":
      return { ...state, ...action.payload };
    case "INC_STATE_2":
      return { ...state, state2: action.payload };
    default:
      return state;
  }
};

// Context
export const HabitechContext = createContext();

// Providing Habitech Context Provider to Global Component
export const HabitechContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <HabitechContext.Provider value={{ state, dispatch }}>
      {children}
    </HabitechContext.Provider>
  );
};
