const MISSION_ID = 3; // Update the mission ID or manage dynamically if needed

const writing_topics = [
    {
        id: 1,
        topic: "The importance of trees",
    },
    {
        id: 2,
        topic: "Space exploration and its benefits",
    },
    {
        id: 3,
        topic: "Adventures of childhood",
    },
    // Add more topics as necessary
];

var n_left = writing_topics.length;
const writingMissionsContainer = document.getElementById('writing-missions');
writing_topics.forEach(topic => {
    const topicElement = document.createElement('div');
    topicElement.classList.add('writing-mission-container');
    topicElement.innerHTML = `
        <div class="mission-topic">
            Write about: <span class="topic">${topic.topic}</span>
        </div>
        <textarea class="writing-area"></textarea>
        <button class="submit-button">Submit</button>
    `;
    topicElement.querySelector('.submit-button').onclick = function () {
        // Implement submission logic, perhaps sending text to server or storing locally
        alert("Submission received!");
        n_left -= 1;
        if (n_left === 0) {
            finishMission();
        }
    };
    writingMissionsContainer.appendChild(topicElement);
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