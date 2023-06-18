import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const outDays = document.querySelector('[data-days]');
const outHours = document.querySelector('[data-hours]');
const outMinutes = document.querySelector('[data-minutes]');
const outSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
inputEl.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose() {
    if (Date.parse(inputEl.value) <= new Date().getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnStart.disabled = false;
    }
  },
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let countdownInterval;

function startCountdown() {
  btnStart.disabled = true;
  inputEl.disabled = true;
  clearInterval(countdownInterval);

  const targetDate = Date.parse(inputEl.value);

  countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    if (currentTime >= targetDate) {
      clearInterval(countdownInterval);
      showTimer();
    } else {
      showTimer();
    }
  }, 1000);
}

function showTimer() {
  const currentTime = new Date().getTime();
  const targetDate = Date.parse(inputEl.value);

  if (currentTime >= targetDate) {
    btnStart.disabled = false;
    inputEl.disabled = false;
    outDays.textContent = '00';
    outHours.textContent = '00';
    outMinutes.textContent = '00';
    outSeconds.textContent = '00';
  } else {
    const restOfTime = convertMs(targetDate - currentTime);
    const { days, hours, minutes, seconds } = restOfTime;
    outDays.textContent = addLeadingZero(days);
    outHours.textContent = addLeadingZero(hours);
    outMinutes.textContent = addLeadingZero(minutes);
    outSeconds.textContent = addLeadingZero(seconds);
  }
}

btnStart.addEventListener('click', startCountdown);

flatpickr('#datetime-picker', options);
