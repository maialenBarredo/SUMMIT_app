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

let todosLosPuertos = [];

function getPuertoLogo(nombre) {
    const texto = nombre.toLowerCase();

    if (texto.includes("oiz")) return "monte-oiz";
    if (texto.includes("urkiola")) return "urkiola";
    return "puerto-bloqueado";
}

function renderParches(data) {
    const contenedor = document.getElementById("parchesContainer");

    if (!contenedor) return;

    contenedor.innerHTML = data.map((puerto) => {
        const nombre = puerto.nombre || "Puerto";
        const nivel = puerto.nivel || 1;
        const km = puerto.km || 0;
        const desnivel = puerto.m_desnivel || 0;
        const logo = puerto.logo || getPuertoLogo(nombre);
        const fecha = puerto.fecha_conseguido || puerto.fecha || "Sin registrar";
        const tiempo = puerto.tiempo || puerto.tiempo_subida || "Sin registrar";

        return `
            <article class="puerto" data-nivel="${nivel}" tabindex="0" role="button" aria-pressed="false" aria-label="Ver información de ${nombre}">
                <div class="puertoCard">
                    <div class="puertoCara puertoFrontal">
                        <div class="puertoLogoWrap">
                            <img src="../../images/chapas/${logo}.png" alt="${nombre}" class="chapa">
                        </div>
                        <div class="puertoInfo">
                            <h3>${nombre}</h3>
                            <p class="nivelBadge">Nivel ${nivel}</p>
                            <p>${km} km · ${desnivel} m</p>
                        </div>
                    </div>
                    <div class="puertoCara puertoTrasero" aria-hidden="true">
                        <span class="puertoBackKicker">Puerto conquistado</span>
                        <h3>${nombre}</h3>
                        <dl class="puertoDetalle">
                            <div><dt>Conseguido</dt><dd>${fecha}</dd></div>
                            <div><dt>Tiempo</dt><dd>${tiempo}</dd></div>
                            <div><dt>Distancia</dt><dd>${km} km</dd></div>
                            <div><dt>Desnivel</dt><dd>${desnivel} m</dd></div>
                        </dl>
                        <span class="puertoBackHint">Clica para volver</span>
                    </div>
                </div>
            </article>
        `;
    }).join("");

    contenedor.querySelectorAll(".puerto").forEach((tarjeta) => {
        const alternarGiro = () => {
            const girada = tarjeta.classList.toggle("is-flipped");
            tarjeta.setAttribute("aria-pressed", String(girada));
            tarjeta.querySelector(".puertoTrasero").setAttribute("aria-hidden", String(!girada));
        };

        tarjeta.addEventListener("click", alternarGiro);
        tarjeta.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                alternarGiro();
            }
        });
    });
}

function filtrarParches(nivel) {
    if (!todosLosPuertos.length) return;

    const lista = nivel === "todos"
        ? todosLosPuertos
        : todosLosPuertos.filter((puerto) => Number(puerto.nivel) === Number(nivel));

    renderParches(lista);
}

function activarBotonNivel(nivel) {
    const clasesPorNivel = {
        1: "levelOne-button",
        2: "levelTwo-button",
        3: "levelThree-button",
        4: "levelFour-button"
    };

    document.querySelectorAll(".filtroNiveles a").forEach((boton) => {
        const activo = boton.classList.contains("levelAll-button") && nivel === "todos"
            || boton.classList.contains(clasesPorNivel[nivel]) && nivel !== "todos";

        boton.classList.toggle("is-active", activo);
    });
}

function bindFiltros() {
    document.querySelectorAll(".filtroNiveles a").forEach((boton) => {
        boton.addEventListener("click", (event) => {
            event.preventDefault();

            const href = boton.getAttribute("href") || "#todos";
            const nivel = href.includes("nivel")
                ? href.replace("#nivel", "")
                : "todos";

            activarBotonNivel(nivel);
            filtrarParches(nivel);
        });
    });
}

async function cargarPuertos() {
    try {
        const rutaDatos = new URL("../../data/puertosPV.json", document.baseURI);
        const respuesta = await fetch(rutaDatos);

        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar ${rutaDatos.pathname}: ${respuesta.status}`);
        }

        const data = await respuesta.json();

        if (!Array.isArray(data)) {
            throw new Error("El archivo de puertos debe contener una lista");
        }

        todosLosPuertos = data;
        bindFiltros();
        activarBotonNivel("todos");
        filtrarParches("todos");
    } catch (error) {
        console.error("No se pudieron cargar los puertos desde data/puertosPV.json", error);
        todosLosPuertos = puertoFallback;
        bindFiltros();
        activarBotonNivel("todos");
        filtrarParches("todos");
    }
}

cargarPuertos();