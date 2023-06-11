const bodyEl = document.body;
const btnStartEl = document.querySelector([data-start]);
const btnStopEl = document.querySelector([data-stop]);

let interval = null;

function colorChange() {
    interval = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    btnStartEl.disabled = true;
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
