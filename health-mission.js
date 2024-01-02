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
            // add 10 points to the total points
            const points = parseInt(localStorage.getItem('points'));
            localStorage.setItem('points', points + 10);
            // add 1 to the number of cleared missions
            const nClearedMissions = parseInt(localStorage.getItem('n-cleared-missions'));
            localStorage.setItem('n-cleared-missions', nClearedMissions + 1);
            rewardMessage.classList.remove('hidden');
        }, 15000); // 10 seconds
    };

    // Next button click event
    nextButton.addEventListener('click', () => {
        // Logic to go back to the original page or load the next mission
        // This could be a redirect or simply loading new content
        window.location.href = 'index.html'; // Redirect to the original page
    });
});
