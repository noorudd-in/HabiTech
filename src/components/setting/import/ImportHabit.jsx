import { Suspense, lazy, useContext, useEffect, useState } from "react";
import Shimmer from "../../../pages/Shimmer";
import { useColorTheme } from "../../../hooks/useColorTheme";
import toast, { Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "../../common/Toast";
import axios from "axios";
import { API_URL } from "../../../constants";
import { HabitechContext } from "../../../contexts/HabitechContext";
import Papa from "papaparse";
const Modal = lazy(() => import("../../common/Modal"));

const ImportHabit = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const [toggleModal, setToggleModal] = useState("hidden");
  const [habitData, setHabitData] = useState([]);
  const { textcolor500, bgcolor500, customcolor } = useColorTheme();

  const uploadedFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    Papa.parse(file, {
      complete: (res) => {
        setHabitData(res.data);
      },
      skipEmptyLines: true,
    });
  };

  const addData = () => {
    let newData = [];

    if (habitData[0] != undefined) {
      habitData.map((habit, ind) => {
        if (ind != 0) {
          let habitName = habit[0];
          let habitType = habit[1]?.toLowerCase();
          let avoidTheseNames = [undefined, null, ""];
          let allHabitType = ["easy", "decent", "hard"];
          if (
            !avoidTheseNames.includes(habitName) &&
            allHabitType.includes(habitType)
          ) {
            newData.push({
              id: Date.now() + ind,
              name: habitName,
              difficulty: habitType,
              status: 0,
              lastUpdated: Date.now(),
              expValue: habitType == "easy" ? 1 : habitType == "decent" ? 2 : 3,
              posCount: 0,
              negCount: 0,
              analytics: [],
            });
          }
        }
      });
    }

    if (newData[0] != undefined) {
      axios
        .put(API_URL, {
          ...state,
          habits: [...state.habits, ...newData],
          lastEdited: Date.now(),
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              habits: res?.data?.habits,
              lastEdited: res?.data?.lastEdited,
            },
          });
        });
      toast(`${newData.length} habits imported!`, toastSuccess(customcolor));
    } else if (habitData[0] != undefined) {
      toast("Invalid Data. Please import the correct data.", toastError());
    }
    setToggleModal("hidden");
  };

  return (
    <div>
      <Toaster />
      <div
        onClick={() => setToggleModal("")}
        className={`mb-2 ${textcolor500}`}
      >
        Import Habits
      </div>

      {toggleModal != "hidden" && (
        <Suspense fallback={<Shimmer />}>
          <Modal
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            heading={"Import Habit"}
          >
            <div className="p-5 md:p-q space-y-1">
              <p className="mb-5">
                To bulk import the data upload your CSV file and click Import.
                Refer{" "}
                <a
                  href="https://res.cloudinary.com/dfwyvvvdp/raw/upload/v1712590057/habitech/habit-sample_m7ts4h.csv"
                  target="_blank"
                  className={`${textcolor500} underline underline-offset-4`}
                >
                  this sample file
                </a>{" "}
                to create your CSV file. Any invalid row data will be ignored
                and only valid data will be imported.
              </p>

              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                accept=".csv"
                onChange={uploadedFile}
              />
              <p className="text-xs italic">Allowed .csv file only</p>
            </div>

            <div className="text-center p-4 md:p-5 border-t rounded-b border-gray-600">
              <button
                type="button"
                className={`text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${bgcolor500}`}
                onClick={addData}
              >
                Import
              </button>
            </div>
          </Modal>
        </Suspense>
      )}
    </div>
  );
};

export default ImportHabit;
