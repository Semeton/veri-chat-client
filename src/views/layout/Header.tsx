import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";

const Header: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const main = document.getElementById("main");
  main?.addEventListener("click", () => {
    setShowSideBar(false);
  });
  const openSideBar = () => {
    setShowSideBar(true);
  };

  const closeSideBar: any = () => {
    setShowSideBar(false);
  };

  return (
    <div className="p-0 m-0">
      <div
        className={`transform top-0 left-0 w-[250px] fixed h-full overflow-auto ease-in-out transition-all duration-300 ${
          showSideBar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar />
      </div>
      <header
        className="grid grid-cols-3 justify-between text-white items-center mb-2"
        //
      >
        <div onClick={openSideBar} className="h-16 flex p-6 items-center">
          <FontAwesomeIcon icon={faUserGear} size="lg" />
        </div>
        <div className="mx-auto">
          <div
            className="text-indigo-500 rounded-full h-16 w-16 bg-gray-950 text-center justify-center flex items-center"
            onClick={closeSideBar}
          >
            <FontAwesomeIcon
              className=" text-center mx-auto"
              icon={faUserSecret}
              size="2xl"
            />
          </div>
        </div>
        <div
          onClick={closeSideBar}
          className="flex justify-end items-center p-6 h-16"
        >
          <FontAwesomeIcon icon={faBell} size="lg" />
        </div>
      </header>
    </div>
  );
};

export default Header;
