/** @jsx h */
import { h, FunctionComponent } from "preact";
import { Card } from "../Card";
import { CloseIcon } from "../Icon/CloseIcon";
import "./BottomDrawer.scss";

export type BottomDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export const BottomDrawer: FunctionComponent<BottomDrawerProps> = ({
  open,
  children,
  onClose,
}) => {
  const bottomDrawerClassNames = ["bottom-drawer"];

  if (open) {
    bottomDrawerClassNames.push("bottom-drawer--open");
  }

  return (
    <div className={bottomDrawerClassNames.join(" ")} role="dialog">
      <div className="bottom-drawer__body">
        <Card>
          <div
            className="bottom-drawer__close-button"
            onClick={onClose}
            data-testid="bottom-drawer-close-button"
          >
            <CloseIcon color="#666" width={24} height={24} />
          </div>
          <div className="bottom-drawer__content">{children}</div>
        </Card>
      </div>
    </div>
  );
};
