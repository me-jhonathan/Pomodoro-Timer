// get html ids
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const cycleBtn = document.querySelector("#cycleBtn");
const mainCircle = document.querySelector("#mainCircle");
const playArrow = document.querySelector("#playArrow");
const time = document.querySelector("#time");

// **testing**
window.addEventListener("DOMContentLoaded", () => {
  const path = document.querySelector("#mainSVG path");
  console.log(path.getTotalLength());
});

// different timers depending on cycle
const workTime = 25;
const breakTime = 5;
const longBreakTime = 30;
let cycleTitle = "Work: ";

// cycle (work/break) counter
let cycle = 0;

// time
let minutes = 24;
let seconds = 59;

// flow control
let flowSwitch = false;
let startCycle = true;

// add leading zero to display numbers
const zeroPad = (num) => (num < 10) ? '0' + num: num;

// automatic countdown timer
function countDown() {
  if (flowSwitch == true) {
    cycleBtn.innerHTML = cycle;
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
    time.innerHTML = zeroPad(minutes) + ":" + zeroPad(seconds);    

    // display time in html title
    document.querySelector("#title").innerHTML =
      cycleTitle + zeroPad(minutes) + ":" + zeroPad(seconds);

    seconds--;

    // refresh every second
    setTimeout(() => {
      countDown();
    }, 1000);
  } else {
  }
}

// start work cycle colors
function startWorkCycleColor() {
  document.body.style.background = "lightcoral";
  // if first time cliking start button
  if (startCycle == true) {
    startCycle = false;

    addCycleProperties("startWork");
  }
}

// start break cycle colors
function startBreakCycleColor() {
  document.body.style.background = "rgb(104, 152, 223)";
  addCycleProperties("startBreak");
}

// start long break cycle colors
function startLongBreakCycleColor() {
  document.body.style.background = "rgb(192, 128, 235)";
  addCycleProperties("startLongBreak");
}

function addCycleProperties(cycleName) {
  mainCircle.classList = "";
  startBtn.classList = "";
  mainCircle.style.animationName = "none";
  setTimeout(() => {
    mainCircle.style.animationName = "";
  }, 100);
  mainCircle.classList.add(cycleName);
  startBtn.classList.add(cycleName);
}

// if user clicks on 'start' button start timer
startBtn.addEventListener("click", (e) => {
  this.removeEventListener("click", (e) => {});
  if (flowSwitch == false) {
    flowSwitch = true;
    mainCircle.style.animationPlayState = "running";
    playArrowIcon.style.visibility = "hidden";
    time.style.visibility = "visible";

    startWorkCycleColor();

    // start timer
    countDown();
    // }
  } else {
    flowSwitch = false;
    mainCircle.style.animationPlayState = "paused";
  }
});

// if user clicks on 'restart' button restart timer and cycle
restartBtn.addEventListener("click", (e) => {
  location.reload();
});
