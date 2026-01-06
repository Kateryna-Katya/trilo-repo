/**
 * TRILO-REPO | CORE JAVASCRIPT
 * Образовательная платформа: Инновации на пальцах
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. ИНИЦИАЛИЗАЦИЯ ИКОНОК
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. МОБИЛЬНОЕ МЕНЮ (Бургер)
    const burger = document.getElementById('burger-toggle');
    const nav = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const body = document.body;

    const toggleMenu = () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        // Блокируем скролл при открытом меню
        body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    };

    if (burger && nav) {
        burger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Закрытие при клике на ссылку
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) toggleMenu();
            });
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', (e) => {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !burger.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    // 3. ЭФФЕКТЫ ХЕДЕРА ПРИ СКРОЛЛЕ
    const header = document.querySelector('.header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 4. ПАРАЛЛАКС ЭФФЕКТ В HERO (Mouse Move)
    const hero = document.querySelector('.hero');
    const heroBlob = document.querySelector('.hero__blob');
    
    if (hero && heroBlob) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 25;
            const moveY = (clientY - centerY) / 25;
            
            heroBlob.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });
    }

    // 5. ЛОГИКА ФОРМЫ (Валидация, Капча, AJAX)
    const contactForm = document.getElementById('contact-form');
    const phoneInput = document.getElementById('phone-input');
    const captchaText = document.getElementById('captcha-text');
    const captchaInput = document.getElementById('captcha-input');
    const formOk = document.getElementById('form-ok');

    let captchaAnswer = 0;

    // Генерация капчи
    const generateCaptcha = () => {
        if (captchaText) {
            const n1 = Math.floor(Math.random() * 10) + 1;
            const n2 = Math.floor(Math.random() * 10) + 2;
            captchaAnswer = n1 + n2;
            captchaText.innerText = `${n1} + ${n2} =`;
        }
    };

    generateCaptcha();

    // Валидация телефона (только цифры)
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // Обработка отправки
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Проверка капчи
            if (parseInt(captchaInput.value) !== captchaAnswer) {
                alert('Ошибка: Решите математический пример правильно.');
                generateCaptcha();
                captchaInput.value = '';
                return;
            }

            // Имитация отправки (AJAX)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'ОБРАБОТКА...';

            setTimeout(() => {
                contactForm.style.opacity = '0';
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formOk.style.display = 'block';
                    formOk.classList.add('animate__animated', 'animate__fadeIn');
                }, 300);
            }, 1500);
        });
    }

    // 6. COOKIE POPUP
    const cookiePopup = document.getElementById('cookie-popup');
    const cookieAccept = document.getElementById('cookie-accept');

    if (cookiePopup && !localStorage.getItem('trilo_repo_consent')) {
        setTimeout(() => {
            cookiePopup.classList.add('active');
        }, 3000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('trilo_repo_consent', 'true');
            cookiePopup.classList.remove('active');
        });
    }

    // 7. АКТИВНЫЕ ССЫЛКИ ПРИ СКРОЛЛЕ
    const sections = document.querySelectorAll('section[id]');
    const scrollSpy = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const link = document.querySelector(`.nav__link[href*=${sectionId}]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollSpy);
});