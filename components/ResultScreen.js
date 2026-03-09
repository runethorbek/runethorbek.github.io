export function renderResultScreen(container, results, onRestart) {
    // Only show top 3 for the podium
    const top3 = results.slice(0, 3);

    let podiumHTML = top3.map((party, index) => {
        return `
            <div class="party-result-card">
                <div class="party-rank">#${index + 1}</div>
                <div class="party-logo-circle" style="background-color: ${party.color};">
                    ${party.letter}
                </div>
                <div class="party-info">
                    <div class="party-name">${party.name}</div>
                    <div class="party-match-text">I er ${party.matchPercentage}% enige</div>
                </div>
                <div class="match-percentage">${party.matchPercentage}%</div>
                <div class="match-bar-container">
                    <div class="match-bar-fill" style="width: ${party.matchPercentage}%; background-color: ${party.color};"></div>
                </div>
            </div>
        `;
    }).join('');

    container.innerHTML = `
        <div class="glass-card result-screen">
            <div class="result-header">
                <span class="title-badge">Dit Resultat</span>
                <h2 class="main-title">Her er dine matchende partier</h2>
                <p class="subtitle">Baseret på dine svar til folketingsvalget 2026 er du mest enig med disse partier.</p>
            </div>
            
            <div class="podium">
                ${podiumHTML}
            </div>
            
            <button id="restart-btn" class="btn-secondary">Tag testen igen</button>
        </div>
    `;

    document.getElementById('restart-btn').addEventListener('click', onRestart);
}
