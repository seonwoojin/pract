import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    darker: string;
    lighter: string;
    fontColor: string;
    search: string;
  }
}
