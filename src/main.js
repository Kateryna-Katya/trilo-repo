document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. Мобильное меню
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // 2. Скролл хедера
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('header--scrolled', window.scrollY > 50);
    });

    // 3. Интерактив в Hero (Параллакс мыши)
    const hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        document.querySelector('.hero__blob').style.transform = `translate(${x * 50}px, ${y * 50}px)`;
    });

    // 4. Капча
    const captchaQ = document.getElementById('captcha-question');
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const correctAnswer = num1 + num2;
    captchaQ.innerText = `${num1} + ${num2} = `;

    // 5. Валидация телефона (только цифры)
    const phoneInput = document.getElementById('phone-input');
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // 6. Отправка формы (AJAX имитация)
    const form = document.getElementById('main-form');
    const formMsg = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userAnswer = parseInt(document.getElementById('captcha-answer').value);

        if (userAnswer !== correctAnswer) {
            alert('Ошибка в капче!');
            return;
        }

        form.style.opacity = '0.5';
        form.style.pointerEvents = 'none';

        setTimeout(() => {
            form.reset();
            form.style.display = 'none';
            formMsg.innerText = 'Спасибо! Мы свяжемся с вами в течение 15 минут.';
            formMsg.classList.add('success');
        }, 1500);
    });

    // 7. Cookie Popup
    if (!localStorage.getItem('cookieAccepted')) {
        const popup = document.getElementById('cookie-popup');
        popup.classList.add('active');
        document.getElementById('cookie-accept').addEventListener('click', () => {
            localStorage.setItem('cookieAccepted', 'true');
            popup.classList.remove('active');
        });
    }
});