import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
    origin: {
      darker: string;
      lighter: string;
    };
    device: {
      mobile: string;
      tablet: string;
      laptop: string;
    };
    deviceSizes: {
      mobile: string;
      tablet: string;
      laptop: string;
    };
  }
}
