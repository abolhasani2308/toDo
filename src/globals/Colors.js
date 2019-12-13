const BLUE = {
  primary: "rgb(15,178,170)",
  secondary: "rgb(233,236,239)",
  text_color: "rgb(222,47,86)"
};

const GREEN = {
  primary: "#f46a4e",
  secondary: "#f3b05a",
  text_color: "#5c4a72"
};
const RED = {
  primary: "rgb(53,49,99)",
  secondary: "rgb(235,36,65)",
  text_color: "rgb(230,230,232)"
};

const colors = theme => {
  switch (theme) {
    case "blue":
      return BLUE;

    case "green":
      return GREEN;

    case "red":
      return RED;

    default:
      return BLUE;
  }
};

export { colors };
