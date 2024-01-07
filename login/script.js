document.getElementById('loginForm').addEventListener('submit', function(event){
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username && password){
        console.log("Login successful");
        // Proceed with login or further validation
        // save id and password to local storage
        localStorage.setItem('username', username);
        // Redirect to the home page
        window.location.href = '../';
    } else {
        console.log("Username and Password are required");
        // Show error or validation message
    }
});

// remove user state from local storage
localStorage.removeItem('username');
localStorage.removeItem('missions');
localStorage.removeItem('missions-to-solve');
localStorage.removeItem('points');
localStorage.removeItem('n-cleared-missions');

