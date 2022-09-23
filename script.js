// get restart/start button from index.html
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");

// get the circles to begin their timers
const mainCircle = document.querySelector("#mainCircle");
const minuteCircle = document.querySelector("#minuteCircle");

// **testing**
window.addEventListener("DOMContentLoaded", () => {
  const path = document.querySelector("#mainSVG1 path");
  console.log(path.getTotalLength());
});

// different timers depending on cycle
const workTime = 25;
const breakTime = 5;
const longBreakTime = 30;
let cycleTitle = "Work: ";

// cycle (work/break) counter
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
        cycleTitle = "Break: ";
        if (cycle != 6) {
          minutes = breakTime - 1;
        }
        // start long break cycle and reset cycle
        else if (cycle == 6) {
          startLongBreakCycleColor();
          cycleTitle = "Long Break: ";
          minutes = longBreakTime - 1;
          cycle = 0;
        }
      }
      // start work cycle
      else {
        startWorkCycleColor();
        cycleTitle = "Work: ";
        minutes = workTime - 1;
      }
      cycle++;
    }
  }

  // display time on app screen
  document.querySelector(".time").innerHTML =
    cycleTitle + ":" + zeroPad(seconds, 2);

  // display time in html title
  document.querySelector("#title").innerHTML =
    cycleTitle + zeroPad(minutes, 2) + ":" + zeroPad(seconds, 2);

  seconds--;

  // refresh every second
  setTimeout(() => {
    countDown();
  }, 1000);
}

// start work cycle colors
function startWorkCycleColor() {
  mainCircle.classList = "";
  minuteCircle.classList = "";
  minuteCircle.classList.add("startWork");
  mainCircle.classList.add("startWork");
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
  startWorkCycleColor();

  // start timer
  countDown();
});

// if user clicks on 'restart' button restart timer and cycle
restartBtn.addEventListener("click", (e) => {
  location.reload();
});
