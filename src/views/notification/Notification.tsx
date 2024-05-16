import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Notification: React.FC = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

  const navigate = useNavigate();

  const goBack = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };
  // const styles: string =
  //   "flex bg-gray-950 p-3 text-white rounded-md border border-gray-800 items-center justify-between mt-1";
  return (
    <div className="fixed right-0 left-0 bottom-0 top-0">
      {loading && <Loader />}
      <div className="flex flex-col h-screen justify-between bg-gray-900 text-white">
        <main className="mb-auto p-4 px-5">
          <div className="grid grid-cols-3 justify-between text-white items-center mb-5 mt-2">
            <div onClick={goBack} className={"cursor-pointer"}>
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </div>
            <div className="text-center">
              <h1 className="text-lg font-bold leading-tight tracking-tight md:text-2xl text-white">
                Notifications
              </h1>
            </div>
            <div className="text-right">
              <p className="text-sm">clear</p>
            </div>
          </div>
          <div className="mt-5 overflow-y-scroll">
            <div className="text-center">
              <div className="mb-3 mt-7 text-indigo-500">
                <FontAwesomeIcon
                  icon={faUserSecret}
                  size="2xl"
                  style={{ fontSize: "100px" }}
                  className=""
                />
              </div>
              <h3 className="text-2xl font-bold">Ooops!</h3>
              <p className="">You do not have any notification</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Notification;
