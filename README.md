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
2. `setToken()` (server action) menyimpan cookie `accessToken`, masa berlaku
   di-decode dari payload JWT
3. `middleware.ts` memblokir `/dashboard*` bila cookie tidak ada
4. Interceptor axios membaca cookie **langsung dari `document.cookie`**, dengan
   `getToken()` sebagai cadangan

Poin 4 penting: sebelumnya setiap permintaan memanggil server action, dan tepat
setelah login panggilan itu mengantre di belakang navigasi — membuat dashboard
tampak kosong sampai di-refresh.

Setelah login, `router.replace("/dashboard")` **harus diikuti**
`router.refresh()` untuk membuang Router Cache Next.js.

Token hanya berlaku 15 menit.

## Halaman

| Route | Isi |
|---|---|
| `/auth` | Login NIM + password |
| `/dashboard` | Kartu statistik |
| `/dashboard/praktikum` | LABORAN: accordion mata kuliah. MAHASISWA: kartu kelas |
| `/dashboard/praktikum/[classId]` | Detail kelas + panel pertemuan & presensi |
| `.../tambah-praktikum` | Buat kelas baru |
| `.../recap-attendances` | Rekap PDF (**bermasalah**, lihat di bawah) |
| `/dashboard/master-data/add-subject` | Tambah mata kuliah |
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

## Pekerjaan yang masih tersisa

- [ ] **Halaman Rekap PDF** (`.../recap-attendances`): crash bila kelas belum
      punya pertemuan (`data[0]["students"]` diakses langsung), dan PDF
      terunduh otomatis saat halaman dibuka tanpa bisa dibatalkan
- [ ] Pindahkan enam file terakhir dari `app/actions/` ke `app/services/`,
      lalu hapus folder `actions/` dan `app/types/`
- [ ] Halaman Praktikum: asisten melihat **semua** kelas, bukan hanya kelas
      yang diampu — butuh endpoint baru di backend
- [ ] Kartu dashboard MAHASISWA "Jumlah Kelas Praktikum" menampilkan seluruh
      kelas, bukan kelas yang diampu (alasan sama)
- [ ] `app/validations/validation.schema.ts`: `addClassSchema.name.max(1)`
      (nama kelas maksimal 1 karakter) dan pesan error field NIM berbunyi
      "Email can't be empty!"
- [ ] Cookie diset tanpa `httpOnly`, `secure`, `sameSite`
- [ ] `next.config.js` masih menunjuk hostname Supabase lama bila project ref
      berubah

## Akun uji

| NIM | Password | Role |
|---|---|---|
| 2000016002 | laboran002 | LABORAN |
| 2000016099 | mahasiswa001 | MAHASISWA |
| 2000016101 | asisten001 | ASISTEN |

Pola password: fullname dalam huruf kecil.
