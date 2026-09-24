import { useEffect, useState } from "react";
import { heroStats, navLinks, termLines, variants } from "../data";
import { Reveal, usePrefersReducedMotion, useScramble } from "../lib";
import { IconArrow, Logo } from "./Icons";

/* ---------------------------------- NAV ---------------------------------- */

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-6 px-5">
        <a href="#atas" className="group flex items-center gap-2.5 focus-ring">
          <Logo className="h-7 w-7 text-dim transition-colors duration-300 group-hover:text-ink" />
          <span className="font-display text-[17px] font-semibold tracking-tight">
            Omni<span className="text-amber">Blob</span>
          </span>
          <span className="ml-1 hidden rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[10px] text-faint sm:inline">
            v1.0.0-beta
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="focus-ring font-mono text-[11.5px] uppercase tracking-[0.14em] text-dim transition-colors duration-200 hover:text-amber"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#deploy"
          className="focus-ring hidden rounded-[3px] bg-amber px-3.5 py-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em] text-bg transition-all duration-200 hover:-translate-y-px hover:bg-[#ffbe63] sm:block"
        >
          Download
        </a>
      </div>
    </header>
  );
}

/* ------------------------------- TERMINAL -------------------------------- */

function Terminal() {
  const prm = usePrefersReducedMotion();
  const total = termLines.length;
  const [idx, setIdx] = useState(prm ? total : 1);

  useEffect(() => {
    if (prm) {
      setIdx(total);
      return;
    }
    let i = 1;
    const iv = window.setInterval(() => {
      i += 1;
      if (i > total + 7) i = 0;
      setIdx(Math.min(i, total));
    }, 560);
    return () => window.clearInterval(iv);
  }, [prm, total]);

  const running = idx < total;
  const ratio = idx / total;
  const files = Math.round(1248512 * ratio);
  const gib = (847.3 * ratio).toFixed(1).replace(".", ",");
  const visible = termLines.slice(0, idx);

  const toneClass: Record<string, string> = {
    cmd: "text-ink",
    scan: "text-cy",
    plan: "text-cy",
    xfer: "text-amber",
    file: "text-dim",
    warn: "text-amber",
    ok: "text-ok",
    verify: "text-ok",
    done: "text-ok",
    dim: "text-faint",
  };

  return (
    <div className="overflow-hidden rounded-[6px] border border-line bg-[#0c131b] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-linesoft px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-alert/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-ok/60" />
        </div>
        <p className="flex-1 truncate text-center font-mono text-[11px] text-faint">
          omniblob@fs-ops01: ~/migrations
        </p>
        <span className="flex items-center gap-1.5 font-mono text-[10.5px] tracking-wider">
          <span className={`led h-1.5 w-1.5 rounded-full ${running ? "bg-amber" : "bg-ok"}`} />
          <span className={running ? "text-amber" : "text-ok"}>{running ? "RUNNING" : "DONE"}</span>
        </span>
      </div>

      {/* log */}
      <div className="flex h-[340px] flex-col justify-end gap-[3px] overflow-hidden px-4 py-3 font-mono text-[12px] leading-[1.55] sm:text-[12.5px]">
        {visible.map((l, i) => (
          <div key={`${i}-${l.text.slice(0, 12)}`} className="term-line flex min-w-0 gap-2.5">
            {l.tone === "cmd" ? (
              <span className="whitespace-pre-wrap break-all">
                <span className="text-amber">$ </span>
                <span className="text-ink">{l.text}</span>
              </span>
            ) : (
              <>
                <span
                  className={`w-[72px] shrink-0 select-none text-right ${toneClass[l.tone]}`}
                >
                  {l.tag ? `[${l.tag}]` : " "}
                </span>
                <span className={`whitespace-pre-wrap break-all ${toneClass[l.tone]}`}>
                  {l.text}
                  {i === visible.length - 1 && running && (
                    <span className="cursor-blink ml-1 inline-block h-[13px] w-[7px] translate-y-[2px] bg-cy/80" />
                  )}
                </span>
              </>
            )}
          </div>
        ))}
        {idx === 0 && <span className="cursor-blink inline-block h-[13px] w-[7px] bg-cy/80" />}
      </div>

      {/* counters */}
      <div className="flex items-center justify-between gap-4 border-t border-linesoft px-4 py-2 font-mono text-[10.5px] tracking-wider text-faint">
        <span>
          FILE <span className="text-dim">{files.toLocaleString("id-ID")}</span>
        </span>
        <span>
          VOLUME <span className="text-dim">{gib} GiB</span>
        </span>
        <span className="hidden sm:inline">
          RATE <span className="text-dim">{running ? "341 MiB/s" : "—"}</span>
        </span>
        <span className="hidden md:inline">
          ERR <span className={running ? "text-dim" : "text-ok"}>0</span>
        </span>
      </div>
    </div>
  );
}

