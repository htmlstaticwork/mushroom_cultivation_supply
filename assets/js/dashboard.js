/**
 * dashboard.js
 * Dashboard specific logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardSidebar();
  // initTheme() is already handled in main.js to avoid double-toggling
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
