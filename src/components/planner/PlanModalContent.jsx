import dayjs from "dayjs";

const PlanModalContent = ({ data }) => {
  return (
    <div>
      <div className="p-5 md:p-q space-y-1">
        <div>
          Time: {data.start.format("h:MM A")} to {data.end.format("h:MM A")}
        </div>
        <div>
          {data.description != "" ? (
            <h1>Description: {data.description}</h1>
          ) : (
            <h1>No description found!</h1>
          )}
        </div>
      </div>

      <div className="text-sm font-thin px-5 md:p-q space-y-1 mb-3">
        <p>
          Created at:
          <span> {dayjs(new Date(data.id)).format("DD/MM/YYYY h:mm A")}</span>
        </p>
        <p>
          Last modified at:
          <span>
            {" "}
            {dayjs(new Date(data.lastUpdated)).format("DD/MM/YYYY h:mm A")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PlanModalContent;
