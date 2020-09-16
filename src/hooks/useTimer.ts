import * as React from "react";
import { useEffect } from "react";
import { timeEffect } from "../effects/timeEffect";

export const useTimer = (interval?: number) => {
  const [time, setTime] = React.useState(new Date());
  useEffect(() => timeEffect(setTime, interval), [setTime, interval]);
  return time;
};
