import React, { useEffect, useState } from "react";

interface ICountDownProps {
  from: number;
  onDone: () => void;
  onClick: () => void;
}

const CountDown: React.FC<ICountDownProps> = ({ from, onDone, onClick }) => {
  const [timer, setTimer] = useState(from);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setTimer(Math.max(0, timer - 1));
      if (timer === 1) {
        onDone();
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [from, timer, onDone]);
  return (
    <div className="timer" onClick={onClick}>
      <label className="time">{timer}</label>
    </div>
  );
};

export default CountDown;
