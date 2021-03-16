import {
  Box,
  Container,
  createMuiTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
  useMediaQuery,
} from "@material-ui/core";
import { Fragment, useMemo, useState } from "react";
import Grateful from "./components/Grateful";
import Header from "./components/Header";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

export enum ViewType {
  "SIGN_IN",
  "SIGN_UP",
}

const useStylesContainer = makeStyles({
  root: {
    paddingTop: (props: any) => props.paddingY,
    paddingBottom: (props: any) => props.paddingY,
  },
});

function App() {
  const [viewType, setViewType] = useState(ViewType.SIGN_UP);
  const [isCompleted, setIsCompleted] = useState(false);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createMuiTheme({
        overrides: {
          MuiInput: {
            formControl: {
              "label + &": {
                marginTop: 0,
              },
            },
          },
        },
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  const containerClass = useStylesContainer({ paddingY: theme.spacing(4) });

  const FormView = (
    <Fragment>
      <Header type={viewType} setType={setViewType} />
      {viewType === ViewType.SIGN_UP && (
        <SignUp setSuccessValue={setIsCompleted} />
      )}
      {viewType === ViewType.SIGN_IN && (
        <SignIn setSuccessValue={setIsCompleted} />
      )}
    </Fragment>
  );

  const GratefulView = <Grateful type={viewType} />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xs" classes={{ root: containerClass.root }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          minHeight="90vh"
        >
          {isCompleted ? GratefulView : FormView}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
