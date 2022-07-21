import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import { RecoilRoot } from "recoil";
import { theme } from "./theme";
import "./index.css";

const queryClient = new QueryClient();

const GlobalStyle = createGlobalStyle`

${reset}

* {
  box-sizing: border-box;
}
body {
  font-family: 'Oswald','Holtwood One SC', sans-serif;
  font-weight: 400;
  color:${(props) => props.theme.origin.darker};
  line-height: 1.2;
  background-color: white;
}
a {
  text-decoration: none;
  color:inherit;
}
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
