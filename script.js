document.addEventListener('DOMContentLoaded', function () {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.icon') : null;
    const savedTheme = localStorage.getItem('theme');

    function setTheme(theme) {
        root.dataset.theme = theme;
        if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
    }

    setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    themeToggle?.addEventListener('click', function () {
        setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    menuToggle?.addEventListener('click', function () { nav?.classList.toggle('open'); });
    document.querySelectorAll('nav a').forEach(function (link) {
        link.addEventListener('click', function () { nav?.classList.remove('open'); });
    });

    const modal = document.getElementById('experience-modal');
    const openButton = document.querySelector('.experience-toggle');
    const closeButtons = modal ? modal.querySelectorAll('[data-modal-close]') : [];

    function openModal() {
        if (!modal) return;
        modal.hidden = false;
        document.body.classList.add('modal-open');
        modal.querySelector('.modal-close')?.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        openButton?.focus();
    }

    openButton?.addEventListener('click', openModal);
    closeButtons.forEach(function (button) { button.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
    });
});
