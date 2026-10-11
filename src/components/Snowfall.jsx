import { useEffect, useRef } from "react";

// Lightweight canvas snowfall. Skipped entirely when reduced motion is preferred
// and paused while the tab is hidden.
export default function Snowfall() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const count = w < 700 ? 40 : 80;
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.2 + 0.6,
      s: Math.random() * 0.6 + 0.25,
      d: Math.random() * Math.PI * 2,
      o: Math.random() * 0.5 + 0.3,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.01;
      for (const f of flakes) {
        f.y += f.s;
        f.x += Math.sin(t + f.d) * 0.35;
        if (f.y > h + 6) {
          f.y = -6;
          f.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(222,241,255,${f.o})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="snowfall" aria-hidden="true" />;
}
