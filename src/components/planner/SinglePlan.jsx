import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import Modal from "../common/Modal";
import { useColorTheme } from "../../hooks/useColorTheme";
import { motion } from "framer-motion";
import { useLongPress } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
dayjs.extend(duration);

const SinglePlan = ({
  id,
  name,
  start,
  end,
  status,
  lastUpdated,
  description,
}) => {
  const { state } = useContext(HabitechContext);
  const [toggleModal, setToggleModal] = useState("hidden");
  const navigate = useNavigate();
  const { bgcolor500 } = useColorTheme();

  // Perform below action when habit is long pressed
  const attrs = useLongPress(
    () => {
      if (state.user.vibrate) {
        window.navigator.vibrate([5, 200, 20]);
      }
      navigate(`/edit/plan/${id}`);
    },
    { threshold: 500 }
  );

  const handleClick = () => {
    if (state.user.vibrate) {
      window.navigator.vibrate(5);
    }
    setToggleModal("");
  };

  let duration = end?.diff(start, "minute");
  let hours =
    parseInt(duration / 60) < 0
      ? 24 + parseInt(duration / 60)
      : parseInt(duration / 60);
  let minutes =
    parseInt(duration % 60) < 60
      ? Math.abs(parseInt(duration % 60))
      : parseInt(duration % 60);

  return (
    <>
      <Modal
        toggleModal={toggleModal}
        setToggleModal={setToggleModal}
        data={{
          id: id,
          name: name,
          start: start,
          end: end,
          description: description,
          lastUpdated: lastUpdated,
        }}
      />

      <motion.div whileTap={{ scale: 0.95 }}>
        <div
          id={status == 0 ? "current" : ""}
          {...attrs}
          className={`border m-2 rounded-lg mb-5 ${
            status == 0 && "animate-pulse"
          }`}
          onClick={handleClick}
        >
          <div className="w-11/12 mx-auto mt-2">
            <div
              className={`h-1 w-full ${
                status > 0 ? "bg-gray-400" : ""
              } overflow-hidden rounded-full`}
            >
              <div
                className={`w-full h-full ${
                  status > 0 ? "" : bgcolor500
                } rounded-full ${
                  status == 0 && "animate-progress origin-left-right"
                } `}
              ></div>
            </div>
          </div>

          <div className="flex justify-between w-11/12 mx-auto">
            <div className="text-xs">{dayjs(start).format("hh:mm A")}</div>
            <div className="text-xs">{`${hours !== 0 ? hours + "h" : ""} ${
              minutes !== 0 ? minutes + "m" : ""
            }`}</div>
            <div className="text-xs">{dayjs(end).format("hh:mm A")}</div>
          </div>
          <div>
            <h1 className="text-lg text-center font-semibold">{name}</h1>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SinglePlan;
