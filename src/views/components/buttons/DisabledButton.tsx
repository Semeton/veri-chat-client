import React from "react";

const DisabledButton: React.FC<{
  text: string;
}> = ({ text }) => {
  return (
    <button
      type="button"
      className="hover:bg-gay-400 w-full rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-800"
    >
      {text}
    </button>
  );
};

export default DisabledButton;
