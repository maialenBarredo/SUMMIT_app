const puertoFallback = [
    {
        nombre: "Monte Oiz (desde Iurreta)",
        nivel: 1,
        km: 14.9,
        m_desnivel: 891,
        logo: "monte-oiz"
    },
    {
        nombre: "Urkiola (desde Mañaria)",
        nivel: 1,
        km: 6.1,
        m_desnivel: 554,
        logo: "urkiola"
    },
    {
        nombre: "Arrate (desde Eibar por Azitain)",
        nivel: 1,
        km: 5.0,
        m_desnivel: 435,
        logo: "puerto-bloqueado"
    }
];

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

        return `
            <article class="puerto" data-nivel="${nivel}">
                <div class="puertoLogoWrap">
                    <img src="../images/chapas/${logo}.png" alt="${nombre}" class="chapa">
                </div>
                <div class="puertoInfo">
                    <h3>${nombre}</h3>
                    <p class="nivelBadge">Nivel ${nivel}</p>
                    <p>${km} km · ${desnivel} m</p>
                </div>
            </article>
        `;
    }).join("");
}

function filtrarParches(nivel) {
    if (!todosLosPuertos.length) return;

    const lista = nivel === "todos"
        ? todosLosPuertos
        : todosLosPuertos.filter((puerto) => Number(puerto.nivel) === Number(nivel));

    renderParches(lista);
}

function activarBotonNivel(nivel) {
    document.querySelectorAll(".filtroNiveles a").forEach((boton) => {
        const activo = boton.classList.contains("levelAll-button") && nivel === "todos"
            || boton.classList.contains(`level${nivel}-button`) && nivel !== "todos";

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
        const respuesta = await fetch("../data/puertosPV.json");
        const data = await respuesta.json();
        todosLosPuertos = data;
        bindFiltros();
        filtrarParches("todos");
    } catch (error) {
        todosLosPuertos = puertoFallback;
        bindFiltros();
        filtrarParches("todos");
    }
}

cargarPuertos();