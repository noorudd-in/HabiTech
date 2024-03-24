import { useColorTheme } from "../../hooks/useColorTheme";
const Modal = ({ toggleModal, heading, setToggleModal, footer, children }) => {
  const { bgcolor500 } = useColorTheme();
  return (
    <div
      tabIndex="-1"
      aria-hidden="true"
      className={`${toggleModal} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-300 bg-opacity-50`}
    >
      <div className="mx-10 lg:mx-40 my-52">
        <div className="relative  rounded-lg shadow bg-gray-700">
          <div className="text-center p-4 md:p-5 border-b rounded-t border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              {/* Heading */}
              {heading}
            </h3>
          </div>

          {/* Content */}
          {children}

          {/* Footer */}
          <div className="text-center p-4 md:p-5 border-t rounded-b border-gray-600">
            <button
              type="button"
              className={`text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center ${bgcolor500}`}
              onClick={() => setToggleModal("hidden")}
            >
              {footer}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
