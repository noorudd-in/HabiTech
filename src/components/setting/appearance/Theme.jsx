import { useColorTheme } from "../../../hooks/useColorTheme";
import { useContext, useEffect } from "react";
import { HabitechContext } from "../../../contexts/HabitechContext";
import { toast, Toaster } from "react-hot-toast";
import { toastError } from "../../common/Toast";
import { API_URL, CLOUD_AUDIO_PATH } from "../../../constants";
import SingleTheme from "../../layout/SingleTheme";
import axios from "axios";

let colorThemes = [
  {
    name: "red",
    color: "bg-red-500",
    price: 50,
  },
  {
    name: "teal",
    color: "bg-teal-500",
    price: 80,
  },
  {
    name: "cyan",
    color: "bg-cyan-500",
    price: 120,
  },
  {
    name: "violet",
    color: "bg-violet-500",
    price: 100,
  },
  {
    name: "emerald",
    color: "bg-emerald-500",
    price: 200,
  },
  {
    name: "orange",
    color: "bg-orange-500",
    price: 200,
  },
  {
    name: "purple",
    color: "bg-purple-500",
    price: 150,
  },
  {
    name: "blue",
    color: "bg-blue-500",
    price: 100,
  },
  {
    name: "sky",
    color: "bg-sky-500",
    price: 70,
  },
  {
    name: "lime",
    color: "bg-lime-500",
    price: 50,
  },
  {
    name: "amber",
    color: "bg-amber-500",
    price: 20,
  },
  {
    name: "rose",
    color: "bg-rose-500",
    price: 150,
  },
  {
    name: "green",
    color: "bg-green-500",
    price: 70,
  },
  {
    name: "pink",
    color: "bg-pink-500",
    price: 50,
  },
  {
    name: "indigo",
    color: "bg-indigo-500",
    price: 60,
  },
  {
    name: "yellow",
    color: "bg-yellow-500",
    price: 0,
  },
];

const Theme = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const { textcolor500 } = useColorTheme();
  let currentTheme = localStorage.getItem("userTheme");

  const handleThemeClick = (name, price, isPurchased) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate(5);
    }
    // ignore if theme is same as selected.
    if (isPurchased && atob(currentTheme) == name) {
      return;
    }
    // Change Theme if already owned.
    if (isPurchased && atob(currentTheme) != name) {
      if (localStorage.getItem("userSound") == "true") {
        const sound = new Audio(
          `${CLOUD_AUDIO_PATH + localStorage.getItem("userCurrentSound")}.mp3`
        );
        sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
        sound.play();
      }
      localStorage.setItem("userTheme", btoa(name));
      dispatch({
        type: "FETCH_DATA",
        payload: {
          user: {
            ...state.user,
            theme: name,
          },
        },
      });
      toast("Theme Applied!");

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

      let newActivity = {
        action: "purchase",
        type: "theme",
        name: "Theme",
        time: Date.now(),
      };

      if (localStorage.getItem("userSound") == "true") {
        const sound = new Audio(`${CLOUD_AUDIO_PATH + "purchase_rtnov1"}.mp3`);
        sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
        sound.play();
      }

      axios
        .put(API_URL, {
          ...state,
          store: {
            ...state.store,
            theme: [...state.store.theme, btoa(name)],
          },
          user: {
            ...state.user,
            coins: state.user.coins - price,
          },
          activity: [...state.activity, newActivity],
          lastEdited: Date.now(),
        })
        .then((res) => {
          localStorage.setItem("userTheme", btoa(name));
          dispatch({
            type: "FETCH_DATA",
            payload: {
              store: res?.data?.store,
              user: res?.data?.user,
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
      window.location.replace("/");
    }
  }, []);
  return (
    <>
      <Toaster />
      <h1
        className={`mt-10 mb-3 text-center text-xl font-bold ${textcolor500}`}
      >
        What's your favourite color? 🎨
      </h1>
      <div className="flex flex-wrap text-center justify-center">
        {colorThemes?.map((theme) => {
          return (
            <SingleTheme
              key={theme.color}
              name={theme.name}
              color={theme.color}
              price={theme.price}
              isPurchased={state?.store?.theme?.includes(btoa(theme.name))}
              selected={atob(currentTheme)}
              handleClick={() =>
                handleThemeClick(
                  theme.name,
                  theme.price,
                  state?.store?.theme?.includes(btoa(theme.name))
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
