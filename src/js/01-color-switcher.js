const bodyEl = document.body;
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');

let interval = null;

function colorChange() {
  interval = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStartEl.disabled = true;
  btnStopEl.disabled = false; 
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

btnStartEl.addEventListener('click', colorChange);

btnStopEl.addEventListener('click', () => {
  clearInterval(interval);
  btnStartEl.disabled = false;
  btnStopEl.disabled = true; 
});


window.addEventListener('load', () => {
  const isStopDisabled = localStorage.getItem('stopDisabled');
  if (isStopDisabled === 'true') {
    btnStopEl.disabled = true;
  }
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('stopDisabled', btnStopEl.disabled);
});
