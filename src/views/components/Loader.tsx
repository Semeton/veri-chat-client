import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

const Loader: React.FC = () => {
  return (
    <div className="z-9999">
      <div className="flex flex-col absolute top-0 right-0 left-0  h-screen justify-center items-center bg-transparent bg-zinc-950 text-indigo-500 bg-opacity-80">
        <FontAwesomeIcon
          icon={faUserSecret}
          size="2xl"
          className="mr-3 animate-bounce"
          style={{ fontSize: "150px" }}
        />
      </div>
    </div>
  );
};

export default Loader;
