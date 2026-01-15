// ========================================
// MOBILE NAVIGATION
// ========================================
const burger = document.querySelector('[data-burger]');
const mobileNav = document.querySelector('[data-mobile-nav]');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', !isOpen);
    mobileNav.setAttribute('data-open', !isOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });
  
  // Close mobile nav when clicking a link
  const mobileLinks = mobileNav.querySelectorAll('.mobile-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ========================================
// COOKIE BANNER
// ========================================
const COOKIE_NAME = 'sgs_cookie_consent';
const cookieBanner = document.querySelector('[data-cookie-banner]');
const cookieCloseBtns = document.querySelectorAll('[data-cookie-close]');
const cookieAcceptBtn = document.querySelector('[data-cookie-accept]');
const cookieRejectBtn = document.querySelector('[data-cookie-reject]');

// Check if user has already made a choice
function getCookieConsent() {
  const value = document.cookie
    .split('; ')
    .find(row => row.startsWith(COOKIE_NAME + '='));
  return value ? value.split('=')[1] : null;
}

// Set cookie consent
function setCookieConsent(value) {
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
}

// Show banner if no consent given
function checkCookieBanner() {
  const consent = getCookieConsent();
  if (!consent && cookieBanner) {
    cookieBanner.removeAttribute('hidden');
  }
}

// Close banner
function closeBanner() {
  if (cookieBanner) {
    cookieBanner.setAttribute('hidden', '');
  }
}

// Accept all cookies
if (cookieAcceptBtn) {
  cookieAcceptBtn.addEventListener('click', () => {
    setCookieConsent('all');
    closeBanner();
    // Initialize analytics here if needed
    console.log('All cookies accepted');
  });
}

// Reject optional cookies
if (cookieRejectBtn) {
  cookieRejectBtn.addEventListener('click', () => {
    setCookieConsent('essential');
    closeBanner();
    console.log('Essential cookies only');
  });
}

// Close banner without saving preference
cookieCloseBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    closeBanner();
  });
});

// Check on page load
checkCookieBanner();

// ========================================
// FOOTER YEAR
// ========================================
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// FORM HANDLING (Basic client-side)
// ========================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!data.name || !data.email || !data.offer) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Here you would normally send the data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your request! We will get back to you soon.');
    contactForm.reset();
    
    // In production, replace the alert with proper server-side handling:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // })
    // .then(response => response.json())
    // .then(result => {
    //   // Handle success
    // })
    // .catch(error => {
    //   // Handle error
    // });
  });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll('.card, .stat, .faq-item, .dash-card');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (currentPath === linkPath || (currentPath === '/' && linkPath.includes('index.html'))) {
      link.classList.add('is-active');
    } else {
      link.classList.remove('is-active');
    }
  });
}

setActiveNavLink();

// ========================================
// RESIZE HANDLER
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Close mobile nav on resize to desktop
    if (window.innerWidth > 768) {
      if (burger) burger.setAttribute('aria-expanded', 'false');
      if (mobileNav) mobileNav.setAttribute('data-open', 'false');
      document.body.style.overflow = '';
    }
  }, 250);
});
