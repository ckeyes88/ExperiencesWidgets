/** @jsx h */
import { h, FunctionComponent } from "preact";

export type CloseIconProps = {
  color?: string;
  width?: number;
  height?: number;
  strokeSize?: number;
};

export const CloseIcon: FunctionComponent<CloseIconProps> = ({
  color = "#000",
  width = 16,
  height = 16,
  strokeSize = 3,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.48511 8.48532L25.4557 25.4559"
      stroke={color}
      stroke-width={strokeSize}
    />
    <path
      d="M8.48511 25.4558L25.4557 8.48528"
      stroke={color}
      stroke-width={strokeSize}
    />
  </svg>
);
