const timer = document.getElementById('timer');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesContainer = document.getElementById('lapTimes'); // Select the lap times container

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

function startTimer(){
    startTime = Date.now() - elapsedTime

    timerInterval = setInterval( ()=> {
        elapsedTime = Date.now() - startTime 
        timer.textContent = formatTimer(elapsedTime);
    }, 10)

    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopTimer(){
    clearInterval(timerInterval);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer(){
    clearInterval(timerInterval);

    elapsedTime = 0;
    timer.textContent = "00:00:00";

    startButton.disabled = false;
    stopButton.disabled = false;
    laps = [];
    lapTimesContainer.innerHTML = ''; // Clear lap times display
}

function lapTimer() {
    laps.push(elapsedTime);
    const lapTime = formatTimer(elapsedTime);
    const lapTimeElement = document.createElement('div');
    lapTimeElement.textContent = lapTime;
    lapTimesContainer.appendChild(lapTimeElement);
}

function formatTimer(elapsedTime){
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const mseconds = Math.floor((elapsedTime % 1000) / 10);
    return (
        (hours ? (hours > 9 ? hours : "0" + hours) : "00")
        + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
        + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00")
        + "." +
        (mseconds > 9 ? mseconds : "0" + mseconds));
}

startButton.addEventListener('click', startTimer)
stopButton.addEventListener('click', stopTimer)
resetButton.addEventListener('click', resetTimer)
lapButton.addEventListener('click', lapTimer);
