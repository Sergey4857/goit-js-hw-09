import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  const delayInput = event.target.elements.delay;
  const stepInput = event.target.elements.step;
  const amountInput = event.target.elements.amount;

  const firstDelay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    const delay = firstDelay + i * step;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  form.reset();
}
