document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const icon = themeToggleBtn.querySelector('.icon');

    // 이전 선택한 테마가 있다면 가져오고, 없으면 시스템 설정 확인
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.textContent = '☀️';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.textContent = '🌙';
    }

    // 버튼 클릭 시 테마 전환 로직
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = 'light';

        if (currentTheme !== 'dark') {
            targetTheme = 'dark';
            icon.textContent = '☀️';
        } else {
            icon.textContent = '🌙';
        }

        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme); // 브라우저 새로고침 시에도 유지
    });
});

const emailCopyButton = document.querySelector(".email-copy-btn");

if (emailCopyButton) {
  emailCopyButton.addEventListener("click", async () => {
    const email = emailCopyButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);

      let toast = document.querySelector(".toast");

      if (!toast) {
        toast = document.createElement("div");
        toast.className = "toast";
        document.body.appendChild(toast);
      }

      toast.textContent = "이메일 주소가 복사되었습니다! 📋";
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 2200);
    } catch (error) {
      window.location.href = `mailto:${email}`;
    }
  });
}
