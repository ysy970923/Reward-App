redirectIfNotLoggedIn();

loadPoints();
loadMissions();

function redirectIfNotLoggedIn() {
    if (!localStorage.getItem('username')) {
        window.location.href = '../login/';
    }
}

function updateProgress(points, maxPoints) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - points / maxPoints * circumference;
    circle.style.strokeDashoffset = offset;
}

// TODO: fix when server is ready
function loadPoints() {
    // if it's the first time the user is visiting the site, save the points to local storage
    if (!localStorage.getItem('points')) {
        localStorage.setItem('points', 0);
    }

    if (!localStorage.getItem('n-cleared-missions')) {
        localStorage.setItem('n-cleared-missions', 0);
    }
    const pointsContainer = document.getElementById('points');
    const nClearedMissionsContainer = document.getElementById('n-cleared-missions');

    const points = parseInt(localStorage.getItem('points'));
    const nClearedMissions = parseInt(localStorage.getItem('n-cleared-missions'));
    pointsContainer.innerHTML = points;
    nClearedMissionsContainer.innerHTML = `+${nClearedMissions}`;
    updateProgress(points, 1000);
}

function loadMissions() {
    // if it's the first time the user is visiting the site, save missions to local storage
    if (!localStorage.getItem('missions')) {
        var all_missions = [
            { id: 1, title: '스트레칭!', points: 10, url: 'health-mission', finished: false },
            { id: 2, title: '사칙 연산!', points: 10, url: 'math-mission', finished: false },
            { id: 3, title: '글 쓰기', points: 10, url: 'writing-mission', finished: false },
            { id: 4, title: '단어 완성하기', points: 10, url: 'word-fill-mission', finished: false },
            { id: 5, title: '밝기 구별하기', points: 10, url: 'brightness-mission', finished: false },
            { id: 6, title: '키오스크 주문하기', points: 10, url: 'kiosk-mission', finished: false },
        ];
        localStorage.setItem('missions', JSON.stringify(all_missions));

        // initially set all missions to solve
        localStorage.setItem('missions-to-solve', JSON.stringify(Array.from(Array(all_missions.length), (_, i) => i + 1)));
    }

    // if mission in missions-to-solve is finished, remove it from missions-to-solve, add a new mission to missions-to-solve
    var missions = JSON.parse(localStorage.getItem('missions'));
    var missionsToSolve = JSON.parse(localStorage.getItem('missions-to-solve'));

    missionsToSolve.forEach(mission_id => {
        if (missions[mission_id - 1].finished) {
            missionsToSolve.splice(missionsToSolve.indexOf(mission_id), 1);
        }
    });

    if (missionsToSolve.length == 0) {
        alert("모든 미션을 완료했습니다! 축하합니다!");
        alert("다시 시작합니다!");
        missionsToSolve = Array.from(Array(missions.length), (_, i) => i + 1);
        // reset missions
        missions.forEach(mission => {
            mission.finished = false;
        });
    }

    localStorage.setItem('missions', JSON.stringify(missions));
    localStorage.setItem('missions-to-solve', JSON.stringify(missionsToSolve));

    const missionsContainer = document.getElementById('missions');
    missionsContainer.innerHTML = '';
    missions.forEach(mission => {
        if (missionsToSolve.includes(mission.id)) {
            showMission(mission);
        }
    });
}

function showMission(mission) {
    const missionsContainer = document.getElementById('missions');
    const missionElement = document.createElement('div');
    missionElement.classList.add('mission');
    missionElement.innerHTML = `
        <h3>${mission.title}</h3>
        <div>+ ${mission.points} 포인트</div>
    `;
    missionElement.addEventListener('click', () => {
        // Logic to go to the mission page
        window.location.href = mission.url + '/';
    });

    missionsContainer.appendChild(missionElement);
}