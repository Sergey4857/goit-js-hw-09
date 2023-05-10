const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.buttonStart.addEventListener('click', onBtnStartClick);
refs.buttonStop.addEventListener('click', onBtnStopClick);

let intervalId = null;
function onBtnStartClick() {
  intervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  madeButtonDisabled();
}
function onBtnStopClick() {
  clearInterval(intervalId);
  enableButton();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function madeButtonDisabled() {
  refs.buttonStart.setAttribute('disabled', 'disabled');
}
function enableButton() {
  refs.buttonStart.removeAttribute('disabled', 'disabled');
}
