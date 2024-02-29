import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalStorageStore from "../../util/db/LocalStorageStore";
import PrimaryButton from "../components/buttons/PrimaryButton";
import messaging from "../../assets/images/messaging.jpg";
import email from "../../assets/images/email.jpg";
import vault from "../../assets/images/vault.jpg";
import welcome from "../../assets/images/welcome.jpg";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: messaging,
      title: "Secure Messaging",
      description:
        "Enjoy secure messaging with zero-knowledge-proof encryption. Your messages are completely private and unreadable by anyone else."
    },
    {
      image: email,
      title: "Encrypted Mails",
      description:
        "Encrypt your emails to keep them private and secure. Only the recipient will be able to read the content of your email"
    },
    {
      image: vault,
      title: "Secret Vault",
      description:
        "Store your sensitive data and messages securely in the Secure Vault. Your data is encrypted and no one other than you can access it"
    },
    {
      image: welcome,
      title: "Welcome to Verivault",
      description: "Get started with our amazing features"
    }
  ];

  const handleNextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/signup");
      LocalStorageStore.storeData({ visited: "true" });
    }
  }, [currentSlide, navigate, setCurrentSlide, slides.length]);

  useEffect(() => {
    // LocalStorageStore.deleteValue("visited");
    const isFirstTime =
      LocalStorageStore.getValue("visited") === null ||
      LocalStorageStore.getValue("visited") === "";
    if (!isFirstTime) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="flex flex-col items-center h-screen bg-gray-800 text-white text-center px-5">
        <div className="h-[42vh] w-screen mb-2 overflow-hidden mb-4">
          <img
            className="mx-auto my-auto"
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            width="100%"
          />
        </div>
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-4">
            {slides[currentSlide].title}
          </h1>
        </div>
        <p className="text-lg mb-6">{slides[currentSlide].description}</p>
        {currentSlide < slides.length - 1 && (
          <div onClick={handleNextSlide} className="w-full mt-4">
            <PrimaryButton type="button" text="Next" />
          </div>
        )}
        {currentSlide === slides.length - 1 && (
          <div onClick={handleNextSlide} className="w-full mt-4">
            <PrimaryButton type="button" text="Get Started" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
