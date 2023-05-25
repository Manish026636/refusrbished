import React, { useEffect } from "react";
import Accordian from "../Components/Homepage/Accordian";
import Footer from "../Components/Homepage/Footer";
import Hero from "../Components/Homepage/Hero";
import LatestArticles from "../Components/Homepage/LatestArticles";
import StudentReview from "../Components/Homepage/StudentReview";
import Team from "../Components/Homepage/Team";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { is_authenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (is_authenticated) {
      navigate("/dashboard");
    }
  }, [is_authenticated, navigate]);
  return (
    <>
      <Hero />

      <Footer />
    </>
  );
};

export default Home;
