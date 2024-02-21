import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Onboarding = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      navigate("/dashboard");
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return <div>{loading && <Loader />}</div>;
};

export default Onboarding;
