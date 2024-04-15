export const toastSuccess = (customcolor, icon) => {
  return {
    duration: 4000,
    icon: "👏",
    style: {
      borderRadius: "20px",
      background: "#343a40",
      color: customcolor == undefined ? "#ffffff" : customcolor,
    },
  };
};

export const toastError = () => {
  return {
    duration: 4000,
    icon: "😓",
    style: {
      borderRadius: "20px",
      background: "#343a40",
      color: "#E02424",
    },
  };
};

export const toastInfo = (customcolor) => {
  return {
    duration: 4000,
    icon: "💁",
    style: {
      borderRadius: "20px",
      background: "#343a40",
      color: customcolor,
    },
  };
};
