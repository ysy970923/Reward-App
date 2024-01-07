const MISSION_ID = 5;

const brightness_problem = {
    id: 1,
    brightness: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};

// 3x3 grid of brightness
const brightnessGrid = document.getElementById('brightness-grid');

// Shuffle the brightness array to randomize the mission
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
}

shuffleArray(brightness_problem.brightness);

// Create a 3x3 grid and append to brightnessBlock
brightness_problem.brightness.forEach((b, index) => {
    const block = document.createElement('div');
    block.style.background = `rgba(0, 0, 0, ${b / 10})`; // Adjust brightness
    block.id = `block-${b}`;
    block.dataset.brightness = b; // Store brightness in dataset for later comparison
    brightnessGrid.appendChild(block);
});

// Initialize variables to track mission progress
let expectedNextBrightness = 1;
let correctClicks = 0;

// Add event listener to the brightnessBlock
brightnessGrid.addEventListener('click', function(event) {
    const clickedBrightness = parseInt(event.target.dataset.brightness);
    if (clickedBrightness === expectedNextBrightness) {
        alert(`Correct! ${clickedBrightness} is next.`);
        expectedNextBrightness++;
        correctClicks++;
        // check mark the block
        event.target.innerHTML = '<i class="fas fa-check"></i>';

        // check if all blocks are clicked
        if (correctClicks === 9) {
            alert("Mission Complete! You've clicked all in the right order!");
            // Reset or advance to next mission
            finishMission();
        }
    } else {
        alert(`Incorrect. Try again! You clicked ${clickedBrightness}.`);
        // Optionally reset the mission or provide hints
    }
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