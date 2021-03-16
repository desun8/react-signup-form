import { Box, Button, Typography } from "@material-ui/core";
import { animated } from "react-spring";
import { ViewType } from "../App";
import { enterParams, useSpringEnter } from "./animations";

export type Props = {
  type: ViewType;
  setType: (a: ViewType.SIGN_UP | ViewType.SIGN_IN) => void;
};

function Header({ type, setType }: Props) {
  const [enter, set] = useSpringEnter();

  const handleClick = () => {
    const newValue =
      type === ViewType.SIGN_UP ? ViewType.SIGN_IN : ViewType.SIGN_UP;

    set(enterParams);
    setType(newValue);
  };

  return (
    <animated.div style={enter}>
      <Box mb={7}>
        <Typography variant="h4" component="h1">
          {type === ViewType.SIGN_UP ? "Регистрация" : "Вход"}
        </Typography>
        <Box display="flex" alignItems="center">
          <Box flexShrink={0}>
            <Typography variant="body1" component="span">
              {type === ViewType.SIGN_UP
                ? "Уже есть аккаунт?"
                : "Нет аккаунта?"}
            </Typography>
          </Box>
          <Button color="primary" onClick={handleClick}>
            {type === ViewType.SIGN_UP ? "Войти" : "Зарегистрироваться?"}
          </Button>
        </Box>
      </Box>
    </animated.div>
  );
}

export default Header;
