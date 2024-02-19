import { useContext, useEffect } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import useHabitechData from "../hooks/useHabitechData";
import Shimmer from "./Shimmer";
import GlobalHeader from "../components/atom/GlobalHeader";
import HorizontalLine from "../components/atom/HorizontalLine";
import MainContent from "../components/atom/MainContent";
import GlobalFooter from "../components/atom/GlobalFooter";

const HomePage = () => {
  const { dispatch } = useContext(HabitechContext);
  const { data, loading } = useHabitechData();

  useEffect(() => {
    console.log("Data got changed");
    if (data) {
      dispatch({
        type: "FETCH_DATA",
        payload: {
          user: {
            ...data?.user,
            exp: data?.user?.exp % 100,
            level: data?.user?.exp % 1000,
          },
          habits: data?.habits,
          goals: data?.goals,
          lastEdited: data?.lastEdited,
          loading: loading,
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
