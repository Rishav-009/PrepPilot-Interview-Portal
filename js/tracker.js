const topicInputs = document.querySelectorAll(".topic-input");

const solvedProblems = document.getElementById("solved-problems");
const totalProblems = document.getElementById("total-problems");
const completionPercent = document.getElementById("completion-percent");

function updateTracker() {

    let solved = 0;
    let total = 0;

    topicInputs.forEach((input) => {

        const solvedCount = Number(input.value);
        const topicTotal = Number(input.dataset.total);

        solved += solvedCount;
        total += topicTotal;

        const progress =
            input.parentElement.nextElementSibling.querySelector(".progress-fill");

        progress.style.width = `${(solvedCount / topicTotal) * 100}%`;

    });

    solvedProblems.textContent = solved;

    totalProblems.textContent = total;

    completionPercent.textContent =
        `${Math.round((solved / total) * 100)}%`;

}

function saveTracker() {

    const trackerData = [];

    topicInputs.forEach((input) => {

        trackerData.push(input.value);

    });

    localStorage.setItem(
        "trackerData",
        JSON.stringify(trackerData)
    );

}

function loadTracker() {

    const savedTracker =
        JSON.parse(localStorage.getItem("trackerData"));

    if (savedTracker) {

        topicInputs.forEach((input, index) => {

            input.value = savedTracker[index];

        });

    }

    updateTracker();

}

topicInputs.forEach((input) => {

    input.addEventListener("input", function () {

        const max = Number(input.dataset.total);

        if (Number(input.value) > max) {

            input.value = max;

        }

        if (Number(input.value) < 0) {

            input.value = 0;

        }

        updateTracker();

        saveTracker();

    });

});

loadTracker();