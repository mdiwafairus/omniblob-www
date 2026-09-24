export type Variant = {
  id: string;
  label: string;
  title: string;
  sub: string;
  note: string;
};

export const variants: Variant[] = [
  {
    id: "01",
    label: "Minimal",
    title: "File pindah. Data tetap.",
    sub: "OmniBlob memindahkan dan menyinkronkan file antar share NFS, SMB, dan disk lokal dari dalam infrastruktur Anda. Setiap byte diverifikasi checksum. Tidak ada yang keluar dari jaringan.",
    note: "Paling hemat kata. Cocok untuk audiens yang sudah tahu masalahnya dan hanya butuh konfirmasi.",
  },
  {
    id: "02",
    label: "Langsung",
    title: "Warisan file server itu bisa dipindahkan. Tanpa menyerahkan kontrol.",
    sub: "Mesin migrasi on-premise untuk NFS, SMB, dan storage lama. Permission dipetakan, transfer berjalan delta dan terjadwal, verifikasi checksum per file, audit log lengkap — tanpa data meninggalkan perimeter Anda.",
    note: "Menyebut mekanisme kerja di sub-headline. Cocok sebagai default landing page.",
  },
  {
    id: "03",
    label: "Bold",
    title: "Server lamanya boleh pensiun. Datanya tidak boleh hilang.",
    sub: "OmniBlob mengurai bertahun-tahun sprawl share: inventarisasi jutaan file, transfer terverifikasi, permission utuh, cutover terencana. Semuanya berjalan di rak server Anda — bukan di tempat lain.",
    note: "Menekan rasa sakit operasional. Cocok untuk kampanye ke tim yang sedang menunda migrasi.",
  },
];

export type TermLine = {
  tag?: string;
  text: string;
  tone: "cmd" | "scan" | "plan" | "xfer" | "file" | "warn" | "ok" | "verify" | "done" | "dim";
};

export const termLines: TermLine[] = [
  { text: "omniblob sync --job finance-migration --verify", tone: "cmd" },
  { tag: "scan", text: "nfs://fs01.internal/export/finance", tone: "scan" },
  { tag: "scan", text: "1.248.512 objek · 847,3 GiB · 9.412 direktori", tone: "scan" },
  { tag: "plan", text: "delta 96,1% — 814,4 GiB akan ditransfer", tone: "plan" },
  { tag: "xfer", text: "→ smb://nas02.internal/finance", tone: "xfer" },
  { text: "2019/q4-laporan.xlsx            4,2 MiB   sha256 ✓", tone: "file" },
  { text: "2020/arsip-kontrak/0341.pdf    18,9 MiB   sha256 ✓", tone: "file" },
  { text: "2021/ledger/jurnal-2021.csv   212,4 MiB   sha256 ✓", tone: "file" },
  { text: "2022/audit/bukti-scan/*.tif     1,8 GiB   sha256 ✓", tone: "file" },
  { tag: "retry", text: "2023/vendor-08.zip — SMB_STATUS_NETWORK_BUSY · coba 2/3", tone: "warn" },
  { tag: "resume", text: "2023/vendor-08.zip — dilanjutkan dari byte 44.012.003", tone: "ok" },
  { tag: "xfer", text: "612.904/1.248.512 · 341 MiB/s · ETA 00:31:42", tone: "xfer" },
  { text: "2023/ap/inv-88213.pdf           912 KiB   sha256 ✓", tone: "file" },
  { text: "2024/hr/kontrak/*.pdf            64,1 MiB  sha256 ✓", tone: "file" },
  { tag: "xfer", text: "1.248.512/1.248.512 · 847,3 GiB · 0 gagal", tone: "xfer" },
  { tag: "verify", text: "checksum pass 1.248.512/1.248.512 · 0 mismatch", tone: "verify" },
  { tag: "done", text: "0 error · audit → /var/log/omniblob/run-0482.log", tone: "done" },
];

export const tickerItems = [
  "NFSv3",
  "NFSv4.1",
  "SMB 2.1",
  "SMB 3.1.1",
  "POSIX ACL",
  "NTFS ACL",
  "XATTR",
  "SHA-256",
  "BLAKE2b",
  "DELTA TRANSFER",
  "DRY-RUN",
  "RESUME OTOMATIS",
  "AUDIT LOG",
  "AIR-GAP READY",
  "PROMETHEUS",
  "SYSTEMD",
  "TANPA AGEN",
  "TANPA TELEMETRI",
];

export type Problem = { idx: string; tag: string; title: string; body: string };

