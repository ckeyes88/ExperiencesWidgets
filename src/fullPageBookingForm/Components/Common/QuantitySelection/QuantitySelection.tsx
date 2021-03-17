/** @jsx h */
import { h, FunctionComponent, Fragment } from "preact";
import { TextStyle } from "../TextStyle";
import "./QuantitySelection.scss";

export type QuantitySelectionProps = {
  variants: {
    name: string;
    cost: number;
  }[];
};
export const QuantitySelection: FunctionComponent<QuantitySelectionProps> = ({
  variants,
}) => {
  return (
    <Fragment>
      <TextStyle variant="display2" text="Quantity" />
      <table className="quantity-selection__table">
        <tbody>
          {variants.map((variant, idx) => (
            <tr key={`QuantitySelection-Table-Row-${idx}`}>
              <td className="quantity-selection__table-cell">
                <TextStyle variant="body1" text={variant.name} />
              </td>
              <td className="quantity-selection__table-cell">
                <TextStyle variant="body1" text={`$${variant.cost}`} />
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <TextStyle variant="body2" text="Total" />
            </td>
            <td />
            <td>
              <TextStyle variant="body1" text="$0" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="quantity-selection__header-rule" />
    </Fragment>
  );
};
