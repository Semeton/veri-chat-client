import {
  faArrowUpFromBracket,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

const AddToHomeScreenBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    const isAndroid = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /android/.test(userAgent);
    };

    const isInStandaloneMode = () =>
      "standalone" in window.navigator && window.navigator.standalone;

    if (isIos() && !isInStandaloneMode()) {
      setIos(true);
      setShowBanner(true);
    }

    if (isAndroid() && !isInStandaloneMode()) {
      setShowBanner(true);
    }
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <>
      {showBanner && (
        <div className="addToHomeScreenBanner">
          <p>
            {ios ? (
              <>
                To add this app to your home screen, tap the{" "}
                <strong>
                  Share{" "}
                  <FontAwesomeIcon
                    className="ml-2"
                    icon={faArrowUpFromBracket}
                  />
                </strong>{" "}
                button and then <strong>Add to Home Screen</strong>.
              </>
            ) : (
              <>
                To install this app to your mobile phone, tap the{" "}
                <strong>
                  Menu <FontAwesomeIcon icon={faEllipsisVertical} />
                </strong>{" "}
                button and then{" "}
                <strong>Install App (or Add to Home Screen)</strong>.
              </>
            )}
          </p>
          <button
            className="closeButton -mr-2 pr-1"
            onClick={handleCloseBanner}
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
};

export default AddToHomeScreenBanner;
