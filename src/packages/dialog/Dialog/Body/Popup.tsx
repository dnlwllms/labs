import { FC, useEffect, useRef, Fragment, cloneElement } from "react";
import { PopupProps } from "../../types";
import { WindowUtility } from "@dnlwllms/util";

const { movePositionIntoViewport } = WindowUtility;

const Popup: FC<PopupProps> = ({
  triggerRect,
  triggerPosition,
  positionOption,
  children,
  handleClose,
}) => {
  useEffect(() => {
    window.addEventListener("wheel", handleClose);
    window.addEventListener("touchmove", handleClose);
    window.addEventListener("resize", handleClose);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("scroll", handleClose);
      window.removeEventListener("touchmove", handleClose);
      window.removeEventListener("resize", handleClose);
      document.body.style.overflow = "";
    };
  }, [handleClose]);

  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && triggerRect) {
      const current = ref.current as HTMLElement;

      movePositionIntoViewport(
        { width: window.innerWidth, height: window.innerHeight },
        current,
        triggerPosition,
        positionOption
      );
    }
  }, [triggerPosition, triggerRect, positionOption]);

  return (
    <Fragment>
      {cloneElement(children, {
        ref,
        onClick: (e: MouseEvent) => {
          e.stopPropagation();
          if (children.props.onClick) {
            children.props.onClick(e);
          }
        },
        style: {
          ...children.props.style,
          position: "absolute",
          top: 0,
          left: 0,
        },
      })}
    </Fragment>
  );
};

export default Popup;
