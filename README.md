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
- react-hook-form + Zod, react-qr-code, jsPDF

## Menjalankan

```bash
npm install
npm run dev -- -p 3001      # backend memakai port 3000
npm run lint                # periksa kode dengan ESLint
npm test                    # tes di browser, lihat Pengujian otomatis
```

ESLint memakai aturan standar Next.js (`next/core-web-vitals` di
`.eslintrc.json`). `next build` juga menjalankan lint, jadi build gagal bila
ada temuan berstatus error. Aturan TypeScript yang lebih ketat
(`next/typescript`) belum dipakai karena menandai 37 `catch (error: any)` di
store sebagai error.

### Environment

File `.env.local` di root (tidak di-commit; salin dari `.env.example`):

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

`NEXT_PUBLIC_BASE_URL` adalah alamat backend, dipakai semua permintaan ke
server: axios (`app/services/`), refresh token (`app/utils/cookie.ts`), dan
aliran realtime. `BASE_URL` dulu dipakai server actions lama dan sekarang tidak
diperlukan lagi, jadi boleh dihapus dari `.env.local`.

## Struktur

```
app/
├── services/      ← layer API (axios "satellite") — INI yang dipakai
├── store/         ← Zustand, jembatan services ↔ komponen
├── interfaces/    ← kontrak request/response
├── components/
├── dashboard/     ← halaman
```

Nama field di `interfaces/`, dan di seluruh kode, memakai camelCase yang sama
persis dengan yang dikirim dan diterima backend, misalnya `subjectName`,
`isActive`, dan `alsoDays`. Sampai 25 Oktober 2026 sebagian field masih
snake_case (`subject_name`, `is_active`) karena mengikuti backend lama.

### Kode generasi lama sudah dibersihkan

Dulu ada dua generasi kode. Generasi lama (`app/actions/`) menembak backend di
IP kampus (`10.4.52.201:3001`) yang sudah mati, dan sudah digantikan
`app/services/`. Sisa-sisanya sudah dihapus:

- Folder `app/actions/`. Dua komponen terakhir yang masih mengimpornya
  (`lecturer-listbox.tsx`, `subject-dropdown-menu.tsx`) ternyata tidak pernah
  memanggil fungsinya, jadi tidak ada yang perlu dipindah.
- Folder `app/types/`. Lima type yang masih dipakai pindah ke `app/interfaces/`:
  `SubjectBySemester` (subject), `Lecturer` (user), `day` (class),
  `AnnouncementType` (announcement), dan `UserDetails` (auth, kemudian ikut
  dihapus bersama bar atas lama).
- Tujuh komponen yang tidak dipakai halaman mana pun (`appbar-component`,
  `class-room-dropdown` di luar folder praktikum, `classes-dropdown-menu`,
  `date-picker`, `semester-dropdown-menu`, `subject-container`, `time-field`),
  `app/helpers/helpers.ts`, dan `app/lib/sessions.ts` yang kosong.
- Bar atas lama `app/appbar.tsx` ("You logged in as a ..."). Bar ini tidak
  pernah tampil karena cookie `fullname`/`nim`/`email`/`role` yang dibacanya
  tidak pernah diisi. Ikut dihapus: `getUserData()`, `setUserRole()`, dan type
  `UserDetails`, jadi root layout tidak membaca cookie lagi.
- Halaman awal `/` (gambar sambutan + tombol Login). Gambar yang sama sudah ada
  di `/auth`, dan `middleware.ts` kini langsung mengalihkan `/` ke `/dashboard`
  bila ada cookie sesi, atau ke `/auth`.
- Dependensi `html2canvas`, `cookie`, `jose`, `jwt-decode`, dan
  `@types/jsonwebtoken`. `html2canvas` tetap terpasang sebagai bagian opsional
  jsPDF, tetapi rekap PDF tidak memakainya.

`app/store/global.state.ts` memang tidak diimpor di mana pun, tetapi tetap
dibutuhkan karena mendeklarasikan type global `GlobalState` untuk semua store.

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

Tombol Log In menampilkan titik-titik loading sejak dikirim sampai Dashboard
terbuka. Halaman memakai state `isSubmitting` miliknya sendiri, bukan
`isLoading` store, karena `isLoading` sudah selesai sebelum navigasi ke
Dashboard rampung dan tombol sempat terlihat seperti belum ditekan.

Access token berlaku 15 menit dan diperbarui sendiri (`app/utils/cookie.ts`):

- Cookie `accessToken` hilang saat tokennya kedaluwarsa. `getToken()` lalu
  memanggil `refreshAccessToken()`, yang menukar refresh token di
  `POST /auth/refresh` dan menyimpan cookie baru.
- Bila jam browser tertinggal dari jam server, backend bisa membalas
  `jwt expired` walau cookie masih ada. Interceptor lalu memperbarui token
  dan mengulang permintaan itu sekali.
- Backend menolak refresh token setelah 1 hari, setelah password akun itu
  diganti (lihat "Lupa password" di README backend), atau setelah akunnya
  dihapus. `refreshAccessToken()` lalu menghapus semua cookie sesi. Saat
  halaman dimuat, `GET /auth/me` ditolak 400/401, `useAuthStore.me()`
  menghapus cookie dan menandai `sessionEnded`, lalu `SignOutButton`
  mengalihkan ke `/auth?sesi=berakhir`; di halaman yang
  sedang terbuka, `refreshOnce()` (`app/services/satellite/index.ts`)
  mengalihkan ke `/auth?sesi=berakhir` bila cookie `refreshToken` memang sudah
  tidak ada (`hasRefreshToken()`), jadi gangguan jaringan sesaat tidak
  mengeluarkan pengguna. Karena backend memutus stream SSE akun yang
  password-nya diganti, halaman dashboard yang terbuka kembali ke `/auth`
  sekitar 2 detik kemudian.
- Dengan `?sesi=berakhir`, halaman login menampilkan kotak kuning "Sesi Anda
  berakhir, silakan masuk kembali.", sama dengan aplikasi mobile. Sign Out
  biasa dan `/auth` yang dibuka langsung tidak memakai parameter ini, jadi
  pesannya tidak muncul. Bila cookie sudah kedaluwarsa sebelum halaman dibuka
  (misalnya keesokan harinya), `middleware.ts` mengalihkan ke `/auth` tanpa
  pesan karena tidak bisa membedakannya dari pengguna yang belum masuk.

Lupa password tidak punya alur di web. Halaman `/auth` hanya menulis "Lupa
password? Hubungi laboran.", karena akun laboran dan dosen diganti password-nya
oleh laboran lewat `PUT /user/:nimAtauId/password` (lihat README backend).
Mahasiswa, termasuk asisten, memakai Lupa password di aplikasi mobile.

## Halaman

| Route | Isi |
|---|---|
| `/` | Tidak punya isi: langsung ke `/dashboard` bila sudah masuk, atau ke `/auth` |
| `/auth` | Login NIM/NIY + password (mahasiswa memakai NIM, dosen dan laboran NIY 8 angka). Kotak "Sesi Anda berakhir" hanya bila baru dikeluarkan, lihat Autentikasi |
| `/dashboard` | Kartu statistik, lihat "Dashboard". LABORAN: mata kuliah, kelas periode aktif, dan pembayaran. Asisten: mata kuliah dan kelas yang ia pegang. DOSEN: kelas, mahasiswa, pertemuan, dan rata-rata kehadiran mata kuliah yang ia ampu |
| `/dashboard/praktikum` | LABORAN: semua mata kuliah dikelompokkan per semester dengan tombol Ubah (di dalamnya ada Hapus Mata Kuliah), lihat "Praktikum per Semester", "Ubah Mata Kuliah", dan "Hapus Mata Kuliah". DOSEN: kelompok semester yang sama, hanya mata kuliah yang ia ampu. Asisten (MAHASISWA): kartu kelas yang ia pegang |
| `/dashboard/praktikum/[classId]` | Detail kelas (hari, jam, ruangan, dosen, asisten, kuota) + panel pertemuan & presensi; pertemuan langsung terpilih, lihat "Memilih pertemuan". LABORAN: tombol Ubah Kelas dan Hapus Kelas, lihat "Ubah dan Hapus Kelas". LABORAN dan asisten: tambah, ubah judul, dan hapus pertemuan, lihat "Tambah, Ubah, dan Hapus Pertemuan". DOSEN hanya melihat |
| `.../tambah-praktikum` | Buat kelas baru (hanya LABORAN), lihat "Tambah Praktikum dan Jam Sesi" |
| `.../recap-attendances` | Rekap presensi per kelas (`?classId=`) atau per pertemuan (`&meetingId=`) + unduh PDF |
| `/dashboard/master-data/add-subject` | Tambah mata kuliah (hanya LABORAN), lihat "Ubah Mata Kuliah" |
| `/dashboard/master-data/jam-sesi` | Jam sesi per ruangan dan per hari: tambah dan ubah jam (bisa sekaligus untuk hari lain), nonaktifkan, hapus, dan daftar kelas di tiap sesi (hanya LABORAN) |
| `/dashboard/master-data/pembayaran` | Satu baris per mahasiswa (urut NIM, cari nama atau NIM) + pop-up status bayar tiap mata kuliah; konfirmasi bayar + pilih/pindah kelas dari pop-up, dan hapus pendaftaran yang belum bayar. Ada pilihan periode; periode lama hanya bisa dilihat. Lihat "Pembayaran" |
| `/dashboard/master-data/periode` | Periode akademik: periode aktif, Mulai Semester Baru, dan daftar periode (hanya LABORAN), lihat "Periode Akademik" |
| `/dashboard/pengumuman/add-pengumuman` | Buat pengumuman untuk semua mahasiswa atau untuk mahasiswa mata kuliah tertentu (hanya LABORAN), lihat "Pengumuman untuk Mata Kuliah Tertentu" |
| `.../list-pengumuman`, `.../[id]` | Daftar & detail pengumuman, masing-masing dengan keterangan "Untuk: ..." |
| `/dashboard/profil` | LABORAN/DOSEN: data akun, ubah nama, ganti password. Asisten: data akun saja + arahan memakai aplikasi mobile |

### Dashboard

- Kartu laboran: Jumlah Praktikum (`GET /subject`), Jumlah Kelas di periode
  aktif (`GET /class`), dan dua kartu Jumlah Mahasiswa (sudah dan belum
  bayar). Kartu bayar menghitung **pendaftaran mata kuliah**
  (`GET /activation`), bukan orang: mahasiswa yang mendaftar dua mata kuliah
  terhitung dua kali, sama dengan kartu di Pembayaran. Daftar pendaftaran
  diminta sekali, lalu lunas dan belum dihitung di browser, jadi jumlah
  keduanya selalu sama dengan total.
- Kartu asisten: Jumlah Praktikum adalah mata kuliah dari kelas yang ia pegang
  (`subjectId` unik dari `GET /class`), bukan semua mata kuliah. Asisten tidak
  meminta `GET /subject` dan `GET /activation`.
