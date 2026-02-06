const grid = document.getElementById("gameGrid");
const featuredGrid = document.getElementById("featuredGrid");
const searchInput = document.getElementById("searchInput");

function renderGames(filterText="") {
    grid.innerHTML = "";
    featuredGrid.innerHTML = "";

    gameData.forEach(game => {
        if (!game.name.toLowerCase().includes(filterText.toLowerCase())) return;

        const card = document.createElement("div");
        card.className = "card";

        const gamePath = game.link || game.file;
        card.onclick = () => openGame(game.name, gamePath);

        let iconHTML = game.icon
            ? `<img src="${game.icon}" class="card-icon-img">`
            : `<div class="card-icon">🎮</div>`;

        card.innerHTML = `
            ${iconHTML}
            <div class="card-title">${game.name}</div>
        `;

        if (game.featured) {
            featuredGrid.appendChild(card);
        } else {
            grid.appendChild(card);
        }
    });
}

function filterGames() {
    renderGames(searchInput.value);
}

function openGame(title, url) {
    document.getElementById("dashboard").style.display="none";
    document.getElementById("game-overlay").style.display="flex";
    document.getElementById("gameTitleDisplay").innerText = title;
    document.getElementById("gameFrame").src = url;
}

function closeGame() {
    document.getElementById("gameFrame").src="";
    document.getElementById("game-overlay").style.display="none";
    document.getElementById("dashboard").style.display="flex";
}

document.getElementById("backBtn").onclick = closeGame;
searchInput.onkeyup = filterGames;

document.addEventListener("DOMContentLoaded", () => {
    renderGames();

    const loading = document.getElementById("loading-screen");
    const dash = document.getElementById("dashboard");

    setTimeout(() => {
        loading.style.opacity="0";
        setTimeout(() => {
            loading.style.display="none";
            dash.style.display="flex";
            dash.style.opacity="1";

            // ✅ Enable scrolling after loader disappears
            document.body.style.overflowY = "auto";
        },1500);
    },2500);
});
