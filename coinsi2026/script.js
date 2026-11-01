(function () {
    'use strict';

    /* ============================================================
       Cuenta regresiva
       Fecha objetivo: 22 de noviembre de 2026, 09:00 (GMT-5).
       Para cambiar la fecha, edita solo esta línea.
       ============================================================ */
    var targetDate = new Date('2026-11-22T09:00:00-05:00').getTime();

    var countdown = {
        days: document.getElementById('cd-days'),
        hours: document.getElementById('cd-hours'),
        minutes: document.getElementById('cd-minutes'),
        seconds: document.getElementById('cd-seconds')
    };

    var countdownNote = document.querySelector('.countdown-note');
    var countdownTimer = null;

    function twoDigits(value) {
        return String(value).padStart(2, '0');
    }

    function updateCountdown() {
        var difference = targetDate - Date.now();

        if (difference <= 0) {
            countdown.days.textContent = '00';
            countdown.hours.textContent = '00';
            countdown.minutes.textContent = '00';
            countdown.seconds.textContent = '00';

            if (countdownNote) {
                countdownNote.textContent = 'El congreso ha comenzado. ¡Bienvenidos!';
            }

            if (countdownTimer) {
                clearInterval(countdownTimer);
            }
            return;
        }

        var days = Math.floor(difference / 86400000);
        var hours = Math.floor((difference % 86400000) / 3600000);
        var minutes = Math.floor((difference % 3600000) / 60000);
        var seconds = Math.floor((difference % 60000) / 1000);

        countdown.days.textContent = twoDigits(days);
        countdown.hours.textContent = twoDigits(hours);
        countdown.minutes.textContent = twoDigits(minutes);
        countdown.seconds.textContent = twoDigits(seconds);
    }

    if (countdown.days && countdown.hours && countdown.minutes && countdown.seconds) {
        updateCountdown();
        countdownTimer = setInterval(updateCountdown, 1000);
    }

    /* ============================================================
       Menú móvil
       ============================================================ */
    var header = document.querySelector('.site-header');
    var nav = document.getElementById('nav-principal');
    var navToggle = document.querySelector('.nav-toggle');

    function closeNav() {
        if (!nav || !navToggle) return;
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menú');
    }

    if (header && nav && navToggle) {
        navToggle.addEventListener('click', function () {
            var isOpen = nav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeNav);
        });

        document.addEventListener('click', function (event) {
            if (nav.classList.contains('is-open') && !header.contains(event.target)) {
                closeNav();
            }
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeNav();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 1040) {
                closeNav();
            }
        });
    }

    /* ============================================================
       Desplegable de ediciones
       ============================================================ */
    document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
        dropdown.querySelectorAll('.nav-dropdown-menu a').forEach(function (link) {
            link.addEventListener('click', function () {
                dropdown.removeAttribute('open');
            });
        });

        document.addEventListener('click', function (event) {
            if (!dropdown.contains(event.target)) {
                dropdown.removeAttribute('open');
            }
        });
    });

    /* ============================================================
       Pestañas del programa
       ============================================================ */
    var tabList = document.querySelector('[role="tablist"]');

    if (tabList) {
        var tabs = Array.prototype.slice.call(tabList.querySelectorAll('[role="tab"]'));
        var panels = tabs.map(function (tab) {
            return document.getElementById(tab.getAttribute('aria-controls'));
        });

        function activateTab(index, focusTab) {
            tabs.forEach(function (tab, position) {
                var isSelected = position === index;
                tab.setAttribute('aria-selected', String(isSelected));
                tab.tabIndex = isSelected ? 0 : -1;

                if (panels[position]) {
                    panels[position].hidden = !isSelected;
                }
            });

            if (focusTab) {
                tabs[index].focus();
            }
        }

        tabs.forEach(function (tab, index) {
            tab.addEventListener('click', function () {
                activateTab(index, false);
            });

            tab.addEventListener('keydown', function (event) {
                var nextIndex = null;

                if (event.key === 'ArrowRight') {
                    nextIndex = (index + 1) % tabs.length;
                } else if (event.key === 'ArrowLeft') {
                    nextIndex = (index - 1 + tabs.length) % tabs.length;
                } else if (event.key === 'Home') {
                    nextIndex = 0;
                } else if (event.key === 'End') {
                    nextIndex = tabs.length - 1;
                }

                if (nextIndex !== null) {
                    event.preventDefault();
                    activateTab(nextIndex, true);
                }
            });
        });
    }

    /* ============================================================
       Ventanas legales
       ============================================================ */
    var dialogTriggers = document.querySelectorAll('[data-dialog]');
    var dialogs = document.querySelectorAll('dialog.legal-modal');

    dialogTriggers.forEach(function (trigger) {
        trigger.addEventListener('click', function () {
            var dialog = document.getElementById(trigger.dataset.dialog);
            if (!dialog) return;

            dialog.showModal();
            document.body.classList.add('modal-open');
        });
    });

    dialogs.forEach(function (dialog) {
        var closeButton = dialog.querySelector('.legal-close');

        if (closeButton) {
            closeButton.addEventListener('click', function () {
                dialog.close();
            });
        }

        dialog.addEventListener('click', function (event) {
            if (event.target === dialog) {
                dialog.close();
            }
        });

        dialog.addEventListener('close', function () {
            document.body.classList.remove('modal-open');
        });
    });

    /* ============================================================
       Enlace activo según la sección visible
       ============================================================ */
    var navLinks = Array.prototype.slice.call(
        document.querySelectorAll('.nav > a[href^="#"]:not(.nav-cta)')
    );

    var navSections = navLinks.map(function (link) {
        return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);

    if ('IntersectionObserver' in window && navSections.length) {
        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                navLinks.forEach(function (link) {
                    link.classList.toggle(
                        'is-active',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            });
        }, {
            rootMargin: '-45% 0px -50% 0px',
            threshold: 0
        });

        navSections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

})();
