# SILAB Admin (Frontend)

Dashboard web untuk laboran dan asisten praktikum SILAB — Program Studi Sistem
Informasi, Universitas Ahmad Dahlan. Proyek skripsi dengan fokus pada
**presensi mahasiswa berbasis QR code**.

Repo pasangannya: `silab-backend`. Frontend ini tidak berguna tanpa backend
berjalan.

## Stack

- Next.js 15 (App Router, Turbopack), React 19, TypeScript
- TailwindCSS 3 + DaisyUI, @headlessui/react
- Zustand untuk state, Axios untuk HTTP
- react-hook-form + Zod, react-qr-code, jsPDF + html2canvas

## Menjalankan

```bash
npm install
npm run dev -- -p 3001      # backend memakai port 3000
```

### Environment

File `.env.local` di root (tidak di-commit; salin dari `.env.example`):

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BASE_URL=http://localhost:3000
```

**Dua-duanya wajib.** `NEXT_PUBLIC_BASE_URL` dipakai axios (`app/services/`),
`BASE_URL` dipakai server actions lama (`app/actions/`).

## Struktur

```
app/
├── services/      ← layer API (axios "satellite") — INI yang dipakai
├── store/         ← Zustand, jembatan services ↔ komponen
├── interfaces/    ← kontrak request/response
├── actions/       ← server actions generasi LAMA, sedang dipensiunkan
├── components/
├── dashboard/     ← halaman
```

### Dua generasi kode

Folder `app/actions/` adalah sisa generasi lama yang menembak backend di IP
kampus (`10.4.52.201:3001`) yang **sudah mati**. Sebagian besar sudah
digantikan `app/services/`, tapi **enam file masih mengimpor dari `actions/`**,
jadi folder itu belum boleh dihapus.

Membereskan sisa ini adalah utang teknis terbesar yang tersisa.

## Autentikasi

1. `/auth` → `useAuthStore.login()` → `POST /auth/login`. Sebelum cookie
   disimpan, token baru dipakai langsung untuk `GET /auth/me`; bila perannya
   MAHASISWA, `GET /class` harus berisi minimal satu kelas yang ia pegang
   sebagai asisten. Bila kosong, login ditolak dengan pesan "Web hanya untuk
   laboran, dosen, dan asisten." Pemeriksaan ini sengaja dilakukan sebelum
   cookie disimpan, karena begitu cookie ada, `middleware.ts` langsung
   memindahkan halaman `/auth` ke `/dashboard`
2. `setToken()` dan `setRefreshToken()` (server action) menyimpan cookie
   `accessToken` dan `refreshToken`; masa berlakunya di-decode dari payload
   JWT. Cookie `refreshToken` bersifat `httpOnly` karena hanya dibaca server
3. `middleware.ts` memblokir `/dashboard*` bila kedua cookie tidak ada
4. Interceptor axios membaca cookie **langsung dari `document.cookie`**, dengan
   `getToken()` sebagai cadangan

Poin 4 penting: sebelumnya setiap permintaan memanggil server action, dan tepat
setelah login panggilan itu mengantre di belakang navigasi — membuat dashboard
tampak kosong sampai di-refresh.

Setelah login, `router.replace("/dashboard")` **harus diikuti**
`router.refresh()` untuk membuang Router Cache Next.js.

Access token berlaku 15 menit dan diperbarui sendiri (`app/utils/cookie.ts`):

- Cookie `accessToken` hilang saat tokennya kedaluwarsa. `getToken()` lalu
  memanggil `refreshAccessToken()`, yang menukar refresh token di
  `POST /auth/refresh` dan menyimpan cookie baru. Ini juga berlaku untuk
  server action lama di `app/actions/`, karena semuanya memakai `getToken()`.
- Bila jam browser tertinggal dari jam server, backend bisa membalas
  `jwt expired` walau cookie masih ada. Interceptor lalu memperbarui token
  dan mengulang permintaan itu sekali.
- Backend menolak refresh token setelah 1 hari, setelah password akun itu
  diganti (lihat "Lupa password" di README backend), atau setelah akunnya
  dihapus. `refreshAccessToken()` lalu menghapus semua cookie sesi. Saat
  halaman dimuat, `SignOutButton` mengalihkan ke `/auth`; di halaman yang
  sedang terbuka, `refreshOnce()` (`app/services/satellite/index.ts`)
  mengalihkan ke `/auth` bila cookie `refreshToken` memang sudah tidak ada
  (`hasRefreshToken()`), jadi gangguan jaringan sesaat tidak mengeluarkan
  pengguna. Karena backend memutus stream SSE akun yang password-nya diganti,
  halaman dashboard yang terbuka kembali ke `/auth` sekitar 2 detik kemudian.

Lupa password tidak punya alur di web. Halaman `/auth` hanya menulis "Lupa
password? Hubungi laboran.", karena akun laboran dan dosen diganti password-nya
oleh laboran lewat `PUT /user/:nimAtauId/password` (lihat README backend).
Mahasiswa, termasuk asisten, memakai Lupa password di aplikasi mobile.

## Halaman

| Route | Isi |
|---|---|
| `/auth` | Login NIM/NIY + password (mahasiswa memakai NIM, dosen dan laboran NIY 8 angka) |
| `/dashboard` | Kartu statistik. LABORAN: mata kuliah dan pembayaran. Asisten: kelas yang ia pegang. DOSEN: kelas, mahasiswa, pertemuan, dan rata-rata kehadiran mata kuliah yang ia ampu |
| `/dashboard/praktikum` | LABORAN: semua mata kuliah dikelompokkan per semester dengan tombol Ubah, lihat "Praktikum per Semester" dan "Ubah Mata Kuliah". DOSEN: kelompok semester yang sama, hanya mata kuliah yang ia ampu. Asisten (MAHASISWA): kartu kelas yang ia pegang |
| `/dashboard/praktikum/[classId]` | Detail kelas (hari, jam, ruangan, dosen, asisten, kuota) + panel pertemuan & presensi. LABORAN: tombol Ubah Kelas dan Hapus Kelas, lihat "Ubah dan Hapus Kelas". LABORAN dan asisten: tambah, ubah judul, dan hapus pertemuan, lihat "Tambah, Ubah, dan Hapus Pertemuan". DOSEN hanya melihat |
| `.../tambah-praktikum` | Buat kelas baru (hanya LABORAN), lihat "Tambah Praktikum dan Jam Sesi" |
| `.../recap-attendances` | Rekap presensi per kelas (`?classId=`) atau per pertemuan (`&meetingId=`) + unduh PDF |
| `/dashboard/master-data/add-subject` | Tambah mata kuliah (hanya LABORAN), lihat "Ubah Mata Kuliah" |
| `/dashboard/segera-hadir` | Pengganti fitur yang belum ada (`?fitur=Modul`), dituju tombol Modul "Click to Open" di detail kelas |
| `/dashboard/master-data/jam-sesi` | Jam sesi Senin–Kamis dan Jumat: tambah, ubah jam, nonaktifkan, hapus, dan daftar kelas di tiap sesi (hanya LABORAN) |
| `/dashboard/master-data/pembayaran` | Satu baris per mahasiswa + pop-up status bayar tiap mata kuliah; konfirmasi bayar + pilih/pindah kelas dari pop-up |
| `/dashboard/pengumuman/add-pengumuman` | Buat pengumuman |
| `.../list-pengumuman`, `.../[id]` | Daftar & detail pengumuman |
| `/dashboard/profil` | LABORAN/DOSEN: data akun, ubah nama, ganti password. Asisten: data akun saja + arahan memakai aplikasi mobile |

### Profil

Bagian bawah menu samping (`sidebar-account.tsx`, di atas Sign Out)
menampilkan inisial, nama, dan peran pengguna. Untuk laboran dan dosen bagian
ini adalah tautan ke `/dashboard/profil`; untuk asisten hanya tampilan, karena
mahasiswa (termasuk asisten) mengelola akunnya di aplikasi mobile.

- **Ubah nama**: `PUT /auth/me`, 3–100 karakter, spasi berlebih dirapikan.
  Nama di menu samping langsung berganti karena store memakai data balasan
  server. NIM/NIY dan email tidak bisa diubah; halaman Profil menulis "NIY"
  untuk dosen dan laboran.
- **Ganti password**: `PUT /auth/me/password` dengan password lama, password
  baru (min. 8, harus berbeda), dan konfirmasi. Isian diperiksa dulu di
  browser. Server membalas token baru yang langsung disimpan ke cookie, jadi
  browser ini tetap masuk, sedangkan browser/HP lain dengan akun yang sama
  kembali ke `/auth` sekitar 1,5 detik kemudian.
- `GET /auth/me` membalas `name`, bukan `fullname`; `IMeResponseBody` sudah
  disesuaikan. `app/appbar.tsx` dan `components/appbar-component.tsx` (nama di
  bagian atas) tidak tampil karena cookie `fullname`/`nim`/`email` yang
  dibacanya tidak pernah diisi.

## Logika status presensi

Ditentukan dari dua field yang dikirim backend:

- `submitted_at === null` → **Belum Presensi**
- `submitted_at` terisi dan `is_attended === true` → **Hadir**
- `submitted_at` terisi dan `is_attended === false` → **Tidak Hadir**

Jangan kembali ke pola lama `is_attended !== null` — backend selalu mengirim
boolean, tidak pernah `null`, sehingga semua mahasiswa akan tampil
"Tidak Hadir".

## Penanganan error

`satellite` punya response interceptor yang sudah mengurai error backend dan
menolak dengan bentuk datar `{ status, message }`.

Jadi di store gunakan:

```ts
catch (error: any) {
  set({ error: error?.message ?? "Terjadi kesalahan" });
}
```

**Bukan** `error?.response?.data?.message` — objek error di sini tidak punya
`response`, sehingga pesan asli backend hilang dan selalu muncul
"Terjadi kesalahan".

## Yang sudah dikerjakan

- Lima import rusak diperbaiki; `button-group.tsx` dan `actions/auth/actions.ts`
  dihapus; `next.config.mjs` dihapus
- Tombol Buka/Tutup Presensi tersambung ke `PUT /meeting/:id/status`
- Edit presensi manual dan "Kembalikan ke Belum Presensi" berfungsi
- Halaman Pembayaran: pilih kelas saat konfirmasi lunas, dan pindah kelas
- Halaman Pembayaran dikelompokkan per mahasiswa (`app/utils/payment.ts`):
  tabel berisi satu baris per mahasiswa dengan ringkasan ("Lunas semua",
  "2 dari 3 lunas", "Belum Bayar"). Klik baris membuka pop-up
  `components/master-data/student-payment-dialog.tsx` berisi kelas dan status
  tiap mata kuliah; tombol Ubah membuka form ubah status/kelas di pop-up yang
  sama. Filter "Belum Bayar" = masih ada mata kuliah belum lunas, "Sudah
  Bayar" = semua lunas; filter dihitung di browser, jadi `GET /activation`
  hanya dikirim dengan `?name=`. Kartu angka tetap menghitung per aktivasi
- Kartu dashboard: fungsi store yang tertukar diperbaiki, endpoint kembar
  dipisah dengan `?status=true/false`
- Pengumuman: validasi judul/deskripsi, Lihat Detail, Edit, dan Hapus
- Scrollbar disembunyikan di seluruh aplikasi lewat `globals.css`
- Daftar pertemuan langsung muncul setelah ditambah (store memanggil
  `getMeetings` ulang)
- Halaman Rekap Presensi ditulis ulang: data dari `GET /meeting/:classId`
  lewat store (jalur lama `/subject/classes/:classId/meetings` tidak ada di
  backend), tidak crash bila kelas belum punya pertemuan, `meetingId`
  dihormati, PDF baru dibuat saat tombol **Unduh PDF** diklik. PDF digambar
  langsung dengan jsPDF (bukan screenshot html2canvas), A4 landscape, header
  tabel diulang di tiap halaman. Logika status presensi dipindah ke
  `app/utils/attendance.ts` dan dipakai bersama halaman detail kelas
- Refresh atau membuka langsung halaman dashboard tidak lagi terlempar ke
  `/dashboard`. `SignOutButton` kini hanya mengalihkan ke `/auth` setelah
  `me()` benar-benar gagal, bukan saat `userData` masih `null` karena
  `me()` belum selesai. Tombol **Keluar** mengalihkan ke `/auth` sendiri
- Dialog QR presensi memakai `GET /meeting/:id/qr`: QR berganti sendiri
  setiap 10 detik dengan hitung mundur, token tidak ditampilkan sebagai teks,
  dan permintaan berhenti saat dialog ditutup. State QR (`qrToken`,
  `qrError`) terpisah dari `isLoading`/`error` bersama di `useMeetingStore`,
  supaya tombol Buka/Tutup Presensi tidak ikut berkedip. Bila sesi belum
  dibuka, dialog menampilkan pesan dari backend
- Login tidak lagi habis setelah 15 menit (lihat Autentikasi). Sebelumnya QR
  di dialog presensi hilang dan diganti pesan error begitu token asisten
  kedaluwarsa
- Tampilan diperbarui real-time lewat `GET /events`
  (`app/services/realtime/events.ts`, dipakai halaman lewat hook
  `useRealtimeEvents`). Yang ikut berubah tanpa refresh:

  | Halaman | Berubah saat |
  |---|---|
  | Dashboard | mahasiswa mendaftar, status bayar/kelas berubah, kelas atau mata kuliah baru |
  | Praktikum | kelas atau mata kuliah baru, peserta kelas berubah |
  | Detail kelas & rekap presensi | presensi masuk dari HP, buka/tutup sesi, kuota terisi, asisten |
  | Pembayaran | mahasiswa mendaftar dari HP, status bayar/kelas diubah laboran lain |
  | Pengumuman (daftar & detail) | pengumuman dibuat, diubah, dihapus |

  Semua halaman berbagi satu koneksi; koneksi ditutup 5 detik setelah halaman
  terakhir yang memakainya ditinggalkan. Data dimuat ulang diam-diam lewat aksi
  `refresh…` di store (tanpa `isLoading`, jadi tombol dan tabel tidak
  berkedip). Aksi itu dibungkus `coalesce` (`app/utils/coalesce.ts`): event
  yang datang beruntun digabung dan permintaan berjalan berurutan, sehingga
  respons lama tidak menimpa yang baru. Stream memakai `fetch` (bukan
  `EventSource`) agar token tetap dikirim di header
- Tombol Modul "Click to Open" di detail kelas membuka halaman Segera Hadir;
  sebelumnya tombol itu tidak melakukan apa-apa karena backend belum
  menyimpan modul
- Sidebar bisa diperkecil lewat tombol bulat di tepinya: hanya ikon yang
  tampil (tooltip saat disorot), dan submenu Master Data/Pengumuman muncul di
  samping ikon (`sidebar-group.tsx`, menggantikan dua komponen disclosure yang
  isinya kembar). Pilihan disimpan di cookie `sidebar-collapsed` dan dibaca
  `dashboard/layout.tsx` di server, jadi lebarnya benar sejak render pertama.
  Lebar sidebar kini tetap (300px / 104px), bukan ¼ layar
- Kerapian tampilan, desain tidak diubah: kelebihan tinggi 32px di semua
  halaman hilang (panel utama kini punya jarak bawah dan konten menggulir di
  dalamnya); hari tampil dalam bahasa Indonesia (`app/utils/day.ts`) termasuk
  di pilihan hari form kelas; kartu kelas memakai grid yang menyesuaikan
  lebar; tabel presensi punya jarak dan garis antarbaris, tanpa label
  "Tanggal Meeting" yang tidak pernah berisi; baris tabel Pembayaran sejajar
  dan lebar kolomnya tidak lagi melebihi 100%; tombol filter seragam; kartu
  dashboard langsung di bawah sambutan dan menyesuaikan tinggi layar; daftar
  pengumuman kosong menampilkan keterangan
- Halaman login (`/auth`) dan halaman awal (`/`) dirapikan: isi di tengah
  layar dan kotak login sejajar dengan sambutan (ilustrasi dan sambutan kini
  satu komponen, `welcome-hero.tsx`); kolom input mengikuti lebar kotak
  sehingga tidak keluar kotak di layar 1280 ke bawah; jarak antarkolom
  seragam (sebelumnya `<label>` kosong dan `<p>` error yang selalu dirender
  ikut menambah jarak). Validasi memakai pesan zod berbahasa Indonesia di
  bawah kolom yang tepat, bukan balon bawaan browser; sebelumnya error NIM
  tampil dua kali dan error password tidak pernah tampil. Tombol mata kini
  `<button>` yang bisa dipakai lewat keyboard

### Asisten per kelas

Asisten adalah mahasiswa yang ditugaskan laboran ke kelas tertentu (lihat
README backend). Di web:

- Laboran mengelola asisten dari ikon pensil di kotak "Asisten Praktikum" pada
  detail kelas (`components/praktikum/add-collaborators-button.tsx`): cari
  mahasiswa berdasarkan nama/NIM (`GET /user/mahasiswa`), tombol Tambah per
  mahasiswa, dan Hapus dengan konfirmasi. Penolakan dari backend (sedang
  mengikuti praktikum yang sama, jadwal bentrok) tampil di dialog.
- Asisten login dengan NIM + password yang sama dengan aplikasi mobile. Menu
  yang tampil hanya Dashboard dan Praktikum; Praktikum berisi kelas yang ia
  pegang, dan kartu dashboard menghitung kelas itu. Di detail kelas ia bisa
  menambah pertemuan, membuka/menutup presensi, menampilkan QR, mengubah
  presensi, dan melihat rekap; backend menolak aksi di kelas lain.
- Menambah/menghapus asisten memicu event `class`, jadi daftar kelas asisten
  ikut berubah tanpa refresh.

### Dosen

Dosen hanya memantau mata kuliah yang ia ampu dan tidak mengubah data apa pun.
Pembatasan datanya ada di backend (lihat "Akses dosen" di README backend), jadi
membuka URL kelas dosen lain pun ditolak.

- Menu: Dashboard, Praktikum, dan Profil. Master Data dan Pengumuman tidak
  tampil.
- **Dashboard**: empat kartu dari `GET /dashboard/dosen`, yaitu Jumlah Kelas,
  Jumlah Mahasiswa, Jumlah Pertemuan, dan Rata-rata Kehadiran (misal "63%" dengan
  keterangan "5 dari 8 kesempatan hadir"; "-" dan "Belum ada data presensi" bila
  belum ada pertemuan). Kartu ikut berubah saat ada event `class`, `subject`,
  `meeting`, atau `attendance`. Dashboard dosen tidak memanggil `/activation`.
  `useDashboardStore` memilih data laboran atau dosen setelah peran diketahui
  dari `GET /auth/me`.
- **Praktikum**: daftar per semester yang sama dengan laboran, tetapi hanya
  berisi mata kuliah yang ia ampu dan tanpa tombol Tambah Praktikum. Dosen yang
  belum mengampu mata kuliah apa pun melihat pesan "Anda belum tercatat sebagai
  dosen pengampu mata kuliah praktikum mana pun."
- **Detail kelas**: info kelas, asisten, pilihan pertemuan beserta tabel
  presensinya, Rekap All, dan rekap per pertemuan. Tombol Tambah Pertemuan,
  Buka/Tutup Presensi, QR, ubah presensi, dan kelola asisten disembunyikan
  (`canManage` di `class-meetings-content.tsx`). Rekap presensi dan Unduh PDF
  tetap tersedia.
- Kelas dosen lain yang dibuka lewat URL menampilkan pesan backend "Kelas ini
  bukan mata kuliah yang Anda ampu." `getClassById` di `useClassStore` kini
  mengosongkan data kelas sebelumnya dan menyimpan pesan error, sehingga tidak
  ada data kelas lama yang tertinggal di layar.

### Tambah Praktikum dan Jam Sesi

Halaman Tambah Praktikum ditulis ulang karena sebelumnya laboran tidak pernah
mendapat pesan apa pun (dialog sukses/gagal tidak pernah dibuka dan error
server diabaikan), form bisa dikirim kosong, pratinjau kelas tidak ikut
bertambah, dan jam sesi tertulis tetap di kode.

- Isian diperiksa di browser dulu (nama satu huruf A–Z, kuota 1–99, hari,
  ruang, sesi), lalu hasil server tampil sebagai pesan hijau atau merah di
  bawah form (`components/feedback-box.tsx`, dipakai juga halaman Profil).
  Kolom Kelas otomatis menjadi satu huruf besar dan kolom Kuota hanya menerima
  angka.
- Pilihan **Sesi Kelas** diambil dari `GET /session`, terkunci sampai hari
  dipilih, dan menyesuaikan hari: Senin–Kamis memakai sesi Senin–Kamis, Jumat
  memakai sesi Jumat. Bila sesi hari itu belum ada, muncul "Jam sesi hari Jumat
  belum diatur. Atur di Master Data → Jam Sesi."
- Setelah berhasil, isian dikosongkan (mata kuliah tetap terpilih) dan kelas
  baru langsung muncul di pratinjau. Pratinjau dan pilihan sesi ikut berubah
  lewat event `class`, `subject`, dan `session`. Tombol "Hapus" diganti
  "Kosongkan" dan tidak lagi menutup form.
- Halaman **Master Data → Jam Sesi** menampilkan dua kartu (Senin–Kamis dan
  Jumat). Tiap sesi punya tombol Ubah (nomor dan jam; bila sesi dipakai kelas
  muncul keterangan "Jam n kelas di sesi ini ikut berubah."), Nonaktifkan/
  Aktifkan, dan Hapus dengan konfirmasi (hanya sesi yang belum dipakai kelas).
  Di bawahnya ada form Tambah Sesi.
- Jumlah kelas di tiap sesi ("2 kelas") bisa diklik untuk membuka daftar
  kelasnya di bawah baris itu, misalnya "Algoritma dan Pemrograman — Kelas D ·
  Rabu · PSI", diurutkan per hari lalu ruang. Nama kelas membuka halaman
  detail kelas, jadi kelas yang masih memakai sebuah sesi bisa langsung
  dipindah lewat Ubah Kelas sebelum sesinya dihapus. Daftar ikut berubah tanpa
  refresh saat kelas ditambah, diubah, atau dihapus, dan tertutup sendiri bila
  sesinya tidak lagi punya kelas. Datanya dari `GET /class` (`sessionId` tiap
  kelas).
- Selain laboran, kedua halaman hanya menampilkan pesan bahwa halaman itu untuk
  laboran.
- Isian kelas (Kelas, Kuota, Hari, Ruangan, Sesi Kelas), pemeriksaannya, dan
  aturan sesi per hari ada di `components/praktikum/class-form-fields.tsx`,
  dipakai bersama oleh Tambah Praktikum dan dialog Ubah Kelas.

### Ubah dan Hapus Kelas

Di halaman detail kelas, laboran melihat tombol **Ubah Kelas** dan **Hapus
Kelas** di samping judul. Judul kini juga menyebut nama kelas ("Semester 3 ·
Kelas C"), dan kotak detail menampilkan ruangan.

- **Ubah Kelas** membuka dialog berisi form yang sama dengan Tambah Praktikum,
  sudah terisi data kelas sekarang. Mata kuliah tidak bisa diganti. Tombol
  Simpan baru aktif setelah ada yang diubah, jadi tidak ada permintaan tanpa
  perubahan. Kuota di bawah jumlah peserta ditolak di browser ("Kuota minimal
  n, sesuai jumlah peserta sekarang." tampil sebagai petunjuk). Penolakan
  server (nama sudah dipakai, ruang bentrok, jadwal asisten atau peserta
  bentrok) tampil merah di dialog tanpa menutupnya. Bila hari atau sesi kelas
  yang sudah punya pertemuan diganti, muncul catatan bahwa jadwal baru berlaku
  untuk pertemuan berikutnya dan presensi lama tetap tersimpan. Sesi kelas yang
  sudah dinonaktifkan tetap muncul di pilihan untuk kelas itu sendiri.
- Setelah berhasil, dialog tertutup, pesan hijau tampil di bawah judul, dan
  isi halaman ikut berubah. Laboran atau dosen lain yang membuka kelas yang
  sama melihat perubahan tanpa refresh.
- **Hapus Kelas** membuka konfirmasi yang menyebut dampaknya dulu: jumlah
  peserta yang kembali ke status lunas tanpa kelas, asisten yang dilepas, dan
  pertemuan kosong yang ikut terhapus, ditambah "Penghapusan tidak bisa
  dibatalkan." Kelas yang sudah punya presensi hanya menampilkan alasan tidak
  bisa dihapus dan tombol Tutup.
- Setelah dihapus, laboran dipindah ke halaman Praktikum dengan pesan hijau
  "Kelas ... berhasil dihapus" (pesan ini hanya muncul sekali). Orang lain
  yang sedang membuka kelas itu melihat "Kelas ini sudah dihapus." dan tautan
  kembali ke Praktikum.
- Detail kelas juga memuat ulang data kelas saat ada event `meeting` atau
  `attendance`, supaya jumlah pertemuan dan presensi di dialog Hapus Kelas
  selalu terbaru.

### Ubah Mata Kuliah

Halaman Tambah Mata Kuliah dan dialog Ubah Mata Kuliah memakai form yang sama
(`components/master-data/subject-form-fields.tsx`): kode, semester, nama, dan
dosen pengampu, dengan pemeriksaan yang sama di browser dan di server.
Halaman Tambah Mata Kuliah ditulis ulang karena dulu dialog sukses/gagalnya
tidak pernah dibuka dan error server diabaikan. Sekarang pesan hijau atau merah
tampil di bawah form, form dikosongkan setelah berhasil (termasuk pilihan
semester dan dosen), ada tombol Kosongkan, dan selain laboran hanya melihat
pesan bahwa halaman itu untuk laboran.

Di halaman Praktikum, setiap mata kuliah punya tombol **Ubah** (hanya
laboran) yang membuka dialog berisi kode, semester, nama, dan dosen pengampu,
sudah terisi data sekarang.

- Tombol Simpan baru aktif setelah ada yang diubah. Kode atau nama kosong
  ditolak di browser; penolakan server (kode atau nama sudah dipakai mata
  kuliah lain) tampil merah di dialog tanpa menutupnya.
- Bila dosen pengampu diganti, dialog menjelaskan bahwa dosen baru langsung
  bisa melihat semua kelas, pertemuan, dan presensi mata kuliah ini termasuk
  yang sudah berjalan, sedangkan dosen lama tidak lagi.
- Setelah berhasil, dialog tertutup dan pesan hijau tampil di dalam kartu mata
  kuliah itu. Urutan kartu tetap, karena `GET /subject` kini diurutkan menurut
  waktu dibuat. Bila semesternya diubah, kartu pindah ke kelompok semester
  barunya dan kelompok itu otomatis terbuka supaya pesan hijaunya terlihat.
- Dosen baru yang membuka halaman Praktikum melihat mata kuliah itu muncul
  tanpa refresh. Dosen lama yang sedang membuka salah satu kelasnya langsung
  melihat "Kelas ini bukan mata kuliah yang Anda ampu.": `refreshClassById`
  kini mengosongkan halaman bila server membalas 403 atau 404, sedangkan
  gangguan jaringan tetap diabaikan. Untuk itu `satellite` menyertakan kode
  status HTTP (`code`) pada error yang ditolaknya.
- Isi kartu yang dibuka kini menampilkan "Dosen pengampu: ... · Kode ..." dari
  `GET /subject` (semester sudah menjadi judul kelompoknya). Sebelumnya nama dosen tidak pernah tampil
  karena `subject-disclosure-details.tsx` memanggil endpoint `/subjects/:id`
  yang tidak ada; komponen itu sudah dihapus. Kelas di dalam kartu kini
  dicocokkan dengan id mata kuliah, bukan namanya, jadi tetap tampil setelah
  mata kuliah diganti nama.

### Praktikum per Semester

Halaman Praktikum laboran dan dosen mengelompokkan mata kuliah per semester
(`components/praktikum/subjects-list.tsx`), dihitung di browser dari
`GET /subject` tanpa perubahan backend.

- Hanya semester yang berisi mata kuliah yang tampil, urut dari yang terkecil,
  dengan jumlah mata kuliahnya ("Semester 4 · 2 mata kuliah"). Semester tanpa
  mata kuliah tidak tampil, karena praktikum biasanya tidak ada di semua
  semester. Form mata kuliah tetap menerima semester 1–8.
- Semua semester tertutup saat halaman dibuka. Bila hanya ada satu semester
  yang berisi (misalnya dosen dengan satu mata kuliah), semester itu langsung
  terbuka, termasuk saat mata kuliah pertamanya baru muncul lewat event
  `subject`. Semester yang sedang terbuka tidak ikut tertutup saat ada mata
  kuliah baru di semester lain.
- Di dalam semester, urutan mata kuliah tetap menurut waktu dibuat, dan kartu
  mata kuliah bekerja seperti sebelumnya: klik nama untuk melihat dosen, kode,
  dan kelasnya.

### Tambah, Ubah, dan Hapus Pertemuan

- Dialog Tambah Pertemuan langsung terisi judul berikutnya: nomor terbesar
  dari judul berpola "Pertemuan <angka>" ditambah satu ("Pertemuan 1" bila
  belum ada), dan masih bisa diubah. Judul lain seperti "UTS" diabaikan saat
  menghitung nomor. Input dibatasi 50 karakter.
- Judul kosong ditolak di browser. Judul yang sudah ada di kelas itu ditolak
  server (huruf besar-kecil dan spasi tidak dibedakan), dan pesannya
  ("Pertemuan 1 sudah ada di kelas ini!") tampil merah di dialog tanpa
  menutupnya. Pesan sukses kini menyebut judulnya ("Pertemuan 3 berhasil
  ditambahkan"). Server menjadikan huruf pertama judul kapital ("pertemuan 3"
  tersimpan sebagai "Pertemuan 3").
- Dropdown Pilih Pertemuan tidak lagi dibalik: urutannya naik mengikuti
  `GET /meeting/:classId`, yang kini diurutkan menurut judul dengan angka
  dibaca sebagai angka (Pertemuan 9 sebelum Pertemuan 10). Kolom Rekap
  Presensi dan PDF-nya mengikuti urutan yang sama.
- Setelah sebuah pertemuan dipilih, laboran dan asisten melihat tombol
  **Ubah** dan **Hapus** di sebelah dropdown
  (`components/praktikum/edit-meeting-button.tsx` dan
  `delete-meeting-button.tsx`). Dosen tidak melihat keduanya.
- Ubah membuka dialog berisi judul sekarang. Simpan baru aktif bila judulnya
  berbeda setelah dirapikan dan huruf pertamanya dikapitalkan, jadi
  "pertemuan 2" untuk "Pertemuan 2" tetap dianggap sama. Judul kosong
  ditolak di browser, judul kembar ditolak server dan pesannya tampil di
  dialog. Setelah berhasil, pesan hijau "Pertemuan 2 berhasil diubah menjadi
  Responsi" tampil di bawah tombol.
- Hapus membuka konfirmasi. Bila sesi presensinya sedang dibuka atau sudah
  ada presensi (dihitung dari `submitted_at` di data pertemuan), dialog
  menjelaskan alasannya dan hanya ada tombol Tutup; penolakan dari server
  tetap tampil bila data di browser belum terbaru. Setelah dihapus, pilihan
  kembali ke "Pilih Pertemuan" dengan pesan hijau "Responsi berhasil
  dihapus".
- Dropdown kini mengikuti pilihan dari `class-meetings-content.tsx`.
  Pertemuan yang dipilih dicari ulang di data terbaru, jadi bila laboran lain
  menghapusnya, halaman ikut kembali ke "Pilih Pertemuan", dan judul yang
  diubah dari tempat lain langsung tampil, keduanya lewat event `meeting`.

## Pekerjaan yang masih tersisa

- [ ] Pembayaran: untuk aktivasi yang belum punya kelas, "Simpan Perubahan"
      tanpa mengubah apa pun tetap mengirim permintaan dan menampilkan
      "Status pembayaran diubah ...". Pemeriksaan "Tidak ada perubahan" baru
      berlaku untuk aktivasi yang sudah punya kelas
- [ ] Dependensi `html2canvas` tidak dipakai lagi dan bisa dihapus
- [ ] Pindahkan tujuh file terakhir dari `app/actions/` ke `app/services/`,
      lalu hapus folder `actions/` dan `app/types/`
- [ ] Cookie `accessToken` diset tanpa `httpOnly`, `secure`, `sameSite`
      (sengaja terbaca JavaScript, lihat Autentikasi). `refreshToken` sudah
      `httpOnly` tetapi belum `secure` karena lab masih memakai HTTP
- [ ] `next.config.js` masih menunjuk hostname Supabase lama bila project ref
      berubah

## Akun uji

| NIM / NIY | Password | Role |
|---|---|---|
| 60010002 | laboran002 | LABORAN (nama tampilan kini "akun test") |
| 60010001 | laboran001 | LABORAN |
| 60020001 | dosen001 | DOSEN (mengampu keempat mata kuliah) |
| 2000016099 | mahasiswa001 | MAHASISWA |
| 2000016100 | mahasiswa002 | MAHASISWA (peserta Alpro D) |
| 2000016104 | mahasiswa004 | MAHASISWA (peserta Alpro C dan Data Mining A) |
| 2000016105 | mahasiswa005 | MAHASISWA (asisten Alpro C) |

Pola password: nama awal akun dalam huruf kecil.
