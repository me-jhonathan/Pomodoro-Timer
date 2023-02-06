// get html ids
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const cycleBtn = document.querySelector("#cycleBtn");
const playArrow = document.querySelector("#playArrow");
const time = document.querySelector("#time");
const playIconStart = document.querySelector("#playIconStart");
const caption = document.querySelector("#caption");


// different timers depending on cycle
let workTime = 1500;
let breakTime = 300;
let longBreakTime = 1800;
let cycleTitle = "Work: ";

let runing = false;
let savedtimer = null;

// cycle (work/break) counter
let cycle = 0;

// caption saying depending on cycle
let workSaying = ["Let's give it our full attention",
                  "Focus time!",
                  "Let's sharpen our focus",
                  "It's time to get centered",
                  "Focus ahead!",
                  "Let's tune in to this task"
]
let breakSaying = ["Let's take a breather.",
                  "Break time!",
                  "Time to relax",
                  "A time out is in order.",
                  "Let's take a pause.",
                  "A time out is in order."
]
let longBreakSaying = ["Let's take a much-needed rest.",
                  "It's time to recharge our batteries.",
                  "A longer pause is in order.",
                  "Time to rejuvenate.",
                  "A extended break is due.",
                  "Let's take a timeout from the hustle."
]

// add leading zero to display numbers
const zeroPad = (num) => (num < 10) ? '0' + num: num;

// automatic countdown timer
const countDown = () => {
    cycleBtn.innerHTML = cycle;
    // start work cycle
    if (cycle === 0 || cycle === 2 || cycle === 4) {
      startWorkCycle();

    // start long break cycle
    } else if (cycle === 6) {
      startLongBreakCycle();

    // start break cycle  
    } else {
      startBreakCycle();
    }

  // keeps track of time if paused
  timeLeft = savedtimer !== null ? savedtimer: timeLeft; 

  // refresh every second
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      savedtimer = null;
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

// start work cycle
function startWorkCycle() {
  let randomIndex = Math.floor(Math.random() * 6);
  timeLeft = workTime;

  // page properties
  cycleTitle = "Work: "
  caption.innerHTML = workSaying[randomIndex];
  document.body.style.background = "lightcoral";
  document.body.style.boxShadow = "inset 0 -1vw 4vh 4vh rgba(95, 3, 3, 0.5)";
  playIconStart.style.display = "none";
  addCycleProperties("startWork");
}

// start break cycle
function startBreakCycle() {
  let randomIndex = Math.floor(Math.random() * 6);
  timeLeft = breakTime;

  // page properties
  cycleTitle = "Break: ";
  caption.innerHTML = breakSaying[randomIndex];
  document.body.style.background = "rgb(104, 152, 223)";
  document.body.style.boxShadow = "inset 0 0 0 0vh rgba(95, 3, 3, 0.5)";
  addCycleProperties("startBreak");
}

// start long break cycle
function startLongBreakCycle() {
  let randomIndex = Math.floor(Math.random() * 6);
  timeLeft = longBreakTime;

  // page properties
  cycleTitle = "Long Break: ";
  caption.innerHTML = longBreakSaying[randomIndex];
  document.body.style.background = "rgb(192, 128, 235)";
  document.body.style.boxShadow = "inset 0 0 0 0vh rgba(95, 3, 3, 0.5)";
  addCycleProperties("startLongBreak");
}

// pause cycle
function pauseCycle() {
  // save current time
  savedtimer = timeLeft;

  // page properties
  cycleTitle = "Paused: ";
  caption.innerHTML = "Paused";
  document.body.style.boxShadow = "inset 0 0 0 0vh rgba(95, 3, 3, 0.5)";
  clearInterval(timer);
  addCycleProperties("paused");
}

function addCycleProperties(cycleName) {
  startBtn.classList = "";
  startBtn.classList.add(cycleName);
}

// if user clicks on 'start' button start timer
startBtn.addEventListener("click", (e) => {
  runing = !runing;
  if (runing){
    time.style.visibility = "visible";
    caption.style.visibility = "visible";
    startWorkCycle();
    // start timer
    countDown();
  } else {
    // if paused
    pauseCycle();
  }
});

// if user clicks on 'restart' button restart timer and cycle
restartBtn.addEventListener("click", (e) => {
  location.reload();
});
