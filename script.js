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

// refresh every second
setInterval(countDown, 1000);
