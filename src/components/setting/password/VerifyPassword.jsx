import { useState, useContext } from "react";
import { useColorTheme } from "../../../hooks/useColorTheme";
import { Toaster, toast } from "react-hot-toast";
import { toastError } from "../../common/Toast";
import { useHabitechData } from "../../../hooks/useHabitechData";
import Shimmer from "../../../pages/Shimmer";
import { HabitechContext } from "../../../contexts/HabitechContext";

const VerifyPassword = ({ setLockApp }) => {
  const { state, appLoading } = useContext(HabitechContext);
  const { data, loading } = useHabitechData();
  const { textcolor500, bgcolor500 } = useColorTheme();
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleVerifyPassword = () => {
    if (verifyPassword == "") {
      toast("Incorrect password", toastError());
      return;
    }

    if (state.user.name != undefined) {
      let newPassword = state?.user?.name + "$-$-$" + verifyPassword;
      let encryptedHash = btoa(btoa(newPassword));
      if (encryptedHash == state.user.userHash) {
        setLockApp(false);
        localStorage.setItem("lastUnlock", Date.now());
      } else {
        toast("Incorrect password", toastError());
      }
    }
  };

  if (loading) return <Shimmer />;
  return (
    <>
      <Toaster />
      <div className="text-center mt-40">
        <h1 className={`text-2xl font-semibold ${textcolor500} mb-5`}>
          Enter password to unlock!
        </h1>
        <div>
          <input
            type="password"
            placeholder="Your secret password"
            value={verifyPassword}
            onChange={(e) => setVerifyPassword(e.target.value)}
            className="my-1 p-1 border w-3/4 text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          />
        </div>

        <button
          className={`text-center my-3 p-2 ${bgcolor500} text-black text-lg rounded-lg items-center`}
          onClick={handleVerifyPassword}
        >
          Unlock
        </button>
      </div>
    </>
  );
};

export default VerifyPassword;
