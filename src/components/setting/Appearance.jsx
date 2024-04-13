import {
  SELECT_AVATAR_IMG,
  SELECT_BACKGROUND_IMG,
  SELECT_THEME_IMG,
} from "../../constants";
import { Link } from "react-router-dom";

const Appearance = () => {
  return (
    <div className="m-2">
      <Link to={"/theme"}>
        <div
          className="my-10 h-40 text-black text-center flex justify-center items-center font-bold text-4xl rounded-xl"
          style={{
            backgroundImage: `url('${SELECT_THEME_IMG}')`,
          }}
        >
          Apply Theme
        </div>
      </Link>
      <Link to={"/background"}>
        <div
          className="my-10 h-40 text-black text-center flex justify-center items-center font-bold text-4xl rounded-xl"
          style={{
            backgroundImage: `url('${SELECT_BACKGROUND_IMG}')`,
          }}
        >
          Apply Background
        </div>
      </Link>
      <Link to={"/avatar"}>
        <div
          className="my-10 h-40 text-black text-center flex justify-center items-center font-bold text-4xl rounded-xl"
          style={{
            backgroundImage: `url('${SELECT_AVATAR_IMG}')`,
          }}
        >
          Apply Avatar
        </div>
      </Link>
    </div>
  );
};

export default Appearance;
