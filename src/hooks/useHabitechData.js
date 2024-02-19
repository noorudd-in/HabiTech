import axios from "axios";
import { API_URL } from "../constants";
import { useEffect, useState } from "react";

const useHabitechData = () => {
  const [loading, setLoading] = useState(true);
  const [habitechData, setHabitechData] = useState(false);

  const fetchHabitechData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setHabitechData(data);
    } catch (error) {
      console.log(error);
      console.log("Data when error occured: ", data);
      console.log("Loading Status when error occured: ".loading);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabitechData();
  }, []);

  return {
    loading: loading,
    data: habitechData,
  };
};

export default useHabitechData;
