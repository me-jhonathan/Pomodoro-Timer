// get restart/start button from index.html
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");

// get the circles to begin their timers
const mainCircle = document.querySelector("#mainCircle");
const minuteCircle = document.querySelector("#minuteCircle");

// different timers depending on cycle
const runTime = 24;
const breakTime = 5;
const longBreakTime = 30;

// cycle (run/break) counter
let cycle = 0;

let minutes = runTime;
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
      if (cycle % 2 == 0 && cycle != 6) {
        minutes = breakTime - 1;
      }
      // start long break cycle and reset cycle
      else if (cycle % 2 == 0 && cycle == 6) {
        minutes = longBreakTime - 1;
        cycle = 0;
      }
      // start run cycle
      else {
        minutes = runTime;
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

// if user clicks on 'start' button start timer
startBtn.addEventListener("click", (e) => {
  startBtn.disabled = true;

  // start the circle timers
  mainCircle.classList.add("start");
  minuteCircle.classList.add("start");

  // start timer
  countDown();
});

// if user clicks on 'restart' button restart timer and cycle
restartBtn.addEventListener("click", (e) => {
  location.reload();
});
