document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENÚ MÓVIL ---
    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    // --- 2. MANIPULACIÓN DEL DOM: CATÁLOGO DINÁMICO ---
    const servicesData = [
        { id: 1, cat: "Desarrollo Web", title: "Sitio Web Corporativo", desc: "Páginas web a medida y optimizadas para empresas.", price: "$500" },
        { id: 2, cat: "Desarrollo Web", title: "Tienda Online", desc: "E-commerce completo con pasarelas de pago.", price: "$850" },
        { id: 3, cat: "Diseño UI/UX", title: "Prototipado App", desc: "Diseño de interfaces intuitivas y modernas para móviles.", price: "$300" },
        { id: 4, cat: "Diseño UI/UX", title: "Rediseño Web", desc: "Actualización visual y de experiencia de usuario.", price: "$400" },
        { id: 5, cat: "Marketing", title: "Gestión de Redes", desc: "Administración y creación de contenido mensual.", price: "$250/mes" },
        { id: 6, cat: "Marketing", title: "Campañas SEO/SEM", desc: "Posicionamiento en Google y publicidad en redes.", price: "$400/mes" }
    ];

    const grid = document.getElementById('services-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Función para pintar tarjetas en el DOM
    const renderServices = (data) => {
        grid.innerHTML = ''; // Limpiar grilla
        
        if(data.length === 0) {
            grid.innerHTML = '<p>No se encontraron servicios.</p>';
            return;
        }

        data.forEach(service => {
            const card = document.createElement('article');
            card.classList.add('card');
            card.innerHTML = `
                <p class="card__cat">${service.cat}</p>
                <h3 class="card__title">${service.title}</h3>
                <p class="card__desc">${service.desc}</p>
                <p class="card__price">${service.price}</p>
                <button class="btn btn--primary" onclick="alert('Cotizando: ${service.title}')">Solicitar</button>
            `;
            grid.appendChild(card);
        });
    };

    // Renderizado inicial
    renderServices(servicesData);

    // --- 3. LÓGICA DE FILTRADO ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remover clase activa
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const filterValue = e.target.getAttribute('data-filter');

            if (filterValue === 'Todos') {
                renderServices(servicesData);
            } else {
                const filtered = servicesData.filter(item => item.cat === filterValue);
                renderServices(filtered);
            }
        });
    });

    // --- 4. VALIDACIÓN DE FORMULARIO ---
    const form = document.getElementById('contact-form');
    const msgBox = document.getElementById('form-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar recarga de página

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const servicio = document.getElementById('servicio').value;

        // Expresión regular básica para validar correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre === '' || email === '' || servicio === '') {
            showMessage('Por favor, completa todos los campos obligatorios (*).', 'error');
            return;
        }

        if (!emailRegex.test(email)) {
            showMessage('Por favor, ingresa un correo electrónico válido.', 'error');
            return;
        }

        // Si todo está correcto
        showMessage('¡Solicitud enviada con éxito! Nos contactaremos pronto.', 'success');
        form.reset(); // Limpiar formulario
    });

    function showMessage(text, type) {
        msgBox.textContent = text;
        msgBox.className = `form__message ${type}`;
        
        // Quitar el mensaje después de 4 segundos
        setTimeout(() => {
            msgBox.style.display = 'none';
            msgBox.className = 'form__message';
        }, 4000);
    }
});