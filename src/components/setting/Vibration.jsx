import { useContext, useEffect, useState } from "react";
import ToggleButton from "../common/ToggleButton";
import { HabitechContext } from "../../contexts/HabitechContext";
import axios from "axios";
import { API_URL } from "../../constants";
const Vibration = () => {
  const [vibration, setVibration] = useState("");
  const { state, dispatch } = useContext(HabitechContext);

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    } else {
      setVibration(state.user.vibrate);
    }
  }, [state]);

  const updateVibration = (value) => {
    setVibration(value);
    axios
      .put(API_URL, {
        ...state,
        user: {
          ...state.user,
          vibrate: value,
        },
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            user: res?.data?.user,
          },
        });
      });
  };

  return (
    <div className="flex justify-between">
      <h1>Enable Haptic Feedback</h1>
      <ToggleButton toggle={vibration} setToggle={updateVibration} name="" />
    </div>
  );
};

export default Vibration;
