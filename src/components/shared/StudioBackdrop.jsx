"use client";

import { useEffect, useRef } from "react";

export default function StudioBackdrop() {
  const backdropRef = useRef(null);

  useEffect(() => {
    const backdrop = backdropRef.current;
    const canParallax = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    if (!backdrop || !canParallax.matches) return;

    let frame = 0;
    function updateParallax(event) {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * -12;
        const y = (event.clientY / window.innerHeight - 0.5) * -12;
        backdrop.style.setProperty("--parallax-x", `${x.toFixed(1)}px`);
        backdrop.style.setProperty("--parallax-y", `${y.toFixed(1)}px`);
        frame = 0;
      });
    }

    function resetParallax() {
      backdrop.style.setProperty("--parallax-x", "0px");
      backdrop.style.setProperty("--parallax-y", "0px");
    }

    window.addEventListener("pointermove", updateParallax, { passive: true });
    window.addEventListener("blur", resetParallax);
    return () => {
      window.removeEventListener("pointermove", updateParallax);
      window.removeEventListener("blur", resetParallax);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={backdropRef} className="studio-backdrop" aria-hidden="true">
      <div className="studio-backdrop__wash" />
      <div className="studio-backdrop__beam" />
      <div className="studio-backdrop__scene">
        <div className="studio-object studio-object--camera-lens">
          <span className="studio-object__lens-glass" />
          <span className="studio-object__lens-glint" />
        </div>
        <div className="studio-object studio-object--light-meter">
          <span className="studio-object__meter-screen" />
          <span className="studio-object__meter-sensor" />
          <span className="studio-object__meter-button" />
        </div>
        <div className="studio-object studio-object--film-canister">
          <span className="studio-object__canister-cap" />
          <span className="studio-object__canister-band" />
        </div>
        <div className="studio-object studio-object--camera">
          <span className="studio-object__camera-body" />
          <span className="studio-object__camera-grip" />
          <span className="studio-object__camera-top" />
          <span className="studio-object__camera-viewfinder" />
          <span className="studio-object__camera-hotshoe" />
          <span className="studio-object__camera-barrel">
            <span className="studio-object__camera-glass" />
          </span>
        </div>
        <div className="studio-object studio-object--microphone">
          <span className="studio-object__mic-head" />
          <span className="studio-object__mic-yoke" />
          <span className="studio-object__mic-stem" />
          <span className="studio-object__mic-base" />
        </div>
        <div className="studio-object studio-object--softbox">
          <span className="studio-object__softbox-back" />
          <span className="studio-object__softbox-face" />
          <span className="studio-object__softbox-stand" />
          <span className="studio-object__softbox-foot" />
        </div>
        <div className="studio-object studio-object--clapper">
          <span className="studio-object__clapper-top" />
          <span className="studio-object__clapper-body" />
        </div>
        <div className="studio-backdrop__dust" />
      </div>
    </div>
  );
}
