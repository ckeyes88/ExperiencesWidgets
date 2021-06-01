/** @jsx h */
import { h, FunctionComponent } from "preact";
import "./Skeleton.scss";

export type SkeletonProps = {
  variant: "display" | "body" | "button" | "box";
  width?: string;
  className?: string;
};

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  variant,
  width,
  className,
}) => {
  let styles = "";
  if (!!width) {
    styles = `width:${width}`;
  }
  if (variant === "box" && !!width) {
    styles = `width: ${width}; height: ${width}`;
  }

  return (
    <div
      className={`skeleton skeleton--${variant} ${className ? className : ""}`}
      style={styles}
    />
  );
};
