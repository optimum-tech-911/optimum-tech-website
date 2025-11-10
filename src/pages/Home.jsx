import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import HyperspeedIntro from "../components/HyperspeedIntro";
import { Footer } from "../components/Footer";

export const Home = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <HyperspeedIntro />
    <Hero />
    <Footer />
  </div>
);
