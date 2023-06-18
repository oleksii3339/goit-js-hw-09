import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  delay =
    Number(formEl.elements.delay.value) +
    position * Number(formEl.elements.step.value);
  position += 1;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function showResultPromises() {
  const amount = Number(formEl.elements.amount.value);
  const delay = Number(formEl.elements.delay.value);
  const step = Number(formEl.elements.step.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i, delay + i * step)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          useIcon: false,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          useIcon: false,
        });
      });
  }
}

formEl.addEventListener('submit', event => {
  event.preventDefault();
  showResultPromises();
  formEl.reset();
});
