// Train routes and pricing data
const trainRoutes = {
    jakarta: {
        bandung: { price: 150000, duration: '3h 15m' },
        yogyakarta: { price: 350000, duration: '8h 30m' },
        solo: { price: 400000, duration: '10h 15m' },
        surabaya: { price: 550000, duration: '14h 30m' }
    },
    bandung: {
        jakarta: { price: 150000, duration: '3h 15m' },
        yogyakarta: { price: 250000, duration: '5h 15m' },
        solo: { price: 300000, duration: '7h 00m' },
        surabaya: { price: 450000, duration: '11h 15m' }
    },
    yogyakarta: {
        jakarta: { price: 350000, duration: '8h 30m' },
        bandung: { price: 250000, duration: '5h 15m' },
        solo: { price: 50000, duration: '1h 45m' },
        surabaya: { price: 200000, duration: '6h 00m' }
    },
    solo: {
        jakarta: { price: 400000, duration: '10h 15m' },
        bandung: { price: 300000, duration: '7h 00m' },
        yogyakarta: { price: 50000, duration: '1h 45m' },
        surabaya: { price: 150000, duration: '4h 15m' }
    },
    surabaya: {
        jakarta: { price: 550000, duration: '14h 30m' },
        bandung: { price: 450000, duration: '11h 15m' },
        yogyakarta: { price: 200000, duration: '6h 00m' },
        solo: { price: 150000, duration: '4h 15m' }
    }
};

// Train schedule data (example)
const trainSchedules = {
    jakarta: {
        bandung: ['07:00', '10:00', '13:00', '16:00'],
        yogyakarta: ['08:00', '14:00'],
        solo: ['08:30', '15:00'],
        surabaya: ['09:00', '16:00']
    },
    // Add more schedules for other stations...
};

// DOM Elements
const searchButton = document.getElementById('searchButton');
const departureStation = document.getElementById('departureStation');
const arrivalStation = document.getElementById('arrivalStation');
const departureDate = document.getElementById('departureDate');
const passengerCount = document.getElementById('passengerCount');
const searchResults = document.getElementById('searchResults');
const trainList = document.getElementById('trainList');
const bookingForm = document.getElementById('bookingForm');
const passengerForm = document.getElementById('passengerForm');
const ticketPreview = document.getElementById('ticketPreview');
const ticketDetails = document.getElementById('ticketDetails');
const printTicket = document.getElementById('printTicket');
const downloadTicket = document.getElementById('downloadTicket');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
departureDate.min = today;

// Event Listeners
searchButton.addEventListener('click', handleSearch);
passengerForm.addEventListener('submit', handleBooking);
printTicket.addEventListener('click', handlePrintTicket);
downloadTicket.addEventListener('click', handleDownloadTicket);

// Handle station selection
departureStation.addEventListener('change', () => {
    const selectedDeparture = departureStation.value;
    const arrivalOptions = arrivalStation.options;
    
    // Reset arrival station
    arrivalStation.value = '';
    
    // Disable same station selection
    for (let i = 0; i < arrivalOptions.length; i++) {
        if (arrivalOptions[i].value === selectedDeparture) {
            arrivalOptions[i].disabled = true;
        } else {
            arrivalOptions[i].disabled = false;
        }
    }
});

// Search handler
function handleSearch() {
    const departure = departureStation.value;
    const arrival = arrivalStation.value;
    const date = departureDate.value;
    const passengers = passengerCount.value;

    if (!departure || !arrival || !date) {
        alert('Mohon lengkapi semua field pencarian');
        return;
    }

    if (departure === arrival) {
        alert('Stasiun keberangkatan dan tujuan tidak boleh sama');
        return;
    }

    const route = trainRoutes[departure][arrival];
    const schedules = trainSchedules[departure][arrival];

    if (!route || !schedules) {
        alert('Rute tidak tersedia');
        return;
    }

    displaySearchResults(departure, arrival, date, passengers, route, schedules);
}

