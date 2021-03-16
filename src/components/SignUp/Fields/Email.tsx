import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import Field from "../../Field/Field";
import Input from "../../Field/Input";
import { Props } from "../../Field/types";

function Email(props: Props<{ value: string; hasError: boolean }>) {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showError, setShowError] = useState(false);

  const validation = (value: string, setError: (a: boolean) => void) => {
    const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]+)])/gim;

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
    <Field id="email" label="Email" hasError={true}>
      <Input
        id="email"
        error={showError}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name="email"
        autoComplete="email"
        placeholder="Введите Ваш email"
      />
    </Field>
  );
}

export default Email;