- Angka kartu selalu satu baris. Ukuran hurufnya mengikuti lebar kartu
  (`[container-type:inline-size]` dengan satuan `cqi`), dan "/ total" lebih
  kecil. Kartu laboran dan dosen tampil 4 kolom mulai lebar 1280 px, dan 2 × 2
  di bawahnya. Sambutan memakai huruf lebih kecil di bawah 1280 px dan
  tingginya mengikuti isi, jadi tidak menimpa "Periode aktif".
- Pop-up Sign Out mengikuti pop-up konfirmasi lain: Batal abu-abu, Keluar
  merah di kanan.

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
  baru (min. 8, tanpa spasi, harus berbeda), dan konfirmasi. Isian diperiksa
  dulu di browser; password baru berspasi di mana pun dibalas "Password baru
  tidak boleh mengandung spasi." tanpa mengirim apa pun, dan server juga
  menolaknya (aturan sejak 1 Oktober 2026, lihat README backend). Server membalas token baru yang langsung disimpan ke cookie, jadi
  browser ini tetap masuk, sedangkan browser/HP lain dengan akun yang sama
  kembali ke `/auth` sekitar 1,5 detik kemudian.
- `GET /auth/me` membalas `name`, bukan `fullname`; `IMeResponseBody` sudah
  disesuaikan.

## Logika status presensi

Ditentukan dari dua field yang dikirim backend:

- `submittedAt === null` → **Belum Presensi**
- `submittedAt` terisi dan `isAttended === true` → **Hadir**
- `submittedAt` terisi dan `isAttended === false` → **Tidak Hadir**

Jangan kembali ke pola lama `isAttended !== null` — backend selalu mengirim
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

Error saat **memuat data halaman** selalu ditampilkan dengan `FeedbackBox`,
misalnya "Tidak dapat terhubung ke server, coba lagi!" atau "Server sedang
sibuk, silakan coba lagi sebentar lagi." dari backend:

- Store yang `error`-nya hanya dipakai pemuatan (mata kuliah, dosen, jam sesi,
  dashboard) menampilkan `error`. Store yang `error`-nya juga dibaca dialog
  atau tombol aksi (kelas, pembayaran, pengumuman) punya `loadError` terpisah,
  supaya error aksi tidak ikut muncul di atas halaman.
- Selama gagal, keterangan kosong seperti "Belum ada pengumuman" atau "Belum
  ada mahasiswa yang mendaftar praktikum di periode ini." tidak ditampilkan, dan kartu jumlah di Pembayaran menampilkan "–"
  alih-alih 0, supaya laboran tidak mengira datanya hilang.
- Refresh yang dipicu event real-time, termasuk `ready` saat stream SSE
  tersambung kembali setelah server hidup, menghapus pesan itu bila berhasil.
- Sebelumnya `getAllSubjects`, `getAllClass`, dan `getDosen` menelan error
  (hanya `console.log`), dan 9 dari 12 halaman diam saja saat server mati.

Bila `GET /auth/me` gagal karena server, bukan karena sesi,
`AccountLoadNotice` (`app/components/account-load-notice.tsx`, dipasang di
layout dashboard) menampilkan "Data akun gagal dimuat. …" dengan tombol
**Coba lagi**, dan memuat ulang sendiri saat SSE tersambung kembali. Dulu
`SignOutButton` mengalihkan ke `/auth` pada error apa pun, lalu `middleware.ts`
memantulkannya kembali ke `/dashboard` karena cookie masih ada; akibatnya saat
server mati atau sibuk semua halaman terlempar ke Dashboard tanpa pesan.

## Yang sudah dikerjakan

- Lima import rusak diperbaiki; `button-group.tsx` dan `actions/auth/actions.ts`
  dihapus; `next.config.mjs` dihapus
- Tombol Buka/Tutup Presensi tersambung ke `PUT /meeting/:id/status`
- Edit presensi manual dan "Kembalikan ke Belum Presensi" berfungsi
- Halaman Pembayaran: pilih kelas saat konfirmasi lunas (boleh dikosongkan), dan pindah kelas
- Halaman Pembayaran dikelompokkan per mahasiswa (`app/utils/payment.ts`):
  tabel berisi satu baris per mahasiswa dengan ringkasan ("Lunas semua",
  "2 dari 3 lunas", "Belum Bayar"). Klik baris membuka pop-up
  `components/master-data/student-payment-dialog.tsx` berisi kelas dan status
  tiap mata kuliah; tombol Ubah membuka form ubah status/kelas di pop-up yang
  sama. Filter "Belum Bayar" = masih ada mata kuliah belum lunas, "Sudah
  Bayar" = semua lunas. Filter dan pencarian dihitung di browser (lihat
  "Pembayaran"). Kartu angka tetap menghitung per aktivasi
- Form ubah pembayaran menolak "Simpan Perubahan" tanpa perubahan dengan pesan
  "Tidak ada perubahan yang perlu disimpan.", baik aktivasi yang sudah punya
  kelas maupun yang belum, jadi tidak ada permintaan yang dikirim ke server
- Konfirmasi bayar tidak lagi mewajibkan memilih kelas (dulu ditolak dengan
  "Geser tombol ke Sudah Bayar dan pilih kelas praktikum terlebih dahulu!").
  Untuk aktivasi yang belum punya kelas, form menampilkan petunjuk "Kosongkan
  bila mahasiswa memilih kelas sendiri di aplikasi." dan pilihan kelas diawali
  "Kosongkan (mahasiswa memilih sendiri)" untuk membatalkan kelas yang sudah
  terpilih. Tanpa kelas, server membalas "Pembayaran dikonfirmasi. Mahasiswa
  memilih kelas sendiri di aplikasi." lalu mahasiswa memilih kelasnya di HP.
  Mata kuliah yang belum punya kelas sama sekali kini juga bisa dikonfirmasi.
  Aturan wajib pilih kelas itu dulu membuat fitur Pilih Kelas di aplikasi
  hampir tidak pernah tercapai. Penolakan server (kuota penuh, jadwal bentrok,
  sudah punya kelas lain) tampil merah di form seperti sebelumnya
- Menggeser status ke Belum Bayar untuk mahasiswa yang sudah punya kelas
  memunculkan peringatan merah "Mahasiswa akan dikeluarkan dari kelas A bila
  belum punya presensi.". Server lalu mengeluarkannya dari kelas, atau menolak
  dengan jumlah presensinya bila sudah ada presensi. Memilih atau mengganti
  kelas sambil Belum Bayar ditolak di browser ("Geser tombol ke Sudah Bayar
  untuk memilih kelas.") tanpa mengirim permintaan
- Hapus pendaftaran (30 September 2026): mata kuliah berstatus Belum Bayar di
  pop-up mahasiswa punya tombol **Hapus** di sebelah Ubah. Baris pop-up memakai
  grid berlebar tetap (status 120 px, tombol 148 px), jadi tombol tidak
  menimpa kotak status dan Ubah sejajar di semua baris. Tombol itu membuka
  konfirmasi "Hapus pendaftaran X?" (Batal / Ya, hapus) yang menyebut bahwa
  mahasiswa bisa mendaftar lagi dari aplikasi. Setelah berhasil, pesan
  "Pendaftaran X milik Y dihapus." tampil di pop-up. Bila itu pendaftaran
  terakhir mahasiswa tersebut, pop-up tertutup, pesannya pindah ke atas
  halaman, dan mahasiswa itu hilang dari daftar.
  Penolakan server, misalnya pendaftaran lama yang masih punya kelas, tampil
  merah di konfirmasi. Mata kuliah yang sudah lunas harus digeser ke Belum
  Bayar dulu. Aturannya di README backend, bagian "Batal pendaftaran mata
  kuliah"
- Kartu dashboard: fungsi store yang tertukar diperbaiki. Sejak 1 Oktober 2026
  sudah dan belum bayar dihitung dari satu `GET /activation`, lihat
  "Dashboard"
- Pengumuman: validasi judul/deskripsi, Lihat Detail, Edit, dan Hapus
- Buat Pengumuman (30 September 2026):
  - Pilihan **Jenis Pengumuman** kini selalu menampilkan nama jenis yang
    tersimpan di form. Sebelumnya tombol menampilkan kode (`PRACTICUM`), dan
    setelah Hapus atau Simpan tetap menampilkan jenis lama padahal form sudah
    kembali ke "Pengumuman". Akibatnya, pengumuman berikutnya terkirim sebagai
    pengumuman biasa, sehingga di HP tidak membuka pendaftaran praktikum.
  - Selain laboran, yang membuka alamatnya langsung melihat "Hanya laboran
    yang dapat membuat pengumuman." (menu Pengumuman memang hanya ada untuk
    laboran).
  - Kotak form kini setinggi isinya, tidak lagi setinggi layar.
- Deskripsi pengumuman kini maksimal **1000 karakter** (dulu 200), sama
  dengan server, di Buat Pengumuman maupun dialog Edit. Kartu di List
  Pengumuman hanya menampilkan 3 baris pertama diakhiri "…" dan tingginya
  mengikuti isi. Isi lengkap ada di Lihat Detail. Baris baru yang diketik
  laboran kini tetap tampil sebagai paragraf terpisah di daftar dan detail
  (dulu semua teks menyatu).
- List dan Detail Pengumuman (30 September 2026):
  - Setiap pengumuman menampilkan label jenisnya (Pendaftaran Praktikum
    berwarna biru), jadi laboran bisa memastikan pengumuman mana yang membuka
    pendaftaran di HP. Nama jenis dan format tanggal ada di
    `app/utils/announcement.ts`, dipakai bersama form Buat, dialog Edit,
    kartu, dan Detail.
  - Tanggal ditulis "30 September 2026 pukul 06.07" dalam jam lokal. Detail
    dulu menampilkan teks mentah UTC (`2026-09-29T23:07:08.387Z`), sehingga
    pengumuman yang dibuat sebelum pukul 07.00 WIB tampak sehari lebih awal.
  - Detail kini juga menampilkan jenis dan penulis ("Dibuat oleh").
  - Edit dan Hapus di menu ⋮ hanya untuk laboran; peran lain yang membuka
    alamatnya langsung hanya melihat Lihat Detail.
  - Simpan Perubahan tanpa perubahan dijawab "Tidak ada perubahan yang perlu
    disimpan." tanpa mengirim apa pun. Dulu tetap dikirim dan semua HP
    menerima kabar "pengumuman diubah".
  - Saat memuat, List dan Detail menampilkan "Loading...". Dulu List sempat
    kosong dan Detail menampilkan label tanpa isi, atau sesaat menampilkan
    pengumuman yang dibuka sebelumnya.
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
  respons lama tidak menimpa yang baru. Sejak 25 Oktober 2026, pemanggil yang
  datang saat pemuatan sedang berjalan ikut menunggu sampai pemuatan terbaru
  selesai. Akibatnya pesan berhasil setelah menyimpan jam sesi atau
  menambah/menghapus asisten baru muncul setelah daftarnya ikut berubah. Dulu
  pemanggil itu langsung dianggap selesai: dengan jaringan lambat, pesan "Sesi
  14 Senin PSI berhasil diperbarui" tampil sekitar 1,5 detik sementara barisnya
  masih menulis nomor lama. Stream memakai `fetch` (bukan
  `EventSource`) agar token tetap dikirim di header
