// Manejo de Pestañas (Tabs) Generales
function switchTab(evt, tabId) {
    const tabContents = evt.currentTarget.parentElement.parentElement.querySelectorAll('.tab-content');
    const tabButtons = evt.currentTarget.parentElement.querySelectorAll('.tab-btn');

    tabContents.forEach(content => content.classList.remove('active'));
    tabButtons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Menú Móvil
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                navLinks.classList.remove('active');
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
// ══════════════════════════════════════════
// Ventanas legales: Política, Términos y FAQ
// ══════════════════════════════════════════
const legalTriggers = document.querySelectorAll('[data-dialog]');
const legalDialogs = document.querySelectorAll('dialog.legal-modal');

legalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const dialog = document.getElementById(trigger.dataset.dialog);
        if (!dialog) return;

        dialog.showModal();
        document.body.classList.add('modal-abierto');
    });
});

legalDialogs.forEach((dialog) => {
    const closeButton = dialog.querySelector('.legal-modal-cerrar');

    if (closeButton) {
        closeButton.addEventListener('click', () => dialog.close());
    }

    // Cerrar al hacer clic fuera de la ventana (sobre el fondo oscuro)
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });

    // Restaurar el scroll al cerrar (incluye la tecla Escape)
    dialog.addEventListener('close', () => {
        const anotherOpen = document.querySelector('dialog.legal-modal[open]');
        if (!anotherOpen) {
            document.body.classList.remove('modal-abierto');
        }
    });
});