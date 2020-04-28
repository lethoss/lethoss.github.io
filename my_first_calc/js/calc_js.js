let string = "";
let display = document.querySelector('#display');
let buttons = document.querySelectorAll('button');
buttons.forEach((item, i) => {
  item.onclick = function(){
    if ((display.value == NaN) || (display.value == Infinity)){
      string=""; display.value=0;
    }
  string = string + item.id;
  display.value=string;
  if(item.id == "C"){ string=""; display.value=0;}
  if(item.id == "B"){
    string=string.slice(0,string.length-2);
    display.value=display.value.slice(0,display.value.length-2);}
if (item.id == "R"){
  string=string.slice(0,string.length-1);
  display.value=display.value.slice(0,display.value.length-1);
for (let i=0; i<string.length; i++){
  if (string[i]==="+"){
      display.value = Number(string.slice(0,i)) + Number(string.slice(i+1,string.length));
  }
  if (string[i]==="-"){
      display.value = Number(string.slice(0,i)) - Number(string.slice(i+1,string.length));
  }
  if (string[i]==="*"){
      display.value = Number(string.slice(0,i)) * Number(string.slice(i+1,string.length));
  }
  if (string[i]==="/"){
      display.value = Number(string.slice(0,i)) / Number(string.slice(i+1,string.length));
  }
  string=display.value;
}
}
}
});
