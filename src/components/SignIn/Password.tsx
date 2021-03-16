import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import Field from "../Field/Field";
import Input from "../Field/Input";
import { Props } from "../Field/types";

function Password({ setFormValue }: Props<string>) {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [shouldValid, setShouldValid] = useState(false);

  useEffect(() => {
    if (shouldValid) {
      setHasError(value === "");
    }

    setFormValue(value);
  }, [setFormValue, shouldValid, value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setShouldValid(true);
    setValue(e.currentTarget.value.trim());
  };

  return (
    <Field id="password" label="Пароль" hasError={true}>
      <Input
        id="password"
        error={hasError}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name="password"
        type="password"
        placeholder="Введите пароль (root)"
      />
    </Field>
  );
}

export default Password;
