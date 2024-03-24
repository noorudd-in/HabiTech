import { useContext, useState } from "react";
import LockIcon from "../../icons/LockIcon";
import UnlockIcon from "../../icons/UnlockIcon";
import { useColorTheme } from "../../../hooks/useColorTheme";
import { toast, Toaster } from "react-hot-toast";
import { toastError } from "../../common/Toast";
import axios from "axios";
import { API_URL } from "../../../constants";
import { HabitechContext } from "../../../contexts/HabitechContext";
const SetupPassword = ({
  setPasswordCreated,
  setShowPasswordField,
  name,
  setLockDuration,
}) => {
  const { state, dispatch } = useContext(HabitechContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const { textcolor500, bgcolor500 } = useColorTheme();

  const handlePassword = () => {
    if (password == "") {
      toast("Please enter password", toastError());
      return;
    }
    if (confirmPassword == "") {
      toast("Please enter confirm password", toastError());
      return;
    }
    if (password != confirmPassword) {
      toast("Password doesn't match", toastError());
      return;
    }

    let newPassword = state.user.name + "$-$-$" + password;
    let encryptedHash = btoa(btoa(newPassword));

    if (localStorage.getItem("userSound") == "true") {
      const sound = new Audio(
        `../../../assets/sounds/${localStorage.getItem("userCurrentSound")}.mp3`
      );
      sound.volume = parseFloat(localStorage.getItem("userCurrentVolume"));
      sound.play();
    }

    axios
      .put(API_URL, {
        ...state,
        user: {
          ...state.user,
          userLock: true,
          userHash: encryptedHash,
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
        if (setLockDuration) {
          localStorage.setItem("userLockDuration", 10);
        }
        localStorage.setItem("lastUnlock", Date.now());
      });
    setPasswordCreated(true);
    setShowPasswordField(false);
    console.log(setLockDuration);
    if (setLockDuration) {
      setLockDuration(10);
    }
  };
  return (
    <>
      <Toaster />
      <div className="mt-10">
        <h1 className={`${textcolor500} text-2xl font-bold mb-3`}>{name}</h1>
        <div className="flex">
          <input
            type={`${viewPassword ? "text" : "password"}`}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="my-1 p-1 border w-3/4 text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          />
          <div
            className="mt-1 ml-2"
            onClick={() => setViewPassword(!viewPassword)}
          >
            {viewPassword ? (
              <UnlockIcon className="w-9 h-9" />
            ) : (
              <LockIcon className="w-9 h-9" />
            )}
          </div>
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="my-1 p-1 border w-3/4 text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          />
        </div>
        <button
          className={`text-center my-3 p-2 ${bgcolor500} text-black text-lg rounded-lg items-center`}
          onClick={handlePassword}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default SetupPassword;
