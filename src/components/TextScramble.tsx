"use client";

import { useEffect, useState } from "react";

interface TextScrambleProps {
  text: string;
  duration?: number;
  speed?: number;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export default function TextScramble({ text, duration = 1.0, speed = 30 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.floor((duration * 1000) / speed);
    const textLength = text.length;

    const interval = setInterval(() => {
      frame++;
      
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          
          const charProgress = index / textLength;
          const overallProgress = frame / totalFrames;

          if (overallProgress > charProgress) {
            return char;
          }
          
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, duration, speed]);

  return <span>{displayText}</span>;
}
