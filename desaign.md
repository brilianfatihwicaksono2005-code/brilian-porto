# Design System & Guidelines - Portofolio Minimal-Dark

## 1. Tema & Vibe
- Gaya: Minimalis, elegan, profesional, "developer-focused".
- Inspirasi: garryaudie.com
- Mode: Dark Mode Only.

## 2. Color Palette
- Background Utama: #0a0a0a (True Dark) atau #111111.
- Background Sekunder (Cards/Nav): #171717 (Slightly lighter dark).
- Teks Utama (Heading): #f5f5f5 (Off-white, agar tidak menyilaukan).
- Teks Sekunder (Paragraphs/Tech Stack): #a3a3a3 (Muted gray).
- Aksen/Border: #262626 (Subtle border untuk memisahkan elemen).
- Hover State: Transisi warna yang halus, background menjadi sedikit lebih terang (misal: #202020).

## 3. Typography
- Font Family: Inter atau Geist (Sans-serif yang bersih dan modern).
- Hierarchy:
  - H1 (Hero): Bold, ukuran sangat besar, tracking (jarak huruf) agak rapat.
  - H2 (Section Title): Semi-bold, ukuran sedang, dengan sedikit margin bawah.
  - Body: Regular, line-height 1.6 untuk *readability* yang baik.

## 4. UI Components
- Project Cards: Tanpa bayangan (no drop shadow), gunakan border tipis (`border-zinc-800`), sudut sedikit membulat (`rounded-lg` atau `rounded-xl`).
- Buttons: Gaya ghost (teks dengan border tipis) atau solid dengan background putih & teks hitam untuk penekanan utama (Primary CTA).
- Tech Stack Chips: Badge kecil dengan background gelap dan teks abu-abu terang, border tipis.

## 5. Interaksi & Animasi (Framer Motion)
- Initial Load: Fade-in dari bawah (Y: 20 -> 0) secara bertahap (staggered) saat web pertama kali dibuka.
- Scroll Reveal: Elemen (teks, kartu proyek) muncul secara halus (fade-up) saat masuk ke dalam viewport.
- Hover Effects: Sedikit pergeseran posisi (scale 1.02) pada kartu proyek, warna teks berubah terang pada link navigasi.