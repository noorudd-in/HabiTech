import { useLongPress } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import MinusIcon from "../icons/MinusIcon";
import PlusIcon from "../icons/PlusIcon";
import Badge from "./Badge";

const SingleHabit = ({ id, name, status, difficulty, tags }) => {
  const navigate = useNavigate();

  // Perform below action when habit is long pressed
  const attrs = useLongPress(
    () => {
      navigate(`/edit/habit?id=${id}`);
    },
    { threshold: 500 }
  );

  return (
    <div
      className={`grid grid-cols-12 my-2 border mx-5 rounded-md border-amber-400 ${
        status == "completed" && "bg-amber-400"
      }`}
    >
      <div className="flex flex-row items-center justify-center rounded-l-md bg-amber-400">
        <MinusIcon status={status} className="col-span-1" />
      </div>

      <div
        {...attrs}
        className={`flex justify-between col-span-10 m-3 ${
          status == "completed" ? "text-black" : ""
        }`}
      >
        <h1 className="text-xl">{name}</h1>
        <Badge difficulty={difficulty} />
      </div>

      <div
        className="flex flex-row items-center justify-center rounded-r-md bg-amber-400"
        onClick={() => console.log("Plus Clicked, :", id)}
      >
        <PlusIcon status={status} className="col-span-1" />
      </div>
    </div>
  );
};

export default SingleHabit;
