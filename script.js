let details = [];



function createcard(details) {
    const cointainer = document.body.querySelector(".cointainer");
    let view_str;
    if (details[2] < 1000) {
        view_str = details[2];
    }
    else if (details[2] < 1000000) {
        view_str = details[2] / 1000 + "K";
    }
    else {
        view_str = details[2] / 1000000 + "M";
    }
    let html =
        `<div class="card">
            <div class="image">
                <img src="https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw" alt="">
            </div>
            <div class="text">
                <h2>${details[0]}</h2>
                <p>${details[1]} . ${view_str} views . ${details[3]}</p>
            </div>
        </div>`
    cointainer.innerHTML += html;
}

const dataInput = document.querySelector(".data-input");

document.querySelector(".add_btn").addEventListener('click', addTask);

dataInput.addEventListener('keypress', (e) => e.key === 'Enter' && addTask());

function addTask() {

    const dataText = dataInput.value.trim();
    if (!dataText) return alert("Please enter a data!");

    details.push(dataText); // Store user input
    dataInput.value = ""; // Clear input field
    dataInput.focus(); // Keep input field active
    if(details.length === 0){
        dataInput.placeholder = "enter title";
    }
    if(details.length === 1){
        dataInput.placeholder = "enter channel";
    }
    if(details.length === 2){
        dataInput.placeholder = "enter views";
    }
    if(details.length === 3){
        dataInput.placeholder = "enter time ago";
    }
    if (details.length === 4) { // Only create a card when 4 inputs are collected
        createcard(details);
        details = []; // Reset for the next entry
    }

}
