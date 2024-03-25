import React, { useState } from "react";

const DefaultModal: React.FC<{
  element: React.ReactNode;
  title: string;
  body: React.ReactNode;
  property?: boolean;
}> = ({ element, title, body, property = false }) => {
  const [display, setDisplay] = useState(property);

  const showModal = () => {
    setDisplay(true);
  };

  const closeModal = () => {
    setDisplay(false);
  };

  return (
    <div className="">
      <div
        data-modal-target="modal"
        data-modal-toggle="modal"
        onClick={showModal}
        hidden={property}
      >
        {element}
      </div>
      {display && (
        <div
          id="modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
        >
          <div className="relative max-h-full w-full max-w-md p-4">
            <div className="relative rounded-lg bg-gray-700 shadow">
              <div className="flex items-center justify-between rounded-t border-b border-gray-600 p-4 md:p-5">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <button
                  type="button"
                  className="end-2.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={closeModal}
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">{body}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultModal;
