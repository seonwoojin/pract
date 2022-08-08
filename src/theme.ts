import { DefaultTheme } from "styled-components";

const deviceSizes = {
  mobile: "375px",
  tablet: "1023px",
  laptop: "1024px",
};

export const theme: DefaultTheme = {
  deviceSizes: {
    mobile: "375px",
    tablet: "1023px",
    laptop: "1024px",
  },
  red: "#E51013",
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
  },
  origin: {
    lighter: "#ffffff",
    darker: "#000000",
  },
  device: {
    mobile: `screen and (max-width: ${deviceSizes.mobile})`,
    tablet: `screen and (max-width: ${deviceSizes.tablet})`,
    laptop: `screen and (max-width: ${deviceSizes.laptop})`,
  },
};
