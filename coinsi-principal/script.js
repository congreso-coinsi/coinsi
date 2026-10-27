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
