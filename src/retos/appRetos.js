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
