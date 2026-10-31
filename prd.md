# Product Requirements Document (PRD) - Portofolio Minimal-Dark

## 1. Visi & Tujuan
Membangun website portofolio profesional bergaya "minimal-dark" (terinspirasi dari garryaudie.com) untuk menampilkan identitas sebagai Software Engineer / Full-Stack Developer. Fokus utama adalah menyoroti kualitas kode (clean code), arsitektur sistem, dan kemampuan problem-solving.

## 2. Tech Stack
- Framework: Next.js (App Router)
- Styling: Tailwind CSS
- Animation: Framer Motion
- Icons: Lucide React
- Deployment: Vercel (Rencana)

## 3. Struktur Halaman (Single Page Layout)
1. Navbar: Sticky top, blurred background (glassmorphism), tautan ke section (About, Projects, Contact).
2. Hero Section: Headline perkenalan singkat yang kuat, role developer, dan tombol Call-to-Action (CTA) "View Projects" atau "Resume".
3. About Section: Latar belakang singkat, fokus pada rekayasa perangkat lunak dan minat pada arsitektur sistem.
4. Projects Section (Sorotan Utama):
   - Project 1: Enterprise Java Swing Online Shop
     - Deskripsi: Aplikasi desktop manajemen toko online dan kasir tingkat enterprise.
     - Tech Stack: Java, MySQL, JDBC, HikariCP.
     - Key Features: 
       - Menerapkan ACID Transactions untuk integritas data checkout.
       - Menggunakan DAO & Singleton Design Patterns.
       - Fitur Audit Trail Logging untuk aktivitas admin.
       - Tersedia dalam 2 mode: Demo Mode (In-Memory) & Production Mode (MySQL + Connection Pooling).
5. Contact Section: Email, LinkedIn, GitHub dengan hover state yang elegan.
6. Footer: Copyright sederhana.

## 4. Requirement Non-Fungsional
- Responsivitas: Harus tampil sempurna di Mobile, Tablet, dan Desktop.
- Performa: Loading cepat, skor Lighthouse optimal.
- Aksesibilitas: Kontras teks tinggi, navigasi keyboard ramah (semantic HTML).