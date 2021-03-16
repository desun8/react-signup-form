import { withStyles, Theme, createStyles, InputBase } from "@material-ui/core";

const Input = withStyles((theme: Theme) =>
  createStyles({
    input: {
      borderRadius: 6,
      border: "1px solid #dbe2ea",
      padding: "16px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      appearance: 'none',
      "&:focus": {
        borderColor: theme.palette.primary.main,
      },
    },
  })
)(InputBase);

export default Input;