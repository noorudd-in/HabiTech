import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../constants";

const SingleTheme = ({ name, lower, higher }) => {
  const { state, dispatch } = useContext(HabitechContext);
  const navigate = useNavigate();
  const handleSelectTheme = (id) => {
    //Check is state is loaded or not;
    if (state.user.name == undefined) {
      navigate(
        "/?toastType=toastError&toastMessage=Something went wrong. Please try again!"
      );
      return;
    }
    //alert(`Do you want to change the theme to ${name}?`);

    if (window.confirm(`Do you want to change the theme to ${name}?`)) {
      axios
        .put(API_URL, {
          ...state,
          theme: name.toLowerCase(),
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              theme: res?.data?.theme,
            },
          });
          navigate("/?toastType=toastSuccess&toastMessage=New Theme Applied!");
        });
    }
  };
  return (
    <div onClick={() => handleSelectTheme(name)}>
      <div className="mx-2">
        <div className={`w-16 h-8 ${lower}`}></div>
        <div className={`w-16 h-8 ${higher}`}></div>
      </div>
      <h1 className="text-center mt-1">{name}</h1>
    </div>
  );
};

export default SingleTheme;
