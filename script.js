// get restart/start button from index.html
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#resetBtn");

let minutes = 25;
let seconds = 0;

// add leading zero to display numbers
const zeroPad = (num, places) => String(num).padStart(places, "0");

// automatic countdown timer
function countDown() {
  if (seconds < 0) {
    seconds = 59;
    minutes--;
    if (minutes < 0) {
      minutes = 24;
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
