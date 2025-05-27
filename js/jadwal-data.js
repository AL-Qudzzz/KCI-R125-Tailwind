// Data stasiun berurutan
const stasiunList = [
  'jakarta',
  'bandung',
  'kroya',
  'yogyakarta',
  'solo',
  'madiun',
  'jombang',
  'surabaya'
];

// Jadwal keberangkatan per rute
const jadwalData = [
  { asal: 'jakarta', tujuan: 'bandung', jam: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'] },
  { asal: 'bandung', tujuan: 'jakarta', jam: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00'] },
  { asal: 'jakarta', tujuan: 'yogyakarta', jam: ['06:30', '09:30', '12:30', '15:30', '18:30'] },
  { asal: 'yogyakarta', tujuan: 'jakarta', jam: ['08:00', '11:00', '14:00', '17:00', '20:00'] },
  { asal: 'jakarta', tujuan: 'surabaya', jam: ['07:00', '13:00', '19:00'] },
  { asal: 'surabaya', tujuan: 'jakarta', jam: ['08:30', '14:30', '20:30'] },
  // Tambahan: semua kombinasi rute antar stasiun minimal 2 jam
  { asal: 'jakarta', tujuan: 'kroya', jam: ['07:00', '15:00'] },
  { asal: 'kroya', tujuan: 'jakarta', jam: ['08:00', '16:00'] },
  { asal: 'jakarta', tujuan: 'solo', jam: ['07:30', '17:00'] },
  { asal: 'solo', tujuan: 'jakarta', jam: ['09:00', '18:00'] },
  { asal: 'jakarta', tujuan: 'madiun', jam: ['08:00', '18:00'] },
  { asal: 'madiun', tujuan: 'jakarta', jam: ['10:00', '19:00'] },
  { asal: 'jakarta', tujuan: 'jombang', jam: ['09:00', '19:00'] },
  { asal: 'jombang', tujuan: 'jakarta', jam: ['11:00', '20:00'] },
  { asal: 'bandung', tujuan: 'kroya', jam: ['07:00', '15:00'] },
  { asal: 'kroya', tujuan: 'bandung', jam: ['08:00', '16:00'] },
  { asal: 'bandung', tujuan: 'yogyakarta', jam: ['07:30', '17:00'] },
  { asal: 'yogyakarta', tujuan: 'bandung', jam: ['09:00', '18:00'] },
  { asal: 'bandung', tujuan: 'solo', jam: ['08:00', '18:00'] },
  { asal: 'solo', tujuan: 'bandung', jam: ['10:00', '19:00'] },
  { asal: 'bandung', tujuan: 'madiun', jam: ['09:00', '19:00'] },
  { asal: 'madiun', tujuan: 'bandung', jam: ['11:00', '20:00'] },
  { asal: 'bandung', tujuan: 'jombang', jam: ['10:00', '20:00'] },
  { asal: 'jombang', tujuan: 'bandung', jam: ['12:00', '21:00'] },
  { asal: 'bandung', tujuan: 'surabaya', jam: ['11:00', '21:00'] },
  { asal: 'surabaya', tujuan: 'bandung', jam: ['13:00', '22:00'] },
  { asal: 'kroya', tujuan: 'yogyakarta', jam: ['07:00', '15:00'] },
  { asal: 'yogyakarta', tujuan: 'kroya', jam: ['08:00', '16:00'] },
  { asal: 'kroya', tujuan: 'solo', jam: ['07:30', '17:00'] },
  { asal: 'solo', tujuan: 'kroya', jam: ['09:00', '18:00'] },
  { asal: 'kroya', tujuan: 'madiun', jam: ['08:00', '18:00'] },
  { asal: 'madiun', tujuan: 'kroya', jam: ['10:00', '19:00'] },
  { asal: 'kroya', tujuan: 'jombang', jam: ['09:00', '19:00'] },
  { asal: 'jombang', tujuan: 'kroya', jam: ['11:00', '20:00'] },
  { asal: 'kroya', tujuan: 'surabaya', jam: ['10:00', '20:00'] },
  { asal: 'surabaya', tujuan: 'kroya', jam: ['12:00', '21:00'] },
  { asal: 'yogyakarta', tujuan: 'solo', jam: ['07:00', '15:00'] },
  { asal: 'solo', tujuan: 'yogyakarta', jam: ['08:00', '16:00'] },
  { asal: 'yogyakarta', tujuan: 'madiun', jam: ['07:30', '17:00'] },
  { asal: 'madiun', tujuan: 'yogyakarta', jam: ['09:00', '18:00'] },
  { asal: 'yogyakarta', tujuan: 'jombang', jam: ['08:00', '18:00'] },
  { asal: 'jombang', tujuan: 'yogyakarta', jam: ['10:00', '19:00'] },
  { asal: 'yogyakarta', tujuan: 'surabaya', jam: ['09:00', '19:00'] },
  { asal: 'surabaya', tujuan: 'yogyakarta', jam: ['11:00', '20:00'] },
  { asal: 'solo', tujuan: 'madiun', jam: ['07:00', '15:00'] },
  { asal: 'madiun', tujuan: 'solo', jam: ['08:00', '16:00'] },
  { asal: 'solo', tujuan: 'jombang', jam: ['07:30', '17:00'] },
  { asal: 'jombang', tujuan: 'solo', jam: ['09:00', '18:00'] },
  { asal: 'solo', tujuan: 'surabaya', jam: ['08:00', '18:00'] },
  { asal: 'surabaya', tujuan: 'solo', jam: ['10:00', '19:00'] },
  { asal: 'madiun', tujuan: 'jombang', jam: ['09:00', '19:00'] },
  { asal: 'jombang', tujuan: 'madiun', jam: ['11:00', '20:00'] },
  { asal: 'madiun', tujuan: 'surabaya', jam: ['10:00', '20:00'] },
  { asal: 'surabaya', tujuan: 'madiun', jam: ['12:00', '21:00'] },
  { asal: 'jombang', tujuan: 'surabaya', jam: ['11:00', '21:00'] },
  { asal: 'surabaya', tujuan: 'jombang', jam: ['13:00', '22:00'] },
];

const kelasList = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium-economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'executive', label: 'Executive' },
  { value: 'luxury', label: 'Luxury' },
];

function hitungHarga(asal, tujuan, kelas) {
  // Harga dasar: Jakarta-Bandung Economy 150.000
  let base = 150000;
  // Hitung jarak stasiun (berdasarkan urutan di stasiunList)
  const idxAsal = stasiunList.indexOf(asal);
  const idxTujuan = stasiunList.indexOf(tujuan);
  if (idxAsal === -1 || idxTujuan === -1 || asal === tujuan) return 0;
  let jarak = Math.abs(idxTujuan - idxAsal);
  if (jarak === 0) return 0;
  // Setiap stasiun berikutnya +100.000
  let harga = base + (jarak - 1) * 100000;
  // Kenaikan kelas: setiap naik 1 kelas +100.000
  const idxKelas = kelasList.findIndex(k => k.value === kelas);
  harga += idxKelas * 100000;
  return harga;
} 