import React from "react";

const LoadingButton: React.FC<{
  type: "submit" | "reset" | "button" | undefined;
  text: string;
}> = ({ type, text }) => {
  return (
    <button
      type={type}
      className="w-full text-white bg-indigo-300 hover:bg-indigo-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-indigo-800"
      disabled
    >
      {text}
    </button>
  );
};

export default LoadingButton;
