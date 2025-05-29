import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import Matches from "./pages/matches";
import "remixicon/fonts/remixicon.css";

function App() {
  let [showLandingPage, setShowLandingPage] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 12,
      duration: 1.5,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 15,
      duration: 2,
      delay: -1,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowLandingPage(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showLandingPage) return;

    gsap.to(".main", {
      rotate: 0,
      scale: 1,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
      onComplete: function () {
        this.kill();
      },
    });

    gsap.to(".sky", {
      scale: 1.2,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
      onComplete: function () {
        this.kill();
      },
    });

    gsap.to(".first-player", {
      scale: 0.5,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
      onComplete: function () {
        this.kill();
      },
    });
    gsap.to(".second-player", {
      scale: 0.5,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
      onComplete: function () {
        this.kill();
      },
    });
    gsap.to(".ball", {
      scale: 0.25,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
      onComplete: function () {
        this.kill();
      },
    });
    gsap.to(".textDiv", {
      scale: 1,
      rotate: 0,
      duration: 2,
      delay: -0.8,
      ease: "Expo.easeInOut",
      onComplete: function () {
        this.kill();
      },
    });

    const landingPage = document.querySelector(".main");

    landingPage?.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerWidth - 0.5;

      gsap.to(".textDiv", {
        x: `${-50 - x * 30}%`,
        y: `${-10 - y * 20}%`,
      });

      gsap.to(".sky", {
        x: `${-x * 5}%`,
        y: `${-y * 5}%`,
      });
      gsap.to(".first-player", {
        x: `${x * 3}%`,
        y: `${y * 3}%`,
      });
      gsap.to(".second-player", {
        x: `${-x * 3}%`,
        y: `${-y * 3}%`,
      });
      gsap.to(".ball", {
        x: `${-x * 5}%`,
        y: `${-y * 5}%`,
      });
    });
  }, [showLandingPage]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="100"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  SOCCER
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showLandingPage && (
        <div
          className="main w-full rotate-[10deg] scale-[1.7]"
        >
          <div className="landing-page w-full relative ovwerflow-hidden">
            <div className="w-full h-screen bg-black">
              <div className="navbar absolute w-full top-0 left-0 px-7 py-5 z-2">
                <div className="logo flex items-center gap-3">
                  <img src="./ace.png" alt="" className="h-[5rem]" />
                </div>
              </div>

              <div className="imagesDiv w-full h-screen overflow-hidden relative">
                <img
                  src="./bg.png"
                  className="sky object-cover w-full h-full absolute top-0 left-0 scale-[1.5] rotate-[-20deg]"
                  alt=""
                />

                <img
                  src="./blue.png"
                  className="second-player object-cover w-full absolute bottom-[-18rem]  left-[-7rem] scale-[1.8] rotate-[-25deg]"
                  alt=""
                />

                <div className="textDiv absolute top-11 left-1/2 -translate-x-1/2 text-white winky-rough flex flex-col pr-15 rotate-[20deg] scale-[1.2]">
                  <h1 className="text-8xl -ml-20 leading-none">SOCCER</h1>
                  <h1 className="text-8xl ml-10 leading-none">MATCH</h1>
                  <h1 className="text-8xl -ml-20 leading-none">UPDATES</h1>
                </div>

                <img
                  src="./yellow.png"
                  className="first-player object-cover w-full absolute bottom-[-18rem] left-50 scale-[1.8] rotate-[-25deg]"
                  alt=""
                />
                <img
                  src="./ball.png"
                  className="ball object-cover w-full absolute scale-[1] rotate-[20deg] bottom-[-25rem] right-[15rem]"
                  alt=""
                />
              </div>

              <div className="btmbar absolute bottom-0 left-0 w-full px-7 py-10 bg-gradient-to-t from-[#000000e1] to-transparent">
                <div className="flex gap-2 items-center text-white bottom-[1rem] absolute">
                  <i className="ri-arrow-down-long-line scale-[1.25] font-semibold"></i>
                  <h1 className="text-xl font-bold tagesschrift-regular">
                    Scroll Down
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="secondPage w-full h-screen overflow-hidden relative">
            <Matches />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