- Fitur modul praktikum tidak dikerjakan. Kotak Modul "Click to Open" di
  detail kelas dan halaman Segera Hadir yang ditujunya sudah dihapus
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
  angka. Mengetik huruf lain di kolom Kelas langsung mengganti huruf lama,
  tanpa perlu menghapusnya dulu (juga di Ubah Kelas).
- Pilihan **Sesi Kelas** diambil dari `GET /session`, terkunci sampai hari dan
  ruangan dipilih ("Pilih hari dulu", lalu "Pilih ruangan dulu"), dan hanya
  berisi sesi hari dan ruangan itu. Mengganti hari atau ruangan mengosongkan
  sesi yang sudah dipilih bila sesi itu bukan milik hari dan ruangan yang
  baru. Bila sesinya belum ada, muncul "Jam sesi hari Jumat di ruang SBTI
  belum diatur. Atur di Master Data → Jam Sesi."
- Setelah berhasil, isian dikosongkan (mata kuliah tetap terpilih) dan kelas
  baru langsung muncul di pratinjau. Pratinjau dan pilihan sesi ikut berubah
  lewat event `class`, `subject`, dan `session`. Tombol "Hapus" diganti
  "Kosongkan" dan tidak lagi menutup form.
- Perbaikan 21 Oktober 2026:
  - Halaman berjudul **Tambah Praktikum** dengan tombol Kembali ke Praktikum,
    lalu keterangan periode tempat kelas baru masuk.
  - Pilihan **Mata Kuliah** urut abjad, tiap mata kuliah menulis semesternya,
    dan tulisan awalnya "Pilih mata kuliah". Selama daftar dimuat tombolnya
    menulis "Loading..." dan belum bisa dibuka. Nama panjang dipotong "…",
    nama lengkap muncul saat disorot. Daftar ikut berubah tanpa refresh lewat
    event `subject` (mata kuliah baru, ganti nama, dihapus). Bila belum ada
    mata kuliah sama sekali muncul "Belum ada mata kuliah. Tambah dulu di
    Master Data → Tambah Mata Kuliah." beserta tautannya. Daftar pilihannya
    tanpa jarak di atas dan bawah, jadi sorotan biru opsi pertama dan
    terakhir menempel sampai tepi daftar, sama seperti pilihan Jenis
    Pengumuman.
  - Mata Kuliah, Hari, Ruangan, dan Sesi Kelas bisa dipilih dengan keyboard:
    panah bawah atau Spasi membuka pilihan, panah atas/bawah berpindah, Enter
    memilih. Dulu Mata Kuliah, Hari, dan Ruangan hanya bisa diklik (Enter
    menutup pilihan tanpa memilih apa pun).
  - Pratinjau diberi judul **Kelas yang sudah ada (n)** dan memakai kartu yang
    sama dengan halaman Praktikum (`components/praktikum/class-card.tsx`):
    urut A, B, C, tanda Penuh, ruangan, dan nama mata kuliah paling banyak 2
    baris. Kartu kecil lama (`small-class-card.tsx`) dihapus. Link kartu kini
    alamat lengkap `/dashboard/praktikum/<id>`, jadi benar dari halaman mana
    pun. "Belum ada kelas untuk mata kuliah ini." hanya tampil bila daftar
    kelas berhasil dimuat; bila gagal, cukup pesan error di atas.
  - Kolom Kelas dan Kuota lebarnya tetap, dan isian yang tidak muat turun ke
    baris berikutnya. Di layar 1024 px Sesi Kelas berada di baris kedua, mulai
    1280 px semua isian satu baris. Dulu di 1024 px Kelas dan Kuota terjepit
    sampai hurufnya terpotong dan Sesi Kelas keluar dari kotak, juga di dialog
    Ubah Kelas.
  - Selama menyimpan (sekitar 3 detik), semua isian, tombol Kosongkan, dan
    pilihan mata kuliah dikunci (`<fieldset disabled>`). Dulu ketikan untuk
    kelas berikutnya hilang begitu penyimpanan selesai. Dialog Ubah Kelas juga
    mengunci isiannya selama menyimpan.
  - Dua laboran atau dua tab yang menyimpan kelas bersamaan tidak lagi bisa
    membuat nama kelas kembar atau memakai ruang yang sama, karena server
    memproses tambah dan ubah kelas satu per satu per periode (lihat README
    backend).
- Halaman **Master Data → Jam Sesi** punya pilihan **Ruangan** (PSI, SBTI) dan
  **Hari** (Senin–Jumat), lalu menampilkan satu kartu, misalnya "Senin · PSI".
  Tiap sesi punya tombol Ubah (nomor dan jam; bila sesi dipakai kelas muncul
  keterangan "Jam n kelas di sesi ini ikut berubah."), Nonaktifkan/Aktifkan,
  dan Hapus dengan konfirmasi (hanya sesi yang belum dipakai kelas). Di
  bawahnya ada form Tambah Sesi.
- Jumlah kelas di tiap sesi ("2 kelas") bisa diklik untuk membuka daftar
  kelasnya di bawah baris itu, misalnya "Algoritma dan Pemrograman — Kelas D ·
  Rabu · PSI", diurutkan per hari lalu ruang. Nama kelas membuka halaman
  detail kelas, jadi kelas yang masih memakai sebuah sesi bisa langsung
  dipindah lewat Ubah Kelas sebelum sesinya dihapus. Daftar ikut berubah tanpa
  refresh saat kelas ditambah, diubah, atau dihapus, dan tertutup sendiri bila
  sesinya tidak lagi punya kelas. Datanya dari `GET /class` (`sessionId` tiap
  kelas).
- Perbaikan halaman Jam Sesi, 23 Oktober 2026:
  - **Tata letak.** Baris sesi memakai grid berlebar tetap: Sesi 90 px, jam
    130 px (selalu satu baris), status 96 px, jumlah kelas, dan kolom tombol
    320 px di layar 1280 px ke atas.
    - Tombol Ubah, Nonaktifkan/Aktifkan, dan Hapus berlebar tetap (64, 110,
      72 px), dan sesi tanpa tombol Hapus diberi ruang kosong selebar Hapus,
      jadi tombol Ubah sejajar di semua baris.
    - Di bawah 1280 px tombol pindah ke baris kedua, tepat di bawah jam.
    - Dulu di layar 1024 px baris lebih lebar dari kartunya: tombol terpotong
      di luar kartu, jam turun 3 baris, dan halaman bisa digeser ke samping.
  - **Letak pesan.** Pesan ubah, nonaktifkan, dan hapus yang gagal tampil
    tepat di bawah baris sesinya, begitu juga pesan berhasil mengubah. Pesan
    berhasil menghapus tampil di bawah judul kartu karena barisnya sudah
    hilang, dan pesan Tambah Sesi tetap di bawah form tambah.
    - Satu kartu hanya menampilkan satu pesan, dan pesan lama hilang saat ada
      aksi baru.
    - Dulu semua pesan tampil di bagian bawah kartu. Saat mengubah sesi paling
      atas di layar setinggi 768 px, pesannya berada di luar layar.
  - **Memuat dan gagal.** Saat memuat, kartunya menulis "Loading..."
    (begitu juga daftar kelas per sesi). Saat `GET /session` gagal,
    keterangan "Belum ada sesi..." tidak ditampilkan. `refreshSessions` kini
    menghapus pesan gagal begitu data berhasil dimuat lagi, misalnya lewat
    event `ready` atau `session`; dulu pesan itu tertinggal.
  - **Format jam.** Kotak jam menerima "7.00", "07:00", "0700", "730", dan
    "7". Titik dua langsung diganti titik, dan isinya dirapikan menjadi
    "07.00"/"07.30" saat kotak ditinggalkan atau saat form dikirim (termasuk
    Enter langsung dari kotak jam). Dulu ketiganya ditolak dan titik dua
    dibuang diam-diam.
  - **Kunci saat menyimpan.** Isian dan tombol Batal di form Ubah, isian
    Tambah Sesi, serta tombol Batal di konfirmasi hapus terkunci selama
    menyimpan.
  - Sesi yang semua kelasnya sudah dihapus kini benar-benar bisa dihapus, dan
    pesan ubah jam hanya menghitung kelas yang masih ada. Penyimpanan
    bersamaan diantrekan di server. Keduanya dijelaskan di "Tambah kelas dan
    jam sesi" di README backend.
- Jam sesi per ruangan dan per hari, 25 Oktober 2026. Jam tiap ruangan bisa
  berbeda (misalnya Sesi 1 PSI 07.00–08.55 dan Sesi 1 SBTI 07.35–09.20),
  begitu juga jam tiap hari, jadi pembagian "Senin–Kamis" dan "Jumat" diganti
  (lihat "Jam sesi per ruangan dan per hari" di README backend).
  - **Pilihan ruangan dan hari.** Tombol Ruangan dan Hari (`aria-pressed`)
    memilih kartu yang tampil; awalnya PSI dan Senin. Berganti pilihan
    membuka kartu baru, jadi isian Tambah Sesi dan pesan kartu sebelumnya
    hilang. Nama sesi di tombol dan pesan kini lengkap, misalnya "Sesi 1
    Senin PSI".
  - **Tambahkan juga ke.** Di bawah form Tambah Sesi ada centang untuk empat
    hari lainnya. Hari yang dicentang mendapat sesi bernomor dan berjam sama
    di ruangan itu, misalnya "Sesi 7 PSI hari Senin dan Rabu berhasil
    ditambahkan". Semuanya tersimpan bersama atau tidak sama sekali, dan
    centangnya kosong lagi setelah berhasil.
  - **Ubah juga di hari lain.** Form Ubah menampilkan hari lain di ruangan
    yang sama yang punya nomor sesi itu, beserta jamnya sekarang (dan
    "nonaktif" bila sesinya nonaktif). Hari yang dicentang mendapat nomor dan
    jam yang sama, dan keterangan jumlah kelas ikut menghitung kelas di hari
    itu. Awalnya tidak ada yang dicentang.
  - **Peringatan bentrok.** Bila jam baru membuat peserta atau asisten kelas
    di sesi itu bentrok dengan kelas lain (termasuk kelas di ruangan lain),
    jam tetap disimpan, tetapi pesan di bawah barisnya berwarna kuning dan
    berisi daftar bentroknya. `FeedbackBox` kini bisa menampilkan `warnings`.
  - Nonaktifkan dan Hapus tetap berlaku untuk satu hari saja.
- Selain laboran, kedua halaman hanya menampilkan pesan bahwa halaman itu untuk
  laboran.
- Isian kelas (Kelas, Kuota, Hari, Ruangan, Sesi Kelas), pemeriksaannya, dan
  aturan sesi per hari ada di `components/praktikum/class-form-fields.tsx`,
  dipakai bersama oleh Tambah Praktikum dan dialog Ubah Kelas.

### Kotak informasi kelas

Kotak Hari/Jam, Ruangan, Dosen, Asisten Praktikum, dan Kuota di detail kelas
(`components/praktikum/class-details-box.tsx`) dirapikan pada 30 September
2026:

