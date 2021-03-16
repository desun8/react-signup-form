import { useSpring, config } from "react-spring";

export const enterParams = {
  from: {
    opacity: 0,
    transform: "translateY(-15px)",
  },
  to: {
    opacity: 1,
    transform: "translateY(0)",
  },
  reset: true,
  config: config.gentle,
};

export const useSpringEnter = () => useSpring(() => enterParams);
