import React, { useRef, useState, useEffect } from "react";

const ClickOutside = ({ onClickOutside, children, ...props }) => {
  const containerRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    document.addEventListener("touchend", handle, true);
    document.addEventListener("click", handle, true);
    return () => {
      document.removeEventListener("touchend", handle, true);
      document.removeEventListener("click", handle, true);
    };
  }, []);

  const handle = e => {
    if (e.type === "touchend") setIsTouch(true);
    if (e.type === "click" && isTouch) return;
    const el = containerRef.current;
    if (el && !el.contains(e.target)) onClickOutside(e);
  };

  return (
    <div {...props} ref={containerRef}>
      {children}
    </div>
  );
};

export default ClickOutside;
