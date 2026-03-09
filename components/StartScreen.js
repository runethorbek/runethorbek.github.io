export function renderStartScreen(container, onStart) {
    container.innerHTML = `
        <div class="glass-card start-screen">
            <span class="title-badge">Folketingsvalg 2026</span>
            <h1 class="main-title">Hvem er du mest enig med?</h1>
            <p class="subtitle">Tag testen baseret på de vigtigste politiske temaer for valget i 2026. Vi har analyseret partiernes holdninger, så du kan finde det parti, der matcher dig bedst.</p>
            <button id="start-btn" class="btn-primary">Start Valgtesten</button>
        </div>
    `;

    document.getElementById('start-btn').addEventListener('click', onStart);
}
