import { useColorTheme } from "../../hooks/useColorTheme";
import { useContext, useEffect } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { toast, Toaster } from "react-hot-toast";
import { toastError } from "../common/Toast";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useSound } from "../../hooks/useSound";
import SingleTheme from "../layout/SingleTheme";
import axios from "axios";

const Theme = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const { textcolor500 } = useColorTheme();
  const navigate = useNavigate();

  const handleThemeClick = (name, color, price, isPurchased) => {
    if (state.user.vibrate) {
      window.navigator.vibrate(5);
    }
    // ignore if theme is same as selected.
    if (isPurchased && state.theme == name) {
      return;
    }
    // Change Theme if already owned.
    if (isPurchased && state.theme != name) {
      if (state.user.sound.enable) {
        const sound = useSound(state.user.sound.currentSound);
        sound.volume = state.user.sound.volume;
        sound.play();
      }
      axios
        .put(API_URL, {
          ...state,
          lastEdited: Date.now(),
          theme: name,
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              theme: res?.data?.theme,
              lastEdited: res?.data?.lastEdited,
            },
          });
          toast("Theme Applied!");
        });
      return;
    }
    // Buy Theme if not owned.
    if (
      window.confirm(`Do you want to purchase the them for ${price} coins?`)
    ) {
      if (state.user.coins < price) {
        toast("Not enough coins!", toastError());
        return;
      }
      let updatedTheme = [...state.store.theme];
      updatedTheme.map((theme) => {
        if (theme.color == color) {
          theme.isPurchased = true;
        }
      });

      let newActivity = {
        action: "purchase",
        type: "theme",
        name: "Theme",
        time: Date.now(),
      };

      if (state.user.sound.enable) {
        const sound = useSound("Purchase");
        sound.volume = state.user.sound.volume;
        sound.play();
      }

      axios
        .put(API_URL, {
          ...state,
          store: {
            ...state.store,
            theme: updatedTheme,
          },
          user: {
            ...state.user,
            coins: state.user.coins - price,
          },
          activity: [...state.activity, newActivity],
          theme: name,
          lastEdited: Date.now(),
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              store: res?.data?.store,
              theme: res?.data?.theme,
              activity: res?.data?.activity,
              lastEdited: res?.data?.lastEdited,
            },
          });
          toast("Theme Purchased!");
        });
    }
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Toaster />
      <h1
        className={`mt-10 mb-3 text-center text-xl font-bold ${textcolor500}`}
      >
        Select your favourite color to apply!
      </h1>
      <div className="flex flex-wrap text-center justify-center">
        {state.store.theme?.map((theme) => {
          return (
            <SingleTheme
              key={theme.color}
              name={theme.name}
              color={theme.color}
              price={theme.price}
              isPurchased={theme.isPurchased}
              selected={state.theme}
              handleClick={() =>
                handleThemeClick(
                  theme.name,
                  theme.color,
                  theme.price,
                  theme.isPurchased
                )
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default Theme;