// Display search results
function displaySearchResults(departure, arrival, date, passengers, route, schedules) {
    searchResults.classList.remove('hidden');
    trainList.innerHTML = '';

    schedules.forEach(time => {
        const trainCard = document.createElement('div');
        trainCard.className = 'border rounded-lg p-4 hover:shadow-md transition-shadow';
        trainCard.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h3 class="font-semibold">Kereta Api ${departure.toUpperCase()}-${arrival.toUpperCase()}</h3>
                    <p class="text-gray-600">${time} - ${route.duration}</p>
                </div>
                <div class="text-right">
                    <p class="font-semibold">Rp ${(route.price * passengers).toLocaleString('id-ID')}</p>
                    <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            onclick="selectTrain('${departure}', '${arrival}', '${date}', '${time}', ${route.price}, ${passengers})">
                        Pilih
                    </button>
                </div>
            </div>
        `;
        trainList.appendChild(trainCard);
    });
}

// Select train and show booking form
function selectTrain(departure, arrival, date, time, price, passengers) {
    window.selectedTrain = {
        departure,
        arrival,
        date,
        time,
        price,
        passengers,
        totalPrice: price * passengers
    };

    searchResults.classList.add('hidden');
    bookingForm.classList.remove('hidden');
}

// Handle booking submission
async function handleBooking(e) {
    e.preventDefault();

    const bookingData = {
        ...window.selectedTrain,
        passenger: {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            idNumber: document.getElementById('idNumber').value
        },
        bookingId: generateBookingId(),
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
    };

    try {
        // Save to Firebase
        await db.collection('bookings').doc(bookingData.bookingId).set(bookingData);
        
        // Show ticket preview
        displayTicket(bookingData);
        
        // Hide booking form and show ticket
        bookingForm.classList.add('hidden');
        ticketPreview.classList.remove('hidden');
    } catch (error) {
        console.error('Error saving booking:', error);
        alert('Terjadi kesalahan saat menyimpan pemesanan. Silakan coba lagi.');
    }
}

// Generate unique booking ID
function generateBookingId() {
    return 'KCI-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Display ticket
function displayTicket(bookingData) {
    const { bookingId, departure, arrival, date, time, passenger, totalPrice } = bookingData;
    
    ticketDetails.innerHTML = `
        <div class="space-y-4">
            <div class="flex justify-between items-center border-b pb-4">
                <div>
                    <h3 class="text-lg font-semibold">KCI Ticket Booking</h3>
                    <p class="text-gray-600">Booking ID: ${bookingId}</p>
                </div>
                <div class="text-right">
                    <p class="text-sm text-gray-600">Status</p>
                    <p class="text-green-600 font-semibold">Confirmed</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-600">Stasiun Keberangkatan</p>
                    <p class="font-semibold">${departure.toUpperCase()}</p>
                    <p class="text-sm">${date} - ${time}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Stasiun Tujuan</p>
                    <p class="font-semibold">${arrival.toUpperCase()}</p>
                </div>
            </div>
            <div class="border-t pt-4">
                <p class="text-sm text-gray-600">Data Penumpang</p>
                <p class="font-semibold">${passenger.fullName}</p>
                <p class="text-sm">${passenger.idNumber}</p>
            </div>
            <div class="border-t pt-4">
                <p class="text-sm text-gray-600">Total Pembayaran</p>
                <p class="text-xl font-bold">Rp ${totalPrice.toLocaleString('id-ID')}</p>
            </div>
        </div>
    `;
}

// Handle print ticket
function handlePrintTicket() {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>KCI Ticket - ${window.selectedTrain.bookingId}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .ticket { border: 2px dashed #ccc; padding: 20px; max-width: 800px; margin: 0 auto; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .details { margin: 20px 0; }
                    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="ticket">
                    ${ticketDetails.innerHTML}
                    <div class="footer">
                        <p>Tiket ini adalah bukti pembayaran yang sah</p>
                        <p>Harap tunjukkan tiket ini saat naik kereta</p>
                    </div>
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Handle download ticket as PDF
function handleDownloadTicket() {
    // This is a placeholder for PDF generation
    // In a real implementation, you would use a library like jsPDF
    alert('Fitur download PDF akan segera tersedia');
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    departureDate.min = today;
});

// Data stasiun sesuai foto
const stations = [
  { value: 'bandung', label: 'Bandung (Tegalluar/Bandung Timur/Selatan)' },
  { value: 'kroya', label: 'Kroya (Kabupaten Cilacap, Jawa Tengah)' },
  { value: 'yogyakarta', label: 'Yogyakarta (Kulon Progo/YIA/East Yogyakarta)' },
  { value: 'solo', label: 'Solo (Solo Balapan/Solo Timur)' },
  { value: 'madiun', label: 'Madiun (Jawa Timur)' },
  { value: 'jombang', label: 'Jombang/Kertosono (Jawa Timur)' },
  { value: 'surabaya', label: 'Surabaya (Gubeng/sekitar Surabaya)' },
];

// Kelas kereta
const trainClasses = [
  { value: 'economy', label: 'Economy' },
  { value: 'business', label: 'Business' },
  { value: 'executive', label: 'Executive' },
];

// Render Booking Page
window.renderBookingPage = function() {
  const bookingPage = document.getElementById('bookingPage');
  bookingPage.innerHTML = `
    <div class="min-h-screen flex flex-col items-center justify-center py-8">
      <h2 class="text-3xl font-bold mb-4 text-red-700 animate-fadeIn">Booking Tiket Kereta Cepat</h2>
      <form id="bookingFormNew" class="bg-white/90 rounded-xl shadow-xl p-8 w-full max-w-xl animate-fadeInUp">
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Kelas Kereta</label>
          <select id="trainClass" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-red-700">
            <option value="">Pilih Kelas</option>
            ${trainClasses.map(cls => `<option value="${cls.value}">${cls.label}</option>`).join('')}
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Stasiun Keberangkatan</label>
          <select id="departureStationNew" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-red-700">
            <option value="">Pilih Stasiun</option>
            ${stations.map(st => `<option value="${st.value}">${st.label}</option>`).join('')}
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Stasiun Tujuan</label>
          <select id="arrivalStationNew" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-red-700">
            <option value="">Pilih Stasiun</option>
            ${stations.map(st => `<option value="${st.value}">${st.label}</option>`).join('')}
          </select>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Tanggal Keberangkatan</label>
          <input type="date" id="departureDateNew" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-red-700">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">Jumlah Penumpang</label>
          <input type="number" id="passengerCountNew" min="1" max="4" value="1" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-700 focus:border-red-700">
        </div>
        <button type="submit" class="w-full bg-red-700 text-white font-bold px-6 py-2 rounded-md hover:bg-silver hover:text-red-700 transition-all duration-300">Cari Tiket</button>
      </form>
      <button onclick="window.location.reload()" class="mt-6 text-silver hover:text-red-700 transition-all">Kembali ke Beranda</button>
    </div>
  `;
  // Tambahkan animasi fadeInUp
  tailwind.config.theme.extend.keyframes.fadeInUp = {
    '0%': { opacity: 0, transform: 'translateY(40px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  };
  tailwind.config.theme.extend.animation.fadeInUp = 'fadeInUp 0.7s ease-out';
}

// Render Jadwal Page
window.renderJadwalPage = function() {
  const jadwalPage = document.getElementById('jadwalPage');
  jadwalPage.innerHTML = `
    <div class="min-h-screen flex flex-col items-center justify-center py-8">
      <h2 class="text-3xl font-bold mb-4 text-red-700 animate-fadeIn">Jadwal Kereta Cepat</h2>
      <div class="bg-white/90 rounded-xl shadow-xl p-8 w-full max-w-3xl animate-fadeInUp">
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr class="bg-red-700 text-white">
              <th class="p-2">Stasiun Asal</th>
              <th class="p-2">Stasiun Tujuan</th>
              <th class="p-2">Jadwal</th>
            </tr>
          </thead>
          <tbody>
            ${stations.map((from, i) => stations.map((to, j) => from.value !== to.value ? `<tr class="hover:bg-red-50 transition-all">
              <td class="p-2">${from.label}</td>
              <td class="p-2">${to.label}</td>
              <td class="p-2">${(trainSchedules[from.value] && trainSchedules[from.value][to.value]) ? trainSchedules[from.value][to.value].join(', ') : '-'}</td>
            </tr>` : '').join('')).join('')}
          </tbody>
        </table>
      </div>
      <button onclick="window.location.reload()" class="mt-6 text-silver hover:text-red-700 transition-all">Kembali ke Beranda</button>
    </div>
  `;
}

// Navigasi page setelah tombol di landingPage diklik
window.showPage = function(page) {
  document.getElementById('landingPage').classList.add('hidden');
  document.getElementById('bookingPage').classList.add('hidden');
  document.getElementById('jadwalPage').classList.add('hidden');
  if(page === 'booking') {
    document.getElementById('bookingPage').classList.remove('hidden');
    window.renderBookingPage();
  }
  if(page === 'jadwal') {
    document.getElementById('jadwalPage').classList.remove('hidden');
    window.renderJadwalPage();
  }
} 