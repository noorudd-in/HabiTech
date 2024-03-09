import axios from "axios";
import { API_URL } from "../constants";
import { useEffect, useState } from "react";

export const useHabitechData = () => {
  const [loading, setLoading] = useState(true);
  const [habitechData, setHabitechData] = useState(false);

  const fetchHabitechData = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setHabitechData(data);
    } catch (error) {
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
