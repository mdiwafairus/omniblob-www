import { useEffect, useState } from "react";
import { cliTabs, downloads, faqs, navLinks } from "../data";
import { copyText, Reveal } from "../lib";
import {
  IconArrow,
  IconAudit,
  IconCheck,
  IconChevron,
  IconCopy,
  IconGap,
  IconKey,
  IconLock,
  Logo,
} from "./Icons";

/* ------------------------------ CODE LINE ------------------------------- */

function CodeLine({ line, tab }: { line: string; tab: string }) {
  if (tab === "yaml") {
    const m = line.match(/^(\s*)([a-z_]+):(.*)$/i);
    if (m)
      return (
        <>
          <span>{m[1]}</span>
          <span className="text-cy">{m[2]}</span>
          <span className="text-faint">:</span>
          <span className="text-dim">{m[3]}</span>
        </>
      );
    return <span className="text-dim">{line}</span>;
  }
  if (tab === "cli") {
    if (line.startsWith("$"))
      return (
        <>
          <span className="text-amber">$</span>
          <span className="text-ink">{line.slice(1)}</span>
        </>
      );
    if (line.trim().startsWith("→")) return <span className="text-ok">{line}</span>;
    return <span className="text-dim">{line}</span>;
  }
  if (/^(POST|GET|PUT|DELETE) /.test(line)) return <span className="text-amber">{line}</span>;
  if (line.startsWith("→")) return <span className="text-ok">{line}</span>;
  if (line.startsWith("Authorization")) return <span className="text-faint">{line}</span>;
  return <span className="text-dim">{line}</span>;
}

