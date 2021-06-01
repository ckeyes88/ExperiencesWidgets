/** @jsx h */
import { h, FunctionComponent } from "preact";
import { Skeleton } from "../Skeleton";
import "./CalendarSkeleton.scss";

export const CalendarSkeleton: FunctionComponent = () => {
  const renderCalendarRows = (rows: number, alignEnd?: boolean) => {
    //Empty days are rendered first if you want the calendar to align to
    //end of view.
    const renderEmptyDays = () =>
      [...Array(7 - rows)].map((_, idx) => (
        <div key={`EmptyRow_${idx}`} style={"width: 24px;"} />
      ));

    return (
      <div className="CalendarRow">
        {rows < 7 && alignEnd && renderEmptyDays()}
        {[...Array(rows)].map((_, idx) => {
          return (
            <Skeleton
              key={`CalendarDaySkeleton_${idx}`}
              variant="box"
              width={"24px"}
            />
          );
        })}
        {rows < 7 && !alignEnd && renderEmptyDays()}
      </div>
    );
  };
  return (
    <div className="CalendarSkeleton">
      <div className="CalendarSkeleton__Title">
        <Skeleton variant="box" width={"54px"} />
        <Skeleton variant="body" width={"240px"} />
        <Skeleton variant="body" width={"240px"} />
      </div>
      <div className="CalendarSkeleton__Calendar">
        <div className="CalendarSkeleton__Calendar__Title">
          <Skeleton
            variant="body"
            width={"130px"}
            className="CalendarSkeleton__Calendar__Title--hasTitleMargin"
          />
          <Skeleton
            variant="body"
            width={"58px"}
            className="CalendarSkeleton__Calendar__Title--hasMarginRight"
          />
          <Skeleton variant="body" width={"44px"} />
        </div>
        <div className="CalendarSkeleton__Calendar__Days">
          {renderCalendarRows(7)}
          {renderCalendarRows(4, true)}
          {renderCalendarRows(7)}
          {renderCalendarRows(7)}
          {renderCalendarRows(7)}
          {renderCalendarRows(6)}
        </div>
      </div>
    </div>
  );
};
