document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;

    /* =========================
       다크 모드 / 라이트 모드
    ========================= */
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.icon');
    const savedTheme = localStorage.getItem('theme');

    const setTheme = (theme) => {
        root.dataset.theme = theme;

        if (themeIcon) {
            themeIcon.textContent = theme === 'dark'
                ? '☀️'
                : '🌙';
        }

        localStorage.setItem('theme', theme);
    };

    const prefersDark =
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    themeToggle?.addEventListener('click', () => {
        const nextTheme =
            root.dataset.theme === 'dark'
                ? 'light'
                : 'dark';

        setTheme(nextTheme);
    });


    /* =========================
       모바일 메뉴
    ========================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    menuToggle?.addEventListener('click', () => {
        nav?.classList.toggle('open');
    });

    document.querySelectorAll('nav a').forEach((link) => {
        link.addEventListener('click', () => {
            nav?.classList.remove('open');
        });
    });


    /* =========================
       이메일 복사
    ========================= */
    document.querySelector('.email-copy-btn')?.addEventListener('click', async (event) => {
        const email = event.currentTarget.dataset.email;

        if (!email) return;

        try {
            await navigator.clipboard.writeText(email);
            showToast('이메일 주소가 복사되었습니다! 📋');
        } catch {
            window.location.href = `mailto:${email}`;
        }
    });


    /* =========================
       경험 상세 모달
    ========================= */
    const modal = document.getElementById('experience-modal');
    const openButton = document.querySelector('.experience-toggle');
    const closeButtons = modal
        ? modal.querySelectorAll('[data-modal-close]')
        : [];

    const openModal = () => {
        if (!modal) return;

        modal.hidden = false;
        document.body.classList.add('modal-open');

        modal.querySelector('.modal-close')?.focus();
    };

    const closeModal = () => {
        if (!modal) return;

        modal.hidden = true;
        document.body.classList.remove('modal-open');

        openButton?.focus();
    };

    openButton?.addEventListener('click', openModal);

    closeButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', (event) => {
        if (
            event.key === 'Escape' &&
            modal &&
            !modal.hidden
        ) {
            closeModal();
        }
    });
});


/* =========================
   토스트 메시지
========================= */
function showToast(message) {
    let toast = document.querySelector('.toast');

    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 2200);
}
