let todosLosPuertos = [];

const menuButton = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

if (menuButton && sidebar) {
    const aplicarEstadoMenu = (abierto) => {
        document.body.classList.toggle("sidebar-collapsed", !abierto);
        menuButton.setAttribute("aria-expanded", String(abierto));
        menuButton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
        sidebar.setAttribute("aria-hidden", String(!abierto));

        if (abierto) {
            sidebar.style.width = "190px";
            sidebar.style.padding = "22px 16px";
            sidebar.style.opacity = "1";
            sidebar.style.visibility = "visible";
            sidebar.style.transform = "translateX(0)";
            sidebar.style.pointerEvents = "auto";
            sidebar.style.borderRightWidth = "1px";
            sidebar.style.overflow = "visible";
        } else {
            sidebar.style.width = "0px";
            sidebar.style.padding = "0";
            sidebar.style.opacity = "0";
            sidebar.style.visibility = "hidden";
            sidebar.style.transform = "translateX(-100%)";
            sidebar.style.pointerEvents = "none";
            sidebar.style.borderRightWidth = "0";
            sidebar.style.overflow = "hidden";
        }
    };

    aplicarEstadoMenu(true);

    menuButton.addEventListener("click", () => {
        const abierto = menuButton.getAttribute("aria-expanded") === "true";
        aplicarEstadoMenu(!abierto);
    });
}

function getPuertoLogo(nombre) {
    const texto = nombre.toLowerCase();

    if (texto.includes("oiz")) return "monte-oiz";
    if (texto.includes("urkiola")) return "urkiola";
    if (texto.includes("zaldiaran")) return "zaldiaran";
    return "puerto-bloqueado";
}

function renderPuertos(data) {
    const contenedor = document.getElementById("puertosContainer");

    if (!contenedor) return;

    contenedor.innerHTML = data.map((puerto) => {
        const nombre = puerto.nombre || "Puerto sin nombre";
        const nivel = puerto.nivel || 1;
        const logo = puerto.logo || getPuertoLogo(nombre);

        return `
            <article class="puerto-item">
                <div class="puerto-item-image">
                    <img src="../../images/chapas/${logo}.png" alt="Chapa de ${nombre}">
                </div>
                <div class="puerto-item-content">
                    <span class="puerto-item-level">Nivel ${nivel}</span>
                    <h2>${nombre}</h2>
                    <dl class="puerto-item-details">
                        <div>
                            <dt>Distancia</dt>
                            <dd>${puerto.km || 0} km</dd>
                        </div>
                        <div>
                            <dt>Desnivel</dt>
                            <dd>${puerto.m_desnivel || 0} m</dd>
                        </div>
                    </dl>
                </div>
            </article>
        `;
    }).join("");
}

async function cargarPuertos() {
    const respuesta = await fetch("../../data/puertosPV.json");
    if (!respuesta.ok) {
        throw new Error(`No se pudo cargar la lista de puertos: ${respuesta.status}`);
    }

    todosLosPuertos = await respuesta.json();
    renderPuertos(todosLosPuertos);
}

cargarPuertos().catch((error) => {
    console.error(error);
    const contenedor = document.getElementById("puertosContainer");
    if (contenedor) {
        contenedor.innerHTML = "<p class=\"puertos-error\">No se han podido cargar los puertos.</p>";
    }
});