export function Cli() {
  const [tab, setTab] = useState(cliTabs[0].id);
  const [copied, setCopied] = useState(false);
  const active = cliTabs.find((t) => t.id === tab) ?? cliTabs[0];

  const doCopy = async () => {
    const ok = await copyText(active.code);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <section id="cli" className="border-t border-line bg-bgsoft/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">05 — Antarmuka</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px] sm:leading-[1.1]">
                Tiga cara memerintah. Satu job file sebagai sumber kebenaran.
              </h2>
            </div>
            <p className="max-w-sm text-[15px] leading-relaxed text-dim">
              Job didefinisikan sebagai YAML yang bisa disimpan di repo internal Anda, direview, dan
              di-rollback seperti kode infrastruktur lain.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="overflow-hidden rounded-[6px] border border-line bg-[#0c131b]">
            <div className="flex items-center justify-between gap-4 border-b border-linesoft px-2">
              <div className="flex overflow-x-auto">
                {cliTabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    aria-pressed={t.id === tab}
                    className={`focus-ring whitespace-nowrap border-b-2 px-4 py-3 font-mono text-[11.5px] uppercase tracking-[0.14em] transition-all duration-200 ${
                      t.id === tab
                        ? "border-amber text-amber"
                        : "border-transparent text-faint hover:text-dim"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <button
                onClick={doCopy}
                className="focus-ring mr-2 flex shrink-0 items-center gap-2 rounded-[3px] border border-line px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim transition-all duration-200 hover:border-amber/60 hover:text-ink"
              >
                {copied ? (
                  <>
                    <IconCheck className="h-3.5 w-3.5 text-ok" /> disalin
                  </>
                ) : (
                  <>
                    <IconCopy className="h-3.5 w-3.5" /> salin
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto px-5 py-4">
              <pre className="font-mono text-[12.5px] leading-[1.7]">
                {active.code.split("\n").map((l, i) => (
                  <div key={`${tab}-${i}`} className="whitespace-pre">
                    <CodeLine line={l} tab={active.id} />
                  </div>
                ))}
              </pre>
            </div>
            <div className="border-t border-linesoft px-5 py-2 font-mono text-[10px] tracking-wider text-faint">
              {active.file} · semua perintah menerima --dry-run
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------ SECURITY ------------------------------- */

const secItems = [
  {
    icon: IconGap,
    title: "Air-gap penuh",
    body: "Tidak butuh koneksi keluar saat instalasi maupun operasi. Cocok untuk jaringan terisolasi.",
  },
  {
    icon: IconLock,
    title: "Tanpa telemetri",
    body: "Mati secara default. Tidak ada phone-home, tidak ada license server, tidak ada kejutan.",
  },
  {
    icon: IconAudit,
    title: "Audit terstruktur",
    body: "Setiap perintah dan setiap file tercatat dengan checksum — siap untuk audit compliance.",
  },
  {
    icon: IconKey,
    title: "RBAC per job",
    body: "Token berumur pendek dan hak akses per job. Operator harian tidak memegang kunci root.",
  },
];

export function SecurityBand() {
  return (
    <section className="border-y border-line bg-panel/50">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line px-5 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
        {secItems.map((s, i) => (
          <Reveal key={s.title} delay={i * 70} className="group px-2 py-8 sm:px-6">
            <s.icon className="h-6 w-6 text-amber transition-transform duration-300 group-hover:-translate-y-0.5" />
            <h3 className="mt-4 font-display text-[16.5px] font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-dim">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------- DEPLOY ------------------------------- */

export function Deploy() {
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const installCmd = `$ tar xzf omniblob-2.4.1-linux-amd64.tar.gz
$ sudo install -m 0755 omniblob /usr/local/bin/
$ omniblob init
$ sudo systemctl enable --now omniblob`;

  const [copied, setCopied] = useState(false);
  const doCopy = async () => {
    if (await copyText(installCmd)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <section id="deploy" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">06 — Deploy</p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px] sm:leading-[1.1]">
                Pasang di rak Anda sendiri.
              </h2>
              <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-dim">
                Satu binary statis, tanpa dependensi runtime, tanpa agen di server sumber. Dari
                unpack sampai job pertama biasanya di bawah sepuluh menit.
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-8">
              <div className="overflow-hidden rounded-[6px] border border-line bg-[#0c131b]">
                <div className="flex items-center justify-between border-b border-linesoft px-4 py-2">
                  <span className="font-mono text-[10.5px] tracking-wider text-faint">
                    instalasi · linux amd64
                  </span>
                  <button
                    onClick={doCopy}
                    className="focus-ring flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim transition-colors hover:text-ink"
                  >
                    {copied ? <IconCheck className="h-3.5 w-3.5 text-ok" /> : <IconCopy className="h-3.5 w-3.5" />}
                    {copied ? "disalin" : "salin"}
                  </button>
                </div>
                <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[12.5px] leading-[1.7]">
                  {installCmd.split("\n").map((l, i) => (
                    <div key={i} className="whitespace-pre">
                      <span className="text-amber">$</span>
                      <span className="text-ink">{l.slice(1)}</span>
                    </div>
                  ))}
                </pre>
              </div>
              <p className="mt-3 font-mono text-[10.5px] leading-relaxed tracking-wide text-faint">
                Semua artifact ditandatangani. Verifikasi SHA-256 sebelum menjalankan — checksum
                dipublikasikan terpisah dari mirror download.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="overflow-hidden rounded-[6px] border border-line bg-panel">
              <div className="border-b border-line bg-panel2 px-5 py-3">
                <h3 className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.2em] text-amber">
                  Rilis v2.4.1 · channel stable
                </h3>
              </div>
              {downloads.map((d) => (
                <div
                  key={`${d.platform}-${d.arch}-${d.kind}`}
                  className="group flex items-center justify-between gap-4 border-t border-linesoft px-5 py-4 transition-colors duration-200 first:border-t-0 hover:bg-panel2"
                >
                  <div>
                    <p className="text-[14.5px] font-medium text-ink">
                      {d.platform} <span className="text-faint">·</span>{" "}
                      <span className="font-mono text-[12.5px] text-dim">{d.arch}</span>
                    </p>
                    <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
                      {d.kind} · {d.size} · sha256 tersedia
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setToast(`Pratinjau demo — artifact ${d.platform} (${d.arch}) tersedia di rilis internal.`)
                    }
                    className="focus-ring flex shrink-0 items-center gap-2 rounded-[3px] border border-line px-3.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-dim transition-all duration-200 hover:border-amber hover:text-amber group-hover:border-amber/50"
                  >
                    unduh
                    <IconArrow className="h-3.5 w-3.5 rotate-90" />
                  </button>
                </div>
              ))}
              <div className="border-t border-line px-5 py-3.5">
                <p className="font-mono text-[10.5px] leading-relaxed tracking-wide text-faint">
                  Dukungan LTS untuk 2.4.x sampai 2028-06. Migrasi dari 2.3.x: cukup ganti binary,
                  format job file tidak berubah.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="toast-in fixed bottom-6 right-6 z-[80] flex max-w-sm items-start gap-3 rounded-[5px] border border-amber/60 bg-[#161006] px-4 py-3 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7)]"
        >
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber" />
          <p className="font-mono text-[11.5px] leading-relaxed text-dim">{toast}</p>
        </div>
      )}
    </section>
  );
}

/* --------------------------------- FAQ ---------------------------------- */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-line bg-bgsoft/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">07 — FAQ</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px] sm:leading-[1.1]">
            Pertanyaan yang muncul di setiap evaluasi teknis.
          </h2>
        </Reveal>
        <div className="mt-10 max-w-3xl border-t border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className={`acc border-b border-line ${isOpen ? "open" : ""}`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="focus-ring group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                      <span
                        className={`font-display text-[17.5px] font-semibold tracking-tight transition-colors duration-200 ${
                          isOpen ? "text-amber" : "text-ink group-hover:text-amber"
                        }`}
                      >
                        {f.q}
                      </span>
                    </span>
                    <IconChevron
                      className={`h-4 w-4 shrink-0 text-faint transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-amber" : ""
                      }`}
                    />
                  </button>
                  <div className="acc-body">
                    <div>
                      <p className="pb-6 pl-[43px] pr-8 text-[14.5px] leading-relaxed text-dim">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FOOTER -------------------------------- */

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div>
          <a href="#atas" className="focus-ring flex items-center gap-2.5">
            <Logo className="h-7 w-7 text-dim" />
            <span className="font-display text-[17px] font-semibold tracking-tight">
              Omni<span className="text-amber">Blob</span>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-dim">
            Mesin migrasi dan sinkronisasi file on-premise untuk NFS, SMB, dan storage warisan.
          </p>
          <p className="mt-5 font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.16em] text-faint">
            Berjalan di infrastruktur Anda.
            <br />
            Tidak di tempat lain.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Navigasi</p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="focus-ring font-mono text-[12px] uppercase tracking-[0.14em] text-dim transition-colors duration-200 hover:text-amber"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-faint">Rilis aktif</p>
          <dl className="mt-4 space-y-2.5 font-mono text-[12px]">
            <div className="flex justify-between gap-4 border-b border-linesoft pb-2">
              <dt className="text-faint">versi</dt>
              <dd className="text-dim">v2.4.1 (LTS)</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-linesoft pb-2">
              <dt className="text-faint">channel</dt>
              <dd className="text-dim">stable</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-linesoft pb-2">
              <dt className="text-faint">dukungan s/d</dt>
              <dd className="text-dim">2028-06</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-faint">target</dt>
              <dd className="text-dim">linux · amd64/arm64</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="border-t border-linesoft">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
          <p className="font-mono text-[10.5px] tracking-wider text-faint">
            © 2026 OMNIBLOB SYSTEMS
          </p>
          <p className="flex items-center gap-2 font-mono text-[10.5px] tracking-wider text-faint">
            <span className="led h-1.5 w-1.5 rounded-full bg-ok" />
            SEMUA SISTEM BERJALAN DI TEMPAT YANG SEHARUSNYA: TEMPAT ANDA
          </p>
        </div>
      </div>
    </footer>
  );
}
