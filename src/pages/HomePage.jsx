import { useContext, useEffect } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { useHabitechData } from "../hooks/useHabitechData";
import Shimmer from "./Shimmer";
import GlobalHeader from "../components/atom/GlobalHeader";
import HorizontalLine from "../components/atom/HorizontalLine";
import MainContent from "../components/atom/MainContent";
import GlobalFooter from "../components/atom/GlobalFooter";

const HomePage = () => {
  const { dispatch, setAppLoading } = useContext(HabitechContext);
  const { data, loading } = useHabitechData();

  useEffect(() => {
    console.log("Data got changed");
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
        },
      });
    }
  }, [data]);

  if (loading) return <Shimmer />;

  return (
    <>
      <GlobalHeader />
      <HorizontalLine />
      <MainContent />
      <GlobalFooter />
    </>
  );
};

export default HomePage;
