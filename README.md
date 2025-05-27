# KCI Ticket Booking System

Sistem pemesanan tiket kereta api KCI untuk jalur selatan Indonesia, dari Jakarta hingga Surabaya.

## Fitur

- Pencarian dan pemilihan rute kereta api
- Informasi harga tiket detail
- Proses pemesanan tiket yang mudah
- Integrasi dengan Firebase untuk penyimpanan data
- Cetak tiket digital
- Antarmuka responsif untuk berbagai perangkat

## Teknologi yang Digunakan

- HTML5
- JavaScript (ES6+)
- Tailwind CSS
- Firebase (Firestore)

## Persyaratan Sistem

- Web browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet
- Akun Firebase (untuk pengembangan)

## Cara Menjalankan Proyek

1. Clone repositori ini:
   ```bash
   git clone [URL_REPOSITORI]
   cd kci-ticket-booking
   ```

2. Buat proyek Firebase baru di [Firebase Console](https://console.firebase.google.com/)

3. Dapatkan konfigurasi Firebase Anda dan update file `js/config.js`:
   ```javascript
   const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
   };
   ```

4. Buka file `index.html` di browser Anda atau gunakan server lokal:
   ```bash
   # Menggunakan Python
   python -m http.server 8000
   
   # Menggunakan Node.js
   npx serve
   ```

5. Akses aplikasi di `http://localhost:8000`

## Struktur Proyek

```
kci-ticket-booking/
├── index.html          # Halaman utama aplikasi
├── js/
│   ├── app.js         # Logika aplikasi utama
│   └── config.js      # Konfigurasi Firebase
└── README.md          # Dokumentasi proyek
```

## Pengembangan

1. Pastikan Anda memiliki akun Firebase dan proyek yang sudah dibuat
2. Update konfigurasi Firebase di `js/config.js`
3. Aktifkan Firestore Database di Firebase Console
4. Sesuaikan data rute dan jadwal kereta di `js/app.js`

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## Kontak

Untuk pertanyaan dan dukungan, silakan hubungi:
- Email: info@kci-ticket.com
- Telepon: (021) 123-4567 