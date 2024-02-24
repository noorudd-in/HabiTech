export const toastSuccess = () => {
  return {
    duration: 4000,
    icon: "👏",
    style: {
      borderRadius: "20px",
      background: "#343a40",
      color: "#ffbe0b",
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
      color: "#ef233c",
    },
  };
};

export const toastInfo = () => {
  return {
    duration: 4000,
    icon: "💁",
    style: {
      borderRadius: "20px",
      background: "#343a40",
      color: "#ffbe0b",
    },
  };
};
