import { Reveal } from "../lib";

type Box = { x: number; y: number; w: number; h: number; title: string; sub: string; hot?: boolean };

function NodeBox({ b }: { b: Box }) {
  return (
    <g className="arch-node">
      <rect
        className="arch-box"
        x={b.x}
        y={b.y}
        width={b.w}
        height={b.h}
        rx="5"
        fill={b.hot ? "rgba(242,163,60,0.05)" : "#101923"}
        stroke={b.hot ? "rgba(242,163,60,0.65)" : "#1f2d3b"}
        strokeWidth={b.hot ? 1.4 : 1.1}
      />
      <text x={b.x + 14} y={b.y + 27} fontFamily="var(--font-mono)" fontSize="11.5" fontWeight="600" fill={b.hot ? "#f2a33c" : "#e7eef4"}>
        {b.title}
      </text>
      <text x={b.x + 14} y={b.y + 45} fontFamily="var(--font-mono)" fontSize="9.5" fill="#64798c">
        {b.sub}
      </text>
      {b.hot && <circle cx={b.x + b.w - 14} cy={b.y + 14} r="3" fill="#4cc573" className="led" />}
    </g>
  );
}

const sources: Box[] = [
  { x: 44, y: 66, w: 176, h: 64, title: "FILER NFS LAMA", sub: "fs01 · NFSv3 / NFSv4" },
  { x: 44, y: 168, w: 176, h: 64, title: "SHARE SMB", sub: "dc02 · SMB 2.1 / 3.x" },
  { x: 44, y: 270, w: 176, h: 64, title: "DISK LOKAL / SAN", sub: "mount /mnt/legacy" },
  { x: 44, y: 372, w: 176, h: 64, title: "NAS END-OF-LIFE", sub: "vendor: tidak ditemukan" },
];

const targets: Box[] = [
  { x: 740, y: 116, w: 176, h: 64, title: "STORAGE BARU", sub: "nas02 · SMB 3.1.1" },
  { x: 740, y: 238, w: 176, h: 64, title: "BACKUP / ARSIP", sub: "vault01 · NFSv4" },
  { x: 740, y: 360, w: 176, h: 64, title: "TARGET LOKAL", sub: "/srv/target · XFS" },
];

const engine: Box = { x: 384, y: 96, w: 208, h: 330, title: "OMNIBLOB", sub: "engine · host fs-ops01", hot: true };

const engineBlocks = ["scanner", "job scheduler", "transfer workers ×8", "verifier · sha256", "audit log"];

const inPaths = [
  "M 220 98 C 305 98, 298 168, 384 168",
  "M 220 200 C 305 200, 298 218, 384 218",
  "M 220 302 C 305 302, 298 268, 384 268",
  "M 220 404 C 305 404, 298 318, 384 318",
];

const outPaths = [
  "M 592 170 C 668 170, 664 148, 740 148",
  "M 592 262 C 668 262, 664 270, 740 270",
  "M 592 354 C 668 354, 664 392, 740 392",
];

