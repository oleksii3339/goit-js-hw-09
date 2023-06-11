import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  delay =
    Number(formEl.elements.delay.value) +
    position * Number(formEl.elements.step.value);
  position += 1;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

function showResultPromises() {
  for (let i = 0; i < Number(formEl.elements.amount.value); i += 1) {
    setTimeout(() => {
      createPromise(i, Number(formEl.elements.delay.value))
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
    }, Number(formEl.elements.delay.value) + i * Number(formEl.elements.step.value));
  }
}

formEl.addEventListener('submit', event => {
  event.preventDefault();
  showResultPromises();
});