import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { useColorTheme } from "../../../hooks/useColorTheme";
import Shimmer from "../../../pages/Shimmer";
import toast, { Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "../../common/Toast";
const Modal = lazy(() => import("../../common/Modal"));

const ImportSetting = () => {
  const [settingData, setSettingData] = useState(null);
  const { textcolor500, bgcolor500, customcolor } = useColorTheme();
  const [toggleModal, setToggleModal] = useState("hidden");
  const uploadedFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const settingsData = e.target.result;
      setSettingData(settingsData);
    };
    reader.readAsText(file);
  };
  const addData = () => {
    if (settingData != null) {
      let settings = JSON.parse(atob(settingData));
      if (
        window.confirm(
          "Do you want to import and apply the settings? This will overwrite if any exisiting settings are present."
        )
      ) {
        for (const [key, value] of Object.entries(settings)) {
          if (value == null || value == "null" || value == undefined) {
            localStorage.removeItem(key);
          } else {
            localStorage.setItem(key, value);
          }
        }
      }
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
        Import Settings
      </div>

      {toggleModal != "hidden" && (
        <Suspense fallback={<Shimmer />}>
          <Modal
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            heading={"Import Setting"}
          >
            <div className="p-5 md:p-q space-y-1">
              <p className="mb-5">
                If you have exported your settings, you can import your
                settings.habitech file to apply the settings.
              </p>

              <input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input"
                type="file"
                accept=".habitech"
                onChange={uploadedFile}
              />
              <p className="text-xs italic">Allowed .habitech file only</p>
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

export default ImportSetting;
