/**
 * main.js
 * Handles global interactions: Theme toggle, RTL toggle, Navigation drawer, Scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRTL();
  initNavbar();
  initAnimations();
});

// -- Theme Toggle --
function initTheme() {
  const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const storedTheme = localStorage.getItem('shroom_theme');
  
  const isDark = storedTheme === 'dark' || (!storedTheme && preferDark);
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isNowDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('shroom_theme', isNowDark ? 'dark' : 'light');
    });
  });
}

// -- RTL Toggle --
function initRTL() {
  const toggleBtns = document.querySelectorAll('.rtl-toggle-btn');
  const storedRTL = localStorage.getItem('shroom_rtl');
  
  const isRTL = storedRTL === 'true';
  
  function applyRTL(enable) {
    if (enable) {
      document.documentElement.setAttribute('dir', 'rtl');
      // Load rtl.css if not already present
      if (!document.getElementById('rtl-stylesheet')) {
        const link = document.createElement('link');
        link.id = 'rtl-stylesheet';
        link.rel = 'stylesheet';
        link.href = 'assets/css/rtl.css';
        document.head.appendChild(link);
      }
    } else {
      document.documentElement.removeAttribute('dir');
      const link = document.getElementById('rtl-stylesheet');
      if (link) {
        link.remove();
      }
    }
  }

  applyRTL(isRTL);

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isCurrentlyRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const willBeRTL = !isCurrentlyRTL;
      localStorage.setItem('shroom_rtl', willBeRTL.toString());
      applyRTL(willBeRTL);
    });
  });
}

// -- Navbar & Drawer --
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger-btn');
  const drawer = document.querySelector('.nav-drawer');
  const overlay = document.querySelector('.nav-drawer-overlay');
  const closeBtn = document.querySelector('.nav-drawer-close');

  // Sticky Navbar
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Drawer Toggle
  function openDrawer() {
    if(drawer && overlay) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if(drawer && overlay) {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
}

// -- Animations --
function initAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(el => observer.observe(el));
}
