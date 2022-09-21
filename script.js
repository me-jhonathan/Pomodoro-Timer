// get restart/start button from index.html
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#resetBtn");

// different timers depending on cycle
const runTime = 25;
const breakTime = 5;
const longBreakTime = 30;

// cycle (run/break) counter
let cycle = 0;

let minutes = runTime;
let seconds = 0;

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
        minutes = runTime - 1;
      }
      cycle++;
    }
  }

  // display time
  document.querySelector(".time").innerHTML =
    zeroPad(minutes, 2) + ":" + zeroPad(seconds, 2);

  seconds--;
}

// if user clicks on 'start' button start timer
startBtn.addEventListener("click", (e) => {
  startBtn.disabled = true;
  // refresh every second
  setInterval(countDown, 1000);
});

// if user clicks on 'restart' button restart timer
restartBtn.addEventListener("click", (e) => {
  minutes = 25;
  seconds = 0;
});
