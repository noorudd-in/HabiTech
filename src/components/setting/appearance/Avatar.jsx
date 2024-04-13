import { useContext, useEffect, useState } from "react";
import { API_URL, AVATAR_DATA, CLOUD_AUDIO_PATH } from "../../../constants";
import { HabitechContext } from "../../../contexts/HabitechContext";
import CoinIcon from "../../icons/CoinIcon";
import { useColorTheme } from "../../../hooks/useColorTheme";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { toastError, toastSuccess } from "../../common/Toast";
const Avatar = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const [currentAvatar, setCurrentAvatar] = useState(116);
  const { bgcolor400, border400, textcolor500, customcolor } = useColorTheme();

  const changeAvatar = (id, url) => {
    if (localStorage.getItem("userCurrentAvatar") == id) {
      return;
    }
    // Apply avatar if owned
    if (state.store.avatar?.includes(id)) {
      localStorage.setItem("userCurrentAvatar", id);
      axios
        .put(API_URL, {
          ...state,
          user: {
            ...state.user,
            avatar: id,
          },
          lastEdited: Date.now(),
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              user: res?.data?.user,
              lastEdited: res?.data?.lastEdited,
            },
          });
          if (localStorage.getItem("userSound") == "true") {
            const sound = new Audio(
              `${
                CLOUD_AUDIO_PATH + localStorage.getItem("userCurrentSound")
              }.mp3`
            );
            sound.volume = parseFloat(
              localStorage.getItem("userCurrentVolume")
            );
            sound.play();
          }
          setCurrentAvatar(id);
          toast("New Avatar Applied!", toastSuccess(customcolor));
        });
    } else {
      // Purchase if not owned
      if (window.confirm("Do you want to buy the avatar for 100 coins?")) {
        if (state.user.coins < 100) {
          toast("Not enough coins!", toastError());
          return;
        }

        let newActivity = {
          action: "purchase",
          type: "avatar",
          name: "Avatar",
          time: Date.now(),
        };

        axios
          .put(API_URL, {
            ...state,
            store: {
              ...state.store,
              avatar: [...state.store.avatar, id],
            },
            user: {
              ...state.user,
              coins: state.user.coins - 100,
              avatar: id,
            },
            activity: [...state.activity, newActivity],
            lastEdited: Date.now(),
          })
          .then((res) => {
            localStorage.setItem("userCurrentAvatar", id);
            dispatch({
              type: "FETCH_DATA",
              payload: {
                store: res?.data?.store,
                user: res?.data?.user,
                activity: res?.data?.activity,
                lastEdited: res?.data?.lastEdited,
              },
            });
            setCurrentAvatar(id);
            if (localStorage.getItem("userSound") == "true") {
              const sound = new Audio(
                `${CLOUD_AUDIO_PATH + "purchase_rtnov1"}.mp3`
              );
              sound.volume = parseFloat(
                localStorage.getItem("userCurrentVolume")
              );
              sound.play();
            }
            toast("Avatar Puchased!", toastSuccess(customcolor));
          });
      }
    }
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
    const userAvatar = localStorage.getItem("userCurrentAvatar");
    if (userAvatar == null || userAvatar == undefined) {
      setCurrentAvatar(116);
    } else {
      setCurrentAvatar(userAvatar);
    }
  }, []);

  return (
    <>
      <Toaster />
      <div className="grid grid-cols-2 sm:grid-cols-4 mb-24">
        {AVATAR_DATA.map((image) => {
          return (
            <div
              className="col-span-1 flex justify-center"
              key={image.id}
              onClick={() => changeAvatar(image.id, image.url)}
            >
              <div
                className={`${
                  currentAvatar == image.id ? bgcolor400 + " " + border400 : ""
                } rounded-md`}
              >
                <div className="m-2 w-36 h-36">
                  <img
                    src={image.url}
                    alt="Avatar Image"
                    className="rounded-md"
                  />
                </div>
                {state.store.avatar?.includes(image.id) ? (
                  <h1
                    className={`mr-1 text-lg font-bold text-center ${
                      currentAvatar == image.id && "text-black"
                    }`}
                  >
                    Owned
                  </h1>
                ) : (
                  <div className="flex justify-center">
                    <h1 className="mr-1 font-bold">100</h1>
                    <CoinIcon w={"w-5"} h={"h-6"} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Avatar;
