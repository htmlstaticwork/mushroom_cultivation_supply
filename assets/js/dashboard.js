/**
 * dashboard.js
 * Dashboard specific logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  initTheme(); // Needs theme toggle logic since dashboard doesn't have main nav, we'll ensure main.js is loaded or provide it here. 
  // It's better to load main.js on dashboard pages too to avoid duplicating RTL/Theme logic, 
  // but let's be careful. The prompt says "main.js -> all site-wide JS". We will include main.js on dashboard pages for the toggles.
});

function initDashboardSidebar() {
  const toggleBtn = document.querySelector('.dashboard-toggle-btn');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const main = document.querySelector('.dashboard-main');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('active');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
          sidebar.classList.remove('active');
        }
      }
    });

    // Prevent clicks inside sidebar from closing it
    sidebar.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}
