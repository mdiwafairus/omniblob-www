import { problems, specGroups, steps, tickerItems } from "../data";
import { Reveal } from "../lib";

/* --------------------------------- TICKER -------------------------------- */

function TickerRow() {
  return (
    <>
      {tickerItems.map((t) => (
        <span key={t} className="flex items-center gap-6 pr-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">{t}</span>
          <span className="text-[8px] text-amber/50">◆</span>
        </span>
      ))}
    </>
  );
}

export function Ticker() {
  return (
    <div className="overflow-hidden border-y border-line bg-panel/60 py-4" aria-hidden="true">
      <div className="flex flex-wrap justify-center gap-y-3 px-4">
        <TickerRow />
      </div>
    </div>
  );
}

/* -------------------------------- MASALAH -------------------------------- */

export function Problem() {
  return (
    <section id="masalah" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          {/* kiri sticky */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
                01 — Realitas lapangan
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px] sm:leading-[1.1]">
                Anda tidak memulai dari nol. Anda memulai dari belasan tahun file yang tidak berani
                disentuh siapa pun.
              </h2>
              <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-dim">
                Setiap organisasi yang punya umur punya filer tua. Datanya penting, strukturnya
                organik, dokumentasinya tipis. OmniBlob dibangun untuk kondisi itu — bukan untuk
                data center yang baru dan rapi.
              </p>
            </Reveal>
            <Reveal delay={150}>
              <blockquote className="mt-8 border-l-2 border-amber pl-4">
                <p className="font-display text-lg font-medium leading-snug text-ink">
                  “Kami tidak takut migrasinya. Kami takut yang tidak ketahuan ikut pindah.”
                </p>
                <cite className="mt-2 block font-mono text-[11px] not-italic uppercase tracking-[0.16em] text-faint">
                  — Kepala storage, institusi publik · 2,1 PB kelolaan
                </cite>
              </blockquote>
            </Reveal>
          </div>

          {/* kanan: catatan lapangan */}
          <div className="flex flex-col gap-4">
            {problems.map((p, i) => (
              <Reveal key={p.idx} delay={i * 70}>
                <article className="group border border-line bg-panel px-6 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber/50 hover:bg-panel2">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[12px] font-semibold text-amber">{p.idx}</span>
                    <span className="rounded-[3px] border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-faint transition-colors duration-300 group-hover:border-amber/40 group-hover:text-dim">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[19px] font-semibold leading-snug tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-dim">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- PIPELINE ------------------------------- */

export function Pipeline() {
  return (
    <section id="cara-kerja" className="border-t border-line bg-bgsoft/60">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">03 — Cara kerja</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px] sm:leading-[1.1]">
              Lima fase. Semuanya bisa diulang, dihentikan, dan diaudit.
            </h2>
            <p className="max-w-sm text-[15px] leading-relaxed text-dim">
              Tidak ada tombol ajaib “pindahkan semua”. Yang ada adalah urutan kerja yang bisa Anda
              jalankan per bagian, per jadwal, per jendela perubahan.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="group grid gap-4 border-b border-line py-8 transition-colors duration-300 hover:bg-panel/50 md:grid-cols-[110px_1fr] md:gap-8">
                <div className="font-display text-[38px] font-bold leading-none tracking-tight text-faint transition-colors duration-300 group-hover:text-amber">
                  {s.n}
                </div>
                <div className="max-w-3xl">
                  <h3 className="font-display text-[22px] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-dim">{s.body}</p>
                  <code className="mt-4 inline-block rounded-[4px] border border-line bg-[#0c131b] px-3.5 py-2 font-mono text-[12px] text-cy transition-colors duration-300 group-hover:border-cy/40">
                    $ {s.out}
                  </code>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- SPEC ----------------------------------- */

export function Spec() {
  return (
    <section id="spec" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">04 — Spec sheet</p>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-[40px] sm:leading-[1.1]">
                Dibaca seperti datasheet. Karena memang itu bentuknya.
              </h2>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
              dokumen: DS-OB-2.4 · rev 11 · tanpa klaim pemasaran
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {specGroups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 80}>
              <div className="overflow-hidden rounded-[6px] border border-line bg-panel">
                <div className="flex items-center justify-between border-b border-line bg-panel2 px-5 py-3">
                  <h3 className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.2em] text-amber">
                    {g.title}
                  </h3>
                  <span className="font-mono text-[10px] text-faint">{g.rows.length} baris</span>
                </div>
                {g.rows.map((r) => (
                  <div
                    key={r.k}
                    className="grid gap-1.5 border-t border-linesoft px-5 py-4 transition-colors duration-200 first:border-t-0 hover:bg-panel2 sm:grid-cols-[180px_1fr] sm:gap-5"
                  >
                    <p className="font-mono text-[10.5px] uppercase leading-[1.7] tracking-[0.14em] text-faint">
                      {r.k}
                    </p>
                    <p className="text-[14px] leading-relaxed text-dim">{r.v}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
