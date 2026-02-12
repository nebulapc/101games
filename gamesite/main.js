const grid = document.getElementById("gameGrid");
const featuredGrid = document.getElementById("featuredGrid");
const searchInput = document.getElementById("searchInput");
const settingsBtn = document.getElementById("settingsBtn");
const settingsPanel = document.getElementById("settingsPanel");
const closeSettings = document.getElementById("closeSettings");

function createCard(game) {
    const card = document.createElement("div");
    card.className = "card";

    const path = game.link || game.file;

    card.onclick = () => openGame(game.name, path);

    let iconHTML = game.icon
        ? `<img src="${game.icon}" class="card-icon-img">`
        : `<div class="card-icon">🎮</div>`;

    card.innerHTML = `
        ${iconHTML}
        <div class="card-title">${game.name}</div>
    `;

    return card;
}

function renderGames(filter = "") {
    if (typeof gameData === "undefined") return;

    featuredGrid.innerHTML = "";
    grid.innerHTML = "";

    const featured = gameData.filter(g => g.featured);
    const normal = gameData.filter(g => !g.featured).sort((a,b) => a.name.localeCompare(b.name));

    featured.forEach(game => {
        if (!game.name.toLowerCase().includes(filter.toLowerCase())) return;
        featuredGrid.appendChild(createCard(game));
    });

    normal.forEach(game => {
        if (!game.name.toLowerCase().includes(filter.toLowerCase())) return;
        grid.appendChild(createCard(game));
    });
}

function openGame(title, url) {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("game-overlay").style.display = "flex";
    document.getElementById("gameTitleDisplay").innerText = title;
    document.getElementById("gameFrame").src = url;
}

function closeGame() {
    document.getElementById("gameFrame").src = "";
    document.getElementById("game-overlay").style.display = "none";
    document.getElementById("dashboard").style.display = "flex";
}

document.getElementById("backBtn").onclick = closeGame;
searchInput.onkeyup = () => renderGames(searchInput.value);

// Settings toggle
settingsBtn.onclick = () => settingsPanel.classList.add("active");
if(closeSettings) closeSettings.onclick = () => settingsPanel.classList.remove("active");

document.addEventListener("DOMContentLoaded", () => {
    const loading = document.getElementById("loading-screen");
    const dash = document.getElementById("dashboard");

    setTimeout(() => {
        loading.style.opacity = "0";
        setTimeout(() => {
            loading.style.display = "none";
            dash.style.display = "flex";
            dash.style.opacity = "1";
            document.body.style.overflowY = "auto";

            renderGames(); // auto-render all games
        }, 800);
    }, 1200);
});
