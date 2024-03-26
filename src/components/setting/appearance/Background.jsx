import { useContext, useEffect, useState } from "react";
import CoinIcon from "../../icons/CoinIcon";
import { useColorTheme } from "../../../hooks/useColorTheme";
import { HabitechContext } from "../../../contexts/HabitechContext";
import {
  API_URL,
  BGAnchor,
  BGAncient,
  BGBlackEye,
  BGBubble,
  BGChevron,
  BGCircle,
  BGCircuit,
  BGCloud,
  BGCross,
  BGDanger,
  BGDice,
  BGFloor,
  BGFoodie,
  BGGeometry,
  BGGlamour,
  BGGraph,
  BGHaven,
  BGHoneycomb,
  BGInvasion,
  BGLane,
  BGMechanic,
  BGMotion,
  BGOvercast,
  BGPolyfill,
  BGPuzzle,
  BGRail,
  BGSpirit,
  BGSpot,
  BGSquare,
  BGStar,
  BGTexture,
  BGTicTacToe,
  BGToggle,
  BGTopography,
  BGTriangle,
  BGWall,
  BGWallpaper,
  BGWiggle,
} from "../../../constants";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { toastError } from "../../common/Toast";

const BGData = [
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710402866/habitech/background-images/None_rs0e23.png",
    name: "None",
    price: 0,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710358280/habitech/background-images/Texture_rd4kzk.png",
    name: "Texture",
    price: 0,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710358282/habitech/background-images/Overcast_teg1hg.png",
    name: "Overcast",
    price: 0,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710395348/habitech/background-images/TicTacToe_jybwmb.png",
    name: "Tic Tac Toe",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710395349/habitech/background-images/Sqaure_l7gcmr.png",
    name: "Square",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710395348/habitech/background-images/Triangle_llecca.png",
    name: "Triangle",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710395351/habitech/background-images/Circle_mntauy.png",
    name: "Circle",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710395355/habitech/background-images/Wings_evhfws.png",
    name: "Wings",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396873/habitech/background-images/Star_pojxjv.png",
    name: "Star",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396889/habitech/background-images/Floor_zid9jb.png",
    name: "Floor",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396892/habitech/background-images/Wiggle_dqeacz.png",
    name: "Wiggle",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396878/habitech/background-images/Rail_pradzc.png",
    name: "Rail",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396875/habitech/background-images/Wallpaper_ltrwkh.png",
    name: "Wallpaper",
    price: 50,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396895/habitech/background-images/Chevron_kbq4vq.png",
    name: "Chevron",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396884/habitech/background-images/Haven_ci8f7s.png",
    name: "Haven",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396885/habitech/background-images/Honeycomb_ijrnju.png",
    name: "Honeycomb",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710396900/habitech/background-images/Spirit_b0cbzx.png",
    name: "Spirit",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710397622/habitech/background-images/Spot_yb0lsm.png",
    name: "Spot",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710397627/habitech/background-images/Anchor_nvuceh.png",
    name: "Anchor",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710397628/habitech/background-images/BrickWall_vggces.png",
    name: "Brick Wall",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710397631/habitech/background-images/Motion_cqzhji.png",
    name: "Motion",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710397634/habitech/background-images/Polyfill_qhofxh.png",
    name: "Polyfill",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710397638/habitech/background-images/Bubble_soww89.png",
    name: "Bubble",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710397656/habitech/background-images/Cloud_xciskc.png",
    name: "Cloud",
    price: 100,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710398961/habitech/background-images/Toggle_zonjf5.png",
    name: "Toggle",
    price: 150,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710398965/habitech/background-images/Ancient_ooz7mf.png",
    name: "Ancient",
    price: 150,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710398973/habitech/background-images/Cross_qvmbqy.png",
    name: "Cross",
    price: 150,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710398969/habitech/background-images/Dice_yte2jy.png",
    name: "Dice",
    price: 150,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710398979/habitech/background-images/Invasion_nejbwa.png",
    name: "Invasion",
    price: 150,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710398966/habitech/background-images/Lane_bvaeat.png",
    name: "Lane",
    price: 150,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710398959/habitech/background-images/Galmour_yykcxw.png",
    name: "Glamour",
    price: 150,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710398954/habitech/background-images/Skull_jkgspd.png",
    name: "Skull",
    price: 150,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710401051/habitech/background-images/Geometry_q3stfx.png",
    name: "Geometry",
    price: 200,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710401100/habitech/background-images/Puzzle_zq9xzd.png",
    name: "Puzzle",
    price: 300,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710401103/habitech/background-images/Graph_c1bbo7.png",
    name: "Graph",
    price: 500,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710401108/habitech/background-images/Circuit_ahdmq5.png",
    name: "Circuit",
    price: 500,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710401114/habitech/background-images/Foodie_w6vray.png",
    name: "Foodie",
    price: 600,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710401111/habitech/background-images/Topography_whitvl.png",
    name: "Topography",
    price: 600,
  },
  {
    url: "https://res.cloudinary.com/dfwyvvvdp/image/upload/v1710401118/habitech/background-images/Machine_hp51n7.png",
    name: "Machine",
    price: 600,
  },
];

