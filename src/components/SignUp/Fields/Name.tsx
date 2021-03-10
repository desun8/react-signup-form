import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import Field from "../../Field/Field";
import Input from "../../Field/Input";
import { Props } from "../../Field/types";

function Name(props: Props<{ value: string; hasError: boolean }>) {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showError, setShowError] = useState(false);

  const validation = (value: string, setError: (a: boolean) => void) => {
    const regexp = /^[a-zа-я]+(([ -][a-zа-я])?[a-zа-я]*)*$/i;
    const isMatch = value.match(regexp) !== null;
    const hasError = value !== "" ? !isMatch : false;

    setError(hasError);
  };

  useEffect(() => {
    validation(value, setHasError);
    props.setValue({ value: value, hasError: hasError });
  }, [value, hasError]);

  const [shouldValid, setShouldValid] = useState(false);

  useEffect(() => {
    if (hasError && shouldValid) {
      setShowError(true);
    } else {
      setShowError(false);
      setShouldValid(false);
    }
  }, [hasError, shouldValid]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value.trim());
    setShouldValid(true);
  };

  return (
    <Field id="name" label="Имя" hasError={true}>
      <Input
        id="name"
        error={showError}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name="name"
        autoComplete="name"
        placeholder="Введите Ваше имя"
      />
    </Field>
  );
}

export default Name;
