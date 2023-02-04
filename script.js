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

// add leading zero to display numbers
const zeroPad = (num) => (num < 10) ? '0' + num: num;

// automatic countdown timer
const countDown = () => {
    cycleBtn.innerHTML = cycle;
    // start work cycle
    if (cycle === 0 || cycle === 2 || cycle === 4) {
      timeLeft = workTime;
      cycleTitle = "Work: "
      startWorkCycleColor();

    // start long break cycle
    } else if (cycle === 6) {
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
      if (cycle === 7) {
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
};

// start work cycle colors
function startWorkCycleColor() {
  startBtn.disabled = true;
  document.body.style.background = "lightcoral";
  document.body.style.boxShadow = "inset 0 -1vw 4vh 4vh rgba(95, 3, 3, 0.5)";
  playIconStart.style.display = "none";
  addCycleProperties("startWork");
}

// start break cycle colors
function startBreakCycleColor() {
  document.body.style.background = "rgb(104, 152, 223)";
  document.body.style.boxShadow = "inset 0 0 0 0vh rgba(95, 3, 3, 0.5)";
  addCycleProperties("startBreak");
}

// start long break cycle colors
function startLongBreakCycleColor() {
  document.body.style.background = "rgb(192, 128, 235)";
  document.body.style.boxShadow = "inset 0 0 0 0vh rgba(95, 3, 3, 0.5)";
  addCycleProperties("startLongBreak");
}

function addCycleProperties(cycleName) {
  startBtn.classList = "";
  startBtn.classList.add(cycleName);
}

// if user clicks on 'start' button start timer
startBtn.addEventListener("click", (e) => {
    time.style.visibility = "visible";
    startWorkCycleColor();

    // start timer
    countDown();
});

// if user clicks on 'restart' button restart timer and cycle
restartBtn.addEventListener("click", (e) => {
  location.reload();
});
