import Vibration from "./sound/Vibration";
import Sound from "./sound/Sound";
import { useColorTheme } from "../../hooks/useColorTheme";

const SoundAndVibration = () => {
  const { textcolor500 } = useColorTheme();
  return (
    <div className="mx-5 mt-16 text-lg mb-24">
      <h1 className={`text-center my-10 text-2xl font-bold ${textcolor500}`}>
        Feel the experience! 😌
      </h1>
      <Vibration />
      <Sound />
    </div>
  );
};

export default SoundAndVibration;
