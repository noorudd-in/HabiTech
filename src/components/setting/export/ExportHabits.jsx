import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../../contexts/HabitechContext";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

const headers = [
  { label: "Created On (DD/MM/YYYY HH:MM:SS)", key: "id" },
  { label: "Name", key: "name" },
  { label: "Difficulty", key: "difficulty" },
  { label: "Last Modified On (DD/MM/YYYY HH:MM:SS)", key: "lastUpdated" },
  { label: "EXP Earned", key: "expValue" },
  { label: "Coins Earned", key: "coins" },
  { label: "Completed", key: "posCount" },
  { label: "Skipped", key: "negCount" },
];

const ExportHabits = () => {
  const { state } = useContext(HabitechContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const exportData = state.habits.map(
      ({ id, name, difficulty, lastUpdated, expValue, posCount, negCount }) => {
        let newCoins;
        if (difficulty == "easy") newCoins = 0.5;
        if (difficulty == "decent") newCoins = 1;
        if (difficulty == "hard") newCoins = 1.5;
        return {
          id: dayjs(new Date(id)).format("DD/MM/YYYY HH:mm:ss"),
          name,
          difficulty: difficulty[0].toUpperCase() + difficulty.slice(1),
          lastUpdated: dayjs(new Date(lastUpdated)).format(
            "DD/MM/YYYY HH:mm:ss"
          ),
          expValue: expValue * posCount,
          coins: newCoins * posCount,
          posCount,
          negCount,
        };
      }
    );
    setData(exportData);
  }, []);
  return (
    <div>
      <CSVLink data={data} headers={headers} filename={"habits.csv"}>
        Export Habits Data
      </CSVLink>
    </div>
  );
};

export default ExportHabits;
