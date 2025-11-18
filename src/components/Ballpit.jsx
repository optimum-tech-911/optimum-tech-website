import Ballpit from "./Ballpit/Ballpit.jsx";
import Logo from "../assets/Logo.png";
import { Rocket, Send, Globe, Paperclip } from "lucide-react";

const BallpitBackground = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      overflow: "hidden",
      height: "100%",
      width: "100%",
      zIndex: -1,
      pointerEvents: "none",
    }}
  >
    <Ballpit
      count={35}
      gravity={0.65}
      friction={0.82}
      wallBounce={0.95}
      followCursor={false}
      interactive={false}
      autoBounce
      autoBounceAmplitude={2.2}
      autoBounceSpeed={1}
      colors={[0x0AEFFF, 0x6366F1, 0x22D3EE, 0xA855F7, 0x14B8A6]}
      textureUrl={Logo}
      opacity={0.4}
    />
    <div className="ballpit-overlay">
      <div className="ball-circle" style={{ width: "clamp(80px,8vw,100px)", height: "clamp(80px,8vw,100px)", top: "12%", left: "8%" }}>
        <Rocket aria-hidden="true" />
      </div>
      <div className="ball-circle" style={{ width: "clamp(80px,8vw,100px)", height: "clamp(80px,8vw,100px)", top: "22%", right: "10%" }}>
        <Globe aria-hidden="true" />
      </div>
      <div className="ball-circle" style={{ width: "clamp(80px,8vw,100px)", height: "clamp(80px,8vw,100px)", bottom: "16%", left: "14%", animationDuration: "7s" }}>
        <Send aria-hidden="true" />
      </div>
      <div className="ball-circle" style={{ width: "clamp(80px,8vw,100px)", height: "clamp(80px,8vw,100px)", bottom: "12%", right: "16%", animationDuration: "8s" }}>
        <Paperclip aria-hidden="true" />
      </div>
      <div className="ball-circle logo-ball" style={{ width: "clamp(120px,12vw,150px)", height: "clamp(120px,12vw,150px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <img src={Logo} alt="Optimum Tech logo" />
      </div>
    </div>
  </div>
);

export default BallpitBackground;
