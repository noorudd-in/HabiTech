import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { useHabitechData } from "../hooks/useHabitechData";
import { useSearchParams } from "react-router-dom";
import { toastSuccess, toastError } from "../components/common/Toast";
import { useColorTheme } from "../hooks/useColorTheme";
import { homepageObj } from "../components/onboarding/driver";
import { CLOUD_AUDIO_PATH } from "../constants";
import Shimmer from "./Shimmer";
import GlobalHeader from "../components/layout/GlobalHeader";
import HorizontalLine from "../components/common/HorizontalLine";
import MainContent from "../components/layout/MainContent";
import GlobalFooter from "../components/layout/GlobalFooter";
import toast, { Toaster } from "react-hot-toast";
import VerifyPassword from "../components/setting/password/VerifyPassword";
import dayjs from "dayjs";

const HomePage = () => {
  const [lockApp, setLockApp] = useState(false);
  const { dispatch, setAppLoading } = useContext(HabitechContext);
  const { data, loading } = useHabitechData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { customcolor } = useColorTheme;

  useEffect(() => {
    if (data) {
      setAppLoading(loading);
      dispatch({
        type: "FETCH_DATA",
        payload: {
          user: data?.user,
          habits: data?.habits,
          goals: data?.goals,
          plan: data?.plan,
          plans: data?.plans,
          activity: data?.activity,
          lastEdited: data?.lastEdited,
          availableTags: data?.availableTags,
          store: data?.store,
        },
      });

      // Run if app redirects to home page from other route.
      let type = searchParams.get("toastType");
      let message = searchParams.get("toastMessage");
      let userSound = searchParams.get("sound");
      if (type != null && message != null && type != "") {
        toast(
          message,
          type == "toastError"
            ? toastError()
            : toastSuccess(customcolor == undefined ? "#fff" : customcolor)
        );
        if (userSound == "purchase" || userSound == "current") {
          if (localStorage.getItem("userSound") == "true") {
            const sound = new Audio(
              `${
                userSound == "purchase"
                  ? `${CLOUD_AUDIO_PATH + "purchase_rtnov1"}`
                  : CLOUD_AUDIO_PATH + localStorage.getItem("userCurrentSound")
              }.mp3`
            );
            sound.volume = parseFloat(
              localStorage.getItem("userCurrentVolume")
            );
            sound.play();
          }
        }
        setSearchParams({ toastType: "", toastMessage: "", sound: "" });
      }

      // Lock app if unlock time is expired or
      // userLock is true but new device detected.
      if (data.user.userLock) {
        let lastUnlock = localStorage.getItem("lastUnlock");
        if (lastUnlock == "null" || lastUnlock == null) {
          localStorage.setItem("userLockDuration", 10);
          setLockApp(true);
        } else {
          let lastUnlockTime = new Date(parseInt(lastUnlock));
          let userLockDuration = localStorage.getItem("userLockDuration");
          let newLockTime = dayjs(lastUnlockTime).add(
            userLockDuration,
            "minutes"
          );
          if (newLockTime.isBefore(dayjs())) {
            setLockApp(true);
          }
        }
      }

      if (localStorage.getItem("home-tour") == null && !data.user.userLock) {
        homepageObj.drive();
      }
    }
  }, [data]);

  if (loading) return <Shimmer />;

  return (
    <>
      {lockApp ? (
        <VerifyPassword setLockApp={setLockApp} />
      ) : (
        <>
          <Toaster />
          <GlobalHeader />
          <HorizontalLine />
          <MainContent />
          <GlobalFooter />
        </>
      )}
    </>
  );
};

export default HomePage;
