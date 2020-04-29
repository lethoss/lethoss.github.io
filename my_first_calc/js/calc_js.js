let string = '';
let calcArray = [];
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
      let j = -1;
      for (let i = 0; i < string.length; i++) {
        if ((string[i] === '+') || (string[i] === '-') || (string[i] === '*') || (string[i] === '/')) {
          calcArray.push (Number (string.slice(j + 1, i)), string[i]);
          j = i;
        }
      }
      calcArray.push (Number (string.slice (j + 1, i)));
      for (let i = 0; i < calcArray.length; i++) {
        if (calcArray[i] == '*') {
          calcArray.splice(i-1,3,(calcArray[i-1] * calcArray[i+1]));
          i = 0;
        }
      }
      for (let i = 0; i < calcArray.length; i++) {
        if (calcArray[i] == '/') {
          calcArray.splice(i-1,3,(calcArray[i-1] / calcArray[i+1]));
          i = 0;
        }
      }
      for (let i = 0; i < calcArray.length; i++) {
        if (calcArray[i] == '+') {
          calcArray.splice(i-1,3,(calcArray[i-1] + calcArray[i+1]));
          i = 0;
        }
      }
      for (let i = 0; i < calcArray.length; i++) {
        if (calcArray[i] == '-') {
          calcArray.splice(i-1,3,(calcArray[i-1] - calcArray[i+1]));
          i = 0;
        }
      }
      display.value = calcArray[0];
      string = calcArray[0];
      calcArray = [];
    }
  }
});
