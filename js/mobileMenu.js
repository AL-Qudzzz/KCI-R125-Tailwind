document.addEventListener('DOMContentLoaded', function() {
  var mobileMenuBtn = document.getElementById('mobileMenuBtn');
  var closeMobileMenu = document.getElementById('closeMobileMenu');
  var mobileMenu = document.getElementById('mobileMenu');
  if (!mobileMenuBtn) { return; }
  if (!closeMobileMenu) { return; }
  if (!mobileMenu) { return; }
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('translate-x-full');
  });
  closeMobileMenu.addEventListener('click', function() {
    mobileMenu.classList.add('translate-x-full');
  });
  document.querySelectorAll('#mobileMenu a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.add('translate-x-full');
    });
  });
}); 