/* --------------------------------- HERO ---------------------------------- */

export function Hero() {
  const [vi, setVi] = useState(1); // default varian "Langsung"
  const v = variants[vi];
  const title = useScramble(v.title);

  return (
    <section id="atas" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
          {/* kiri: copy */}
          <div>
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
                <span className="flex items-center gap-2 text-ok">
                  <span className="led h-1.5 w-1.5 rounded-full bg-ok" />
                  on-premise
                </span>
                <span className="text-line">/</span>
                <span>migrasi &amp; sinkronisasi file</span>
                <span className="text-line">/</span>
                <span className="text-cy">Early Access v1.0.0-beta</span>
              </p>
            </Reveal>

            <h1
              className="mt-6 min-h-[2.1em] font-display text-[clamp(2.1rem,4.6vw,3.7rem)] font-bold leading-[1.06] tracking-tight text-ink"
              aria-label={v.title}
            >
              {title}
            </h1>

            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-dim">{v.sub}</p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">
                  Varian pesan — klik untuk mengganti headline
                </p>
                <div className="mt-2.5 inline-flex overflow-hidden rounded-[4px] border border-line">
                  {variants.map((vv, i) => (
                    <button
                      key={vv.id}
                      onClick={() => setVi(i)}
                      aria-pressed={i === vi}
                      className={`focus-ring px-4 py-2.5 font-mono text-[11.5px] tracking-wide transition-all duration-200 ${
                        i === vi
                          ? "bg-amber font-semibold text-bg"
                          : "text-dim hover:bg-panel2 hover:text-ink"
                      } ${i > 0 ? "border-l border-line" : ""}`}
                    >
                      <span className="opacity-60">{vv.id}</span> {vv.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 max-w-xl border-l-2 border-line pl-3 font-mono text-[11px] leading-relaxed text-faint">
                  {v.note}
                </p>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#arsitektur"
                  className="focus-ring group inline-flex items-center gap-2.5 rounded-[3px] bg-amber px-5 py-3 font-mono text-[12.5px] font-semibold uppercase tracking-[0.1em] text-bg transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ffbe63]"
                >
                  Lihat arsitektur
                  <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a
                  href="#spec"
                  className="focus-ring rounded-[3px] border border-line px-5 py-3 font-mono text-[12.5px] uppercase tracking-[0.1em] text-dim transition-all duration-200 hover:border-amber/60 hover:text-ink"
                >
                  Baca spec sheet
                </a>
              </div>
              <p className="mt-5 font-mono text-[11px] tracking-wide text-faint">
                satu binary statis <span className="text-line">·</span> linux amd64/arm64{" "}
                <span className="text-line">·</span> tanpa agen{" "}
                <span className="text-line">·</span> tanpa telemetri
              </p>
            </Reveal>
          </div>

          {/* kanan: terminal */}
          <Reveal delay={150} className="lg:pt-2">
            <Terminal />
            <p className="mt-3 text-right font-mono text-[10.5px] tracking-wider text-faint">
              SIMULASI RUN — NFS → SMB, 847,3 GiB
            </p>
          </Reveal>
        </div>

        {/* stats */}
        <Reveal className="mt-14">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[5px] border border-line bg-line md:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="group bg-panel px-5 py-5 transition-colors duration-300 hover:bg-panel2">
                <p className="font-display text-[26px] font-bold leading-none tracking-tight text-ink transition-colors duration-300 group-hover:text-amber">
                  {s.value}
                </p>
                <p className="mt-2 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.12em] text-faint">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
