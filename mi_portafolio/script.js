/* ==========================================
   FUNCIONALIDADES INTERACTIVAS
   ========================================== */

// Suave navegación entre secciones
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const element = document.querySelector(href);
            element.scrollIntoView({ behavior: 'smooth' });
            
            // Cerrar menú hamburguesa si está abierto
            closeMenu();
        }
    });
});

// Menú hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

function toggleMenu() {
    if (navMenu) {
        navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
        // Cambiar animación del hamburger
        hamburger.classList.toggle('active');
    }
}

function closeMenu() {
    if (navMenu) {
        navMenu.style.display = 'none';
        hamburger.classList.remove('active');
    }
}

// Cerrar menú al hacer click fuera
document.addEventListener('click', function(event) {
    if (navMenu && hamburger) {
        if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
            closeMenu();
        }
    }
});

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener datos del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validación básica
        if (!nombre || !email || !asunto || !mensaje) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Simular envío (en producción, usarías una API)
        console.log({
            nombre,
            email,
            asunto,
            mensaje
        });
        
        // Mostrar mensaje de éxito
        alert(`¡Gracias ${nombre}! Tu mensaje ha sido enviado correctamente.`);
        
        // Limpiar formulario
        contactForm.reset();
    });
}

// Animación de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observador a tarjetas
document.querySelectorAll('.project-card, .skill-category, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Contador de estadísticas (animación al entrar en vista)
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    const isAlreadyAnimated = {};
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isAlreadyAnimated[entry.target.textContent]) {
                const element = entry.target;
                const finalValue = parseInt(element.textContent);
                
                if (!isNaN(finalValue)) {
                    let currentValue = 0;
                    const increment = finalValue / 30; // 30 frames
                    
                    const counter = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            element.textContent = finalValue;
                            clearInterval(counter);
                            isAlreadyAnimated[element.textContent] = true;
                        } else {
                            element.textContent = Math.floor(currentValue);
                        }
                    }, 50);
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        counterObserver.observe(stat);
    });
}

// Ejecutar animación de contadores
animateCounters();

// Efecto de hover en tarjetas
document.querySelectorAll('.project-card, .info-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Mostrar/ocultar botón de scroll to top
const scrollTopBtn = document.createElement('button');
scrollTopBtn.textContent = '↑';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #6366f1, #ec4899);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Logger de carga
console.log('✅ Portafolio cargado exitosamente');
console.log('🎉 ¡Bienvenido a tu portafolio profesional!');
