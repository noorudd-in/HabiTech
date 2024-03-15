import { useColorTheme } from "../../hooks/useColorTheme";
import dayjs from "dayjs";
import AreaGraph from "../chart/AreaGraph";

const Modal = ({ toggleModal, setToggleModal, data }) => {
  const { bgcolor500, lighttext } = useColorTheme();
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
                {/* Heading */}
                {data.name}
              </h3>
            </div>

            {/* Content */}
            <div className="p-5 md:p-q space-y-1">
              {data.posCount !== undefined && (
                <div>
                  You have completed this habit {data.posCount} time(s) and
                  skipped {data.negCount} time(s) which gives you{" "}
                  {data.posCount * 5} coins and {data.posCount * data.expValue}{" "}
                  experience points so far.
                </div>
              )}
              {data.start != undefined && (
                <div>
                  <div>
                    Time: {data.start.format("h:MM A")} to{" "}
                    {data.end.format("h:MM A")}
                  </div>
                  <div>
                    {data.description != "" ? (
                      <h1>Description: {data.description}</h1>
                    ) : (
                      <h1>No description found!</h1>
                    )}
                  </div>
                </div>
              )}
            </div>

            {data.analytics != undefined && (
              <div>
                {data.analytics[5] == undefined ? (
                  <h1 className="text-center m-3">
                    Data too low to show analytical chart. Regulary update the
                    habit to view chart.
                  </h1>
                ) : (
                  <AreaGraph data={data.analytics} />
                )}
              </div>
            )}

            <div className="text-sm font-thin px-5 md:p-q space-y-1 mb-3">
              <p>
                Created at:
                <span>
                  {" "}
                  {dayjs(new Date(data.id)).format("DD/MM/YYYY h:mm A")}
                </span>
              </p>
              <p>
                Last modified at:
                <span>
                  {" "}
                  {dayjs(new Date(data.lastUpdated)).format(
                    "DD/MM/YYYY h:mm A"
                  )}
                </span>
              </p>
            </div>

            <div className="text-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className={`${lighttext} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${bgcolor500}`}
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

export default Modal;
