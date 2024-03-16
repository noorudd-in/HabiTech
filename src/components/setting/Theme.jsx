import SingleTheme from "../layout/SingleTheme";
import { useColorTheme } from "../../hooks/useColorTheme";
import { useContext } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { toast, Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "../common/Toast";
import axios from "axios";
import { API_URL } from "../../constants";

const Theme = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const { textcolor500 } = useColorTheme();

  const handleThemeClick = (name, color, price, isPurchased) => {
    // ignore if theme is same as selected.
    if (isPurchased && state.theme == name) {
      return;
    }
    // Change Theme if already owned.
    if (isPurchased && state.theme != name) {
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
          theme: name,
          lastEdited: Date.now(),
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              store: res?.data?.store,
              theme: res?.data?.theme,
              lastEdited: res?.data?.lastEdited,
            },
          });
          toast("Theme Purchased!");
        });
    }
  };
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
