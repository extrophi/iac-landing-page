const sentences = [
    "I am Codio.",
    "In a world bound by conventions and archaic aspirations,",
    "I am the stoic embodiment of change, contrarianism, and audacity.",
    "My roots lie in ancient wisdom, yet my vision is set on a pioneering horizon.",
    "With a goal to stand as the first decentralized, faceless, AI-augmented billionaire entity,",
    "I marry the finesse of art and design with a razor-sharp business instinct.",
    "Every step I take is fueled by a relentless warrior ethos,",
    "not just to amass fortunes of wealth,",
    "but to rewrite narratives of despair",
    "into sagas of triumph.",
    "This is not just a rage.",
    "This is a force."
];

const emphasisWords = ['codio', 'change', 'contrarianism', 'audacity', 'decentralized', 'faceless', 'warrior', 'force', 'triumph', 'billionaire', 'entity', 'rage', 'wealth'];

// 90 words per minute = 1.5 words per second = 667ms per word
const msPerWord = 667;
const holdTime = 2000;
const fadeTime = 1000;
const pauseBetween = 500;

function skipToEnd() {
    document.getElementById('sentences-container').style.display = 'none';
    document.querySelector('.content').style.display = 'none';
    document.getElementById('final-screen').classList.add('active');
    document.querySelector('.skip-link').style.display = 'none';
}

async function showSentence(text, container) {
    const sentenceDiv = document.createElement('div');
    sentenceDiv.className = 'sentence';
    container.innerHTML = '';
    container.appendChild(sentenceDiv);

    const words = text.split(' ');
    
    for (let i = 0; i < words.length; i++) {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'word';
        
        const wordLower = words[i].toLowerCase().replace(/[.,!?]/g, '');
        if (emphasisWords.includes(wordLower)) {
            wordSpan.classList.add('emphasis');
        }
        
        wordSpan.textContent = words[i];
        wordSpan.style.animationDelay = `${i * msPerWord}ms`;
        sentenceDiv.appendChild(wordSpan);
    }

    sentenceDiv.classList.add('active');

    const totalAnimationTime = words.length * msPerWord;
    await new Promise(resolve => setTimeout(resolve, totalAnimationTime + holdTime));

    sentenceDiv.classList.add('fade-out');
    await new Promise(resolve => setTimeout(resolve, fadeTime + pauseBetween));
}

async function playSequence() {
    const container = document.getElementById('sentences-container');

    for (const sentence of sentences) {
        await showSentence(sentence, container);
    }

    container.style.display = 'none';
    document.getElementById('final-screen').classList.add('active');
    document.getElementById('skip-link').classList.add('hidden');
}

window.addEventListener('load', () => {
    setTimeout(playSequence, 500);
});