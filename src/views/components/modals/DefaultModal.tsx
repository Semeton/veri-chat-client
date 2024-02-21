import React, { useState } from "react";

const DefaultModal: React.FC<{
  element: React.ReactNode;
  title: string;
  body: React.ReactNode;
}> = ({ element, title, body }) => {
  const [display, setDisplay] = useState(false);

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
      >
        {element}
      </div>
      {display && (
        <div
          id="modal"
          tabIndex={-1}
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative rounded-lg shadow bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
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
