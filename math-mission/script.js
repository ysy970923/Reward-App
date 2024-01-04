const MISSION_ID = 2;

const math_problems = [
    {
        id: 1,
        problem1: "1 + 1",
        problem2: "1 + 2",
        answer: "<",
    },
    {
        id: 2,
        problem1: "2 + 1",
        problem2: "5 - 2",
        answer: "=",
    },
    {
        id: 3,
        problem1: "3 + 1",
        problem2: "2 + 3",
        answer: "<",
    },
];

var n_left = math_problems.length;
// add math problems to the DOM
const mathProblemsContainer = document.getElementById('math-missions');
math_problems.forEach(problem => {
    const problemElement = document.createElement('div');
    problemElement.classList.add('math-mission-container');
    problemElement.innerHTML = `
        <div class="problem-set">
            <span class="problem">${problem.problem1}</span>
            <span class="operator">?</span>
            <span class="problem">${problem.problem2}</span>
        </div>
        <div class="options">
            <button class="option">&gt;</button>
            <button class="option">=</button>
            <button class="option">&lt;</button>
        </div>
    `;
    problemElement.querySelectorAll('.option').forEach(button => {
        button.onclick = function () {
            let chosenOption = this.textContent;
            let correctAnswer = problem.answer;
            if (chosenOption === correctAnswer) {
                alert("Correct!");
                n_left -= 1;
                if (n_left === 0) {
                    finishMission();
                }
            } else {
                alert("Try again!");
            }
        };
        mathProblemsContainer.appendChild(problemElement);
    }
    )
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