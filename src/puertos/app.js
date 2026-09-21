let todosLosPuertos = [];

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
