import CoinIcon from "../icons/CoinIcon";
import { useColorTheme } from "../../hooks/useColorTheme";
const SingleTheme = ({
  name,
  color,
  price,
  isPurchased,
  selected,
  handleClick,
}) => {
  const { bgcolor500 } = useColorTheme();
  return (
    <div onClick={handleClick}>
      <div className="m-3 p-1 mb-8">
        {selected == name && (
          <div
            className={`h-5 w-5 -mt-2 ml-14 ${bgcolor500} border border-black text-right absolute rounded-full`}
          ></div>
        )}
        <div className={`p-8 rounded-xl ${color}`}></div>

        <div className="mt-2">
          {isPurchased ? (
            <h1>Owned</h1>
          ) : (
            <div className="flex justify-center">
              <h1 className="mr-1 font-semibold">{price}</h1>
              <CoinIcon w={"w-5"} h={"h-6"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleTheme;
