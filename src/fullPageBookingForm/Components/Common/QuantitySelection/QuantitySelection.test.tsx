/** @jsx h */
import { h } from "preact";
import { render, screen } from "@testing-library/preact";
import { QuantitySelection, QuantitySelectionProps } from "./QuantitySelection";

const props: QuantitySelectionProps = {
  onChange: jest.fn(),
  onDecreaseClick: jest.fn(),
  onIncreaseClick: jest.fn(),
  unitsLeft: 5,
  maxLimit: null,
  itemsInCart: 0,
  currentSelectedUnits: 0,
  minLimit: 0,
  variants: [
    {
      currentQty: 0,
      isDisabled: false,
      name: "Test",
      price: 5,
    },
  ],
};

const disabledProps: QuantitySelectionProps = {
  ...props,
  variants: [
    {
      currentQty: 2,
      isDisabled: true,
      name: "Test",
      price: 20,
    },
  ],
};

const withQtyProps: QuantitySelectionProps = {
  ...props,
  variants: [
    {
      currentQty: 2,
      isDisabled: false,
      name: "Test",
      price: 10,
    },
  ],
};

const multipleVariants = [
  {
    currentQty: 0,
    isDisabled: false,
    name: "Test",
    price: 5,
  },
  {
    currentQty: 0,
    isDisabled: false,
    name: "Test-2",
    price: 1,
  },
];

const multipleVariantsProps: QuantitySelectionProps = {
  onChange: jest.fn(),
  onDecreaseClick: jest.fn(),
  onIncreaseClick: jest.fn(),
  unitsLeft: 5,
  variants: multipleVariants,
  maxLimit: null,
  itemsInCart: 0,
  currentSelectedUnits: 0,
  minLimit: 0,
};

const qtySelectionRole = "QuantitySelection";

test("Renders quantity selection correctly.", () => {
  render(<QuantitySelection {...props} />);

  const numCarousel = screen.getByRole("NumberCarousel-Test");
  const qtySelection = screen.getByRole(qtySelectionRole);

  expect(numCarousel).toBeDefined();
  expect(qtySelection).toBeDefined();

  expect(screen.getByText("$0")).toBeInTheDocument();
  expect(qtySelection).not.toHaveClass("quantity-selection--is-disabled");
});

test("Renders multiple number carousels correctly.", () => {
  render(<QuantitySelection {...multipleVariantsProps} />);

  const numCarousel1 = screen.findByRole("NumberCarousel-Test");
  const numCarousel2 = screen.findByRole("NumberCarousel-Test-2");

  expect(numCarousel1).toBeDefined();
  expect(numCarousel2).toBeDefined();

  expect(screen.getByText("$0")).toBeInTheDocument();
});

test("Calculates sum of variants correctly.", () => {
  render(<QuantitySelection {...withQtyProps} />);

  expect(screen.getByText("$20")).toBeInTheDocument();
});

test("Disables qty selection correctly.", () => {
  render(<QuantitySelection {...disabledProps} />);

  const qtySelection = screen.getByRole(qtySelectionRole);

  expect(qtySelection).toHaveClass("quantity-selection--is-disabled");
});
