import {
  withStyles,
  Theme,
  createStyles,
  InputBase,
  makeStyles,
  Select,
  MenuItem,
} from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import Field from "../../Field/Field";
import { Props } from "../../Field/types";

const SelectInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.grey[500],

      ".MuiFormLabel-filled + &": {
        color: theme.palette.text.primary,
      },
    },
    input: {
      borderRadius: 6,
      border: "1px solid #dbe2ea",
      padding: 16,
      "&:focus, &[aria-expanded=true]": {
        backgroundColor: "transparent",
        borderRadius: 6,
        borderColor: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

const useStylesSelect = makeStyles({
  icon: {
    right: 16 - 12, // 16 - input padding; 12 - iconWidth / 2
  },
});

function Language(props: Props<string>) {
  const [value, setValue] = useState("");
  useEffect(() => {
    props.setValue(value);
  }, [value]);

  const selectClass = useStylesSelect();

  const selectItems = ["Русский", "Английский", "Китайский", "Испанский"];
  const SelectItems = selectItems.map((item) => (
    <MenuItem key={item} value={item}>
      {item}
    </MenuItem>
  ));

  const handleChange = (
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setValue(event.target.value as string);
  };

  return (
    <Field id="lang" label="Язык" hasError={false}>
      <Select
        id="lang"
        classes={{ icon: selectClass.icon }}
        displayEmpty
        input={<SelectInput />}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="" selected disabled>
          Язык
        </MenuItem>
        {SelectItems}
      </Select>
    </Field>
  );
}

export default Language;
