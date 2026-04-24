"use client";

import React, { useState, useEffect } from "react";

export function TypingEffect({ titles }: { titles: string[] }) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      if (!isDeleting && text === fullText) {
        setTypingSpeed(1500); // Pause exactly 1.5 seconds after full length
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(50); // Pause before typing the next word
      } else {
        setTypingSpeed(isDeleting ? 40 : 80); // typing speed medium smooth, deleting faster
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  return (
    <span style={{ position: "relative", display: "inline-flex", whiteSpace: "pre-wrap" }}>
      <span style={{ color: '#ffffff', fontWeight: 700 }}>{text}</span>
      <span className="blinking-cursor">|</span>
    </span>
  );
}