export const problems: Problem[] = [
  {
    idx: "01",
    tag: "inventaris",
    title: "Share tersebar, peta tidak ada.",
    body: "NFS di tiga server, SMB di dua lagi, satu NAS yang mulai berbunyi aneh. Tidak ada satu pun dokumen yang menyebut semua mount point — dan satu orang yang hafal, sedang cuti panjang.",
  },
  {
    idx: "02",
    tag: "permission",
    title: "Tiga rezim permission dalam satu pohon file.",
    body: "POSIX mode di satu sisi, ACL NFSv4 di sisi lain, NTFS ACL lewat SMB. Ditambah satu service account yang semua orang takut hapus karena “dulu pernah ada gunanya”.",
  },
  {
    idx: "03",
    tag: "integritas",
    title: "Backup terakhir yang terverifikasi: tidak ada yang tahu.",
    body: "Job backup memang jalan tiap malam. Tapi kapan terakhir kali restore diuji, dan apakah hasilnya lengkap — itu pertanyaan yang membuat rapat jadi hening.",
  },
  {
    idx: "04",
    tag: "lifecycle",
    title: "Hardware lama, vendor hilang.",
    body: "Server filer generasi lama sudah lewat masa dukung. Spare part tidak ada, dokumentasi vendor tidak ditemukan. Datanya harus keluar dari sana — dengan selamat, dan dengan jadwal Anda.",
  },
  {
    idx: "05",
    tag: "proses",
    title: "Percobaan pindah sebelumnya berhenti di spreadsheet.",
    body: "Seseorang pernah menulis daftar share di spreadsheet, memperkirakan durasi copy manual, lalu menyerah di baris ke-40. Sejak itu tidak ada yang menyentuh topik ini.",
  },
];

export type Step = { n: string; title: string; body: string; out: string };

export const steps: Step[] = [
  {
    n: "01",
    title: "Inventarisasi",
    body: "Scan seluruh mount sumber: jumlah file, ukuran, tipe, umur, dan struktur direktori. Hasilnya inventori yang dicatat ke database lokal.",
    out: "omniblob -scan -config ./config.yaml",
  },
  {
    n: "02",
    title: "Transfer (API/Upload)",
    body: "Alih-alih pull, klien bisa langsung melakukan push file baru ke OmniBlob via REST API yang diamankan dengan API Key.",
    out: "API: POST /api/v1/pelayanan/upload",
  },
  {
    n: "03",
    title: "Deduplikasi & Hash (CAS)",
    body: "Setiap file yang masuk dihitung SHA-256 nya. File identik tidak digandakan, menghemat penyimpanan target secara drastis.",
    out: "Hash calculated: sha256 -> objects/a1b2...",
  },
  {
    n: "04",
    title: "Virtual File System",
    body: "File fisik disimpan secara rata (flat) di object storage, namun klien tetap melihat struktur folder logis (Virtual File System).",
    out: "API: GET /api/v1/explorer/list",
  },
  {
    n: "05",
    title: "Dashboard & Audit",
    body: "Pantau ukuran storage, jumlah file yatim, dan performa transfer langsung dari Dashboard Admin berbasis React.",
    out: "API: GET /api/v1/dashboard/summary",
  },
];

export type SpecRow = { k: string; v: string };
export type SpecGroup = { title: string; rows: SpecRow[] };

export const specGroups: SpecGroup[] = [
  {
    title: "Sumber & target",
    rows: [
      { k: "Protokol sumber", v: "NFS, SMB, mount lokal via scanner, atau API Upload langsung (REST)" },
      { k: "Protokol target", v: "Target Lokal via Object Storage (CAS) di mount point /objects" },
      { k: "Skala teruji", v: "Miliaran file per lingkungan; snapshot inventori per run ke PostgreSQL" },
    ],
  },
  {
    title: "Integritas & metadata",
    rows: [
      { k: "Verifikasi", v: "SHA-256 Hashing untuk deduplikasi (CAS) dan integritas data" },
      { k: "Permission", v: "Preservasi atribut dasar file (nama, modul, path logis, dan ukuran)" },
      { k: "Penanganan error", v: "Sidecar meta.json per-file untuk disaster recovery dan sinkronisasi DB ulang" },
    ],
  },
  {
    title: "Operasi",
    rows: [
      { k: "Antarmuka", v: "REST API, Admin Dashboard (React), dan Daemon Config (YAML)" },
      { k: "Kontrol akses", v: "Autentikasi terpusat via API Key (X-API-KEY, X-API-USER, X-API-PASS)" },
      { k: "Observabilitas", v: "Dashboard statistik real-time (Storage Explorer), log interaktif via stdout" },
    ],
  },
  {
    title: "Deployment",
    rows: [
      { k: "Bentuk", v: "Satu binary statis (Go); tidak memerlukan setup web server (Apache/Nginx)" },
      { k: "Dependensi", v: "PostgreSQL untuk manajemen metadata; Storage disk (Local/Mount)" },
      { k: "Lingkungan", v: "Bare metal, VM, dan lingkungan air-gapped penuh (On-Premise)" },
    ],
  },
];

