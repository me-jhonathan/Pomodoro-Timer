// get html ids
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const cycleBtn = document.querySelector("#cycleBtn");
const playArrow = document.querySelector("#playArrow");
const time = document.querySelector("#time");
const playIconStart = document.querySelector("#playIconStart");

// different timers depending on cycle
let workTime = 1500;
let breakTime = 300;
let longBreakTime = 1800;
let cycleTitle = "Work: ";

// cycle (work/break) counter
let cycle = 0;

// flow control
let flowSwitch = false;
let startCycle = true;

// add leading zero to display numbers
const zeroPad = (num) => (num < 10) ? '0' + num: num;

// automatic countdown timer
const countDown = () => {
    if (flowSwitch == true) {
    cycleBtn.innerHTML = cycle;
    // start work cycle
    if (cycle % 6 === 0 || cycle % 6 === 2 || cycle % 6 === 4) {
      timeLeft = workTime;
      cycleTitle = "Work: "
      startWorkCycleColor();

    // start long break cycle
    } else if (cycle % 6 === 6) {
      timeLeft = longBreakTime;
      cycleTitle = "Long Break: ";
      startLongBreakCycleColor();

    // start break cycle  
    } else {
      timeLeft = breakTime;
      cycleTitle = "Break: ";
      startBreakCycleColor();

    }
  // refresh every second
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      cycle++;
      if (cycle === 6) {
        cycle = 0;
      }
      countDown();
      return;
    }
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeLeft--;
        // display time on app screen
    time.innerHTML = zeroPad(minutes) + ":" + zeroPad(seconds);    

    // display time in html title
    document.querySelector("#title").innerHTML =
      cycleTitle + zeroPad(minutes) + ":" + zeroPad(seconds);
  }, 1000);
} 
};

// start work cycle colors
function startWorkCycleColor() {
  document.body.style.background = "lightcoral";
  playIconStart.style.display = "none";

  // addCycleProperties("startWork");
}

// start break cycle colors
function startBreakCycleColor() {
  document.body.style.background = "rgb(104, 152, 223)";
  // addCycleProperties("startBreak");
}

// start long break cycle colors
function startLongBreakCycleColor() {
  document.body.style.background = "rgb(192, 128, 235)";
  // addCycleProperties("startLongBreak");
}

// function addCycleProperties(cycleName) {
//   startBtn.classList = "";
//   startBtn.classList.add(cycleName);
// }

// if user clicks on 'start' button start timer
startBtn.addEventListener("click", (e) => {
  this.removeEventListener("click", (e) => {});
  if (flowSwitch == false) {
    flowSwitch = true;
    // playArrowIcon.style.visibility = "hidden";
    time.style.visibility = "visible";

    startWorkCycleColor();

    // start timer
    countDown();
    // }
  } else {
    flowSwitch = false;
  }
});

// if user clicks on 'restart' button restart timer and cycle
restartBtn.addEventListener("click", (e) => {
  location.reload();
});
