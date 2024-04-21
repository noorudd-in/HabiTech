import { useColorTheme } from "../../hooks/useColorTheme";

const H1 = ({ children }) => {
  const { customcolor } = useColorTheme();
  return (
    <h1
      className="font-bold mb-2 sm:text-7xl text-3xl text-center"
      style={{ color: customcolor }}
    >
      {children}
    </h1>
  );
};

export default H1;
