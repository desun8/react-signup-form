import {
  createStyles,
  FormControl,
  FormHelperText,
  InputLabel,
  Theme,
  withStyles,
} from "@material-ui/core";

const Label = withStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      marginBottom: theme.spacing(1),
      fontWeight: 500,
    },
  })
)(InputLabel);

const ErrorText = withStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: '100%',
      color: theme.palette.error.main,
      opacity: 0,
      visibility: "hidden",
      transition: theme.transitions.create(["opacity", "visibility"]),

      ".Mui-error + &": {
        opacity: 1,
        visibility: "visible",
      },
    },
  })
)(FormHelperText);

type Props = {
  id: string;
  label: string;
  children: React.ReactNode;
  hasError: boolean;
};

function Field({ id, label, children, hasError }: Props) {
  return (
    <FormControl fullWidth>
      <Label shrink focused={false} htmlFor={id}>
        {label}
      </Label>
      {children}
      {hasError && <ErrorText>Введено не корректное значение</ErrorText>}
    </FormControl>
  );
}

export default Field;
