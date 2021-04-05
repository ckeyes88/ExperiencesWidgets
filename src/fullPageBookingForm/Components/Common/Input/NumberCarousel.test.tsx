/** @jsx h */
import { h } from "preact";
import { fireEvent, render, screen } from "@testing-library/preact";
import { NumberCarousel, NumberCarouselProps } from "./NumberCarousel";

const props: NumberCarouselProps = {
  currentQty: 0,
  isDisabled: false,
  name: "Test",
  onChange: jest.fn(),
  onDecreaseClick: jest.fn(),
  onIncreaseClick: jest.fn(),
  qtyMaximum: 5,
};

const buttonDisabledClass = "number-carousel__button--disabled";

test("Renders number carousel correctly.", () => {
  render(<NumberCarousel {...props} />);
  const input = screen.getByRole("number-carousel-input");
  const increase = screen.getByRole("number-carousel-increase");
  const decrease = screen.getByRole("number-carousel-decrease");

  expect(screen.getByText("+")).toBeInTheDocument();
  expect(screen.getByText("-")).toBeInTheDocument();

  expect(input).toHaveAttribute("min", "0");
  expect(input).toHaveAttribute("max", "5");
  expect(input).toHaveAttribute("name", "Test");
  expect(input).toHaveValue(0);

  expect(input).not.toHaveAttribute("disabled", "");
  expect(increase).not.toHaveAttribute("disabled", "");
  expect(decrease).toHaveAttribute("disabled", "");
});

test("Disables input correctly.", () => {
  render(<NumberCarousel {...props} isDisabled={true} />);
  const input = screen.getByRole("number-carousel-input");

  expect(input).toHaveAttribute("disabled", "");
});

test("Disables buttons correctly based upon props.", () => {
  render(<NumberCarousel {...props} isDisabled={true} />);
  const increase = screen.getByRole("number-carousel-increase");
  const decrease = screen.getByRole("number-carousel-decrease");

  expect(increase).toHaveAttribute("disabled", "");
  expect(increase).toHaveClass(buttonDisabledClass);
  expect(decrease).toHaveAttribute("disabled", "");
  expect(decrease).toHaveClass(buttonDisabledClass);
});

test("Enables all inputs/buttons correctly.", () => {
  render(<NumberCarousel {...props} currentQty={1} />);
  const increase = screen.getByRole("number-carousel-increase");
  const decrease = screen.getByRole("number-carousel-decrease");
  const input = screen.getByRole("number-carousel-input");

  expect(increase).not.toHaveAttribute("disabled", "");
  expect(increase).not.toHaveClass(buttonDisabledClass);
  expect(decrease).not.toHaveAttribute("disabled", "");
  expect(decrease).not.toHaveClass(buttonDisabledClass);
  expect(input).not.toHaveAttribute("disabled", "");
  expect(input).toHaveValue(1);
});

test("Disables + button correctly based upon max qty.", () => {
  render(<NumberCarousel {...props} currentQty={5} />);
  const increase = screen.getByRole("number-carousel-increase");
  const decrease = screen.getByRole("number-carousel-decrease");

  expect(increase).toHaveAttribute("disabled", "");
  expect(increase).toHaveClass(buttonDisabledClass);
  expect(decrease).not.toHaveAttribute("disabled", "");
  expect(decrease).not.toHaveClass(buttonDisabledClass);
});

test("Calls onIncreaseClick correctly.", () => {
  const handleClick = jest.fn();
  render(<NumberCarousel {...props} onIncreaseClick={handleClick} />);
  const increase = screen.getByRole("number-carousel-increase");

  fireEvent.click(increase);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("Calls onDecreaseClick correctly.", () => {
  const handleClick = jest.fn();
  render(<NumberCarousel {...props} onDecreaseClick={handleClick} />);
  const decrease = screen.getByRole("number-carousel-decrease");

  fireEvent.click(decrease);

  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("Calls onChange correctly with a number.", () => {
  const handleChange = jest.fn();
  render(<NumberCarousel {...props} onChange={handleChange} />);
  const input = screen.getByRole("number-carousel-input");

  fireEvent.change(input, { target: { value: 3 } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(input).toHaveValue(3);
});

test("Calls onChange correctly with a character.", () => {
  const handleChange = jest.fn();
  render(<NumberCarousel {...props} onChange={handleChange} />);
  const input = screen.getByRole("number-carousel-input");

  fireEvent.change(input, { target: { value: "a" } });

  expect(handleChange).toHaveBeenCalledTimes(1);
  expect(input).not.toHaveValue();
});
