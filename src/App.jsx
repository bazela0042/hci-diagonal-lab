import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [dovePos, setDovePos] = useState({ x: 200, y: window.innerHeight * 0.7 });
  const [moveDove, setMoveDove] = useState(false);
  const [applePos, setApplePos] = useState({ x: 0, y: 0 });

  const appleRef = useRef(null);

  // Step 1: Apple ki exact position nikalna
  useEffect(() => {
    if (appleRef.current) {
      const rect = appleRef.current.getBoundingClientRect();
      setApplePos({ x: rect.left, y: rect.top + rect.height / 2 }); // center Y
    }
  }, []);

  // Step 2: Dove ko diagonal move karna
  useEffect(() => {
    if (!moveDove) return;

    const speed = 5; // pixels per frame
    const interval = setInterval(() => {
      setDovePos((prev) => {
        const deltaX = applePos.x - prev.x;
        const deltaY = applePos.y - prev.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance === 0) {
          clearInterval(interval);
          return prev;
        }

        // Exact remaining distance if close
        const moveDist = distance < speed ? distance : speed;
        const stepX = (deltaX / distance) * moveDist;
        const stepY = (deltaY / distance) * moveDist;

        const nextX = prev.x + stepX;
        const nextY = prev.y + stepY;

        // Stop interval if reached apple
        if (nextX === applePos.x && nextY === applePos.y) {
          clearInterval(interval);
        }

        return { x: nextX, y: nextY };
      });
    }, 20);

    return () => clearInterval(interval);
  }, [moveDove, applePos]);

  return (
    <div className="app-background">
      <div
        className="dove"
        style={{
          left: dovePos.x,
          top: dovePos.y,
          transform: "translateY(-50%)",
        }}
      >
        🕊️
      </div>

      <div
        className="apple"
        ref={appleRef}
        onClick={() => setMoveDove(true)}
      >
        🍎
      </div>
    </div>
  );
}