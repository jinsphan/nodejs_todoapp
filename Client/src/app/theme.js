import spacing from "material-ui/styles/spacing";
import { fade } from "material-ui/utils/colorManipulator";
import {
  darkBlack,
  fullBlack,
  grey300,
  white,
} from "material-ui/styles/colors";

const accent1Color = "#00b9a7";
const accent2Color = "#008878";
const accent3Color = "#5cecd8";
const alternateTextColor = white;
const borderColor = grey300;
const canvasColor = white;
const clockCircleColor = fade(darkBlack, 0.07);
const disabledColor = fade(darkBlack, 0.3);
const fontFamily = "Roboto, sans-serif";
const pickerHeaderColor = "#006dc8";
const primary1Color = "#006dc8";
const primary2Color = "#004397";
const primary3Color = "#5b9bfc";
const secondaryTextColor = fade(darkBlack, 0.54);
const shadowColor = fullBlack;
const textColor = darkBlack;

export default {
  spacing,
  fontFamily,
  borderRadius: 2,
  palette: {
    accent1Color,
    accent2Color,
    accent3Color,
    alternateTextColor,
    borderColor,
    canvasColor,
    clockCircleColor,
    disabledColor,
    pickerHeaderColor,
    primary1Color,
    primary2Color,
    primary3Color,
    secondaryTextColor,
    shadowColor,
    textColor,
  },
};
