document.addEventListener('DOMContentLoaded', () => {

    // MENÚ MÓVIL
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('show');
        });
    });
    
    navToggle.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {

            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            cards.forEach(card => {
                const category = card.getAttribute('data-cat');

                if (filterValue === 'Todos' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

        });
    });

    const buttons = document.querySelectorAll('.card button');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.card');
            const title = card.querySelector('.card__title').textContent;
            alert(`Cotizando: ${title}`);
            btn.textContent = '¡Solicitado!';
            btn.classList.add('btn--success');
            btn.disabled = true;
        });
    });

    const form = document.getElementById('contact-form');
    const msgBox = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const servicio = document.getElementById('servicio').value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre === '' || email === '' || servicio === '') {
            showMessage('Por favor, completa todos los campos obligatorios (*).', 'error');
            return;
        }

        if (!emailRegex.test(email)) {
            showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
            return;
        }

        showMessage('¡Solicitud enviada con éxito! Nos contactaremos pronto.', 'success');
        form.reset();
    });

    function showMessage(text, type) {
        msgBox.textContent = text;
        msgBox.className = `form__message ${type}`;
        msgBox.style.display = 'block';

        setTimeout(() => {
            msgBox.style.display = 'none';
            msgBox.className = 'form__message';
        }, 4000);
    }

});