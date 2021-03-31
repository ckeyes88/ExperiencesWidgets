/** @jsx h */
import { h, FunctionComponent } from "preact";
import "./Skeleton.scss";

export type SkeletonProps = {
  variant: "display" | "body" | "button";
  width?: string | number;
};

export const Skeleton: FunctionComponent<SkeletonProps> = ({
  variant,
  width,
}) => <div className={`skeleton skeleton--${variant}`} style={{ width }} />;
