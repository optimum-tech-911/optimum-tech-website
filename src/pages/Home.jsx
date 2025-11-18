import React from "react";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import HyperspeedIntro from "../components/HyperspeedIntro";
import { Footer } from "../components/Footer";
import FloatingLines from "../components/FloatingLines/FloatingLines.jsx";

export const Home = () => (
  <div className="min-h-screen flex flex-col relative">
    <Navbar />
    <div className="absolute inset-0 z-0 pointer-events-none">
      <FloatingLines
        linesGradient={["#0A84FF", "#7c3aed", "#00E0B8"]}
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={[6, 8, 5]}
        lineDistance={[5, 6, 4]}
        topWavePosition={{ x: 10.0, y: 0.5, rotate: -0.4 }}
        middleWavePosition={{ x: 5.0, y: 0.0, rotate: 0.2 }}
        bottomWavePosition={{ x: 2.0, y: -0.7, rotate: -1 }}
        animationSpeed={1}
        interactive={false}
        parallax={true}
        parallaxStrength={0.12}
        mixBlendMode="screen"
      />
    </div>
    <HyperspeedIntro />
    <Hero />
    <Footer />
  </div>
);
