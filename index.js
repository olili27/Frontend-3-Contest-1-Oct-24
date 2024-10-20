"use-strict";

function createSpanWithTextContent(textContent) {
    let span = document.createElement("span");
    span.textContent = textContent;
    // span.classList.add()
    return span
}

function deleteTimer(deleteButton, noTimerElement) {
    deleteButton.parentNode.parentNode.remove();
    
    if (document.querySelectorAll(".new-timer").length === 0) {       
      noTimerElement.style.display = "block";
    } 
}

function createCurrentTimerContainer() {
    let timerDiv = document.createElement("div");
    timerDiv.classList.add("timer-container");
    timerDiv.classList.add("new-timer");

    let divWordsWrapper = document.createElement("div");
    divWordsWrapper.classList.add("words");

    let timeLeftSPan = createSpanWithTextContent("Time Left:");
    divWordsWrapper.appendChild(timeLeftSPan);

    let hoursSPan = createSpanWithTextContent("hh")
    divWordsWrapper.appendChild(hoursSPan);
    divWordsWrapper.r
    let colonSpan = createSpanWithTextContent(":")
    let colonSpan2 = colonSpan.cloneNode(true);
    divWordsWrapper.appendChild(colonSpan)

    let minutesSPan = createSpanWithTextContent("mm");
    divWordsWrapper.appendChild(minutesSPan);
    divWordsWrapper.appendChild(colonSpan2);

    let secondsSPan = createSpanWithTextContent("ss");
    divWordsWrapper.appendChild(secondsSPan);

    let timerIsUp = document.createElement("p");
    timerIsUp.textContent = "Timer is Up!";
    timerIsUp.classList.add("time-up-msg")
    divWordsWrapper.appendChild(timerIsUp);

    timerDiv.appendChild(divWordsWrapper);

    let deleteButtonContainer = document.createElement("div");
    deleteButtonContainer.classList.add("timer-btn-container");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButtonContainer.appendChild(deleteButton);
    timerDiv.appendChild(deleteButtonContainer)

    let noTimerElement = document.getElementById("no-timers");
    
    deleteButton.onclick = function() {
        deleteTimer(deleteButton, noTimerElement);
    }

    // timerDiv.onclick = function() {
    //     timerDiv.toggleAttribute("time-up");
    //     divWordsWrapper.style.display = "none";
    //     deleteButtonContainer.display = "none";
    //     timerIsUp.style.display = "block";
    // }

    noTimerElement.style.display = "none";
    return timerDiv;
}

function createTimer() {
    let currentTimersSection = document.querySelector(".current-timers");

    let newTimer = createCurrentTimerContainer()
    currentTimersSection.appendChild(newTimer)
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");

    let setTimerButton = document.getElementById("set");
    setTimerButton.onclick = createTimer
});