- Kolom pendek (Hari/Jam, Ruangan, Kuota) tidak lagi terpecah. Dulu di layar
  1280 px "0 / 30" turun menjadi dua baris karena kolom paling kanan mendapat
  sisa ruang paling sedikit.
- Kolom Dosen dan Asisten Praktikum mengambil sisa ruang (asisten dua kali
  lebih lebar). Nama yang sangat panjang turun ke baris berikutnya, tetap di
  dalam kotak.
- Tinggi kotak mengikuti isi, jadi asisten ketiga dan seterusnya tidak lagi
  keluar dari kotak (dulu tingginya dikunci 150 px). Garis pemisah ikut
  memanjang.
- Ikon pensil "Kelola asisten" (khusus laboran) menempel di sebelah tulisan
  Asisten Praktikum, tidak lagi di ujung kanan kolom.
- Di bawah 1280 px (21 Oktober 2026) kotak menjadi dua baris: Hari/Jam,
  Ruangan, dan Kuota di atas, lalu Dosen dan Asisten Praktikum di bawah,
  tanpa garis pemisah. Dulu di layar 1024 px nama dosen dan asisten terpecah
  per huruf. Kotak juga diberi `shrink-0`, karena `min-h-[150px]`
  membuatnya boleh menyusut sampai 150 px di halaman yang pendek, sehingga
  nama asisten keluar dari kotak dan menimpa tombol di bawahnya.

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
- Kode mata kuliah harus tepat 9 angka ("Kode mata kuliah harus 9 angka.").
  Kolomnya hanya menerima angka: huruf, spasi, dan tanda baca langsung
  dibuang, lalu dipotong menjadi 9 angka. Karena pembuangan terjadi sebelum
  pemotongan, kode yang ditempel dengan spasi ("553 310 001") tetap utuh. Aturan yang sama diperiksa
  server, jadi mata kuliah lama yang kodenya belum 9 angka harus diganti
  kodenya dulu sebelum bisa disimpan.
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
- Kode mata kuliah tampil kecil berwarna abu-abu di sebelah nama pada setiap
  kartu, jadi terlihat tanpa membuka kartu. Isi kartu yang dibuka menampilkan
  "Dosen pengampu: ..." dari `GET /subject` (semester sudah menjadi judul
  kelompoknya).
- Judul rekap PDF memuat kode mata kuliah, misalnya "Praktikum Algoritma dan
  Pemrograman (553310001) · Kelas C · Semester 1", dari `subjectCode` di
  `GET /class/:id`. Sebelumnya nama dosen tidak pernah tampil
  karena `subject-disclosure-details.tsx` memanggil endpoint `/subjects/:id`
  yang tidak ada; komponen itu sudah dihapus. Kelas di dalam kartu kini
  dicocokkan dengan id mata kuliah, bukan namanya, jadi tetap tampil setelah
  mata kuliah diganti nama.

### Pengumuman untuk Mata Kuliah Tertentu

Halaman Buat Pengumuman dan dialog Edit punya pilihan **Untuk**
(`components/pengumuman/announcement-audience-field.tsx`):

- **Semua mahasiswa** (bawaan), atau **Mata kuliah tertentu**, yang
  memunculkan daftar centang semua mata kuliah (nama, kode, semester),
  diurutkan per semester. Kedua pilihan tersusun atas-bawah, hanya berupa titik
  dan teks tanpa garis luar; yang terpilih berteks biru. Titik pilihan dan
  kotak centangnya digambar sendiri mengikuti tema (biru `#3272CA`, garis
  `#BFD9EF`), sedangkan input aslinya tetap ada (`sr-only`), jadi keyboard dan
  pembaca layar tetap bisa memakainya. Daftar mata kuliah menjorok sejajar
  teks pilihan di atasnya. Simpan tanpa satu pun centang ditolak di browser:
  "Pilih minimal satu mata kuliah tujuan.".
- Untuk jenis Pendaftaran Praktikum, Pendaftaran Inhal, dan Pendaftaran Asisten
  Praktikum, pilihan ini diganti keterangan "Semua mahasiswa. Pengumuman
  pendaftaran selalu untuk semua mahasiswa.", dan `subjectIds` dikirim kosong
  walaupun sebelumnya sempat ada mata kuliah yang dicentang.
- Setelah Simpan atau Hapus, form kembali ke Semua mahasiswa.
- Dialog Edit terisi tujuan yang tersimpan. "Tidak ada perubahan yang perlu
  disimpan." kini juga memperhitungkan mata kuliah tujuan.
- Kartu di List Pengumuman dan halaman detail menampilkan "Untuk: Semua
  mahasiswa" atau "Untuk: Mahasiswa Algoritma dan Pemrograman (2026/2027
  Genap)". Nama semester ikut disebut karena pengumuman mata kuliah hanya
  berlaku di semester saat dibuat.

Siapa yang menerima pengumuman di aplikasi HP ditentukan server; lihat README
backend, bagian "Pengumuman untuk mata kuliah tertentu".

### Hapus Mata Kuliah

Dialog Ubah Mata Kuliah punya tombol **Hapus Mata Kuliah** di kiri bawah,
sedangkan Batal dan Simpan tetap di kanan. Hanya laboran yang melihatnya,
dan di periode lama tombol Ubah sendiri tersembunyi.

1. Tombol itu mengganti isi dialog dengan konfirmasi "Hapus mata kuliah X?".
   Konfirmasi ini menjelaskan bahwa hanya mata kuliah yang belum pernah punya
   kelas maupun pendaftaran, termasuk di semester lama, yang bisa dihapus.
   Batal kembali ke form ubah.
2. **Ya, hapus** mengirim `DELETE /subject/:id`. Berhasil: dialog tertutup,
   pesan hijau "Mata kuliah X berhasil dihapus" tampil di atas daftar, dan
   kartunya hilang. Halaman dosen, halaman laboran lain, dan daftar
   Pendaftaran Praktikum di HP ikut berubah lewat event `subject`.
3. Ditolak server, misalnya "X sudah punya 1 kelas, jadi tidak bisa
   dihapus.": pesan merah tampil di konfirmasi dan dialog tetap terbuka.

Web tidak memeriksa sendiri apakah mata kuliah sudah dipakai, karena
pendaftaran dan kelas semester lama tidak dimuat di halaman ini. Aturannya
ada di server; lihat README backend, bagian "Hapus mata kuliah".

### Praktikum per Semester

Halaman Praktikum laboran dan dosen mengelompokkan mata kuliah per semester
(`components/praktikum/subjects-list.tsx`), dihitung di browser dari
`GET /subject` tanpa perubahan backend.

- Hanya semester yang berisi mata kuliah yang tampil, urut dari yang terkecil,
  dengan jumlah mata kuliahnya ("Semester 4 · 2 mata kuliah"). Semester tanpa
  mata kuliah tidak tampil, karena praktikum biasanya tidak ada di semua
  semester. Form mata kuliah tetap menerima semester 1–8.
- Semua semester tertutup saat halaman pertama kali dibuka. Bila hanya ada
  satu semester yang berisi (misalnya dosen dengan satu mata kuliah), semester
  itu langsung terbuka, termasuk saat mata kuliah pertamanya baru muncul lewat
  event `subject`. Semester yang sedang terbuka tidak ikut tertutup saat ada
  mata kuliah baru di semester lain.
- Semester dan mata kuliah yang sedang terbuka diingat di `sessionStorage`
  (kunci `praktikum-terbuka`), jadi tetap terbuka setelah membuka detail kelas
  lalu kembali, atau setelah halaman dimuat ulang, selama tab browser itu
  belum ditutup. Kartu mata kuliah kini dibuka-tutup dengan tombol biasa
  (`aria-expanded`), bukan `Disclosure` Headless UI, agar keadaannya bisa
  disimpan.
- Di dalam semester, mata kuliah urut abjad (lalu kode), dan kelas di dalam
  mata kuliah urut nama (A, B, C). Kelas asisten diurutkan menurut mata kuliah
  lalu nama kelas. Semua diurutkan di browser, tanpa perubahan backend.
- Mata kuliah tanpa kelas di periode yang sedang dilihat menulis "Belum ada
  kelas di periode ini.". Selama daftar mata kuliah atau kelas masih dimuat,
  halaman menulis "Loading...". Bila `GET /class` gagal, pesan errornya tampil
  di atas daftar (sebelumnya hanya untuk asisten), dan tulisan "Belum ada
  kelas" tidak muncul karena isinya belum diketahui.
