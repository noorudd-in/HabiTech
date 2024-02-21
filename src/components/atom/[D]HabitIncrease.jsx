import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { API_URL } from "../../constants";
import axios from "axios";

const HabitIncrease = () => {
  const { state, dispatch } = useContext(HabitechContext);

  function handleClick() {
    console.log("Clicked!!");
    dispatch({ type: "UPDATE_LOADING", payload: true });
    axios
      .put(API_URL, {
        user: {
          name: "Noor",
          avatarURL:
            "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg",
          level: 0,
          health: 18,
          exp: 50,
        },
        habits: [0, 1, 2],
        goals: [100, 200],
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            user: {
              ...state.user,
              health: state.user.health + 1,
            },
          },
        });
      });
  }
  return (
    <div>
      <button className="border" onClick={handleClick}>
        +++
      </button>
      <br />
      <br />
      <button className="border">---</button>

      <h1>Current Value of State 1 is: {state.state1}</h1>
    </div>
  );
};

export default HabitIncrease;
