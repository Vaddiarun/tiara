import React, { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 300000, suffix: "+", label: "Happy Clients", format: "number" },
  { value: 4, suffix: "+", label: "Years of Service", format: "number" },
  { value: 6, suffix: "", label: "Treatments", format: "number" },
  { value: 5.0, suffix: "★", label: "Average Rating", format: "decimal" },
];

const formatNum = (n, format) => {
  if (format === "decimal") return n.toFixed(1);
  if (n >= 100000) return new Intl.NumberFormat("en-IN").format(Math.round(n));
  return Math.round(n).toString();
};

const Counter = ({ to, suffix, format, run }) => {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!run) return;
    const start = performance.now();
    const duration = 2000;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setVal(to * ease(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  return (
    <span>
      {formatNum(val, format)}
      <span className="accent">{suffix}</span>
    </span>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRun(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="stats-band reveal" ref={ref}>
      <div className="container-x">
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={i}>
              <div className="num">
                <Counter to={s.value} suffix={s.suffix} format={s.format} run={run} />
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
