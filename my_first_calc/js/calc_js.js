let string = '';
let display = document.querySelector ('#display');
let buttons = document.querySelectorAll ('button');
buttons.forEach ((item, i) => {
  item.onclick = function () {
    if ((display.value == NaN) || (display.value == Infinity)) {
      string = '';
      display.value = 0;
    }
    if (item.dataset.role == 'digit'){
      string = string + item.dataset.digit;
    } else {
      string = string + item.dataset.operation;
    }
    display.value = string;
    if (item.dataset.operation == 'c') {
      string = '';
      display.value = 0;
    }
    if (item.dataset.operation == 'back') {
      string = string.slice(0, string.length - 5);
      display.value = display.value.slice (0, display.value.length - 5);
    }
    if (item.dataset.operation == 'equally') {
      string = string.slice (0, string.length - 7);
      display.value = display.value.slice (0, display.value.length - 7);
      for (let i = 0; i < string.length; i++) {
        if (string[i] === '+') {
          display.value = Number (string.slice(0, i)) + Number (string.slice (i + 1, string.length));
        }
        if (string[i] === '-') {
          display.value = Number (string.slice(0, i)) - Number (string.slice (i + 1, string.length));
        }
        if (string[i] === '*') {
          display.value = Number (string.slice(0, i)) * Number (string.slice (i + 1, string.length));
        }
        if (string[i] === '/') {
          display.value = Number (string.slice(0, i)) / Number (string.slice (i + 1, string.length));
        }
        string = display.value;
      }
    }
  }
});
