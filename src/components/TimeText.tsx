import React from "react";
import { Tooltip, TooltipProps } from "@material-ui/core";
import moment from "moment";
import styled from "styled-components";

export type TimeTextProps = Omit<TooltipProps, "title" | "children"> & {
  time: Date;
  color: "error" | "success";
};

export const TimeText: React.FC<TimeTextProps> = ({
  time,
  children,
  color,
  ...rest
}) => (
  <Tooltip
    placement="top"
    title={time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    {...rest}
  >
    <ColoredText color={color}>{moment(time).fromNow()}</ColoredText>
  </Tooltip>
);

export const ColoredText = styled.span<Pick<TimeTextProps, "color">>`
  color: ${({ theme, color }) => theme.palette[color].main};
`;
