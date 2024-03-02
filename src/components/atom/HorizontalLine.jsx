import { useColorTheme } from "../../hooks/useColorTheme";
const HorizontalLine = () => {
  const { customcolor } = useColorTheme();
  return (
    <hr
      style={{
        color: customcolor,
        backgroundColor: customcolor,
        height: 2,
      }}
    />
  );
};

export default HorizontalLine;
