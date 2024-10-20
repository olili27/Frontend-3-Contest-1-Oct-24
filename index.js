"use-strict";

function createSpanWithTextContent(textContent) {
    let span = document.createElement("span");
    span.textContent = textContent;
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

    if(id == "hours") {
        span.textContent = Math.min(textContent, 23)
    } else {
        span.textContent = Math.min(textContent, 59);
    }
}

function convertToMilliSeconds(unit, value) {
    value = parseInt(value);

    if(unit === "hh") {
        return value * 60 * 60 * 60;
    } else if(unit === "mm") {
        return value * 60 * 60;
    } else if(unit === "ss") {
        return value * 60;
    }
}

function createNewTimerContainer() {
    let timerDiv = document.createElement("div");
    timerDiv.classList.add("timer-container");
    timerDiv.classList.add("new-timer");

    let {hours, minutes, seconds} = getNewTimerDetails()
    
    let divWordsWrapper = document.createElement("div");
    divWordsWrapper.classList.add("words");

    let timeLeftSPan = createSpanWithTextContent("Time Left:");
    divWordsWrapper.appendChild(timeLeftSPan);
    
    if(!isValid(hours) || !isValid(minutes) || !isValid(seconds)) {
        return;
    }

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

    let newTimer = createNewTimerContainer()
    currentTimersSection.appendChild(newTimer)
}

function isValid(textContent) {
    let textContentArray = [...textContent]
    return (textContentArray.length > 0) && (textContentArray.every((char) => char >= "0" && char <= "9"))
}

function ensureDigitsOnly(span) {
    let textContentArray = [...span.textContent];
    if(!isValid(span.textContent)) {
        span.textContent = "";
    }
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

    hoursSpan.oninput = function () {
      ensureDigitsOnly(hoursSpan);
    };

    minutesSpan.oninput = function () {
      ensureDigitsOnly(minutesSpan);
    };

    secondsSpan.oninput = function () {
      ensureDigitsOnly(secondsSpan);
    };

    let setTimerButton = document.getElementById("set");
    setTimerButton.onclick = createTimer
});
