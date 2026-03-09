export function renderQuestionScreen(container, question, currentIndex, totalQuestions, onAnswer) {
    const progressPercent = Math.round((currentIndex / totalQuestions) * 100);

    // Render the screen with animation class
    container.innerHTML = `
        <div class="glass-card question-screen" id="q-card">
            <div class="progress-container">
                <span>Spørgsmål ${currentIndex} af ${totalQuestions}</span>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${progressPercent}%"></div>
                </div>
                <span>${progressPercent}%</span>
            </div>
            
            <span class="theme-tag">${question.theme}</span>
            <h2 class="question-text">"${question.text}"</h2>
            <p class="question-desc">${question.description}</p>
            
            <div class="options-grid">
                <button class="btn-option btn-str-agree" data-score="2">
                    <div class="option-indicator"></div>
                    Meget enig
                </button>
                <button class="btn-option btn-agree" data-score="1">
                    <div class="option-indicator"></div>
                    Overvejende enig
                </button>
                <button class="btn-option btn-neu" data-score="0">
                    <div class="option-indicator"></div>
                    Hverken/eller (ved ikke)
                </button>
                <button class="btn-option btn-dis" data-score="-1">
                    <div class="option-indicator"></div>
                    Overvejende uenig
                </button>
                <button class="btn-option btn-str-dis" data-score="-2">
                    <div class="option-indicator"></div>
                    Meget uenig
                </button>
            </div>
        </div>
    `;

    const buttons = container.querySelectorAll('.btn-option');
    const qCard = document.getElementById('q-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Prevent multiple clicks
            buttons.forEach(b => b.disabled = true);

            // Add aesthetic active state
            btn.style.background = 'rgba(255,255,255,0.15)';
            btn.style.borderColor = 'white';

            const score = parseInt(btn.getAttribute('data-score'), 10);

            // Wait slightly so user sees their selection, then animate out
            setTimeout(() => {
                qCard.classList.add('animating-out');
                setTimeout(() => {
                    onAnswer(score);
                }, 300); // Matches CSS animation duration
            }, 300);
        });
    });
}
