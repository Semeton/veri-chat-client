import {
  faMobileAndroid,
  faAppleWhole,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LargeScreen = () => {
  return (
    <div className="">
      <div className="px-6 md:py-12 text-center md:px-12 lg:py-24 lg:text-left">
        <div className="w-100 mx-auto text-neutral-800 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="mt-12 lg:mt-0" style={{ zIndex: "10" }}>
              <h1 className="mt-0 text-4xl font-bold tracking-tight md:text-5xl xl:text-8xl text-indigo-300">
                VeriChat
              </h1>
              <p className="text-3xl font-bold text-indigo-300 mb-10">
                End-to-End Encrypted Messages
              </p>
              <p className="opacity-70 text-[hsl(218,81%,85%)] mb-4">
                Discover security at your fingertips with our mobile-exclusive
                PWA-optimized application. Designed for on-the-go usage, our app
                leverages a zero-knowledge-proof algorithm with a unique secret
                chosen by you, ensuring top-tier encryption for your messages.
                To experience our platform's full functionality, simply access
                it on your mobile device and install the optimized PWA. Enjoy
                encrypted communication, seamless data-sharing, and ultimate
                privacy right from your fingertips, empowered by REST Services
                provided by VeriVault.
              </p>
              <button
                type="button"
                className="mt-6 mr-2 items-center px-4 py-4 !bg-indigo-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-800 focus:bg-indigo-800 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-indigo-800 transition ease-in-out duration-150 cursor-pointer w-64"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={() => window.open("https://verivault.xyz", "_blank")}
              >
                Visit Verivault
                <FontAwesomeIcon className="ml-3" icon={faArrowRightLong} />
              </button>
            </div>
            <div className="relative mb-12 lg:mb-0 text-center">
              <div
                id="radius-shape-1"
                className="absolute rounded-full shadow-lg"
              ></div>
              <div id="radius-shape-2" className="absolute shadow-lg"></div>
              <div className="relative backdrop-blur-[25px] backdrop-saturate-[200%] block rounded-lg px-6 py-12 bg-gray-800 bg-opacity-95 shadow-black/20 md:px-12 bg-dots-darker motion-safe:hover:scale-[1.01] transition-all duration-250">
                <div className="animate-bounce text-indigo-300">
                  <i
                    className="fa fa-user-secret fa-10x pt-8"
                    aria-hidden="true"
                    style={{ fontSize: "200px" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="core-feature py-20 px-6 md:px-12 bg-dots-darker bg-center bg-gray-100">
        <h2 className="mt-0 mb-6 text-3xl font-bold tracking-tight md:text-4xl xl:text-5xl text-indigo-700 text-center">
          How to Install VeriChat on your Device
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:grid-cols-1 mb-8">
          <div className="scale-100 p-6 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-indigo-500 shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              <FontAwesomeIcon icon={faAppleWhole} className="pr-2" />
              For iOS Devices:
            </h3>
            <ol className="list-decimal pl-6">
              <li>Open Safari on your iOS device.</li>
              <li>Navigate to this website.</li>
              <li>Tap the Share button and select "Add to Home Screen."</li>
            </ol>
          </div>
          <div className="scale-100 p-6 bg-white from-gray-700/50 via-transparent rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-indigo-500 shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              <FontAwesomeIcon icon={faMobileAndroid} className="pr-2" />
              For Android Devices:
            </h3>
            <ol className="list-decimal pl-6">
              <li>Open Chrome on your Android device.</li>
              <li>Visit this website.</li>
              <li>Tap the menu button and select "Add to Home Screen."</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeScreen;
