import { useContext, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { toast, Toaster } from "react-hot-toast";
import { toastError, toastInfo, toastSuccess } from "./Toast";
import { API_URL } from "../../constants";
import axios from "axios";

const CreateTagForm = ({ toggleUpdate, setToggleUpdate }) => {
  const { state, dispatch } = useContext(HabitechContext);
  const [newTag, setNewTag] = useState("");

  const creatTag = () => {
    if (state.availableTags.includes(newTag.toLowerCase())) {
      toast("Tag already available!", toastError());
      return;
    }
    if (newTag == "") {
      toast("Tag name cannot be empty!", toastError());
      return;
    }

    axios
      .put(API_URL, {
        ...state,
        availableTags: [...state.availableTags, newTag.toLowerCase()],
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            availableTags: res?.data?.availableTags,
          },
        });
        toast("Tag created successfully!", toastSuccess());
        setNewTag("");
        setToggleUpdate(!toggleUpdate);
      });
  };
  return (
    <>
      <Toaster />
      <div className="ml-28 mt-10 mb-5">
        <label className="text-lg block" htmlFor="tag">
          Tag Name
        </label>
        <input
          type="text"
          value={newTag}
          className="my-1 p-1 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Example: Work"
          onChange={(e) => setNewTag(e.target.value)}
          required
        />
        <button
          className="block my-3 p-2 bg-amber-500 text-black text-lg rounded-lg"
          onClick={creatTag}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTagForm;
