import { Grid } from "@material-ui/core";
import { FormEvent, useEffect, useState } from "react";
import { animated } from "react-spring";
import { useSpringEnter } from "../animations";
import Agreement from "./Fields/Agreement";
import Email from "./Fields/Email";
import Language from "./Fields/Language";
import Name from "./Fields/Name";
import Phone from "./Fields/Phone";
import Submit from "./Submit";

type Props = {
  setSuccessValue: (a: boolean) => void;
};

function SignUp(props: Props) {
  const [isFormValid, setIsFormValid] = useState(false);

  const [name, setName] = useState({
    value: "",
    hasError: false,
  });
  const [email, setEmail] = useState({
    value: "",
    hasError: false,
  });
  const [phone, setPhone] = useState({
    value: "",
    hasError: false,
  });
  const [language, setLanguage] = useState("");
  const [agreement, setAgreement] = useState(false);

  // const formFields = [name, email, phone, language, agreement];
  const formValidation = (
    fields: Array<{ value: string; hasError: boolean } | string | boolean>,
    setValid: (a: boolean) => void
  ) => {
    const isValid = fields.every((field) => {
      let isValid = false;

      if (typeof field === "object" && field.hasError !== undefined) {
        isValid = field.value !== "" && field.hasError === false;
      } else {
        isValid = !!field;
      }

      return isValid;
    });

    setValid(isValid);
  };

  useEffect(() => {
    formValidation([name, email, phone, language, agreement], setIsFormValid);
  }, [name, email, phone, language, agreement]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const url = e.currentTarget.action || "/registration";
    const data = new FormData(e.currentTarget);

    if (data.has("agreement")) {
      data.set("agreement", `${agreement}`);
    }

    fetch(url, { method: "POST", body: data })
      .then((response) => {
        if (!response.ok) {
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
    <animated.form
      style={enter}
      action="/registration"
      onSubmit={handleSubmit}
    >
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <Name setFormValue={setName} />
        </Grid>
        <Grid item>
          <Email setFormValue={setEmail} />
        </Grid>
        <Grid item>
          <Phone setFormValue={setPhone} />
        </Grid>
        <Grid item>
          <Language setFormValue={setLanguage} />
        </Grid>
        <Grid item>
          <Agreement setFormValue={setAgreement} />
        </Grid>
        <Grid item>
          <Submit disabled={!isFormValid} />
        </Grid>
      </Grid>
    </animated.form>
  );
}

export default SignUp;
