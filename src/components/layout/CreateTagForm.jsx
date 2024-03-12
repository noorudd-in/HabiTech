import { useContext, useState } from "react";
import { HabitechContext } from "../../contexts/HabitechContext";
import { toast, Toaster } from "react-hot-toast";
import { toastError, toastSuccess } from "../common/Toast";
import { API_URL } from "../../constants";
import { useColorTheme } from "../../hooks/useColorTheme";
import axios from "axios";

const CreateTagForm = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const [newTag, setNewTag] = useState("");
  const { bgcolor500, lighttext, customcolor } = useColorTheme();

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
        availableTags: [...state.availableTags, newTag],
        lastEdited: Date.now(),
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            availableTags: res?.data?.availableTags,
            lastEdited: res?.data?.lastEdited,
          },
        });
        toast("Tag created successfully!", toastSuccess(customcolor));
        setNewTag("");
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
          className="my-1 p-1 bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Example: Work"
          onChange={(e) => setNewTag(e.target.value)}
          required
        />
        <button
          className={`block my-3 p-2 ${bgcolor500} ${lighttext} text-lg rounded-lg`}
          onClick={creatTag}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTagForm;
