import { FormEvent, useEffect, useState } from "react";
import { animated } from "react-spring";
import { Grid } from "@material-ui/core";
import Submit from "../SignUp/Submit";
import Login from "./Login";
import Password from "./Password";
import { useSpringEnter } from "../animations";

type Props = {
  setSuccessValue: (a: boolean) => void;
};

function SignIn(props: Props) {
  const [isFormValid, setIsFormValid] = useState(false);

  const formValidation = (fields: string[], setValid: (a: boolean) => void) => {
    const isValid = fields.every((field) => field !== "");

    setValid(isValid);
  };

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    formValidation([login, password], setIsFormValid);
  }, [login, password]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = e.currentTarget.action || "/signin";
    const data = new FormData(e.currentTarget);

    fetch(url, { method: "POST", body: data })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            alert(
              "Ошибка! Неверный логин и/или пароль.\nПопробуйте 🐼:\nлогин - hello@world.js\nпароль - root"
            );
          }
          throw new Error(`${response.status}`);
        }

        props.setSuccessValue(true);
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [enter] = useSpringEnter();

  return (
    <animated.form style={enter} action="/signin" onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Login setValue={setLogin} />
        </Grid>
        <Grid item>
          <Password setValue={setPassword} />
        </Grid>
        <Grid item>
          <Submit disabled={!isFormValid} />
        </Grid>
      </Grid>
    </animated.form>
  );
}

export default SignIn;
