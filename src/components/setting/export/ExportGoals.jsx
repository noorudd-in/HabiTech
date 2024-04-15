import { useContext, useEffect, useState } from "react";
import { HabitechContext } from "../../../contexts/HabitechContext";
import { CSVLink } from "react-csv";
import dayjs from "dayjs";

const headers = [
  { label: "Created On (DD/MM/YYYY HH:MM:SS)", key: "id" },
  { label: "Name", key: "name" },
  { label: "Status", key: "status" },
  { label: "Due Date (DD/MM/YYYY)", key: "duedate" },
  { label: "Priority", key: "priority" },
  { label: "Type", key: "type" },
  { label: "Tags", key: "tags" },
  { label: "Sub Tasks", key: "subtasks" },
  { label: "Description", key: "description" },
];

const ExportGoals = () => {
  const { state } = useContext(HabitechContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const exportData = state.goals.map(
      ({
        id,
        name,
        status,
        duedate,
        priority,
        type,
        tags,
        subtasks,
        description,
      }) => {
        return {
          id: dayjs(new Date(id)).format("DD/MM/YYYY HH:mm:ss"),
          name,
          status: status == 1 ? "Completed" : "Not Completed",
          duedate: dayjs(new Date(duedate)).format("DD/MM/YYYY"),
          priority: priority[0].toUpperCase() + priority.slice(1),
          type: type[0].toUpperCase() + type.slice(1) + " Term",
          tags: tags.toString(),
          subtasks: subtasks.map((task) => task.name).toString(),
          description,
        };
      }
    );
    setData(exportData);
  }, []);
  return (
    <div>
      <CSVLink data={data} headers={headers} filename={"goals.csv"}>
        Export Goals Data
      </CSVLink>
    </div>
  );
};

export default ExportGoals;
