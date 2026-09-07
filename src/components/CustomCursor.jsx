import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });

      setVisible(true);
    };

    const leave = () => setVisible(false);

    window.addEventListener("pointermove", updatePosition, { passive: true });
    window.addEventListener("pointerdown", updatePosition, { passive: true });
    document.addEventListener("pointerleave", leave);

    return () => {
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("pointerdown", updatePosition);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <motion.div
      animate={{
        x: position.x - 5,
        y: position.y - 5,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.2,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[10000] block h-3 w-3 rounded-full bg-[#c7ff35]"
    />
  );
}