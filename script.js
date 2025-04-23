// get html ids
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
const playArrow = document.querySelector("#playArrow");
const time = document.querySelector("#time");
const playIconStart = document.querySelector("#playIconStart");
const caption = document.querySelector("#caption");
const settingBtn = document.querySelector("#settingBtn");
const topContainer = document.querySelector(".topContainer");
const workTimeBtn = document.getElementById("work-time-btn");
const breakTimeBtn = document.getElementById("break-time-btn");
const longBreakTimeBtn = document.getElementById("long-break-time-btn");
const updateButton = document.getElementById("updateButton");

// different timers depending on cycle
let workTime = 1500;
let breakTime = 300;
let longBreakTime = 1800;
let cycleTitle = "Work: ";

let runing = false;
let timer = null;
let timeLeft = null;
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
    // start work cycle
    if (cycle === 0 || cycle === 2 || cycle === 4) {
      startWorkCycle();

    // start long break cycle
    } else if (cycle === 5) {
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
};

function setCycleProperties(cycleName, time, sayings, title) {
  let randomIndex = Math.floor(Math.random() * sayings.length);
  timeLeft = time;

  // page properties
  cycleTitle = title;
  caption.innerHTML = sayings[randomIndex];
  addCycleProperties(cycleName);
}

// start work cycle
function startWorkCycle() {
  setCycleProperties("startWork", workTime, workSaying, "Work: ");
  playIconStart.style.display = "none";
}

// start break cycle
function startBreakCycle() {
  setCycleProperties("startBreak", breakTime, breakSaying, "Break: ");
}

// start long break cycle
function startLongBreakCycle() {
  setCycleProperties("startLongBreak", longBreakTime, longBreakSaying, "Long Break: ");
}

// pause cycle
function pauseCycle() {
  // save current time
  savedtimer = timeLeft !== null ? timeLeft : savedtimer;

  // page properties
  cycleTitle = "Paused: ";
  caption.innerHTML = "Paused";
  document.body.style.boxShadow = "inset 0 0 0 0vh rgba(95, 3, 3, 0.5)";
  clearInterval(timer);
  addCycleProperties("paused");
}

function addCycleProperties(cycleName) {
  if (cycleName !== "paused") document.body.classList = "";
  startBtn.classList = "";
  settingBtn.classList = "";
  
  document.body.classList.add(cycleName);
  startBtn.classList.add(cycleName);
  settingBtn.classList.add(cycleName);

}

function validateAndGetValue(inputElement) {
  // remove leading and trailing whitespaces
  var value = inputElement.value.trim();

  // if the input is empty, leave it alone
  if (value === "") {  
    return value;
  }

  value = parseInt(value);

  if (isNaN(value) || value < 1) {
    // if value is under 0 or is negative, set to 1
    inputElement.value = 1;
    return 1;
  } else if (value > 180) {
    // if value is over 180, set it to 180
    inputElement.value = 180;
    return 180;
  }
  return value;
}

// update input text fields
function updateInputText(inputTextField, timeValue){
  if (timeValue !== "") {  
    inputTextField.value = "";
    inputTextField.placeholder = `Current: ${timeValue} (Min)`;
  }
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

// if user clicks on 'settings' button
settingBtn.addEventListener("click", (e) => {
  if (!settingBtn.disabled){
    pauseCycle();

    topContainer.classList.toggle("flip");

    const isFlipped = topContainer.classList.contains("flip");
    document.getElementById("updateButton").classList.toggle("hidden", !isFlipped);
    // set button cool down
    settingBtn.disabled = true;
    setTimeout(function() {
      settingBtn.disabled = false;
    }, 1000);
  }
});

// if user clicks on 'update' button
updateButton.addEventListener("click", (e) => {
  var workTimeInput = document.getElementById("workTimeInput");
  var breakTimeInput = document.getElementById("breakTimeInput");
  var longBreakTimeInput = document.getElementById("longBreakTimeInput");

  var updatedWorkTime = validateAndGetValue(workTimeInput);
  var updatedBreakTime = validateAndGetValue(breakTimeInput);
  var updatedLongBreakTime = validateAndGetValue(longBreakTimeInput);

  if (updatedWorkTime !== "") workTime = updatedWorkTime * 60;
  if (updatedBreakTime !== "") breakTime = updatedBreakTime * 60;
  if (updatedLongBreakTime !== "") longBreakTime = updatedLongBreakTime * 60;

  updateInputText(workTimeInput, updatedWorkTime);
  updateInputText(breakTimeInput, updatedBreakTime);
  updateInputText(longBreakTimeInput, updatedLongBreakTime);

  if (!runing) {
    if (cycle === 0 || cycle === 2 || cycle === 4) {
      timeLeft = workTime;
    } else if (cycle === 5) {
      timeLeft = longBreakTime;
    } else {
      timeLeft = breakTime;
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    time.innerHTML = zeroPad(minutes) + ":" + zeroPad(seconds);
    document.querySelector("#title").innerHTML = cycleTitle + zeroPad(minutes) + ":" + zeroPad(seconds);
  }

  if (runing) {
    clearInterval(timer);
    savedtimer = null;
    countDown();
  }
});
