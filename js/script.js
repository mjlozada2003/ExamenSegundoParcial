document.addEventListener('DOMContentLoaded', () => {

    // MENÚ MÓVIL
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    // FILTROS
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {

            // Activar botón
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

    // BOTONES "SOLICITAR"
    const buttons = document.querySelectorAll('.card button');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.closest('.card').querySelector('.card__title').textContent;
            alert(`Cotizando: ${title}`);
        });
    });

    // FORMULARIO
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