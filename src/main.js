document.addEventListener('DOMContentLoaded', () => {
    // Инициализация иконок
    lucide.createIcons();

    // 1. МОБИЛЬНОЕ МЕНЮ (Исправлено)
    const burger = document.getElementById('burger-toggle');
    const nav = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);

    // Закрытие при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) toggleMenu();
        });
    });

    // 2. СКРОЛЛ ХЕДЕРА
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    // 3. ПАРАЛЛАКС В HERO
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.05;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.05;
        document.querySelector('.hero__blob').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // 4. КАПЧА (Математическая)
    const captchaText = document.getElementById('captcha-text');
    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;
    const answer = n1 + n2;
    if(captchaText) captchaText.innerText = `${n1} + ${n2} =`;

    // 5. ВАЛИДАЦИЯ ТЕЛЕФОНА
    const phoneInput = document.getElementById('phone-input');
    if(phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // 6. ОТПРАВКА ФОРМЫ
    const form = document.getElementById('contact-form');
    const successMsg = document.getElementById('form-ok');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const userAns = parseInt(document.getElementById('captcha-input').value);

            if(userAns !== answer) {
                alert('Неверный ответ капчи!');
                return;
            }

            // Имитация AJAX
            form.style.opacity = '0.5';
            setTimeout(() => {
                form.reset();
                form.style.display = 'none';
                successMsg.style.display = 'block';
            }, 1000);
        });
    }

    // 7. COOKIE POPUP
    const cookieBar = document.getElementById('cookie-bar');
    if(!localStorage.getItem('trilo_cookies')) {
        setTimeout(() => cookieBar.classList.add('active'), 2000);
    }
    document.getElementById('cookie-ok').addEventListener('click', () => {
        localStorage.setItem('trilo_cookies', 'true');
        cookieBar.classList.remove('active');
    });
});