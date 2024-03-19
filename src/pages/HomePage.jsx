import { useContext, useEffect } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { useHabitechData } from "../hooks/useHabitechData";
import { useSearchParams } from "react-router-dom";
import { toastSuccess, toastError } from "../components/common/Toast";
import { useColorTheme } from "../hooks/useColorTheme";
import Shimmer from "./Shimmer";
import GlobalHeader from "../components/layout/GlobalHeader";
import HorizontalLine from "../components/common/HorizontalLine";
import MainContent from "../components/layout/MainContent";
import GlobalFooter from "../components/layout/GlobalFooter";
import toast, { Toaster } from "react-hot-toast";

const HomePage = () => {
  const { dispatch, setAppLoading } = useContext(HabitechContext);
  const { data, loading } = useHabitechData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { customcolor } = useColorTheme;

  useEffect(() => {
    /*
    document.body.style.backgroundImage(
      `url(
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='0.17' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"
      )`
    );
    */
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
          theme: data?.theme,
        },
      });

      // Run if app redirects to home page from other route.
      let type = searchParams.get("toastType");
      let message = searchParams.get("toastMessage");
      if (type != null && message != null && type != "") {
        toast(
          message,
          type == "toastError"
            ? toastError()
            : toastSuccess(customcolor == undefined ? "#fff" : customcolor)
        );
        setSearchParams({ toastType: "", toastMessage: "" });
      }
    }
  }, [data]);

  if (loading) return <Shimmer />;

  return (
    <>
      <Toaster />
      <GlobalHeader />
      <HorizontalLine />
      <MainContent />
      <GlobalFooter />
    </>
  );
};

export default HomePage;
