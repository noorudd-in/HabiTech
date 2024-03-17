import { useEffect, useContext } from "react";
import { HabitechContext } from "../contexts/HabitechContext";
import { useNavigate } from "react-router-dom";
import AvailableTags from "../components/common/AvailableTags";
import HorizontalLine from "../components/common/HorizontalLine";
import CreateTagForm from "../components/layout/CreateTagForm";
import axios from "axios";
import { API_URL } from "../constants";
import { toast } from "react-hot-toast";
import { toastError } from "../components/common/Toast";

const CreateTagPage = () => {
  const { state, dispatch } = useContext(HabitechContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.user.name == undefined) {
      navigate("/");
    }
  });

  const handleDelete = (givenTag) => {
    const newTags = state.availableTags.filter((tag) => {
      return tag !== givenTag;
    });

    let newActivity = {
      action: "delete",
      type: "tag",
      name: givenTag,
      time: Date.now(),
    };

    axios
      .put(API_URL, {
        ...state,
        availableTags: newTags,
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
        toast("Tag deleted!", toastError());
      });
  };

  return (
    <div>
      <CreateTagForm />
      <HorizontalLine />
      <div className="text-center text-2xl mt-2 mx-2">
        <h1>Available Tags</h1>
        <AvailableTags
          tagData={state.availableTags}
          deleteIcon={true}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default CreateTagPage;
