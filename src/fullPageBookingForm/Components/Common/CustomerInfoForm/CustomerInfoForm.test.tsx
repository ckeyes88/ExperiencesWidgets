/** @jsx h */
import { h } from "preact";
import { render, screen } from "@testing-library/preact";
import { CustomerInfoForm, CustomerInfoFormProps } from "./CustomerInfoForm";

const firstName = "Tester";
const lastName = "McTestersen";

const defaultInputProps: CustomerInfoFormProps = {
  isCustomerInfoFormDisabled: false,
  customerData: {
    email: "test@test.com",
    firstName: firstName,
    lastName: lastName,
  },
  handleChange: jest.fn(),
  labels: {
    firstNameLabel: "First",
    lastNameLabel: "Last",
    emailLabel: "Email",
  },
};

test("Renders input form field correctly.", () => {
  render(<CustomerInfoForm {...defaultInputProps} />);

  expect(screen.getByText("First")).toBeInTheDocument();
  expect(screen.getByText("Last")).toBeInTheDocument();
  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getAllByText("*")).toHaveLength(3);
});
