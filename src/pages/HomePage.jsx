import { useContext, useEffect } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { useHabitechData } from "../hooks/useHabitechData";
import { useSearchParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import GlobalHeader from "../components/layout/GlobalHeader";
import HorizontalLine from "../components/common/HorizontalLine";
import MainContent from "../components/layout/MainContent";
import GlobalFooter from "../components/layout/GlobalFooter";
import toast, { Toaster } from "react-hot-toast";
import { toastSuccess, toastError } from "../components/common/Toast";
import { useColorTheme } from "../hooks/useColorTheme";

const HomePage = () => {
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
          lastEdited: data?.lastEdited,
          availableTags: data?.availableTags,
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
