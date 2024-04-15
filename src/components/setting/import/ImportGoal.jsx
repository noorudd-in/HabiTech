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

const ImportGoal = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const [toggleModal, setToggleModal] = useState("hidden");
  const [goalData, setGoalData] = useState([]);
  const { textcolor500, bgcolor500, customcolor } = useColorTheme();

  const uploadedFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    Papa.parse(file, {
      complete: (res) => {
        setGoalData(res.data);
      },
      skipEmptyLines: true,
    });
  };

  const addData = () => {
    let newData = [];

    if (goalData[0] != undefined) {
      goalData.map((goal, ind) => {
        if (ind != 0) {
          let name = goal[0];
          let duedate = goal[1];
          let type = goal[2]?.toLowerCase();
          let priority = goal[3]?.toLowerCase();
          let tags = goal[4].split("/");
          tags = tags.map((tag) => tag.trim());
          let description = goal[5];
          let subtask = goal[6].split("/");
          subtask =
            subtask == ""
              ? []
              : subtask.map((task, ind) => {
                  return {
                    id: Date.now() + ind,
                    name: task.trim(),
                    status: 0,
                  };
                });
          let avoidTheseNames = [undefined, null, ""];
          let allType = ["short", "mid", "long"];
          let allPriority = ["low", "medium", "high"];

          if (
            !avoidTheseNames.includes(name) &&
            allType.includes(type) &&
            allPriority.includes(priority) &&
            duedate.length == 10
          ) {
            newData.push({
              id: Date.now() + ind,
              name: name,
              duedate: new Date(duedate),
              type: type,
              status: 0,
              priority: priority,
              tags: tags,
              description: description,
              subtasks: subtask,
              lastUpdated: Date.now(),
            });
          }
        }
      });
    }

    if (newData[0] != undefined) {
      axios
        .put(API_URL, {
          ...state,
          goals: [...state.goals, ...newData],
          lastEdited: Date.now(),
        })
        .then((res) => {
          dispatch({
            type: "FETCH_DATA",
            payload: {
              goals: res?.data?.goals,
              lastEdited: res?.data?.lastEdited,
            },
          });
        });

      toast(`${newData.length} goals imported!`, toastSuccess(customcolor));
    } else if (goalData[0] != undefined) {
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
        Import Goals
      </div>

      {toggleModal != "hidden" && (
        <Suspense fallback={<Shimmer />}>
          <Modal
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            heading={"Import Goal"}
          >
            <div className="p-5 md:p-q space-y-1">
              <p className="mb-5">
                To bulk import the data upload your CSV file and click Import.
                Refer{" "}
                <a
                  href=""
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

export default ImportGoal;
