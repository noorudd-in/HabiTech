import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../../contexts/HabitechContext";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

const headers = [
  { label: "Created On (DD/MM/YYYY HH:MM:SS)", key: "id" },
  { label: "Name", key: "name" },
  { label: "Start Time (24 Hrs)", key: "start" },
  { label: "End Time (24 Hrs)", key: "end" },
  { label: "Repeat", key: "repeat" },
  { label: "Description", key: "description" },
];

const ExportPlans = () => {
  const { state } = useContext(HabitechContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const exportData = state.plans.map(
      ({ id, name, start, end, repeat, description }) => {
        return {
          id: dayjs(new Date(id)).format("DD/MM/YYYY HH:mm:ss"),
          name,
          start,
          end,
          repeat: repeat[0].toUpperCase() + repeat.slice(1),
          description,
        };
      }
    );
    setData(exportData);
  }, []);
  return (
    <div>
      <CSVLink data={data} headers={headers} filename={"plans.csv"}>
        Export Plans Data
      </CSVLink>
    </div>
  );
};

export default ExportPlans;
