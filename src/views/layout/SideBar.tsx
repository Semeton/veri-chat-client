import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGear,
  faUserSecret,
  faVault
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => (
  <aside className="sidebar fixed top-0 left-0 z-9999999 w-64 h-full bg-gray-900 text-white">
    <nav className="mt-10">
      <Link
        to="/profile"
        className="flex items-center py-2 px-8 hover:bg-gray-700"
      >
        <FontAwesomeIcon icon={faUserSecret} size="lg" />
        <span className="mx-4">Profile</span>
      </Link>
      <Link
        to="/account-info"
        className="flex items-center py-2 px-8 hover:bg-gray-700"
      >
        <FontAwesomeIcon icon={faUserGear} size="lg" />
        <span className="mx-4">Settings</span>
      </Link>
      <Link
        to="/chats"
        className="flex items-center py-2 px-8 hover:bg-gray-700"
      >
        <FontAwesomeIcon icon={faUserSecret} size="lg" />
        <span className="mx-4">Chats</span>
      </Link>
      <Link
        to="/vault"
        className="flex items-center py-2 px-8 hover:bg-gray-700"
      >
        <FontAwesomeIcon icon={faVault} size="lg" />
        <span className="mx-4">Vault</span>
      </Link>
    </nav>
  </aside>
);

export default SideBar;
