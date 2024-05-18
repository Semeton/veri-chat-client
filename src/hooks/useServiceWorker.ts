import { useState, useEffect } from "react";

const useServiceWorker = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(
    null,
  );

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const onUpdate = (registration: ServiceWorkerRegistration) => {
        if (registration.waiting) {
          setUpdateAvailable(true);
          setWaitingWorker(registration.waiting);
        }
      };

      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker) {
              installingWorker.onstatechange = () => {
                if (installingWorker.state === "installed") {
                  if (navigator.serviceWorker.controller) {
                    onUpdate(registration);
                  }
                }
              };
            }
          };
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (!refreshing) {
          window.location.reload();
          refreshing = true;
        }
      });
    }
  }, []);

  const refreshPage = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
    setUpdateAvailable(false);
  };

  return { updateAvailable, refreshPage };
};

export default useServiceWorker;
