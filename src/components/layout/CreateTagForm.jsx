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
  const { bgcolor500, customcolor, textcolor500 } = useColorTheme();

  const creatTag = () => {
    if (state.availableTags.includes(newTag.toLowerCase())) {
      toast("Tag already available!", toastError());
      return;
    }
    if (newTag == "") {
      toast("Tag name cannot be empty!", toastError());
      return;
    }

    let newActivity = {
      action: "create",
      type: "tag",
      name: newTag,
      time: Date.now(),
    };

    axios
      .put(API_URL, {
        ...state,
        availableTags: [...state.availableTags, newTag],
        activity: [...state.activity, newActivity],
        lastEdited: Date.now(),
      })
      .then((res) => {
        dispatch({
          type: "FETCH_DATA",
          payload: {
            availableTags: res?.data?.availableTags,
            activity: res?.data?.activity,
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
      <div
        className={`text-center mt-10 ml-5 text-2xl font-bold ${textcolor500}`}
      >
        <h1>Let's create tags!</h1>
      </div>
      <div className="ml-5 mt-2 mb-5">
        <label className="text-lg block" htmlFor="tag">
          Tag Name
        </label>
        <input
          type="text"
          value={newTag}
          className="my-1 p-1 border text-md rounded-md bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="Example: Work"
          onChange={(e) => setNewTag(e.target.value)}
          required
        />
        <button
          className={`block my-3 p-2 ${bgcolor500} text-black text-lg rounded-lg`}
          onClick={creatTag}
        >
          Create
        </button>
      </div>
    </>
  );
};

export default CreateTagForm;
