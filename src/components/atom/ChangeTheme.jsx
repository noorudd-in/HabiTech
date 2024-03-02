import SingleTheme from "../electrons/SingleTheme";

const ChangeTheme = () => {
  return (
    <>
      <div className="flex justify-around mb-10">
        <SingleTheme name={"Red"} lower="bg-red-300" higher="bg-red-600" />
        <SingleTheme
          name={"Orange"}
          lower="bg-orange-300"
          higher="bg-orange-600"
        />
        <SingleTheme name={"Lime"} lower="bg-lime-300" higher="bg-lime-600" />
        <SingleTheme
          name={"Green"}
          lower="bg-green-300"
          higher="bg-green-600"
        />
      </div>

      <div className="flex justify-around mb-10">
        <SingleTheme name={"Teal"} lower="bg-teal-300" higher="bg-teal-600" />
        <SingleTheme
          name={"Emerald"}
          lower="bg-emerald-300"
          higher="bg-emerald-600"
        />
        <SingleTheme
          name={"Amber"}
          lower="bg-amber-300"
          higher="bg-amber-600"
        />
        <SingleTheme
          name={"Yellow"}
          lower="bg-yellow-300"
          higher="bg-yellow-600"
        />
      </div>

      <div className="flex justify-around mb-10">
        <SingleTheme name={"Cyan"} lower="bg-cyan-300" higher="bg-cyan-600" />
        <SingleTheme name={"Blue"} lower="bg-blue-300" higher="bg-blue-600" />
        <SingleTheme name={"Sky"} lower="bg-sky-300" higher="bg-sky-600" />
        <SingleTheme
          name={"Indigo"}
          lower="bg-indigo-300"
          higher="bg-indigo-600"
        />
      </div>

      <div className="flex justify-around">
        <SingleTheme
          name={"Violet"}
          lower="bg-violet-300"
          higher="bg-violet-600"
        />
        <SingleTheme
          name={"Purple"}
          lower="bg-purple-300"
          higher="bg-purple-600"
        />
        <SingleTheme name={"Rose"} lower="bg-rose-300" higher="bg-rose-600" />
        <SingleTheme name={"Pink"} lower="bg-pink-300" higher="bg-pink-600" />
      </div>
    </>
  );
};

export default ChangeTheme;
