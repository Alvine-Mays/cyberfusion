import { useEffect, useState } from "react";

// Effet machine à écrire simple avec contrôle de vitesse
export default function TypedText({ text, speed = 35 }: { text: string; speed?: number }) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <span>{display}<span className="animate-pulse">▋</span></span>;
}