const getBGData = (value) => {
  switch (value) {
    case "None":
      return null;
    case "Texture":
      return BGTexture;
    case "Overcast":
      return BGOvercast;
    case "Tic Tac Toe":
      return BGTicTacToe;
    case "Square":
      return BGSquare;
    case "Triangle":
      return BGTriangle;
    case "Circle":
      return BGCircle;
    case "Wings":
      return BGBlackEye;
    case "Star":
      return BGStar;
    case "Floor":
      return BGFloor;
    case "Wiggle":
      return BGWiggle;
    case "Rail":
      return BGRail;
    case "Wallpaper":
      return BGWallpaper;
    case "Chevron":
      return BGChevron;
    case "Haven":
      return BGHaven;
    case "Honeycomb":
      return BGHoneycomb;
    case "Spirit":
      return BGSpirit;
    case "Spot":
      return BGSpot;
    case "Anchor":
      return BGAnchor;
    case "Brick Wall":
      return BGWall;
    case "Motion":
      return BGMotion;
    case "Polyfill":
      return BGPolyfill;
    case "Bubble":
      return BGBubble;
    case "Cloud":
      return BGCloud;
    case "Toggle":
      return BGToggle;
    case "Ancient":
      return BGAncient;
    case "Cross":
      return BGCross;
    case "Dice":
      return BGDice;
    case "Invasion":
      return BGInvasion;
    case "Lane":
      return BGLane;
    case "Glamour":
      return BGGlamour;
    case "Skull":
      return BGDanger;
    case "Geometry":
      return BGGeometry;
    case "Puzzle":
      return BGPuzzle;
    case "Graph":
      return BGGraph;
    case "Circuit":
      return BGCircuit;
    case "Foodie":
      return BGFoodie;
    case "Topography":
      return BGTopography;
    case "Machine":
      return BGMechanic;

    default:
      break;
  }
};

const Background = () => {
  const { bgcolor400, border400, textcolor500 } = useColorTheme();
  const [currentBG, setCurrentBG] = useState("Texture");
  const { state, dispatch } = useContext(HabitechContext);
  const applyBackground = (bgName, bgPrice) => {
    if (localStorage.getItem("userCurrentBackground") == bgName) {
      return;
    }
    // Change Background and reload if already owned
    if (state.store.background?.includes(bgName)) {
      localStorage.setItem("userBackground", getBGData(bgName));
      localStorage.setItem("userCurrentBackground", bgName);
      window.location.replace(
        "/?sound=current&toastType=toastSuccess&toastMessage=Background Applied!"
      );
    } else {
      // Purchase background and then apply.
      if (
        window.confirm(
          `Do you want to purchase ${bgName} background for ${bgPrice} coin?`
        )
      ) {
        if (state.user.coins < bgPrice) {
          toast("Not enough coins!", toastError());
          return;
        }

        let newActivity = {
          action: "purchase",
          type: "background",
          name: "Background",
          time: Date.now(),
        };

        axios
          .put(API_URL, {
            ...state,
            store: {
              ...state.store,
              background: [...state.store.background, bgName],
            },
            user: {
              ...state.user,
              coins: state.user.coins - bgPrice,
            },
            activity: [...state.activity, newActivity],
            lastEdited: Date.now(),
          })
          .then((res) => {
            localStorage.setItem("userBackground", getBGData(bgName));
            localStorage.setItem("userCurrentBackground", bgName);
            dispatch({
              type: "FETCH_DATA",
              payload: {
                store: res?.data?.store,
                user: res?.data?.user,
                activity: res?.data?.activity,
                lastEdited: res?.data?.lastEdited,
              },
            });
            window.location.replace(
              "/?sound=purchase&toastType=toastSuccess&toastMessage=Background Purchased!"
            );
          });
      }
    }
  };

  useEffect(() => {
    if (state.user.name == undefined) {
      window.location.replace("/");
    }
    const userBG = localStorage.getItem("userCurrentBackground");
    if (userBG == null || userBG == undefined) {
      setCurrentBG("None");
    } else {
      setCurrentBG(userBG);
    }
  }, []);

  return (
    <>
      <Toaster />
      <h1 className={`my-5 text-center text-2xl font-bold ${textcolor500}`}>
        Let's design your background! 🖌️
      </h1>
      <div className="grid grid-rows-4 sm:grid-rows-2 sm:grid-cols-2 mb-24">
        {BGData.map((bg) => {
          return (
            <div
              className={`col-span-1 border mx-5 my-2 rounded-lg ${
                currentBG == bg.name
                  ? bgcolor400 + " " + border400
                  : "bg-gray-300"
              } text-black`}
              key={bg.name}
              onClick={() => applyBackground(bg.name, bg.price)}
            >
              <div
                className="py-20 rounded-t-lg"
                style={{
                  backgroundImage: `url("${bg.url}")`,
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="flex justify-between my-1">
                <h1 className="ml-1 text-lg font-bold">{bg.name}</h1>
                {state.store.background?.includes(bg.name) ? (
                  <h1 className="mr-1 text-lg font-bold">Owned</h1>
                ) : (
                  <div className="mr-1 flex">
                    <h1 className="mr-1 font-bold">{bg.price}</h1>
                    <CoinIcon w={"w-5"} h={"h-6"} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Background;
