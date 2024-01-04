const MISSION_ID = 1;

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('pose-video');
    const webcamVideo = document.getElementById('webcam-video');
    const rewardMessage = document.getElementById('reward-message');
    const nextButton = document.getElementById('next-button');

    // Access webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            webcamVideo.srcObject = stream;
        })
        .catch((err) => {
            console.error("Error accessing webcam", err);
        });

    // Set timeout for reward
    video.onplay = () => {
        setTimeout(() => {
            rewardMessage.classList.remove('hidden');
        }, 15000); // 15 seconds
    };

    // Next button click event
    nextButton.addEventListener('click', () => {
        finishMission();
    });
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
