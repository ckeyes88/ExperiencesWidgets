/** @jsx h */
import { h } from "preact";
import { render, screen, fireEvent } from "@testing-library/preact";
import { TimeslotCard } from "./TimeslotCard";

const defaultMoneyFormat = "${{amount}}";

test("Renders content correctly", async () => {
  render(
    <TimeslotCard
      startsAt={new Date("March 17, 2021 06:00:00")}
      endsAt={new Date("March 17, 2021 10:00:00")}
      remainingSpots={4}
      minPrice={150}
      timezone="America/Los_Angeles"
      onSelect={jest.fn()}
      moneyFormat={defaultMoneyFormat}
    />,
  );

  expect(screen.getByText(/4 spots left/i)).toBeInTheDocument();
  expect(screen.getByText("From $150.00")).toBeInTheDocument();
  expect(screen.getByText("| person")).toBeInTheDocument();
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
      moneyFormat={defaultMoneyFormat}
    />,
  );

  fireEvent.click(screen.getByText(/select/i));

  expect(handleSelect).toHaveBeenCalledTimes(1);
});
