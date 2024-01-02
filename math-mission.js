document.querySelectorAll('.option').forEach(button => {
    button.onclick = function () {
        let chosenOption = this.textContent;
        let correctAnswer = ">" // This should be dynamic based on the problems
        if (chosenOption === correctAnswer) {
            alert("Correct!");
            // add 10 points to the total points
            const points = parseInt(localStorage.getItem('points'));
            localStorage.setItem('points', points + 10);
            // add 1 to the number of cleared missions
            const nClearedMissions = parseInt(localStorage.getItem('n-cleared-missions'));
            localStorage.setItem('n-cleared-missions', nClearedMissions + 1);
            window.location.href = 'index.html'; // Redirect to the original page
        } else {
            alert("Try again!");
        }
    };
});
