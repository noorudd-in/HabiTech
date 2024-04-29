import { useState, useEffect, useContext } from "react";
import ToggleButton from "../common/ToggleButton";
import SetupPassword from "./password/SetupPassword";
import { HabitechContext } from "../../contexts/HabitechContext";
import VerifyPassword from "./password/VerifyPassword";
import { useColorTheme } from "../../hooks/useColorTheme";
import RightIcon from "../icons/RightIcon";
import DownIcon from "../icons/DownIcon";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../../constants";

const LockAndUnlockApp = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const [enableLock, setEnableLock] = useState(false);
  const [showPasswordFeild, setShowPasswordField] = useState(false);
  const [passwordCreated, setPasswordCreated] = useState(false);
  const [lockApp, setLockApp] = useState(false);
  const [lockDuration, setLockDuration] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const { bgcolor50, bgcolor400, textcolor500 } = useColorTheme();

  const updateEnableLock = (value) => {
    if (localStorage.getItem("userVibrate") == "true") {
      window.navigator.vibrate([5, 200, 20]);
    }
    if (window.location.host != "habitech.noorudd.in") {
      toast("Feature Disabled");
      return;
    }
    setEnableLock(value);
    if (value) {
      setShowPasswordField("new");
    } else {
      axios
        .put(API_URL, {
          ...state,
          user: {
            ...state.user,
            userLock: false,
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
      setPasswordCreated(false);
      setShowPasswordField(false);
      localStorage.removeItem("userLockDuration");
      localStorage.removeItem("lastUnlock");
    }
  };

  const handleChangePassword = () => {
    setDropdown(!dropdown);
    if (showPasswordFeild == "old") {
      setShowPasswordField(false);
    } else {
      setShowPasswordField("old");
    }
  };

  const handleChangeDuration = (e) => {
    setLockDuration(e.target.value);
    localStorage.setItem("userLockDuration", e.target.value);
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    } else {
      const userLock = state.user.userLock;
      setLockDuration(localStorage.getItem("userLockDuration"));
      if (userLock) {
        setEnableLock(true);
        setPasswordCreated(true);
        setLockApp(true);
      }
    }
  }, []);

  return (
    <>
      <Toaster />
      {lockApp ? (
        <VerifyPassword setLockApp={setLockApp} />
      ) : (
        <div className="mx-5 mt-10 text-lg">
          <h1
            className={`text-center my-10 text-2xl font-bold ${textcolor500}`}
          >
            Privacy?... Yes it matters! 🔒
          </h1>
          <div className="flex justify-between">
            <h1>Enable Lock</h1>
            <ToggleButton
              toggle={enableLock}
              setToggle={updateEnableLock}
              name=""
            />
          </div>

          {showPasswordFeild == "new" && (
            <SetupPassword
              setPasswordCreated={setPasswordCreated}
              setShowPasswordField={setShowPasswordField}
              setLockDuration={setLockDuration}
              name="Setup new password!"
            />
          )}

          {passwordCreated && (
            <>
              {/* Change Duration Tab */}
              <div className="mt-2 flex justify-between">
                <h1>Lock app after</h1>
                <select
                  value={lockDuration}
                  className={`text-black rounded-md px-1 ${bgcolor50} border border-neutral-500`}
                  onChange={handleChangeDuration}
                >
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="1440">1 day</option>
                  <option value="10080">1 week</option>
                </select>
              </div>
              {/* Change Password Tab */}
              <div className="text-center mt-2">
                <div
                  className={`flex text-lg ${bgcolor400} justify-between px-2 rounded-sm`}
                  onClick={handleChangePassword}
                >
                  <h1 className=" text-black mr-5">Change Password</h1>
                  {dropdown ? (
                    <DownIcon className="w-7 h-7 text-gray-800" />
                  ) : (
                    <RightIcon className="w-7 h-7 text-gray-800" />
                  )}
                </div>
              </div>
            </>
          )}

          {showPasswordFeild == "old" && (
            <SetupPassword
              setPasswordCreated={setPasswordCreated}
              setShowPasswordField={setShowPasswordField}
              name="Change password!"
            />
          )}
        </div>
      )}
    </>
  );
};

export default LockAndUnlockApp;
