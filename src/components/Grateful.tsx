import { Container, makeStyles, Typography } from "@material-ui/core";
import { animated } from "react-spring";
import { ViewType } from "../App";
import { useSpringEnter } from "./animations";

type Props = {
  type: ViewType;
};

const useStyle = makeStyles({
  root: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

function Grateful(props: Props) {
  const msgSignUp = "Спасибо за регистрацию!";
  const msgSignIn = "С возвращением!";

  const style = useStyle();

  const ContainerSpring = animated(Container);
  const [enter] = useSpringEnter();

  return (
    <ContainerSpring style={enter} classes={{ root: style.root }}>
      <Typography variant="h4" align="center">
        {props.type === ViewType.SIGN_UP && msgSignUp}
        {props.type === ViewType.SIGN_IN && msgSignIn}
      </Typography>
    </ContainerSpring>
  );
}

export default Grateful;
