// Cierra el menu desplegable de ediciones al hacer clic en una opcion o fuera de el
const dropdown = document.querySelector('.nav-dropdown');

if (dropdown) {
    // Cerrar al hacer clic en cualquier opcion del menu
    dropdown.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
        link.addEventListener('click', () => {
            dropdown.removeAttribute('open');
        });
    });

    // Cerrar al hacer clic en cualquier otra parte de la pagina
    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target)) {
            dropdown.removeAttribute('open');
        }
    });

    // Asegurar que quede cerrado si se navega atras/adelante (cache bfcache del navegador)
    window.addEventListener('pageshow', () => {
        dropdown.removeAttribute('open');
    });
}

// ══════════════════════════════════════════
// Ventanas legales: Política, Términos y FAQ
// Se abren con <dialog> sobre la misma página,
// sin crear archivos HTML adicionales.
// ══════════════════════════════════════════
const legalTriggers = document.querySelectorAll('[data-dialog]');
const legalDialogs = document.querySelectorAll('dialog.legal-modal');

legalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
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
