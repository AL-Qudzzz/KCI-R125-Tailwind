// Firebase Authentication
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAev-NNZsvdUe85kvwQMWlp0X01hdyUd2g",
  authDomain: "kci-r125.firebaseapp.com",
  projectId: "kci-r125",
  storageBucket: "kci-r125.appspot.com",
  messagingSenderId: "526982261911",
  appId: "1:526982261911:web:4bb84b01957c19536f8dd2",
  measurementId: "G-97W13Y37EG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login Modal HTML
const loginModalHTML = `
<div id="loginModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-[#181411]">Sign In</h2>
      <button id="closeLoginModal" class="text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <form id="loginForm" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e87a30] focus:ring-[#e87a30]">
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e87a30] focus:ring-[#e87a30]">
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input type="checkbox" id="remember" name="remember"
            class="h-4 w-4 rounded border-gray-300 text-[#e87a30] focus:ring-[#e87a30]">
          <label for="remember" class="ml-2 block text-sm text-gray-700">Remember me</label>
        </div>
        <a href="#" class="text-sm text-[#e87a30] hover:text-[#d46a1e]">Forgot password?</a>
      </div>
      <button type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87a30] hover:bg-[#d46a1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e87a30]">
        Sign In
      </button>
    </form>
    <div class="mt-4 text-center">
      <p class="text-sm text-gray-600">Don't have an account? 
        <a href="#" id="showRegister" class="text-[#e87a30] hover:text-[#d46a1e]">Register</a>
      </p>
    </div>
  </div>
</div>

<div id="registerModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
  <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-[#181411]">Register</h2>
      <button id="closeRegisterModal" class="text-gray-500 hover:text-gray-700">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
    <form id="registerForm" class="space-y-4">
      <div>
        <label for="registerEmail" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="registerEmail" name="email" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e87a30] focus:ring-[#e87a30]">
      </div>
      <div>
        <label for="registerPassword" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="registerPassword" name="password" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e87a30] focus:ring-[#e87a30]">
      </div>
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#e87a30] focus:ring-[#e87a30]">
      </div>
      <button type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#e87a30] hover:bg-[#d46a1e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e87a30]">
        Register
      </button>
    </form>
    <div class="mt-4 text-center">
      <p class="text-sm text-gray-600">Already have an account? 
        <a href="#" id="showLogin" class="text-[#e87a30] hover:text-[#d46a1e]">Sign In</a>
      </p>
    </div>
  </div>
</div>`;

// Add modals to body
document.body.insertAdjacentHTML('beforeend', loginModalHTML);

// Get sign-in buttons
// const signInButtons = document.querySelectorAll('button:has(span:contains("Sign In"))'); // Ganti selector ini
const desktopSignInButton = document.querySelector('.hidden.md\\:flex .sign-in-btn'); // Tombol Sign In di desktop nav
const mobileSignInButton = document.querySelector('#mobileMenu .sign-in-btn'); // Tombol Sign In di mobile menu

// Get modal elements
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');

// Show login modal
function showLoginModal() {
  loginModal.classList.remove('hidden');
  loginModal.classList.add('flex');
}

// Hide login modal
function hideLoginModal() {
  loginModal.classList.add('hidden');
  loginModal.classList.remove('flex');
}

// Show register modal
function showRegisterModal() {
  registerModal.classList.remove('hidden');
  registerModal.classList.add('flex');
}

// Hide register modal
function hideRegisterModal() {
  registerModal.classList.add('hidden');
  registerModal.classList.remove('flex');
}

// Handle login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Logged in:', userCredential.user);
    hideLoginModal();
    updateAuthUI(userCredential.user);
  } catch (error) {
    alert(error.message);
  }
});

// Handle registration
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Registered:', userCredential.user);
    hideRegisterModal();
    updateAuthUI(userCredential.user);
  } catch (error) {
    alert(error.message);
  }
});

// Handle logout
async function handleLogout() {
  try {
    await signOut(auth);
    updateAuthUI(null);
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

// Function to update UI based on auth state
function updateAuthUI(user) {
  // Remove existing user info and logout buttons to prevent duplicates
  document.querySelectorAll('.user-info-container').forEach(el => el.remove());
  document.querySelectorAll('.logout-btn').forEach(el => el.remove());

  if (user) {
    // User is signed in
    // Desktop UI
    if (desktopSignInButton) {
      const desktopUserInfo = document.createElement('div');
      desktopUserInfo.className = 'flex items-center gap-2 user-info-container';
      desktopUserInfo.innerHTML = `
        <span class="truncate font-bold">${user.email}</span>
        <button type="button" class="logout-btn ml-2 px-3 py-1 rounded bg-[#e87a30] text-white font-bold hover:bg-[#d46a1e] transition-colors">Logout</button>
      `;
      desktopSignInButton.parentNode.insertBefore(desktopUserInfo, desktopSignInButton);
      desktopSignInButton.style.display = 'none'; // Hide the original Sign In button
      desktopUserInfo.querySelector('.logout-btn').onclick = handleLogout;
    }

    // Mobile UI
    if (mobileSignInButton) {
      const mobileUserInfo = document.createElement('div');
      mobileUserInfo.className = 'flex items-center gap-2 user-info-container';
      mobileUserInfo.innerHTML = `
        <span class="truncate font-bold">${user.email}</span>
        <button type="button" class="logout-btn ml-2 px-3 py-1 rounded bg-[#e87a30] text-white font-bold hover:bg-[#d46a1e] transition-colors">Logout</button>
      `;
      mobileSignInButton.parentNode.insertBefore(mobileUserInfo, mobileSignInButton);
      mobileSignInButton.style.display = 'none'; // Hide the original Sign In button
      mobileUserInfo.querySelector('.logout-btn').onclick = handleLogout;
    }

  } else {
    // User is signed out
    // Show Sign In buttons again
    if (desktopSignInButton) desktopSignInButton.style.display = '';
    if (mobileSignInButton) mobileSignInButton.style.display = '';
  }
}

// Event listeners for modal navigation
showRegisterBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hideLoginModal();
  showRegisterModal();
});

showLoginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  hideRegisterModal();
  showLoginModal();
});

closeLoginModal.addEventListener('click', hideLoginModal);
closeRegisterModal.addEventListener('click', hideRegisterModal);

// Attach event listeners to Sign In buttons initially
if (desktopSignInButton) {
  desktopSignInButton.addEventListener('click', showLoginModal);
}
if (mobileSignInButton) {
  mobileSignInButton.addEventListener('click', showLoginModal);
}

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  updateAuthUI(user);
});

// Export functions for use in other files
export { showLoginModal, handleLogout, auth }; 