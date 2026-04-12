import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [dovePos, setDovePos] = useState({
    x: 200,
    y: window.innerHeight * 0.7,
  });

  const [isMoving, setIsMoving] = useState(false);

  const applePos = {
    x: window.innerWidth - 200,
    y: window.innerHeight * 0.2,
  };

  const moveDove = () => {
    if (isMoving) return;
    setIsMoving(true);

    const start = { ...dovePos };
    const duration = 2000; // 2 seconds
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      let t = elapsed / duration;

      // Clamp t between 0 and 1
      t = Math.min(t, 1);

      // ✅ ACTUAL LERP
      const newX = (1 - t) * start.x + t * applePos.x;
      const newY = (1 - t) * start.y + t * applePos.y;

      setDovePos({ x: newX, y: newY });

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        setIsMoving(false);
      }
    };

    requestAnimationFrame(step);
  };

  return (
    <div className="app-background">
      <div
        className="dove"
        style={{
          left: dovePos.x,
          top: dovePos.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        🕊️
      </div>

      <div
        className="apple"
        style={{
          left: applePos.x,
          top: applePos.y,
        }}
        onClick={moveDove}
      >
        🍎
      </div>
    </div>
  );
}