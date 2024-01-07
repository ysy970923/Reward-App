const MISSION_ID = 6;

const mission = {
    problem: '라떼 하나와 녹차 두 잔을 주문해주세요!',
    answer: ['Latte', 'Green Tea', 'Green Tea'],
}

const problemDiv = document.getElementById('mission-problem');
problemDiv.innerText = mission.problem;

const menuItems = {
    coffee: [
        { name: "Espresso", price: 2.5 },
        { name: "Latte", price: 3.5 },
        // ... more coffee items
    ],
    tea: [
        { name: "Green Tea", price: 2 },
        { name: "Black Tea", price: 2 },
        // ... more tea items
    ],
    others: [
        { name: "Water", price: 1 },
        { name: "Soda", price: 2 },
        // ... more other items
    ]
};

var orderedItems = [];

function populateItems(category) {
    const items = menuItems[category];
    const display = document.getElementById('item-display');
    display.innerHTML = ''; // Clear previous items
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('grid-item');
        itemDiv.innerText = item.name;
        itemDiv.addEventListener('click', () => {
            addToOrder(item);
        });
        display.appendChild(itemDiv);
    });
}

// Setup category click handlers
document.querySelectorAll('.category').forEach(cat => {
    cat.addEventListener('click', function() {
        populateItems(this.dataset.category);
    });
});

// Optionally pre-load the first category
populateItems('coffee');

// Function to add items to the order summary
function addToOrder(item) {
    orderedItems.push(item);
    const orderSummaryDiv = document.getElementById('order-summary');
    // Implement logic to add item to summary and update total
    const itemDiv = document.createElement('div');
    itemDiv.innerText = `${item.name} - $${item.price}`;
    orderSummaryDiv.appendChild(itemDiv);
}

function submitOrder() {
    // Implement logic to check if the order is correct
    // If correct, call finishMission()
    // If not correct, show error message
    var correct = true;
    if (orderedItems.length != mission.answer.length) {
        correct = false;
    } else {
        for (var i = 0; i < orderedItems.length; i++) {
            if (orderedItems[i].name != mission.answer[i]) {
                correct = false;
                break;
            }
        }
    }
    if (correct) {
        alert('주문이 맞습니다! 미션을 완료합니다!');
        finishMission();
    } else {
        alert('주문이 틀렸습니다! 다시 확인해주세요!');
    }
}

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitOrder);

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