import { FC, useEffect, useRef, Fragment, cloneElement } from "react";
import { DialogBodyPopupProps } from "../../types";
import { WindowUtility } from "@dnlwllms/util";

const { movePositionIntoViewport } = WindowUtility;

const Popup: FC<DialogBodyPopupProps> = ({
  triggerRect,
  positionOption,
  children,
  handleClose,
}) => {
  // 특정 이벤트시 Popup을 닫히게 하는 effect
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

  // 저장된 Trigger 위치 및 좌표 State로 Popup위치를 잡아주는 effect
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current && triggerRect) {
      const current = ref.current as HTMLElement;

      movePositionIntoViewport(
        { width: window.innerWidth, height: window.innerHeight },
        current,
        {
          top: window.scrollY + triggerRect.top,
          left: window.scrollX + triggerRect.left,
        },
        positionOption
      );
    }
  }, [triggerRect, positionOption]);

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
