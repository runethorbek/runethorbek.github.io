import { renderStartScreen } from './components/StartScreen.js';
import { renderQuestionScreen } from './components/QuestionScreen.js';
import { renderResultScreen } from './components/ResultScreen.js';

const appElement = document.getElementById('app');

const statements = [
    {
        id: 's1',
        theme: 'Pensionsalder',
        text: 'Pensionsalderen skal fortsætte med at stige i takt med, at vi lever længere.',
        description: 'Flere partier ønsker at ændre den nuværende aftale om, at pensionsalderen automatisk stiger.'
    },
    {
        id: 's2',
        theme: 'Formueskat',
        text: 'Der skal indføres en ny skat på store formuer for at finansiere velfærd og reducere ulighed.',
        description: 'Der er delte meninger om, hvorvidt en formueskat vil gavne samfundet eller skade investeringer og vækst.'
    },
    {
        id: 's3',
        theme: 'Folkeskolen',
        text: 'Der skal indføres et centralt fastsat loft over hvor mange elever, der må være i en folkeskoleklasse.',
        description: 'Nogle partier vil sikre mindre klasser fra centralt hold, mens andre vil overlade det til de lokale skoler.'
    },
    {
        id: 's4',
        theme: 'Udviklingsbistand',
        text: 'Danmark skal skære i udviklingsbistanden til andre lande for at prioritere vores egen velfærd og sikkerhed.',
        description: 'Dette vil frigøre milliarder til dansk velfærd, men reducere Danmarks hjælp til verdens fattigste.'
    },
    {
        id: 's5',
        theme: 'Klima',
        text: 'Den grønne omstilling skal gå meget hurtigere, også selvom det koster samfundet og borgerne flere penge.',
        description: 'Skal klimaet prioriteres over at holde afgifter og skatter nede for den enkelte?'
    },
    {
        id: 's6',
        theme: 'Udlændingepolitik',
        text: 'Udlændingepolitikken i Danmark er ikke stram nok og bør strammes yderligere.',
        description: 'Skal Danmark modtage færre udlændinge og stille hårdere krav til dem, der er her?'
    }
];

const parties = [
    { letter: 'A', name: 'Socialdemokratiet', color: '#c7243c', scores: [-1, 2, 1, -2, 1, 1] },
    { letter: 'V', name: 'Venstre', color: '#014389', scores: [2, -2, -1, 1, 0, 1] },
    { letter: 'M', name: 'Moderaterne', color: '#8224b4', scores: [1, -2, -2, -2, 0, 0] },
    { letter: 'F', name: 'SF', color: '#e071a5', scores: [-1, 2, 2, -2, 2, -1] },
    { letter: 'I', name: 'Liberal Alliance', color: '#028da3', scores: [2, -2, -2, 2, -1, 0] },
    { letter: 'C', name: 'Konservative', color: '#9bb128', scores: [2, -2, -1, -2, 0, 1] },
    { letter: 'Æ', name: 'Danmarksdemokraterne', color: '#74b2dc', scores: [2, -2, 0, 2, -1, 2] },
    { letter: 'Ø', name: 'Enhedslisten', color: '#df4d18', scores: [-2, 2, 2, -2, 2, -2] },
    { letter: 'B', name: 'Radikale Venstre', color: '#e20080', scores: [1, -2, -1, -2, 2, -2] },
    { letter: 'O', name: 'Dansk Folkeparti', color: '#e7d420', scores: [-2, 0, 0, 2, -2, 2] },
    { letter: 'Å', name: 'Alternativet', color: '#00fe00', scores: [-2, 2, 2, -2, 2, -2] },
    { letter: 'H', name: 'Borgernes Parti', color: '#000000', scores: [-1, -2, -1, 2, -1, 2] }
];

let currentQuestionIndex = 0;
const userAnswers = [];

export function startApp() {
    renderStartScreen(appElement, startQuiz);
}

function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers.length = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < statements.length) {
        renderQuestionScreen(
            appElement, 
            statements[currentQuestionIndex], 
            currentQuestionIndex + 1, 
            statements.length, 
            handleAnswer
        );
    } else {
        calculateResults();
    }
}

function handleAnswer(score) {
    userAnswers.push(score);
    currentQuestionIndex++;
    if (currentQuestionIndex < statements.length) {
        // Adding a slight delay for animation
        setTimeout(() => {
            showQuestion();
        }, 300);
    } else {
        setTimeout(() => {
            calculateResults();
        }, 300);
    }
}

export function restartApp() {
    startQuiz();
}

function calculateResults() {
    // Calculate distance for each party
    // Max distance per question = 4 (e.g. 2 vs -2)
    // Total max distance = 24
    const maxPossibleDistance = statements.length * 4;

    const results = parties.map(party => {
        let totalDistance = 0;
        
        for (let i = 0; i < statements.length; i++) {
            // If user skipped (null/undefined), we don't penalize or just ignore this question?
            // Let's assume they must answer (which we enforced in UI).
            const diff = Math.abs(userAnswers[i] - party.scores[i]);
            totalDistance += diff;
        }

        // Convert distance to a match percentage (100% = 0 distance, 0% = max distance)
        const matchPercentage = Math.round(((maxPossibleDistance - totalDistance) / maxPossibleDistance) * 100);

        return {
            ...party,
            matchPercentage,
            distance: totalDistance
        };
    });

    // Sort by match percentage descending
    results.sort((a, b) => b.matchPercentage - a.matchPercentage);

    renderResultScreen(appElement, results, restartApp);
}

startApp();
