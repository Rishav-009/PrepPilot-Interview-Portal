
const greeting = document.getElementById("greeting");
const currentDate = document.getElementById("current-date");

const continueBtn = document.getElementById("btn-continue");

const goalCheckboxes = document.querySelectorAll(".goal-card input[type='checkbox']");
const goalProgress = document.getElementById("goal-progress");



function updateGreeting() {

    const currentHour = new Date().getHours();

    let message = "";

    if (currentHour < 12) {
        message = "Good Morning";
    }
    else if (currentHour < 17) {
        message = "Good Afternoon";
    }
    else if (currentHour < 21) {
        message = "Good Evening";
    }
    else {
        message = "Good Night";
    }

    greeting.textContent = `${message}, Rishav 👋`;
}


function updateDate() {

    const today = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    currentDate.textContent = today.toLocaleDateString("en-US", options);
}

function updateGoalProgress() {

    let completedGoals = 0;

    goalCheckboxes.forEach((checkbox) => {

        if (checkbox.checked) {
            completedGoals++;
        }

    });

    goalProgress.textContent = `${completedGoals} / ${goalCheckboxes.length} Completed`;

}



function saveGoals() {

    const goalStatus = [];

    goalCheckboxes.forEach((checkbox) => {

        goalStatus.push(checkbox.checked);

    });

    localStorage.setItem("goalStatus", JSON.stringify(goalStatus));

}



function loadGoals() {

    const savedGoals = JSON.parse(localStorage.getItem("goalStatus"));

    if (savedGoals) {

        goalCheckboxes.forEach((checkbox, index) => {

            checkbox.checked = savedGoals[index];

        });

    }

    updateGoalProgress();

}



goalCheckboxes.forEach((checkbox) => {

    checkbox.addEventListener("change", function () {

        updateGoalProgress();

        saveGoals();

    });

});



continueBtn.addEventListener("click", function () {

    window.location.href = "pages/tracker.html";

});


updateGreeting();

updateDate();

loadGoals();