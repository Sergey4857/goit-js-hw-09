import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  button: document.querySelector('button[selectedDate]'),
  day: document.querySelector('span[data-days]'),
  hour: document.querySelector('span[data-hours]'),
  minute: document.querySelector('span[data-minutes]'),
  second: document.querySelector('span[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
};

refs.button.addEventListener('click', onBtnStartClick);
refs.button.setAttribute('disabled', 'disabled');

let selectedDate = null;
let deltaValue = null;
let numberOfClick = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    testCorrectDate();
  },
};

flatpickr('input#datetime-picker', options);

function onBtnStartClick() {
  numberOfClick += 1;
  if (numberOfClick > 1) {
    return;
  }
  if (selectedDate === null) {
    console.log('dfhfgh');
  }
  refs.input.setAttribute('disabled', 'disabled');

  Notiflix.Notify.success('Timer started');

  let intervalId = setInterval(() => {
    deltaValue = selectedDate - new Date();
    let convertedTime = convertMs(deltaValue);
    refs.day.textContent = addLeadingZero(convertedTime.days);
    refs.hour.textContent = addLeadingZero(convertedTime.hours);
    refs.minute.textContent = addLeadingZero(convertedTime.minutes);
    refs.second.textContent = addLeadingZero(convertedTime.seconds);
  }, 1000);
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

function testCorrectDate() {
  if (selectedDate > new Date()) {
    refs.button.removeAttribute('disabled', 'disabled');
    Notiflix.Notify.info('You have chosen the correct date');
  } else Notiflix.Notify.failure('Choose correct date in future');
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
