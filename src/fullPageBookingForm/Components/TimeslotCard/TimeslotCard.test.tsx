/** @jsx h */
import { h } from "preact";
import { render, screen, fireEvent } from "@testing-library/preact";
import { withMarkup } from "../../../testUtils";
import { TimeslotCard } from "./TimeslotCard";

test("Renders content correctly", () => {
  render(
    <TimeslotCard
      startsAt={new Date("March 17, 2021 06:00:00")}
      endsAt={new Date("March 17, 2021 10:00:00")}
      remainingSpots={4}
      minPrice={150}
      timezone="America/Los_Angeles"
      onSelect={jest.fn()}
    />,
  );

  expect(screen.getByText(/6:00am - 10:00am/i)).toBeInTheDocument();
  expect(screen.getByText(/4 spots left/i)).toBeInTheDocument();
  expect(
    withMarkup(screen.getByText)("From $150 / person"),
  ).toBeInTheDocument();
  expect(screen.getByText(/select/i)).toBeInTheDocument();
});

test("Calls onSelect callback", () => {
  const handleSelect = jest.fn();

  render(
    <TimeslotCard
      startsAt={new Date("March 17, 2021 06:00:00")}
      endsAt={new Date("March 17, 2021 10:00:00")}
      remainingSpots={4}
      minPrice={150}
      timezone={"Asia/Manila"}
      onSelect={handleSelect}
    />,
  );

  fireEvent.click(screen.getByText(/select/i));

  expect(handleSelect).toHaveBeenCalledTimes(1);
});
