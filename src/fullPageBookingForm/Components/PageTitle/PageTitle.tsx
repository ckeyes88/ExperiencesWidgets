/** @jsx h */
import { h, FunctionComponent } from "preact";
import { TextStyle } from "../Common/TextStyle";
import "./PageTitle.scss";

export type PageTitleProps = {
  title: string;
  thumbnailSrc: string;
  inlineWithThumbnail?: boolean;
};

export const PageTitle: FunctionComponent<PageTitleProps> = ({
  title,
  thumbnailSrc,
  inlineWithThumbnail,
}) => {
  const classNames = ["page-title"];

  if (inlineWithThumbnail) {
    classNames.push("page-title--inline");
  }

  return (
    <div className={classNames.join(" ")}>
      <img className="page-title__thumbnail" src={thumbnailSrc} />
      <h1 className="page-title__text">
        <TextStyle variant="display1" text={title} />
      </h1>
    </div>
  );
};
