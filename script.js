document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("toggleTheme");
    const body = document.body;
    const loginModal = $('#loginModal');
    const logoutModal = $('#logoutModal');
    const loginTrigger = document.getElementById("loginTrigger");
    const logoutTrigger = document.getElementById("logoutTrigger");
    const loginForm = document.getElementById("loginForm");
    const logoutConfirm = document.getElementById("logoutConfirm");
    const formEventi = document.getElementById("formEventi");
    const elencoEventi = document.getElementById("elencoEventi");
    const loginFeedback = document.getElementById("loginFeedback");

    // Gestione Tema
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "light") {
        body.classList.remove("dark-theme");
        body.classList.add("light-theme");
        themeToggle.textContent = "Passa a Tema Scuro";
    } else {
        body.classList.remove("light-theme");
        body.classList.add("dark-theme");
        themeToggle.textContent = "Passa a Tema Chiaro";
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-theme");
        body.classList.toggle("light-theme");

        if (body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "Passa a Tema Chiaro";
        } else {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "Passa a Tema Scuro";
        }
        // Update event display based on theme
        updateEventTheme();
    });

    // Login e Logout
    loginTrigger.addEventListener("click", function () {
        loginModal.modal('show');
    });

    logoutTrigger.addEventListener("click", function () {
        logoutModal.modal('show');
    });

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "thomas.addamo" && password === "Radio123") {
            loginModal.modal('hide');
            formEventi.style.display = "block";
            loginFeedback.style.display = "none";
            document.getElementById("loginTrigger").style.display = "none";
            document.getElementById("logoutItem").style.display = "block";
            updateEventTheme(); // Update events after login
            elencoEventi.classList.add('animated', 'fadeIn'); // Aggiungi animazione per la lista eventi
        } else {
            loginFeedback.style.display = "block";
        }
    });

    logoutConfirm.addEventListener("click", function () {
        logoutModal.modal('hide');
        formEventi.style.display = "none";
        document.getElementById("loginTrigger").style.display = "block";
        document.getElementById("logoutItem").style.display = "none";
    });

    // Salvataggio Eventi nel localStorage
    function salvaEventi() {
        localStorage.setItem("eventi", elencoEventi.innerHTML);
    }

    function caricaEventi() {
        elencoEventi.innerHTML = localStorage.getItem("eventi") || "";
    }

    caricaEventi();

    formEventi.addEventListener("submit", function (e) {
        e.preventDefault();
        const titolo = document.getElementById("titoloEvento").value;
        const data = document.getElementById("dataEvento").value;
        const luogo = document.getElementById("luogoEvento").value;
        const orario = document.getElementById("orarioEvento").value;
        const descrizione = document.getElementById("descrizioneEvento").value;
        const partecipanti = document.getElementById("partecipantiEvento").value;

        if (titolo && data && luogo && orario && descrizione && partecipanti) {
            const nuovoEvento = `
                <li class="list-group-item">
                    <h4><i class="fas fa-microphone-alt"></i> ${titolo}</h4>
                    <p><i class="fas fa-calendar-day"></i> <strong>Data:</strong> ${data}</p>
                    <p><i class="fas fa-map-marker-alt"></i> <strong>Luogo:</strong> ${luogo}</p>
                    <p><i class="fas fa-clock"></i> <strong>Orario:</strong> ${orario}</p>
                    <p><i class="fas fa-info-circle"></i> <strong>Descrizione:</strong> ${descrizione}</p>
                    <p><i class="fas fa-users"></i> <strong>Partecipanti:</strong> ${partecipanti}</p>
                    <button class="btn btn-danger btn-sm rounded-pill rimuoviEvento" data-titolo="${titolo}">Rimuovi</button>
                    <a href="https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(titolo)}&location=${encodeURIComponent(luogo)}&dates=${new Date(data + ' ' + orario).toISOString().replace(/-|:|\.\d\d\d/g, '')}/${new Date(new Date(data + ' ' + orario).getTime() + 3600000).toISOString().replace(/-|:|\.\d\d\d/g, '')}&details=${encodeURIComponent(descrizione)}" class="btn btn-info btn-sm rounded-pill" target="_blank"><i class="fas fa-calendar-plus"></i> Aggiungi al Calendario</a>
                </li>
            `;
            elencoEventi.innerHTML += nuovoEvento;
            elencoEventi.classList.add('animated', 'fadeIn'); // Aggiungi animazione per la lista eventi
            salvaEventi();
            formEventi.reset();
            updateEventTheme(); // Update events after creation
        }
    });

    elencoEventi.addEventListener("click", function (e) {
        if (e.target.classList.contains("rimuoviEvento")) {
            e.target.parentElement.remove();
            salvaEventi();
        }
    });

    // Aggiorna il tema degli eventi
    function updateEventTheme() {
        const events = document.querySelectorAll('.list-group-item');
        events.forEach(event => {
            if (body.classList.contains("dark-theme")) {
                event.style.backgroundColor = "#1e1e1e";
                event.style.color = "#fff";
            } else {
                event.style.backgroundColor = "#f8f9fa";
                event.style.color = "#212529";
            }
        });
    }

    // Animazioni per le sezioni
    const sections = document.querySelectorAll('.section');
    window.addEventListener('scroll', () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= window.innerHeight - 100) {
                section.classList.add('active', 'animated', 'fadeIn');
            }
        });
    });
});
