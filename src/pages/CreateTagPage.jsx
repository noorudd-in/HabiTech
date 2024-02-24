import AvailableTags from "../components/electrons/AvailableTags";
import HorizontalLine from "../components/atom/HorizontalLine";
import CreateTagForm from "../components/electrons/CreateTagForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";
const CreateTagPage = () => {
  const [tagData, setTagData] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(true);

  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setTagData(res?.data?.availableTags);
    });
  }, [toggleUpdate]);
  return (
    <div>
      <CreateTagForm
        toggleUpdate={toggleUpdate}
        setToggleUpdate={setToggleUpdate}
      />
      <HorizontalLine />
      <AvailableTags tagData={tagData} />
    </div>
  );
};

export default CreateTagPage;
