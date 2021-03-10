import { Meta, Story } from "@storybook/react";
import { ViewType } from "../App";

import Header, { Props } from "./Header";

export default {
  title: "Components/Header",
  component: Header,
} as Meta;

const Template: Story<Props> = (args) => <Header {...args} />;

export const SingUp = Template.bind({});
SingUp.args = {
  type: ViewType.SIGN_UP,
  setType: () => {}
};

export const SingIn = Template.bind({});
SingIn.args = {
  type: ViewType.SIGN_IN,
  setType: () => {}
};

