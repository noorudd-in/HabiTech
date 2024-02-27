import React from "react";

const HabitStatsModal = ({
  toggleModal,
  setToggleModal,
  id,
  name,
  status,
  difficulty,
  lastUpdated,
  expValue,
  posCount,
  negCount,
}) => {
  return (
    <div>
      <div
        tabIndex="-1"
        aria-hidden="true"
        className={`${toggleModal} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-300 bg-opacity-50`}
      >
        <div className="mx-10 lg:mx-40 my-52">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="text-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Statistics
              </h3>
            </div>

            <div className="p-5 md:p-q space-y-1">
              <p>
                Name:<span className="dark:text-yellow-400"> {name}</span>
              </p>
              <p>
                Created on:{" "}
                <span className="dark:text-yellow-400">
                  {new Date(id).toLocaleString("en-GB", { hour12: true })}
                </span>
              </p>
              <p>
                Difficulty Level:{" "}
                <span className="dark:text-yellow-400">
                  {difficulty[0].toUpperCase() + difficulty.slice(1)}
                </span>
              </p>
              <p>
                Habit last updated on:{" "}
                <span className="dark:text-yellow-400">
                  {new Date(lastUpdated).toLocaleString("en-GB", {
                    hour12: true,
                  })}
                </span>
              </p>
              <br />
              <p>
                You have completed this habit{" "}
                <span className="dark:text-yellow-400 font-extrabold">
                  {posCount}
                </span>{" "}
                time(s) and skipped{" "}
                <span className="dark:text-yellow-400 font-extrabold">
                  {negCount}
                </span>{" "}
                time(s).
              </p>
              <p>
                Till now you have earned{" "}
                <span className="dark:text-yellow-400 font-extrabold">
                  {posCount * 5}
                </span>{" "}
                coins and{" "}
                <span className="dark:text-yellow-400 font-extrabold">
                  {posCount * expValue}
                </span>{" "}
                experience with this habit.{" "}
              </p>
            </div>

            <div className="text-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="text-white dark:text-black bg-gray-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
                onClick={() => setToggleModal("hidden")}
              >
                Got it !
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitStatsModal;
