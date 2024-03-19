import Vibration from "./Vibration";
import Sound from "./Sound";
import BGTheme from "./BGTheme";

const SoundAndVibration = () => {
  return (
    <div className="mx-5 mt-16 text-lg">
      <Vibration />
      <Sound />
      <BGTheme />
    </div>
  );
};

export default SoundAndVibration;
