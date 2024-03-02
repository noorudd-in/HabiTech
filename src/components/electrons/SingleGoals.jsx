import UntickIcon from "../icons/UntickIcon";
import TickIcon from "../icons/TickIcon";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const SingleGoals = ({ name }) => {
  const [date, setDate] = useState();
  console.log(date);
  return (
    <>
      <div className="flex">
        <UntickIcon />
        <div className="ml-3" onClick={() => console.log(name)}>
          <div className="text-xl">{name}</div>
          <div className="flex">
            <h1>Due Date</h1>
            <h1 className="mx-3">|</h1>
            <h1>Hard</h1>
          </div>
          <div className="flex">
            <h1>#tag1</h1>
            <h1>#tag2</h1>
          </div>
        </div>
      </div>
      <hr className="my-3" />
      {/*<DatePicker
        minDate={new Date()}
        selected={date}
        onChange={(d) => setDate(d)}
        className="text-black"
  />*/}
    </>
  );
};

export default SingleGoals;
