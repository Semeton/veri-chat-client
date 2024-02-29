import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faRightFromBracket,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import User from "../../services/api/auth/User";
import { userDetails } from "../../lib/UserDetails";

const SideBar: React.FC = () => {
  const user = userDetails;

  const logout = (e: any): any => {
    e.preventDefault();
    User.logout();
  };

  return (
    <aside className="sidebar fixed top-0 left-0 z-9999999 w-full h-full bg-gray-900 text-white">
      <div className="px-8">
        <div className="mx-auto items-center mt-6">
          <div className="text-indigo-500 rounded-full h-16 w-16 bg-gray-950 text-center justify-center flex items-center mr-4">
            <FontAwesomeIcon
              className="text-center mx-auto"
              icon={faUser}
              size="2xl"
            />
          </div>
          <div className="mt-1">
            <h3 className="font-bold text-xl">{user.name}</h3>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
        <nav className="mt-4 text-xl text-center mx-auto">
          <Link
            to="/profile"
            className="flex items-center py-2 hover:bg-gray-700"
          >
            <div className="grid grid-cols-6 items-center gap-5">
              <FontAwesomeIcon
                className="text-center col-span-2"
                icon={faUser}
              />
              <span className="col-span-4">Profile</span>
            </div>
          </Link>
          <Link
            to="/settings"
            className="flex items-center py-2 hover:bg-gray-700"
          >
            <div className="grid grid-cols-6 items-center gap-5">
              <FontAwesomeIcon
                icon={faGear}
                className="text-center col-span-2"
              />
              <span className="col-span-4">Settings</span>
            </div>
          </Link>
          <Link
            to="/chats"
            className="flex items-center py-2 hover:bg-gray-700"
          >
            <div className="grid grid-cols-6 items-center gap-5">
              <FontAwesomeIcon
                icon={faEyeSlash}
                className="text-center col-span-2"
              />
              <span className="col-span-4">Privacy</span>
            </div>
          </Link>
          <div
            className="mt-10 flex items-center py-2 hover:bg-gray-700 my-auto"
            onClick={logout}
          >
            <div className="grid grid-cols-6 items-center gap-5">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="text-center col-span-2 pr-1"
              />
              <span className="col-span-4">Logout</span>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
