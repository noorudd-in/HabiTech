const RenderAvailableTags = () => {
  return (
    <div>
      <h3 className="text-sm text-gray-900 dark:text-white">
        Choose technology:
      </h3>
      <ul className="grid grid-cols-3 gap-2">
        <li>
          <input
            type="checkbox"
            id="react-option"
            value="react"
            className="hidden peer"
            required=""
          />
          <label
            htmlFor="react-option"
            className="inline-flex items-center justify-between p-1 text-gray-500 bg-white border-1 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-amber-500 peer-checked:border-amber-600 hover:text-amber-600 dark:peer-checked:text-amber-100 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="">
              <div className="">React Js</div>
            </div>
          </label>
        </li>
        {/** 
        <li>
          <input
            type="checkbox"
            id="flowbite-option"
            value=""
            className="hidden peer"
          />
          <label
            htmlFor="flowbite-option"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">Vue Js</div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="checkbox"
            htmlFor="angular-option"
            value=""
            className="hidden peer"
          />
          <label
            for="angular-option"
            className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">Angular</div>
            </div>
          </label>
        </li>
        */}
      </ul>
    </div>
  );
};

export default RenderAvailableTags;
