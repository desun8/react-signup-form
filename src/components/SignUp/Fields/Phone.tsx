import { ChangeEvent, FocusEvent, useEffect, useState } from "react";
import Field from "../../Field/Field";
import Input from "../../Field/Input";
import { Props } from "../../Field/types";

function Phone(props: Props<{ value: string; hasError: boolean }>) {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showError, setShowError] = useState(false);

  const validation = (value: string, setError: (a: boolean) => void) => {
    const regexp = /^\+?\d[(]?[0-9]{3}[)]?[-0-9]*\d$/g;
    let isMatch = value.match(regexp) !== null;
    let isFill = false;

    if (isMatch) {
      const numbers = value.replace(/[.\-+(d)]/g, "");
      isFill = numbers.length === 11;
    }

    const isError = !(isMatch && isFill);
    setError(value !== "" ? isError : false);
  };

  useEffect(() => {
    validation(value, setHasError);
    props.setValue({ value: value, hasError: hasError });
  }, [value, hasError]);

  const [prevValue, setPrevValue] = useState("");
  const [shouldValid, setShouldValid] = useState(false);

  useEffect(() => {
    if (hasError && shouldValid) {
      setShowError(true);
    } else {
      setShowError(false);
      setShouldValid(false);
    }
  }, [hasError, shouldValid]);

  /**
   * Проверка на наличие парных "(" и ")".
   * Если скобка не парная (например забыли), то добавляем.
   */
  const fixBrackets = (value: string, setValue: (a: string) => void) => {
    const openRoundBracket = value.search(/\(/) !== -1;
    const closeRoundBracket = value.search(/\)/) !== -1;

    const onlyOpenBracket = openRoundBracket && !closeRoundBracket;
    const onlyCloseBracket = !openRoundBracket && closeRoundBracket;

    const isLostBrackets = onlyOpenBracket || onlyCloseBracket;

    if (isLostBrackets) {
      let newVal = value;
      let pos = 0;

      if (onlyOpenBracket) {
        pos = value.search(/\(/) + 4;
        newVal = value.slice(0, pos) + ")" + value.slice(pos);
      } else {
        pos = value.search(/\)/) - 3;
        newVal = value.slice(0, pos) + "(" + value.slice(pos);
      }

      setValue(newVal);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const regex = /^\+?\d?[(]?\d{0,3}[)]?(\d-?)?(\d-?)?(\d-?)?(\d-?)?(\d-?)?(\d-?)?\d?$/g; // +?9(?999)?9-?9-?9-?9-?9-?9-?9
    const isMatch = value.match(regex) !== null;

    if (value !== "" && isMatch === false) {
      setValue(prevValue);
    } else {
      // Проверяем количество цифр
      const length = value.replace(/[.\-+(d)]/g, "").length;
      if (length <= 11) {
        setPrevValue(value);
        setValue(value);
      }
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setShouldValid(true);
    setValue(e.currentTarget.value.trim());
    fixBrackets(value, setValue);
  };

  return (
    <Field id="tel" label="Номер телефона" hasError={true}>
      <Input
        id="tel"
        error={showError}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        type="tel"
        name="phone"
        autoComplete="tel"
        placeholder="Введите номер телефона"
      />
    </Field>
  );
}

export default Phone;
