import React from "react";

const BarLoader = () => {
  const styles: string =
    "flex bg-gray-950 p-3 rounded-md border border-gray-800 items-center justify-between mt-1";
  return (
    <div className="mt-2 grid">
      <div className={`${styles} h-14 animate-pulse`}></div>
      <div className={`${styles} h-14 animate-pulse`}></div>
      <div className={`${styles} h-14 animate-pulse`}></div>
      <div className={`${styles} h-14 animate-pulse`}></div>
    </div>
  );
};

export default BarLoader;
