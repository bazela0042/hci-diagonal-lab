import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [dovePos, setDovePos] = useState({ x: 200, y: window.innerHeight * 0.7 });
  const [isMoving, setIsMoving] = useState(false);

  const applePos = { x: window.innerWidth - 200, y: window.innerHeight * 0.2 };

  const moveDove = () => {
    if (isMoving) return; // prevent multiple clicks
    setIsMoving(true);

    const step = () => {
      setDovePos((prev) => {
        const dx = applePos.x - prev.x;
        const dy = applePos.y - prev.y;

        // Stop when close enough
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          setIsMoving(false);
          return { x: applePos.x, y: applePos.y };
        }

        // Fractional movement for slow smooth motion
        const fraction = 0.05; // very slow movement
        return {
          x: prev.x + dx * fraction,
          y: prev.y + dy * fraction,
        };
      });

      // Continue animation
      requestAnimationFrame(step);
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