export type CliTab = { id: string; label: string; file: string; code: string };

export const cliTabs: CliTab[] = [
  {
    id: "yaml",
    label: "Config",
    file: "config.yaml",
    code: `server:
  port: 4000
  base_url: "http://localhost:4000"

database:
  host: "localhost"
  port: 5432
  user: "postgres"
  password: "password123"
  name: "omniblob"

storage:
  base_path: "D:/omniblobpath/objects"
  legacy_path: "C:/legacy_share"`,
  },
  {
    id: "cli",
    label: "Daemon",
    file: "shell",
    code: `$ omniblob.exe -config ./config.yaml

========================================================
dYs? OmniBlob Storage Node & API Server is RUNNING
dY"S Dashboard is accessible at: http://localhost:4000/
========================================================

{"level":"info","message":"Starting OmniBlob Object Storage"}`,
  },
  {
    id: "api",
    label: "REST API",
    file: "HTTP",
    code: `POST /api/v1/pelayanan/upload
X-API-KEY: be_pwni_secret_key_2026
X-API-USER: be_pwni
X-API-PASS: be_pwni_pass_123
Content-Type: multipart/form-data

(file data)

+' 201 Created
{
  "success": true,
  "data": {
    "checksum": "a1b2c3d4...",
    "path": "be-pwni/pelayanan/doc.pdf"
  }
}`,
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Apakah data kami keluar dari jaringan?",
    a: "Tidak. OmniBlob berjalan murni di infrastruktur Anda (On-Premise) dan menyimpan fisik data secara lokal. Tidak ada komponen yang menghubungi layanan eksternal (cloud).",
  },
  {
    q: "Apa bedanya dengan storage biasa?",
    a: "Storage biasa menyimpan file berulang kali. OmniBlob memakai pendekatan CAS (Content-Addressable Storage). File identik (walau beda nama) hanya disimpan satu kali secara fisik, menghemat kapasitas disk drastis, sambil tetap mempertahankan struktur logis Virtual File System.",
  },
  {
    q: "Bagaimana integrasinya?",
    a: "Aplikasi internal Anda tidak perlu pusing memikirkan NAS/SAN. Cukup push file via REST API OmniBlob. OmniBlob akan mengatur deduplikasi, hashing, dan memberikan Presigned URL untuk akses yang aman.",
  },
  {
    q: "Apakah perlu memasang agen di server sumber?",
    a: "Tidak. OmniBlob adalah API Gateway mandiri. Aplikasi klien (BE/FE) cukup memanggil API HTTP standar untuk upload dan sinkronisasi file.",
  },
  {
    q: "Bisa jalan di lingkungan air-gapped?",
    a: "Sangat bisa. Binary-nya statis (Golang), tidak butuh koneksi keluar saat instalasi maupun operasi. Database yang dibutuhkan hanyalah PostgreSQL internal.",
  },
  {
    q: "Berapa lama migrasi awal (inventarisasi) berjalan?",
    a: "OmniBlob memiliki fitur scanner bawaan yang akan mengindeks file lama dari /legacy_share langsung ke PostgreSQL. Kecepatan tergantung kapabilitas I/O disk Anda.",
  },
];

export type Dl = { platform: string; arch: string; kind: string; size: string };

export const downloads: Dl[] = [
  { platform: "Windows", arch: "amd64", kind: ".exe", size: "12,1 MB" },
  { platform: "Windows", arch: "386 (32-bit)", kind: ".exe", size: "10,8 MB" },
  { platform: "Linux", arch: "amd64", kind: "binary", size: "11,4 MB" },
  { platform: "Linux", arch: "386 (32-bit)", kind: "binary", size: "10,1 MB" },
  { platform: "Docker image", arch: "multi", kind: "OCI", size: "42,7 MB" },
];

export const heroStats = [
  { value: "1.248.512", label: "file terverifikasi dalam satu run" },
  { value: "0", label: "error tak tertangani" },
  { value: "341 MiB/s", label: "throughput sustained di 10GbE" },
  { value: "100%", label: "checksum pass, sumber ↔ target" },
];

export const navLinks = [
  { href: "#masalah", label: "Masalah" },
  { href: "#arsitektur", label: "Arsitektur" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#spec", label: "Spec" },
  { href: "#deploy", label: "Deploy" },
  { href: "#faq", label: "FAQ" },
];
