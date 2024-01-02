// Example missions data
const missions = [
    { id: 1, title: '스트레칭!', points: 10, url: 'health-mission.html' },
    { id: 2, title: '사칙 연산!', points: 10, url: 'math-mission.html' },
];

// if it's the first time the user is visiting the site, save the points to local storage
if (!localStorage.getItem('points')) {
    localStorage.setItem('points', 0);
}

if (!localStorage.getItem('n-cleared-missions')) {
    localStorage.setItem('n-cleared-missions', 0);
}

// Load points into the DOM
const pointsContainer = document.getElementById('points');
pointsContainer.innerHTML = localStorage.getItem('points');
updateProgress(localStorage.getItem('points'), 100);

// Load number of cleared missions into the DOM
const nClearedMissionsContainer = document.getElementById('n-cleared-missions');
nClearedMissionsContainer.innerHTML = `+${localStorage.getItem('n-cleared-missions')}`;

// Load missions into the DOM
const missionsContainer = document.getElementById('missions');
missions.forEach(mission => {
    const missionElement = document.createElement('div');
    missionElement.classList.add('mission');
    missionElement.innerHTML = `
        <h3>${mission.title}</h3>
        <div>+ ${mission.points} 포인트</div>
    `;
    missionElement.addEventListener('click', () => {
        // Logic to go to the mission page
        window.location.href = mission.url;
    });
    missionsContainer.appendChild(missionElement);
});

function updateProgress(points, maxPoints) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
  
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
  
    const offset = circumference - points / maxPoints * circumference;
    circle.style.strokeDashoffset = offset;
}