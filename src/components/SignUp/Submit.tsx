// import { Button } from "@material-ui/core";

import { Button, createStyles, withStyles } from "@material-ui/core";

type Props = {
  disabled: boolean;
};

const SubmitButton = withStyles(() =>
  createStyles({
    root: {
      padding: 15,
    },
  })
)(Button);

function Submit(props: Props) {
  return (
    <SubmitButton
      disabled={props.disabled}
      fullWidth
      color="primary"
      variant="contained"
      type="submit"
      size="large"
    >
      Отправить
    </SubmitButton>
  );
}

export default Submit;
