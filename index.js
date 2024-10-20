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

function getNewTimerDetails() {
    let hours = document.getElementById("hours").textContent;
    let minutes = document.getElementById("minutes").textContent;
    let seconds = document.getElementById("seconds").textContent;

    return {hours, minutes, seconds};
}

function onSpanValueChange(span, defaultValue) {
    let textContent = parseInt(span.textContent.trim());

    if(isNaN(textContent)) {
        span.textContent = defaultValue
        return
    }

    let id = span.id;
console.log(id);

    if(id == "hours") {
        span.textContent = Math.min(textContent, 23)
    } else {
        span.textContent = Math.min(textContent, 59);
    }
}

function createCurrentTimerContainer() {
    let timerDiv = document.createElement("div");
    timerDiv.classList.add("timer-container");
    timerDiv.classList.add("new-timer");

    let {hours, minutes, seconds} = getNewTimerDetails()
    console.log(hours, minutes, seconds);
    
    let divWordsWrapper = document.createElement("div");
    divWordsWrapper.classList.add("words");

    let timeLeftSPan = createSpanWithTextContent("Time Left:");
    divWordsWrapper.appendChild(timeLeftSPan);

    let hoursSPan = createSpanWithTextContent(hours)
    divWordsWrapper.appendChild(hoursSPan);
    divWordsWrapper.r
    let colonSpan = createSpanWithTextContent(":")
    let colonSpan2 = colonSpan.cloneNode(true);
    divWordsWrapper.appendChild(colonSpan)

    let minutesSPan = createSpanWithTextContent(minutes);
    divWordsWrapper.appendChild(minutesSPan);
    divWordsWrapper.appendChild(colonSpan2);

    let secondsSPan = createSpanWithTextContent(seconds);
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
    let hoursSpan = document.getElementById("hours");
    let minutesSpan = document.getElementById("minutes");
    let secondsSpan = document.getElementById("seconds");

    hoursSpan.onblur = function() {
        onSpanValueChange(hoursSpan, "hh")
    }

    minutesSpan.onblur = function () {
      onSpanValueChange(minutesSpan, "mm");
    };

    secondsSpan.onblur = function () {
      onSpanValueChange(secondsSpan, "ss");
    };

    let setTimerButton = document.getElementById("set");
    setTimerButton.onclick = createTimer
});
