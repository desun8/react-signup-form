import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import Field from "../Field/Field";
import Input from "../Field/Input";
import { Props } from "../Field/types";

function Login({ setFormValue }: Props<string>) {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [shouldValid, setShouldValid] = useState(false);

  useEffect(() => {
    if (shouldValid) {
      setHasError(value === "");
    }

    setFormValue(value);
  }, [value, setFormValue, shouldValid]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setShouldValid(true);
    setValue(e.currentTarget.value.trim());
  };

  return (
    <Field id="login" label="Имя пользователя" hasError={true}>
      <Input
        id="login"
        error={hasError}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name="login"
        placeholder="Введите ваш email (hello@world.js)"
      />
    </Field>
  );
}

export default Login;
