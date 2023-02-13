import { FC, useEffect, useState } from "react";

interface RaiseNumberProps {
  value: number;
  /**
   * 몇 초간 실행할지(단위: second)
   * */
  duration?: number;
  fixed?: number;
  hasComma?: boolean;
}

// 점차 증가율이 작아지는 로그 함수
const f = (x: number, e: number) => {
  return Math.log(x === e ? e : x + 1) / Math.log(e);
};

const RaiseNumber: FC<RaiseNumberProps> = ({
  value,
  duration = 1.5,
  fixed = 0,
  hasComma = true,
}) => {
  const [state, setState] = useState<number>(0);

  useEffect(() => {
    let ms = duration * 1000;
    let time = 0;
    const interval = setInterval(() => {
      if (ms <= time) {
        clearInterval(interval);
      }
      let incRate = f(value * (time / ms), value);

      // duration의 90% 넘어가면 점차 브레이크 걸어주기
      if (time > ms * 0.95) {
        time += 1;
      } else if (time > ms * 0.9) {
        time += 10;
      } else {
        time += 20;
      }

      setState(value * incRate);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [duration, value]);

  let displayState = state.toString();

  if (fixed) {
    displayState = state.toFixed(fixed);
  } else {
    displayState = Math.floor(state).toString();
  }

  if (hasComma) {
    displayState = Number(displayState).toLocaleString();
  }

  return <>{displayState}</>;
};

export default RaiseNumber;
