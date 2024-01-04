const MISSION_ID = 4;

const words = [
    {
        word: "행복",
        given: "행",
        options: ["바", "복", "북", "비", "버"],
        correct: "복",
        explanation: "기쁠 때 느끼는 감정. 불행의 반댓말",
    },
    // Add more words as needed
];

const wordFillContainer = document.getElementById('word-fill-missions');
words.forEach(wordObj => {
    const missionElement = document.createElement('div');
    missionElement.classList.add('word-fill-container');
    missionElement.innerHTML = `
        <div class="explanation">${wordObj.explanation}</div>
        <div class="word">
            <span class="given-letter">${wordObj.given}</span>
            <span class="blank-letter">_</span>
        </div>
        <div class="options">
                ${wordObj.options.map(letter => `<button class="option">${letter}</button>`).join('')}
        </div>
    `;
    missionElement.querySelectorAll('.option').forEach(button => {
        button.onclick = function () {
            if (this.textContent === wordObj.correct) {
                alert("Correct!");
                finishMission();
            } else {
                alert("Try again!");
            }
        };
    });
    wordFillContainer.appendChild(missionElement);
});

function finishMission() {
    // add 10 points to the total points
    const points = parseInt(localStorage.getItem('points'));
    localStorage.setItem('points', points + 10);
    // add 1 to the number of cleared missions
    const nClearedMissions = parseInt(localStorage.getItem('n-cleared-missions'));
    localStorage.setItem('n-cleared-missions', nClearedMissions + 1);

    // make finish flag true
    var missions = JSON.parse(localStorage.getItem('missions'));
    missions[MISSION_ID - 1].finished = true;
    localStorage.setItem('missions', JSON.stringify(missions));

    window.location.href = '../';
}
