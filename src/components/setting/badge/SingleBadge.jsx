import { lazy, useState, Suspense } from "react";
import SingleBadgeIcon from "../../icons/SingleBadgeIcon";
import Shimmer from "../../../pages/Shimmer";
const Modal = lazy(() => import("../../common/Modal"));
const SingleBadge = ({ name, description }) => {
  const [toggleModal, setToggleModal] = useState("hidden");

  return (
    <>
      <div className="col text-center my-2" onClick={() => setToggleModal("")}>
        <div className="mx-5">
          <SingleBadgeIcon />
        </div>
        <h1 className="text-lg font-medium">{name}</h1>
      </div>

      {toggleModal != "hidden" && (
        <Suspense fallback={<Shimmer />}>
          <Modal
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            heading={name}
            footer={"Got it!"}
          >
            <h1 className="px-5 py-1">{description}</h1>
            <h1 className="px-5 py-1">
              Congratulations on earning this badge!
            </h1>
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default SingleBadge;