- Kartu kelas (`class-card.tsx`) menampilkan ruangan setelah jam ("Senin,
  07.00 - 08.40 · PSI"), tanda merah **Penuh** bila peserta sudah mencapai
  kuota, dan nama mata kuliah paling banyak 2 baris (sisanya "…", nama lengkap
  muncul saat disorot). Tinggi kartu minimal 175px dan bertambah bila perlu.
- Banner Tambah Praktikum tingginya mengikuti isi. Di bawah 1280px tulisannya
  lebih kecil dan gambarnya lebih sempit, jadi tombol Tambah Praktikum tidak
  gepeng di layar 1024px.

### Periode Akademik

Kelas dan pendaftaran mata kuliah (termasuk pembayaran) dikelompokkan per
periode, misalnya "2026/2027 Ganjil". Aturannya ada di README backend bagian
"Periode akademik"; web mengikuti balasan backend.

- **Master Data → Periode Akademik** (hanya LABORAN): periode aktif, tombol
  "Mulai Semester 2026/2027 Genap" (nama semester berikutnya dihitung
  otomatis), dan tabel semua periode dengan status Aktif/Selesai, jumlah
  kelas, jumlah pendaftaran, serta tombol Lihat yang membuka Praktikum dengan
  periode itu terpilih.
- **Mulai semester baru** membuka dialog yang menjelaskan akibatnya: semua
  data semester lama menjadi arsip, sesi presensi yang masih terbuka ditutup,
  jam sesi disalin ke semester baru, mahasiswa mendaftar ulang, dan tidak
  bisa dibatalkan dari aplikasi. Tombol
  baru bisa ditekan setelah laboran mengetik `MULAI` (huruf besar). Bila belum
  ada periode sama sekali, dialog meminta tahun ajaran dan Ganjil/Genap untuk
  periode pertama.
- **Dialog mengingat semester yang dituju saat dibuka (25 Oktober 2026).**
  Dialog mengirim `{ year, term }` semester itu, dan isinya tidak ikut
  berganti saat event `period` datang. Bila laboran lain atau tab lain sudah
  memulai semester itu, tombol Mulai Semester dibalas "Semester 2026/2027
  Genap sudah dimulai." di dalam dialog. Dulu judul dialog yang sudah terbuka
  berganti sendiri menjadi semester sesudahnya (misalnya "Mulai semester
  2027/2028 Ganjil?"), sementara tulisan MULAI masih terisi, jadi satu klik
  melompati semester. Server sendiri juga hanya menerima semester berikutnya;
  lihat README backend.
- Saat memuat, kotak periode aktif dan tabel menulis "Loading...", bukan "–"
  dan tabel kosong. Bila gagal, kotak tetap "–" dan pesan error tampil di
  atasnya.
- **Belum ada periode sama sekali** (database baru): Dashboard, Praktikum,
  Tambah Praktikum, Jam Sesi, dan Pembayaran menampilkan kotak kuning
  `NoPeriodNotice` (`app/components/period/no-period-notice.tsx`).
  - Untuk laboran: "Belum ada periode akademik. Mulai periode pertama dulu
    sebelum mengisi jam sesi, kelas, dan pendaftaran." dengan tombol "Buka
    Periode Akademik".
  - Untuk dosen, di Dashboard dan Praktikum: "Belum ada periode akademik.
    Data praktikum muncul setelah laboran memulai semester." tanpa tombol.
  - Kotak hilang sendiri lewat event `period` begitu periode pertama dimulai.
  - Kotak tidak tampil bila daftar periode gagal dimuat, karena belum
    diketahui apakah periodenya memang kosong.
- **Pilihan periode** ada di Praktikum, Pembayaran, dan dashboard dosen,
  hanya untuk LABORAN dan DOSEN. Asisten mahasiswa selalu melihat periode
  aktif. Pilihan disimpan di `usePeriodStore` selama tab terbuka dan kembali
  ke periode aktif setelah halaman dimuat ulang, supaya tidak ada yang lupa
  sedang melihat arsip.
- **Periode lama hanya bisa dilihat.** Halaman menampilkan keterangan
  "Periode … sudah selesai, data hanya bisa dilihat." dan menyembunyikan
  tombol yang mengubah data:
  - Praktikum: banner Tambah Praktikum dan tombol ubah mata kuliah; hanya
    mata kuliah yang punya kelas di periode itu yang ditampilkan.
  - Pembayaran: tombol Ubah dan Hapus di pop-up mahasiswa.
  - Detail kelas (dibaca dari `period.isActive` di `GET /class/:id`, jadi
    berlaku juga bila dibuka lewat tautan langsung): Ubah Kelas, Hapus Kelas,
    kelola asisten, tambah/ubah/hapus pertemuan, buka sesi, QR, dan ubah
    presensi. Rekap dan unduh PDF tetap bisa.
- **Dashboard laboran** menampilkan nama periode aktif; angkanya selalu untuk
  periode aktif. **Tambah Praktikum** menampilkan "Kelas baru masuk periode …".
- Saat semester baru dimulai dari mana pun, event real-time `period` membuat
  semua halaman yang sedang terbuka memuat ulang data dan daftar periodenya.
  Halaman yang sedang menampilkan periode aktif otomatis berpindah ke periode
  baru.
- Halaman Jam Sesi dan Tambah Praktikum selalu memakai kelas periode aktif,
  karena `getAllClass()` di `useClassStore` tanpa `periodId` berarti periode
  aktif.
- **Jam sesi per semester** (sejak 30 September 2026). Semester baru mendapat
  salinan jam sesi semester sebelumnya, dan halaman Jam Sesi hanya
  menampilkan jam sesi semester aktif, jadi jumlah kelasnya mulai dari 0.
  Mengubah jam sesi semester baru tidak mengubah semester lama, dan bila
  semester baru dihapus lewat `npm run hapus-periode`, jam sesi semester
  sebelumnya tampil lagi. Dialog Mulai Semester dan keterangan di halaman
  Periode Akademik serta Jam Sesi menyebut hal ini. Halaman Jam Sesi yang
  sedang terbuka kini ikut memuat ulang saat event `period` datang. Dulu
  halaman itu masih menghitung kelas semester lalu ("2 kelas") dan daftar
  kelasnya tertahan di "Memuat daftar kelas...".

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
  ada presensi (dihitung dari `submittedAt` di data pertemuan), dialog
  menjelaskan alasannya dan hanya ada tombol Tutup; penolakan dari server
  tetap tampil bila data di browser belum terbaru. Setelah dihapus, halaman
  memilih pertemuan lain menurut aturan di "Memilih pertemuan", dengan pesan
  hijau "Responsi berhasil dihapus".
- Dropdown kini mengikuti pilihan dari `class-meetings-content.tsx`.
  Pertemuan yang dipilih dicari ulang di data terbaru, jadi bila laboran lain
  menghapusnya, halaman ikut berpindah ke pertemuan lain, dan judul yang
  diubah dari tempat lain langsung tampil, keduanya lewat event `meeting`.
- Dialog Tambah Pertemuan berupa form (21 Oktober 2026): Enter menyimpan,
  ada tombol Batal, dan dialog tidak bisa ditutup selama menyimpan.
  `POST /meeting` membalas `data.id`, jadi pertemuan baru langsung terpilih
  dan bisa langsung dibuka presensinya.

### Memilih pertemuan

Bagian pertemuan di detail kelas (`components/praktikum/class-meetings-content.tsx`)
diperbaiki pada 21 Oktober 2026:

- Pertemuan langsung terpilih saat halaman dibuka, tanpa tulisan "Pilih
  Pertemuan untuk Melihat Daftar Presensi!". Urutannya: pilihan terakhir di
  tab ini, lalu pertemuan yang presensinya sedang dibuka, lalu pertemuan
  terakhir di daftar. Pilihan disimpan di `sessionStorage` dengan kunci
  `pertemuan-terpilih:<classId>`, jadi tetap sama setelah membuka Rekap lalu
  kembali, selama tab itu belum ditutup.
- Daftar pilihan pertemuan memberi tanda hijau **Dibuka** pada pertemuan yang
  sesi presensinya sedang dibuka.
- Kelas tanpa pertemuan menulis "Belum ada pertemuan. Klik Tambah Pertemuan
  untuk memulai." (dosen: "Belum ada pertemuan."). Pertemuan di kelas tanpa
  mahasiswa menulis "Belum ada mahasiswa di kelas ini." tanpa judul tabel.
  Selama kelas atau pertemuan dimuat, halaman menulis "Loading...".
- Gagal memuat `GET /meeting/:classId` disimpan di `loadError` milik
  `useMeetingStore` (terpisah dari `error` untuk aksi seperti Buka Presensi),
  lalu tampil merah di atas daftar. Halaman Rekap Presensi membaca
  `loadError` yang sama. `getMeetings` mengosongkan daftar saat berganti
  kelas dan mengabaikan balasan untuk kelas lain, jadi pertemuan kelas
  sebelumnya tidak sempat terpilih.
- Pop-up kode QR punya tombol **Layar Penuh** (Fullscreen API pada panel
  dialog; QR membesar sampai 70% sisi layar yang lebih pendek) dan
  **Tutup**. Pop-up Ubah Status Presensi punya tombol **Batal**, tingginya
  mengikuti isi, dan tidak bisa ditutup selama menyimpan.
- Di bawah 1280 px tombol pertemuan turun ke baris berikutnya alih-alih
  terlipat, tulisan tabel presensi lebih kecil, dan kolom NIM lebih lebar
  (3/12) agar tidak menimpa nama. Judul kelas memakai 26 px di bawah
  1280 px.

### Tampilan dropdown

Sejak 22 Oktober 2026 semua dropdown memakai sorotan yang sama dengan pilihan
Jenis Pengumuman di Buat Pengumuman:

- Opsi yang disorot mouse atau dipilih dengan panah keyboard berlatar biru
  `#3272CA` dengan tulisan putih (`data-[focus]:`), selebar daftar dan
  menempel sampai tepi atas dan bawah daftar. Daftar pilihan tidak diberi
  jarak dalam (padding) dan opsinya tidak berbentuk kapsul, jadi sorotan opsi
  pertama dan terakhir tidak menyisakan garis putih.
- Berlaku untuk: Jenis Pengumuman (Buat Pengumuman dan pop-up Edit), Dosen
  Pengampu, Semester, Mata Kuliah, Hari, Ruangan, Sesi Kelas, Periode, Pilih
  Pertemuan, Pilih Kelas di pop-up Pembayaran, dan menu titik tiga di kartu
  pengumuman (Lihat Detail, Edit, Hapus).
- Di menu titik tiga, ikon ikut menjadi putih saat disorot (filter
  `brightness-0 invert`), dan **Hapus** berlatar merah `#F1416C`, sama
  dengan tombol hapus lain. Ikon versi hover lama (`*-hovered.png`) sudah
  tidak dipakai dan dihapus.
- Pilihan yang menempel di tombol (prop `anchor`) sudah dipotong sudutnya oleh
  Headless UI (`overflow: auto`). Daftar yang tidak menempel (Jenis Pengumuman
  di pop-up Edit, Pilih Kelas) memakai `overflow-hidden` agar sorotan
  mengikuti sudut melengkung.
- **Pilih Pertemuan** kini memakai `value`/`onChange` Listbox: panah keyboard
  menyorot pertemuan dan Enter memilihnya. Dulu sorotannya hanya `hover:`
  dan Enter tidak memilih apa pun.
- Menu sidebar saat diciutkan tidak termasuk, karena isinya tautan navigasi
  dengan gaya tombol sidebar.

### Rekap Presensi

Halaman Rekap Presensi (`dashboard/praktikum/recap-attendances/`) diperbaiki
pada 22 Oktober 2026:

```
┌──────────────────────────────────────────────────────┐
│ No  NIM         Nama            │ P6  P7  P8 │ Hadir │ ← judul kolom tetap di atas
│ 1   2999970003  Mahasiswa Uji 3 │ A   H   H  │ 4/15  │
│ 4   2999970006  Muhammad Fadhil │ -   A   H  │ 5/15  │
│                 Ramadhan Saputra│            │       │
│                 Jumlah hadir    │ 4/8 4/8 4/8│       │ ← tetap di bawah
│ ═══════════════▬▬▬▬▬▬▬═══════════════════════════    │ ← scrollbar tipis
│ Keterangan: H = Hadir, A = Tidak Hadir, - = Belum …  │
└──────────────────────────────────────────────────────┘
```

- Tabel berperilaku seperti lembar kerja: judul kolom tetap di atas saat
  daftar digulir, baris **Jumlah hadir** tetap di bawah, kolom **Hadir** tetap
  di kanan, dan kolom **No**, **NIM**, serta **Nama** tetap di kiri di semua
  lebar layar, jadi yang bergeser ke samping hanya kolom pertemuan. Kolom yang
  diam memakan 444 dari 544 px lebar tabel di layar 1024 px dengan sidebar
  terbuka, sehingga sekitar 2 kolom pertemuan terlihat sekaligus. Dengan
  sidebar diciutkan terlihat 6 kolom, di layar 1280 px 7 kolom, dan di
  1366 px 10 kolom.
- Caranya: sel `position: sticky` di dalam satu area gulir (`overflow-auto`),
  tabel `border-separate border-spacing-0`, dan garis baris di sel
  (`border-t`) karena garis pada `<tr>` tidak tampil di mode itu. Lebar No
  48 px dan NIM 120 px dijaga div `min-w-[32px]` dan `min-w-[104px]` di
  dalam selnya. Tanpa itu, tabel yang lebih lebar dari kotaknya menyempitkan
  kolom sampai lebar isinya (di bawah `width`), sehingga posisi `left` kolom
  berikutnya meleset dan kolom NIM serta Nama menutupi sebagian kolom P1.
- Scrollbar samping abu-abu `#A1A5B7` setebal 6 px hanya ada di bawah kolom
  pertemuan, dan hanya tampil saat tabel digeser ke samping. Satu detik
  setelah geseran terakhir, scrollbar hilang lagi. Perilakunya meniru
  scrollbar macOS, tetapi berlaku sama di semua sistem operasi (class
  `scrollbar-pertemuan` di `globals.css`). Ini satu-satunya scrollbar yang
  tampil; bagian lain tetap disembunyikan. Dulu kolom pertemuan terakhir dan
  kolom Hadir terpotong di kanan tanpa tanda apa pun.
  - Jalurnya dipendekkan dengan `margin-left` dan `margin-right` pada
    `::-webkit-scrollbar-track`, dari variabel `--kolom-kiri` (tepi kanan
    kolom Nama) dan `--kolom-kanan` (lebar kolom Hadir). Keduanya diukur
    `ResizeObserver` di ref `setupScroller` (`recap-attendances-content.tsx`).
  - Ref yang sama memasang atribut `data-bergeser` pada area gulir setiap kali
    `scrollLeft` berubah dan mencabutnya 1 detik setelah geseran terakhir.
    Hanya `[data-bergeser]::-webkit-scrollbar-thumb` yang diberi warna, jadi
    menggulir ke bawah saja tidak memunculkan scrollbar. Scrollbar tegak tidak
    ditampilkan (lebarnya 0).
  - Jalur 6 px di bawah tabel tetap memakan tempat walau kosong, karena
    scrollbar yang digaya lewat `::-webkit-scrollbar` tidak bisa menumpang di
    atas isi seperti scrollbar bawaan macOS.
  - Class itu mengembalikan `scrollbar-width` dan `scrollbar-color` ke `auto`.
    Chrome mengabaikan gaya `::-webkit-scrollbar` bila salah satunya diisi,
    padahal `globals.css` mengisi `scrollbar-width: none` dan gaya dasar
    DaisyUI mengisi `scrollbar-color` untuk semua elemen. Tanpa itu yang
    tampil scrollbar bawaan selebar tabel.
  - Firefox tidak mengenal `::-webkit-scrollbar`, jadi di sana scrollbar tipis
    selebar tabel, berwarna transparan sampai tabel digeser
    (`@supports not selector(::-webkit-scrollbar)`).
  - Klik di jalur kosong di bawah kolom No–Nama atau Hadir tetap menggeser
    tabel satu halaman, karena bagian itu masih milik scrollbar bawaan.
- Kolom Nama minimal 200 px, jadi nama panjang paling banyak sekitar 3 baris.
  Dulu kolom ini menyempit sampai 112 px dan nama terpecah satu kata per baris.
- Baris Jumlah hadir menghitung mahasiswa yang hadir di tiap pertemuan
  (`attendedCount` pada setiap kolom hasil `buildRecap`). Keterangan H/A/-
  berada di luar area gulir, jadi selalu terlihat.
- Di bawah judul tampil "Periode 2026/2027 Ganjil · Dosen pengampu: ...",
  dari `period.name` dan `lecturer` di `GET /class/:id`.
- Tombol Kembali dan Unduh PDF tidak ikut menyempit
  (`shrink-0 whitespace-nowrap`); nama mata kuliah panjang yang turun baris.
- Kelas yang dihapus saat halaman terbuka (event `class` dengan
  `action: "deleted"`) menampilkan "Kelas ini sudah dihapus." dan tautan
  Kembali ke Praktikum, sama seperti detail kelas. Bila data kelas gagal
  dimuat, pesan errornya tampil tanpa tabel dan Kembali menuju daftar
  Praktikum. Data kelas dimuat ulang saat koneksi real-time tersambung lagi
  atau ada event `class` untuk kelas itu.
- PDF (`recap-pdf.ts`):
  - Nama panjang turun baris dan baris tabelnya meninggi, tidak lagi dipotong
    "...". Kolom Nama selebar nama terpanjang bila kertas masih cukup
    (minimal 90 mm).
  - Subjudul serta baris periode dan dosen turun baris bila tidak muat.
  - Judul kolom pertemuan pindah baris per kata. Huruf mengecil sampai 5,5 pt
    bila satu kata tidak muat, dan kata baru dipotong bila tetap tidak muat
    (kata 11 huruf ke atas di kolom ±11 mm). Rekap satu pertemuan memberi
    kolom pertemuannya lebar sesuai judul (paling lebar 60 mm).
  - Baris Jumlah hadir di akhir tabel.
  - jsPDF memakai warna isi yang sama untuk teks dan kotak berlatar, jadi
    `setFillColor` dipanggil ulang sebelum setiap kotak berlatar.
- Detail Kelas: ikon PDF untuk rekap per pertemuan punya keterangan "Rekap
  Pertemuan 2" saat disorot (`title` dan `aria-label`). Daftar mahasiswanya
  kini urut NIM karena `GET /meeting/:classId` mengurutkan peserta menurut
  NIM; dulu menurut urutan masuk kelas.

### Tambah Mata Kuliah

Halaman Tambah Mata Kuliah (`dashboard/master-data/add-subject`) diperbaiki
pada 22 Oktober 2026:

- Judul "Tambah Mata Kuliah", sama seperti Jam Sesi, Periode Akademik, dan
  Tambah Praktikum.
- Di bawah form ada daftar **Mata kuliah yang sudah ada (n)**
  (`components/master-data/existing-subjects.tsx`) dari `GET /subject`:
  dikelompokkan per semester (naik), di dalamnya urut abjad, berisi nama,
  kode, dan dosen pengampu. Daftar ini hanya untuk dilihat; ubah dan hapus
  tetap lewat Ubah Mata Kuliah di halaman Praktikum. Mata kuliah baru
  langsung muncul setelah Simpan (`addSubject` memuat ulang daftar), dan
  daftar ikut berubah lewat event `subject` atau saat koneksi real-time
  tersambung lagi. Selama memuat tertulis "Loading...", dan bila gagal
  "Daftar mata kuliah gagal dimuat. ...".
- Daftar itu dilipat per semester supaya halaman tidak memanjang saat mata
  kuliahnya banyak. Awalnya semua semester tertutup dan hanya menampilkan
  judul serta jumlahnya ("Semester 3" dan "5 mata kuliah"). Klik judul untuk
  membuka atau menutup, seperti di halaman Praktikum.
  - Semester yang dipilih di form terbuka sendiri. Bila pilihan diganti,
    semester tadi ditutup lagi.
  - Semester yang dibuka atau ditutup sendiri oleh laboran tidak diubah.
  - Setelah Simpan, semester mata kuliah baru tetap terbuka walaupun form
    sudah kosong.
  - Kosongkan mengembalikan daftar seperti saat halaman baru dibuka, jadi
    semua semester tertutup lagi. Halaman menaikkan `key` milik
    `ExistingSubjects`, sehingga keadaan buka-tutupnya mulai dari awal.
  - Bila hanya ada satu semester, semester itu langsung terbuka.
  - Mata kuliah yang ditambah laboran lain tidak membuka semester apa pun.
  - Keadaan buka-tutup tidak disimpan; membuka halaman lagi mulai dari semua
    tertutup.
- Isian dan tombol Kosongkan terkunci selama menyimpan
  (`<fieldset disabled>`), begitu juga isian di pop-up Ubah Mata Kuliah.
  Dulu ketikan selama menyimpan hilang begitu form dikosongkan.
- Pilihan Dosen Pengampu menampilkan nama panjang dalam satu baris rata kiri
  dengan "...", dan nama lengkapnya muncul saat disorot (`title`). Dulu nama
  panjang turun 2 baris rata tengah di layar 1024 px.
- Daftar pilihan memakai `anchor={{ to: "bottom", gap, padding: 16 }}` sebagai
  pengganti `mt-*`. Headless UI membatasi tinggi daftar ke ruang yang tersisa,
  tetapi tidak menghitung margin, sehingga daftar 22 dosen di layar 768 px
  keluar 8 px dari bawah layar dan dosen terakhir terpotong. Sekarang daftar
  berhenti 16 px dari tepi layar. Hal yang sama diterapkan ke Semester, Pilih
  Pertemuan (dulu keluar 4 px di layar 1024 dan 1440 px, dan menutupi 4 px
  tombolnya saat membuka ke atas di 1366 px), dan pilihan Periode.
- Opsi Semester dan Dosen Pengampu tidak lagi berisi `<button>` di dalam
  `ListboxOption`. Gayanya sama dengan pilihan di Tambah Praktikum: rata kiri,
  tebal, dan tingginya mengikuti isi.
- Tulisan bawaan pilihan kini "Pilih semester" dan "Pilih dosen pengampu",
  serta "Pilih hari" dan "Pilih ruangan" di Tambah Praktikum dan Ubah Kelas.
  Dulu sama persis dengan judul kolomnya, jadi tidak kelihatan sudah dipilih
  atau belum.
- Server kini mengantrekan tambah dan ubah mata kuliah (lihat "Tambah dan ubah
  mata kuliah" di README backend). Dulu dua laboran yang menyimpan kode atau
  nama yang sama pada saat bersamaan menghasilkan mata kuliah kembar. Klik
  ganda dan Enter dua kali di satu browser sudah aman sejak sebelumnya, karena
  tombol Simpan langsung nonaktif.

### Pembayaran

Halaman Pembayaran (`dashboard/master-data/pembayaran`) diperbaiki pada
23 Oktober 2026.

**Pencarian dan pilihan**
- Pencarian dihitung di browser dari data periode yang sudah dimuat
  (`matchesStudent` di `app/utils/payment.ts`). Kata yang diketik cocok dengan
  sebagian nama atau NIM, tanpa membedakan huruf besar dan spasi berlebih.
  `GET /activation` tidak lagi dikirim dengan `?name=` setiap kali mengetik.
  Cara lama punya tiga masalah:
  - NIM tidak bisa dicari, karena server hanya mencocokkan nama.
  - Jawaban server yang terlambat untuk kata sebelumnya bisa menimpa hasil
    kata yang baru.
  - Angka di kartu ikut menghitung hasil pencarian, jadi mencari satu nama
    membuat kartu menjadi 1 dan 0.
- Kata pencarian dan pilihan Show All/Sudah Bayar/Belum Bayar disimpan di
  halaman, bukan di store. Setiap kali halaman dibuka, kotak cari kosong dan
  pilihannya Show All.
  - Dulu kata pencarian tertinggal di store sementara kotak cari kosong.
    Setelah pindah halaman lewat sidebar, daftar tetap tersaring tanpa
    terlihat.
  - Tombol pilihan punya `aria-pressed`.
- Daftar diurutkan menurut NIM, dan mata kuliah di pop-up menurut semester
  lalu abjad (`groupActivationsByStudent`). Dulu keduanya diurutkan menurut
  waktu mendaftar, yang terbaru di atas.

**Tampilan**
- Baris dipisah garis tipis, sekitar 53 px per mahasiswa. Dulu 88 px karena
  ada jarak 36 px antarbaris.
- Kartu jumlah lebih pendek (148 px, dulu 200 px), dan tombol pilihan berada
  di samping kotak cari. Di layar 1366 × 768 lima baris pertama langsung
  terlihat. Dulu baris pertama berada di tepi bawah layar.
- Baris judul kolom `sticky`, jadi tetap terlihat saat daftar digulir.
- Kolom memakai grid berlebar tetap: Mata Kuliah 104 px, Status 144 px, dan
  tombol 72 px. Judul kolom pun sejajar dengan isinya.
- Di bawah 1280 px (`xl`), NIM ditulis di bawah nama supaya kolom nama tetap
  lebar. Dulu di layar 1024 px judul "Status Pembayaran" turun 2 baris dan
  nama panjang turun 5 baris.

**Keterangan**
- Saat memuat tertulis "Loading..." seperti di halaman lain (dulu "Memuat
  data...").
- Keterangan kosong kini dibedakan:
  - "Belum ada mahasiswa yang mendaftar praktikum di periode ini."
  - "Tidak ada mahasiswa yang cocok dengan "…"." Bila pilihan Sudah
    Bayar/Belum Bayar aktif, ditambah "di pilihan …".
  - "Semua mahasiswa sudah bayar." bila pilihan Belum Bayar kosong.
  - "Belum ada mahasiswa yang lunas." bila pilihan Sudah Bayar kosong.

**Pop-up Ubah Data Aktivasi**
- Tombol geser, pilihan kelas, dan Kembali dikunci selama menyimpan
  (`<fieldset disabled>`). Dulu ketiganya masih bisa dipakai, tetapi
  perubahannya tidak ikut tersimpan.
- Tombol geser bernama "Status pembayaran" untuk pembaca layar.
- Ikon hiasan (kaca pembesar, panah Kembali, panah pilihan kelas) memakai
  `alt=""`.

### Tanda HP tidak biasa

Backend mencatat HP yang dipakai scan, dan presensi dari HP yang bukan HP
biasa mahasiswa itu bertanda `deviceCheck: "TIDAK_BIASA"` di
`GET /meeting/:classId` (lihat "Satu HP satu akun per pertemuan" di README
backend). Web memakainya untuk membantu asisten mencegah titip akun:

```
┌──────────────────────────────────────────────────────────────┐
│ ⚠ 2 mahasiswa presensi dari HP yang tidak biasa.             │
│   Panggil namanya, lalu pilih Ada atau Tidak ada.            │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ 2000016104 · Budi                     [Ada] [Tidak ada]  │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

- Kotak kuning di atas daftar presensi pertemuan yang dipilih
  (`components/praktikum/device-check-box.tsx`) berisi mahasiswa bertanda
  `TIDAK_BIASA`, dan barisnya di daftar diberi ikon peringatan kuning
  (`public/warning-yellow.png`, di mockup di atas ditulis ⚠). Kotak tidak
  tampil bila tidak ada yang perlu dicek.
- **Ada**: mahasiswa tetap hadir, dan HP itu menjadi HP biasanya yang baru.
  **Tidak ada**: presensinya diubah menjadi Tidak Hadir. Keduanya memanggil
  `PUT /meeting/:id/attendances/:userId/device`, lalu pesan dari server
  tampil hijau di bawah tombol atas dan tanda ⚠ hilang.
- Tombol hanya untuk laboran dan asisten di periode aktif. Dosen dan periode
  arsip melihat kotak yang sama dengan tulisan "Menunggu dicek asisten."
- Bila staf lain sudah menjawab lebih dulu, pesan merah "Presensi ini sudah
  dicek." tampil dan daftar dimuat ulang. Halaman lain yang sedang terbuka
  ikut berubah lewat event `attendance`.

## Pekerjaan yang masih tersisa

- [ ] Cookie `accessToken` diset tanpa `httpOnly`, `secure`, `sameSite`
      (sengaja terbaca JavaScript, lihat Autentikasi). `refreshToken` sudah
      `httpOnly` tetapi belum `secure` karena lab masih memakai HTTP
- [ ] `next.config.js` masih menunjuk hostname Supabase lama bila project ref
      berubah
- [ ] `npm audit` masih melaporkan 2 celah di postcss bawaan Next.js 15.5.
      postcss itu hanya dipakai saat build untuk CSS milik sendiri, dan baru
      diganti di Next.js 16. Pindah ke Next.js 16 juga perlu mengganti
      `next lint` dengan ESLint CLI

## Pengujian otomatis

Tes di folder `tests/` membuka dashboard di Google Chrome tanpa layar
(headless), login, lalu mengklik dan mengetik seperti laboran sungguhan.
Chrome dikendalikan langsung lewat DevTools Protocol, jadi tidak ada dependensi
tambahan. Untuk meniru server mati atau sibuk, tes mencegat permintaan ke
backend di dalam Chrome, jadi backend asli tidak perlu dimatikan.

Setiap Chrome uji memakai folder profil sementara. Saat ditutup
(`stopChrome` di `tests/bantuan/browser.mjs`), alat bantu menunggu Chrome
benar-benar berhenti, lalu menghapus foldernya dan mengulang penghapusan
sampai 10 kali dengan jeda 300 ms bila proses pembantu Chrome masih menulis
berkas. Dulu Chrome hanya ditunggu 300 ms lalu foldernya dihapus sekali,
sehingga sesekali tes gagal dengan "ENOTEMPTY: directory not empty" walaupun
semua ceknya lulus.

Cek "Loading..." (praktikum, detail-kelas, tambah-praktikum, daftar dan
detail pengumuman) memperlambat jaringan, lalu membuka halaman dengan
`browser.navigate(alamat, { waitForLoad: false })` dan langsung mengamati
halaman baru (dengan syarat `location.pathname` sudah alamat itu). Dulu tes
baru mulai mengamati setelah semua berkas halaman termuat, padahal saat
jaringan lambat itu bisa 9–12 detik dan data kadang sudah selesai dimuat lebih
dulu, sehingga "Loading..." terlewat (1 dari 8 percobaan) dan tes gagal
padahal halamannya benar.

Syarat sebelum menjalankan:

- Backend jalan (`npm run dev` di `silab-backend`) dan web jalan
  (`npm run dev -- -p 3001`).
- Repo `silab-backend` ada di sebelah folder ini. Tes memakai alat bantu data
  uji di `silab-backend/tests/bantuan/` beserta `.env` backend untuk membuat
  dan menghapus data uji. Aturan data ujinya sama dengan tes backend: akun,
  mata kuliah, dan kelas uji dibuat sendiri lalu dihapus lagi, dan akun uji di
  bawah tidak dipakai (lihat Pengujian otomatis di README backend).
- Google Chrome terpasang.
- Tes `periode` sungguh-sungguh memulai semester berikutnya dari web selama
  sekitar satu menit, lalu menghapusnya sehingga periode sebelumnya aktif
  kembali. Tes ini menolak jalan bila ada sesi presensi asli yang sedang
  terbuka.

```bash
npm test                    # semua tes browser, sekitar 20 menit
npm test -- pembayaran      # hanya tes yang namanya mengandung "pembayaran"
node tests/login.mjs        # satu tes saja
```

| Tes | Yang diperiksa | Cek |
|---|---|---|
| `halaman` | semua halaman laboran tampil tanpa error JavaScript; pilihan dosen, mata kuliah, hari, ruangan, dan jenis pengumuman terisi | 32 |
| `login` | pesan saat server tidak terjangkau, balasan error tanpa pesan, password salah, dan login benar; `/` langsung ke Dashboard atau login; tombol tetap loading sampai Dashboard terbuka; pesan "Sesi Anda berakhir" saat token ditolak server dan saat password diganti dari perangkat lain, tetapi tidak setelah Sign Out biasa atau saat login dibuka langsung | 22 |
| `sesi-pulih` | token kedaluwarsa diperbarui diam-diam, server mati memunculkan pemberitahuan tanpa melempar ke login, halaman pulih sendiri saat server hidup, tombol Coba lagi, token rusak kembali ke login dan cookie dihapus | 15 |
| `server-mati` | 13 halaman dashboard saat server mati total dan saat server sibuk (503): tidak rusak, tidak macet di Loading, dan pesannya tampil | 29 |
| `pembayaran` | form ubah aktivasi: pilihan kosongkan kelas, simpan tanpa perubahan tidak mengirim apa pun, konfirmasi tanpa kelas, batal bayar dengan peringatan, ditolak bila sudah ada presensi. Hapus pendaftaran: tombol hanya di mata kuliah Belum Bayar, tidak menimpa kotak status, dan Ubah sejajar di semua baris, Batal tidak menghapus, Ya, hapus mengirim satu DELETE, penolakan server tampil di konfirmasi, pendaftaran terakhir menutup pop-up dengan pesan di halaman | 67 |
| `jam-sesi` | awalnya PSI dan Senin terpilih dengan satu kartu Senin · PSI; tombol Ruangan dan Hari berganti kartu (SBTI hanya berisi sesi SBTI, lalu Jumat · SBTI); 1366 px: tombol di dalam kartu, jam satu baris, Ubah sejajar di semua baris; 1024 px: tombol di baris kedua tepat di bawah jam, tidak keluar kartu, halaman tidak bergeser ke samping; sesi yang kelasnya sudah dihapus (0 kelas) benar-benar terhapus dengan pesan di bawah judul kartu; jam bertabrakan saat mengubah sesi paling atas: pesan merah di bawah form itu dan terlihat di layar, pesan berhasil di bawah barisnya; Ubah juga di hari lain hanya berisi hari di ruangan yang sama dengan nomor itu dan jamnya sekarang, centang Selasa mengubah Senin dan Selasa saja; Tambahkan juga ke berisi 4 hari lainnya tanpa teks menempel kotak centang, centang Rabu membuat sesi Senin dan Rabu lalu centangnya kosong lagi; jam baru yang membuat peserta bentrok tetap tersimpan dengan kotak kuning berisi nama dan kedua kelasnya; jam 7.00, 07:00, 0700, 730 dirapikan, Enter dari kotak jam mengirim 22.30–22.40 untuk Jumat PSI; isian Tambah Sesi (termasuk centang) dan form Ubah terkunci selama menyimpan; dengan jaringan lambat, pesan berhasil muncul bersamaan dengan baris yang sudah berganti nomor; Loading... saat memuat; saat `GET /session` gagal tanpa "Belum ada sesi" dan pesan gagal hilang sendiri setelah data termuat lagi | 24 |
| `daftar-pembayaran` | daftar urut NIM, mata kuliah di pop-up urut semester lalu abjad; cari NIM dan sebagian nama tanpa peduli huruf besar dan spasi; kartu tetap total periode saat mencari; mengetik tidak mengirim permintaan ke server; pesan tidak ketemu menyebut kata dan pilihannya; kembali lewat sidebar mulai dari kotak cari kosong dan Show All; keterangan untuk periode tanpa pendaftar, semua lunas, dan belum ada yang lunas; Loading... saat memuat; di 1366 × 768 kartu paling tinggi 160 px, tombol pilihan sebaris dengan kotak cari, baris pertama paling jauh 360 px dari atas, jarak antarbaris paling banyak 56 px, judul kolom tetap di atas saat digulir; di 1024 px judul satu baris dan sejajar isinya, NIM di bawah nama, kolom nama minimal 180 px; tombol geser bernama Status pembayaran dan terkunci bersama pilihan kelas dan Kembali selama menyimpan | 23 |
| `kode-matkul` | kode di kartu praktikum, kolom kode hanya angka dan 9 digit saat tambah dan ubah, kode ikut di judul PDF rekap presensi | 29 |
| `periode` | halaman Periode Akademik, dialog yang baru terbuka setelah mengetik MULAI, Batal tidak mengganti semester, mulai semester dari web, tombol Lihat membuka arsip, tombol ubah dan hapus tersembunyi di Praktikum/detail kelas/Pembayaran, pilihan periode kembali ke aktif setelah dimuat ulang, halaman Jam Sesi yang sedang terbuka langsung berganti ke salinan jam sesi semester baru (0 kelas, bisa dihapus); Loading... saat memuat; dialog yang dibuka di browser lain sebelum semester berganti tetap menulis semester yang dikonfirmasi, tombolnya ditolak "sudah dimulai", dan tidak ada semester terlewat; petunjuk Belum ada periode (daftar periode tiruan kosong) hilang sendiri lewat event `period` | 38 |
| `tanpa-periode` | daftar periode tiruan kosong: petunjuk dan tombol Buka Periode Akademik untuk laboran di Dashboard, Praktikum, Tambah Praktikum, Jam Sesi, dan Pembayaran, tombol membuka Mulai Periode Pertama, halaman Periode Akademik sendiri tanpa petunjuk; petunjuk dosen tanpa tombol di Dashboard dan Praktikum; tanpa petunjuk saat periode ada atau saat daftar periode gagal dimuat | 20 |
| `perangkat` | kotak ⚠ HP tidak biasa: dosen hanya melihat, laboran menekan Ada (HP baru jadi HP biasa) dan Tidak ada (menjadi Tidak Hadir), tanda ⚠ di baris ikut hilang, halaman dosen berubah tanpa dimuat ulang, pesan bila staf lain sudah menjawab | 22 |
| `pengumuman` | List dan Detail: Loading... saat memuat, label jenis, tanggal jam lokal beserta penulis, Edit tanpa perubahan tidak mengirim apa pun, dosen tanpa menu Edit/Hapus. Buat Pengumuman: pilihan jenis menampilkan nama, jenis yang tampil sama dengan yang terkirim setelah Simpan dan Hapus, judul dirapikan, isian kosong/spasi ditolak tanpa mengirim, batas 1000 karakter, penolakan server tampil tanpa menghapus isian, tinggi kotak, pengumuman panjang dipotong 3 baris di daftar dan tampil utuh dengan paragraf terpisah di detail, dosen melihat pesan hanya laboran. Permintaan simpan dan ubah dicegat, jadi tidak ada pengumuman asli yang terkirim | 34 |
| `pengumuman-matkul` | pilihan Untuk di Buat Pengumuman: bawaan Semua mahasiswa, hilang untuk jenis pendaftaran, daftar mata kuliah dengan kode dan semester, tanpa centang ditolak tanpa mengirim, `subjectIds` yang terkirim dan tersimpan, pendaftaran tetap terkirim untuk semua; kartu dan detail menyebut tujuan beserta semesternya; Edit terisi tujuan lama, tanpa perubahan tidak mengirim, mengganti mata kuliah dan kembali ke Semua mahasiswa; kotak centang dan pilihan bergaya tema (input asli tersembunyi, biru `#3272CA`, pilihan tanpa garis luar) dan tersusun atas-bawah | 28 |
| `hapus-matkul` | tombol Hapus Mata Kuliah di dialog Ubah (dosen tidak punya), letaknya di kiri dan tidak bertumpuk dengan Batal/Simpan, Batal tidak menghapus, Ya, hapus mengirim satu DELETE lalu kartu hilang dengan pesan hijau, halaman dosen di browser kedua ikut berubah tanpa dimuat ulang, penolakan server untuk mata kuliah yang sudah punya kelas tampil di konfirmasi | 21 |
| `info-kelas` | kotak informasi di detail kelas pada layar 1440, 1280, dan 1024 px, tanpa asisten dan dengan 3 asisten bernama panjang: kuota dan jam tetap satu baris, semua nama asisten di dalam kotak, ikon kelola asisten menempel di tulisan Asisten Praktikum | 19 |
| `dashboard` | kartu laboran (termasuk Jumlah Kelas) sama dengan data server, sekali memuat hanya satu `GET /activation`, angka ikut berubah saat pembayaran dikonfirmasi di tempat lain; angka 312 / 480 tetap satu baris dan semua tulisan di dalam kartu pada layar 1440, 1366, 1280, dan 1024 px; pop-up Sign Out (Keluar merah di kanan, Batal menutup tanpa keluar); kartu asisten menghitung mata kuliah dari kelas yang ia pegang | 14 |
| `praktikum` | Loading... saat memuat; mata kuliah urut abjad dan kelas urut A, B, C (juga daftar kelas asisten); "Belum ada kelas di periode ini."; nama mata kuliah panjang 2 baris di dalam kartu; tanda Penuh dan ruangan di kartu kelas; semester dan mata kuliah tetap terbuka setelah kembali dari detail kelas; pesan error bila `GET /class` gagal; tombol Tambah Praktikum utuh di layar 1024px | 20 |
| `detail-kelas` | Loading... saat memuat; pertemuan yang presensinya dibuka langsung terpilih, tanpa itu pertemuan terakhir; tanda Dibuka di daftar pertemuan; pilihan tetap setelah kembali dari Rekap; Belum ada mahasiswa / Belum ada pertemuan; Tambah Pertemuan: Batal tidak menyimpan, Enter menyimpan, pertemuan baru langsung terpilih; QR: Layar Penuh memperbesar QR, Keluar Layar Penuh, Tutup; Ubah Status Presensi: jarak di layar 720 px dan Batal tanpa mengirim apa pun; layar 1024 px: tombol satu baris, NIM dan nama tidak saling menimpa, nama dosen utuh; pesan error bila `GET /meeting/:classId` gagal | 24 |
| `password-spasi` | Profil laboran: password baru dengan spasi di tengah, awal, atau akhir terketik apa adanya, lalu ditolak dengan pesan tanpa mengirim `PUT /auth/me/password`; password tanpa spasi tetap tersimpan | 11 |
| `dropdown` | sorotan opsi pertama dan terakhir menempel sampai tepi daftar dengan latar biru dan tulisan putih di 12 dropdown: Jenis Pengumuman, Dosen Pengampu, Semester, Mata Kuliah, Hari, Ruangan, Sesi Kelas, Periode, Pilih Pertemuan, menu titik tiga pengumuman (Hapus merah), Jenis Pengumuman di pop-up Edit, Pilih Kelas di Pembayaran; Pilih Pertemuan dengan keyboard: sorotan biru dan Enter memilih | 17 |
| `tambah-praktikum` | judul dan tombol Kembali; Loading... saat mata kuliah dimuat; mata kuliah urut abjad dengan semesternya; sorotan biru opsi menempel sampai tepi daftar; Mata Kuliah, Hari, dan Ruangan dipilih dengan keyboard; huruf baru di kolom Kelas mengganti huruf lama; Kelas yang sudah ada (n) urut A, B, C dengan tanda Penuh dan ruangan; nama mata kuliah panjang dipotong di tombol dan kartu; semua isian di dalam kotak dan tidak terpotong di layar 1440, 1280, 1024 px, juga dialog Ubah Kelas di 1024 px; Sesi Kelas menulis "Pilih ruangan dulu" sampai ruangan dipilih, hanya berisi sesi hari dan ruangan itu, dan kosong lagi saat ruangan diganti; isian terkunci selama menyimpan, lalu kosong dengan pesan berhasil; daftar mata kuliah ikut berubah saat laboran lain menambah, mengganti nama, dan menghapus; kartu membuka detail kelas; tanpa "Belum ada kelas" bila `GET /class` gagal; arahan ke Tambah Mata Kuliah bila belum ada mata kuliah | 34 |
| `rekap-presensi` | layar 1024 px dengan 15 pertemuan: kolom Hadir terlihat tanpa menggeser, No, NIM, dan Nama tetap di kiri setelah digeser ke ujung (hanya kolom pertemuan yang bergeser), scrollbar 6 px hanya di bawah kolom pertemuan, hanya tampil saat digeser dan hilang lagi setelah diam (dicek dari piksel screenshot), kolom Nama minimal 200 px, tombol Unduh PDF satu baris; layar 1366 px: No, NIM, dan Nama tetap di kiri, baris Jumlah hadir, periode dan dosen pengampu; kelas 40 mahasiswa: keterangan dan Jumlah hadir terlihat tanpa menggulir, judul kolom tetap di atas setelah digulir; PDF: nama panjang utuh, judul kolom Responsi Akhir per kata, Jumlah hadir, periode dan dosen, semua tulisan rekap satu pertemuan berjudul panjang muat di kertas; data kelas gagal dimuat lalu pulih lewat event; kelas dihapus saat terbuka; Detail Kelas urut NIM dan keterangan ikon rekap | 29 |
| `tambah-matkul` | judul; tulisan Pilih semester dan Pilih dosen pengampu; daftar Mata kuliah yang sudah ada awalnya tertutup per semester (urut, dengan jumlahnya), klik judul membuka isinya (urut abjad, kode dan dosen) dan menutupnya lagi; semester yang dipilih di form terbuka sendiri dan tertutup lagi saat pilihan diganti, semester yang dibuka sendiri tetap terbuka; Kosongkan menutup semua semester; satu-satunya semester langsung terbuka; daftar 22 dosen berhenti 16 px dari bawah layar dan dosen terakhir utuh; opsi tanpa tombol di dalamnya; nama dosen panjang satu baris dengan ... dan nama lengkap saat disorot di layar 1024 px; pilih semester dan dosen dengan keyboard; isian dan Kosongkan terkunci selama menyimpan; setelah Simpan semesternya tetap terbuka dan mata kuliah baru ada di sana; daftar ikut berubah saat laboran lain menambah dan mengganti nama, tanpa membuka semester sendiri; isian pop-up Ubah Mata Kuliah terkunci selama menyimpan; Pilih hari dan Pilih ruangan di Tambah Praktikum; daftar Pilih Pertemuan 20 pertemuan di layar 1024 px berhenti 16 px dari bawah layar tanpa menutupi tombolnya | 25 |

| Variabel | Bawaan | Kegunaan |
|---|---|---|
| `SILAB_WEB` | `http://localhost:3001` | alamat web yang diuji |
| `SILAB_API` | `NEXT_PUBLIC_BASE_URL` di `.env.local` | alamat backend |
| `SILAB_BACKEND` | `../silab-backend` | lokasi repo backend |
| `CHROME` | lokasi Chrome bawaan macOS, atau `google-chrome` | lokasi Chrome |

Next.js dalam mode dev menyusun halaman saat pertama dibuka, jadi tes pertama
setelah `npm run dev` bisa lebih lambat.

## Akun uji

Akun berikut untuk uji manual. Tes otomatis tidak memakainya.

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