export function Architecture() {
  return (
    <section id="arsitektur" className="relative border-t border-line bg-bgsoft/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">02 — Arsitektur</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px] sm:leading-[1.1]">
              Berjalan di dalam perimeter Anda. Bukan di sisi lain kabel.
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-dim">
              OmniBlob dipasang di satu host yang punya akses ke sumber dan target. Data mengalir
              langsung antar sistem Anda — engine hanya mengorkestrasi, memverifikasi, dan mencatat.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="overflow-x-auto rounded-[6px] border border-line bg-panel/70 p-2">
            <svg viewBox="0 0 960 520" className="min-w-[760px]" role="img" aria-label="Diagram topologi: sumber legacy mengalir ke engine OmniBlob lalu ke target storage, seluruhnya di dalam perimeter jaringan organisasi">
              {/* perimeter */}
              <rect x="16" y="16" width="928" height="488" rx="8" fill="none" stroke="#1f2d3b" strokeWidth="1.2" strokeDasharray="3 7" />
              <text x="34" y="40" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#64798c">
                PERIMETER JARINGAN ANDA
              </text>
              <text x="926" y="40" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" fill="#4cc573">
                TIDAK ADA PANGGILAN KELUAR
              </text>

              {/* aliran masuk */}
              {inPaths.map((d, i) => (
                <path key={`in-${i}`} d={d} className="flow" fill="none" stroke="rgba(242,163,60,0.55)" strokeWidth="1.4" />
              ))}
              {/* aliran keluar */}
              {outPaths.map((d, i) => (
                <path key={`out-${i}`} d={d} className="flow" fill="none" stroke="rgba(92,200,220,0.55)" strokeWidth="1.4" />
              ))}
              {/* paket data */}
              {[inPaths[0], inPaths[3], outPaths[1]].map((d, i) => (
                <circle
                  key={`pkt-${i}`}
                  r="3.2"
                  fill={i === 2 ? "#5bc8dc" : "#f2a33c"}
                  className="packet"
                  style={{ offsetPath: `path('${d}')`, animationDelay: `${i * 1.1}s` }}
                />
              ))}

              {/* kolom label */}
              <text x="44" y="58" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="2" fill="#64798c">
                SUMBER LEGACY
              </text>
              <text x="740" y="106" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="2" fill="#64798c">
                TARGET
              </text>

              {sources.map((b) => (
                <NodeBox key={b.title} b={b} />
              ))}
              {targets.map((b) => (
                <NodeBox key={b.title} b={b} />
              ))}

              {/* engine */}
              <NodeBox b={engine} />
              {engineBlocks.map((name, i) => (
                <g key={name}>
                  <rect x="400" y={150 + i * 52} width="176" height="38" rx="4" fill="#0c131b" stroke="#17232f" />
                  <text x="414" y={174 + i * 52} fontFamily="var(--font-mono)" fontSize="10.5" fill="#9db1c1">
                    {name}
                  </text>
                  <circle cx="562" cy={169 + i * 52} r="2.4" fill={i === 3 ? "#4cc573" : "#f2a33c"} className="led" style={{ animationDelay: `${i * 0.4}s` }} />
                </g>
              ))}

              {/* legenda */}
              <g fontFamily="var(--font-mono)" fontSize="9.5" fill="#64798c">
                <line x1="44" y1="478" x2="76" y2="478" stroke="rgba(242,163,60,0.7)" strokeWidth="1.4" strokeDasharray="4 5" />
                <text x="84" y="481">aliran data (NFS / SMB)</text>
                <line x1="260" y1="478" x2="292" y2="478" stroke="rgba(92,200,220,0.7)" strokeWidth="1.4" strokeDasharray="4 5" />
                <text x="300" y="481">aliran ke target</text>
                <circle cx="452" cy="478" r="3" fill="#f2a33c" />
                <text x="462" y="481">batch file terverifikasi</text>
              </g>
            </svg>
          </div>
          <p className="mt-3 font-mono text-[10.5px] tracking-wider text-faint">
            TOPOLOGI KHAS · 4 SUMBER → 1 ENGINE → 3 TARGET · SELURUHNYA DI DALAM SATU PERIMETER
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function PullQuote() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
        <Reveal lines className="font-display text-[clamp(1.7rem,3.6vw,3rem)] font-bold leading-[1.15] tracking-tight">
          <span className="ln">
            <span style={{ transitionDelay: "0ms" }}>Data tidak pernah meninggalkan</span>
          </span>
          <span className="ln">
            <span style={{ transitionDelay: "140ms" }}>
              <span className="text-amber">perimeter Anda.</span> Itu bukan fitur —
            </span>
          </span>
          <span className="ln">
            <span style={{ transitionDelay: "280ms" }} className="text-dim">
              itu arsitekturnya.
            </span>
          </span>
        </Reveal>
        <Reveal delay={350}>
          <p className="mt-8 max-w-xl border-l-2 border-amber/60 pl-4 font-mono text-[11.5px] uppercase leading-relaxed tracking-[0.16em] text-faint">
            Prinsip desain OmniBlob — RFC internal #001, tidak pernah berubah sejak rilis pertama
          </p>
        </Reveal>
      </div>
    </section>
  );
}
