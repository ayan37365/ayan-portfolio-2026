"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function TextScramble({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const isHovering = useRef(false);
  const frameRequest = useRef<number | null>(null);

  const scramble = () => {
    let frame = 0;
    const length = text.length;

    const update = () => {
      if (!isHovering.current) return;
      
      let newText = "";
      for (let i = 0; i < length; i++) {
        if (Math.random() < 0.3) {
          newText += CHARS[Math.floor(Math.random() * CHARS.length)];
        } else {
          newText += text[i];
        }
      }
      setDisplayText(newText);
      frame++;
      
      frameRequest.current = requestAnimationFrame(update);
    };

    update();
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
    scramble();
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
    setDisplayText(text);
  };

  useEffect(() => {
    return () => {
      if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
    };
  }, []);

  return (
    <span 
      className={`inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
}
