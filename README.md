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

File `.env.local` di root:

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

1. `/auth` → `useAuthStore.login()` → `POST /auth/login`
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
- Setelah 1 hari backend menolak refresh token; semua cookie sesi dihapus
  dan `SignOutButton` mengalihkan ke `/auth`.

## Halaman

| Route | Isi |
|---|---|
| `/auth` | Login NIM + password |
| `/dashboard` | Kartu statistik |
| `/dashboard/praktikum` | LABORAN: accordion mata kuliah. MAHASISWA: kartu kelas |
| `/dashboard/praktikum/[classId]` | Detail kelas + panel pertemuan & presensi |
| `.../tambah-praktikum` | Buat kelas baru |
| `.../recap-attendances` | Rekap presensi per kelas (`?classId=`) atau per pertemuan (`&meetingId=`) + unduh PDF |
| `/dashboard/master-data/add-subject` | Tambah mata kuliah |
| `/dashboard/segera-hadir` | Pengganti fitur yang belum ada (`?fitur=Modul`), dituju tombol Modul "Click to Open" di detail kelas |
| `/dashboard/master-data/pembayaran` | Konfirmasi bayar + pilih/pindah kelas |
| `/dashboard/pengumuman/add-pengumuman` | Buat pengumuman |
| `.../list-pengumuman`, `.../[id]` | Daftar & detail pengumuman |

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

## Pekerjaan yang masih tersisa

- [ ] Folder `.next/` ikut ter-commit (tidak ada di `.gitignore`), jadi
      menjalankan `npm run dev` mengubah ratusan file yang terlacak git
- [ ] `app/components/subjects-disclosure.tsx` baris 41 gagal `tsc`
      (`subjects` tidak ada di tipe `SubjectBySemester`), sehingga
      `next build` akan gagal
- [ ] Dependensi `html2canvas` tidak dipakai lagi dan bisa dihapus
- [ ] Pindahkan enam file terakhir dari `app/actions/` ke `app/services/`,
      lalu hapus folder `actions/` dan `app/types/`
- [ ] Halaman Praktikum: asisten **tidak melihat kelas apa pun**
      (`dashboard/praktikum/page.tsx` hanya menampilkan kartu untuk LABORAN
      dan MAHASISWA), jadi asisten tidak bisa membuka detail kelas untuk
      menampilkan QR dari menu. Idealnya hanya kelas yang diampu, yang butuh
      endpoint baru di backend
- [ ] Kartu dashboard MAHASISWA "Jumlah Kelas Praktikum" menampilkan seluruh
      kelas, bukan kelas yang diampu (alasan sama)
- [ ] `app/validations/validation.schema.ts`: `addClassSchema.name.max(1)`
      (nama kelas maksimal 1 karakter)
- [ ] Cookie `accessToken` diset tanpa `httpOnly`, `secure`, `sameSite`
      (sengaja terbaca JavaScript, lihat Autentikasi). `refreshToken` sudah
      `httpOnly` tetapi belum `secure` karena lab masih memakai HTTP
- [ ] `next.config.js` masih menunjuk hostname Supabase lama bila project ref
      berubah

## Akun uji

| NIM | Password | Role |
|---|---|---|
| 2000016002 | laboran002 | LABORAN |
| 2000016099 | mahasiswa001 | MAHASISWA |
| 2000016101 | asisten001 | ASISTEN |

Pola password: fullname dalam huruf kecil.
