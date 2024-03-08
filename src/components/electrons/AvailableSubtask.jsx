import DeleteIcon from "../icons/DeleteIcon";

const AvailableSubtask = ({ taskData, setTask, task }) => {
  const handleDeleteTask = (taskId) => {
    const updatedTask = [];
    task.map((t) => {
      if (t.id != taskId) {
        updatedTask.push(t);
      }
    });
    setTask(updatedTask);
  };
  return (
    <div>
      {taskData.map((task) => {
        return (
          <ul key={task.id} className="flex list-disc ml-5">
            <li className="mr-2">{task.name}</li>
            <div onClick={() => handleDeleteTask(task.id)}>
              <DeleteIcon />
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default AvailableSubtask;
