import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretRight,
  faCircleMinus,
  faIdBadge,
  faKey,
  faShieldHalved
  //   faUserSecret
} from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import Structure from "../layout/Structure";

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    const header = document.getElementById("headerLayout");
    if (header) {
      header.style.display = "none";
    }
  }, [setLoading]);

  const navigate = useNavigate();

  const goBack = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };
  const styles: string =
    "flex bg-gray-950 p-3 text-white rounded-md border border-gray-800 items-center justify-between mt-1";
  const page = (
    <div className="">
      {loading && <Loader />}
      <div className="flex flex-col h-screen justify-between bg-gray-900 text-white">
        <main className="mb-auto">
          <div className="grid grid-cols-3 justify-between text-white items-center mb-5 mt-2">
            <div onClick={goBack} className={"cursor-pointer"}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
            <div className="text-center cols-span-2">
              <h1 className="text-lg font-bold leading-tight tracking-tight md:text-2xl text-white">
                Settings
              </h1>
            </div>
          </div>
          <div className="mt-5 overflow-y-scroll">
            <div className="grid">
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faKey} className="mr-3" />
                  <div className="mr-2">
                    <p>Change Password</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faCaretRight} />
                </div>
              </div>
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faShieldHalved} className="mr-3" />
                  <div className="mr-2">
                    <p>Two-Step Verification</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faCaretRight} />
                </div>
              </div>
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faIdBadge} className="mr-3" />
                  <div className="mr-2">
                    <p>Request Account Info</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faCaretRight} />
                </div>
              </div>
              <div className={styles}>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCircleMinus} className="mr-3" />
                  <div className="mr-2">
                    <p>Delete My Account</p>
                  </div>
                </div>
                <div className="mr-2">
                  <FontAwesomeIcon icon={faCaretRight} />
                </div>
              </div>
            </div>
          </div>
          <Link to="/dashboard" className="text-center text-indigo-500 text-sm">
            <div className="text-center mt-6">Back Home</div>
          </Link>
        </main>
      </div>
    </div>
  );

  return <Structure page={page} />;
};

export default Settings;
