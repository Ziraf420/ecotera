# ECOTERRA

Ecoterra adalah aplikasi React Native yang berfokus pada kepedulian lingkungan dan menghubungkan komunitas yang peduli terhadap Bumi.

## Fitur Utama

- Sistem autentikasi (login & register)
- Tampilan informasi pengguna
- UI modern dan responsif
- Komponen kustom yang dapat digunakan kembali

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- Node.js (versi 14 atau lebih tinggi)
- npm atau yarn
- JDK 11 atau lebih tinggi (untuk Android)
- Android Studio (untuk Android)
- Xcode (untuk iOS, hanya di macOS)
- CocoaPods (untuk iOS, hanya di macOS)

## Instalasi

1. Clone repositori ini:
```sh
git clone https://github.com/username/ecotera.git
cd ecotera
```

2. Instal dependensi:
```sh
npm install
# atau
yarn install
```

3. Untuk iOS (hanya macOS), instal dependensi CocoaPods:
```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

## Konfigurasi

1. Buka file `src/services/auth.ts` dan sesuaikan URL API dengan backend Anda:
```typescript
const API_URL = 'http://your-backend-url:port'; // Ganti dengan URL API Anda
```

## Menjalankan Aplikasi

### Android

```sh
# Pastikan emulator Android atau perangkat fisik terhubung
npm run android
# atau
yarn android
```

### iOS (hanya macOS)

```sh
npm run ios
# atau
yarn ios
```

### Metro Server

Untuk menjalankan server Metro secara terpisah:
```sh
npm start
# atau
yarn start
```

## Struktur Proyek

```
ecotera/
├── src/
│   ├── assets/           # Gambar, font, dan aset lainnya
│   ├── components/       # Komponen yang dapat digunakan kembali
│   ├── hooks/            # Custom React hooks
│   ├── interfaces/       # TypeScript interfaces
│   ├── navigation/       # Konfigurasi navigasi
│   ├── pages/            # Halaman/screen aplikasi
│   ├── services/         # Layanan API dan fungsi helper
│   └── style/            # Style dan tema aplikasi
├── android/              # Konfigurasi native Android
├── ios/                  # Konfigurasi native iOS
└── ...
```

## Komponen Utama

### Autentikasi

Aplikasi menggunakan token JWT untuk autentikasi yang disimpan di AsyncStorage. Alur autentikasi:

1. **Register**: Pengguna mendaftar dengan nama lengkap, username, email, password, dan kategori
2. **Login**: Pengguna login dengan email dan password
3. **Logout**: Pengguna logout dan token dihapus dari penyimpanan

### UI Components

Aplikasi menggunakan komponen kustom untuk konsistensi UI:

- **Button**: Tombol dengan dukungan loading state
- **Input**: Input field dengan validasi dan dukungan ikon
- **Dropdown**: Dropdown selector untuk kategori
- **CustomAlert**: Alert dialog kustom dengan berbagai tipe (success, error, warning, info)

## Troubleshooting

### Masalah Koneksi API

Jika mengalami masalah koneksi ke API:
1. Pastikan backend server berjalan
2. Periksa URL API di `src/services/auth.ts`
3. Untuk pengembangan di emulator Android, gunakan IP lokal (bukan localhost)

### Masalah Build

Untuk masalah build Android:
```sh
cd android
./gradlew clean
cd ..
npm run android
```

Untuk masalah build iOS:
```sh
cd ios
bundle exec pod install --repo-update
cd ..
npm run ios
```

## Lisensi

[MIT](LICENSE)
