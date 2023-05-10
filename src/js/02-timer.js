import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  button: document.querySelector('button[selectedDate]'),
};

refs.button.addEventListener('click', onBtnStartClick);
// refs.button.setAttribute('disabled', 'disabled');
let selectedDate = null;
let deltaValue = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
  },
};

flatpickr('input#datetime-picker', options);

function onBtnStartClick() {
  setInterval(() => {
    if (selectedDate > new Date()) {
      deltaValue = selectedDate - new Date();
      refs.button.removeAttribute('disabled', 'disabled');
    } else alert('Не туда тыкнул');
    console.log(convertMs(deltaValue));
  }, 1000);
}

// let selectedDate = options.onClose();
// console.log(selectedDate);

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
