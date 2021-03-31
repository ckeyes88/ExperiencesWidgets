/** @jsx h */
import { h, FunctionComponent } from "preact";
import { TextStyle } from "../Common/TextStyle";
import "./EventTitle.scss";

export type EventTitleProps = {
  title: string;
  thumbnailSrc: string;
  inlineWithThumbnail?: boolean;
};

export const EventTitle: FunctionComponent<EventTitleProps> = ({
  title,
  thumbnailSrc,
  inlineWithThumbnail,
}) => {
  const classNames = ["event-title"];

  if (inlineWithThumbnail) {
    classNames.push("event-title--inline");
  }

  return (
    <div className={classNames.join(" ")}>
      <img className="event-title__thumbnail" src={thumbnailSrc} />
      <h1 className="event-title__text">
        <TextStyle variant="display1" text={title} />
      </h1>
    </div>
  );
};
