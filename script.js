// get restart/start button from index.html
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");

// get the circles to begin their timers
const mainCircle = document.querySelector("#mainCircle");
const minuteCircle = document.querySelector("#minuteCircle");

window.addEventListener("DOMContentLoaded", () => {
  const path = document.querySelector("#mainSVG1 path");
  console.log(path.getTotalLength());
});

// different timers depending on cycle
const runTime = 25;
const breakTime = 5;
const longBreakTime = 30;

// cycle (run/break) counter
let cycle = 0;

let minutes = 24;
let seconds = 59;

// add leading zero to display numbers
const zeroPad = (num, places) => String(num).padStart(places, "0");

// automatic countdown timer
function countDown() {
  if (seconds < 0) {
    seconds = 59;
    minutes--;

    if (minutes < 0) {
      // start break cycle
      if (cycle % 2 == 0) {
        startBreakCycleColor();
        if (cycle != 6) {
          minutes = breakTime - 1;
        }
        // start long break cycle and reset cycle
        else if (cycle == 6) {
          startLongBreakCycleColor();
          minutes = longBreakTime - 1;
          cycle = 0;
        }
      }
      // start run cycle
      else {
        startRunCycleColor();
        minutes = runTime - 1;
      }
      cycle++;
    }
  }

  // display time
  document.querySelector(".time").innerHTML =
    zeroPad(minutes, 2) + ":" + zeroPad(seconds, 2);

  seconds--;

  // refresh every second
  setTimeout(() => {
    countDown();
  }, 1000);
}

// start run cycle colors
function startRunCycleColor() {
  mainCircle.classList = "";
  minuteCircle.classList = "";
  minuteCircle.classList.add("startRun");
  mainCircle.classList.add("startRun");
}

// start break cycle colors
function startBreakCycleColor() {
  mainCircle.classList = "";
  minuteCircle.classList = "";
  minuteCircle.classList.add("startBreak");
  mainCircle.classList.add("startBreak");
}

// start long break cycle colors
function startLongBreakCycleColor() {
  mainCircle.classList = "";
  minuteCircle.classList = "";
  mainCircle.classList.add("startLongBreak");
  minuteCircle.classList.add("startLongBreak");
}

// if user clicks on 'start' button start timer
startBtn.addEventListener("click", (e) => {
  startBtn.disabled = true;

  // start the circle timers
  startRunCycleColor();

  // start timer
  countDown();
});

// if user clicks on 'restart' button restart timer and cycle
restartBtn.addEventListener("click", (e) => {
  location.reload();
});
