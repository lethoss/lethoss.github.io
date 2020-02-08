


let listOfTransport=[];
let i=0;
function  addForm(){
  let form = document.querySelector('form.chooseTransport');
  form.style.display='block';
  document.getElementById('button1').disabled=true;

}

document.querySelector('form.chooseTransport').onsubmit = function (e){
e.preventDefault();
let form1= e.target;
form1.style.display='none';
let form2 = document.querySelector('form.mainForm');
form2.style.display='block';
if (form1['transportType'].value == 'general') listOfTransport.push(new Transport('',0,''));
if (form1['transportType'].value == 'wheel') {
  let nOA = document.querySelector('.numberOfAxles');
  nOA.style.display='block';
  listOfTransport.push(new WheeledTransport('',0,'','',''));
}
if (form1['transportType'].value == 'tracked') {
  let perm = document.querySelector('.permission');
  perm.style.display='block';
  listOfTransport.push(new TrackedTransport('',0,'',false));
}
i++;
return i;
}

document.querySelector('form.mainForm').onsubmit = function (e){
e.preventDefault();
let formChoose = document.querySelector('form.chooseTransport');
console.log(formChoose['transportType'].value);
 let form = e.target;
 let name = form['name'].value;
 let capacity = form['capacity'].value;
 let fuel = form['fuel'].value;
 if (formChoose['transportType'].value == 'wheel'){
   let driveUnit = form['driveUnit'].value;
   listOfTransport[i-1].driveUnit=driveUnit;
let numberOfAxles = form['numberOfAxles'].value;
listOfTransport[i-1].numberOfAxles=numberOfAxles;
let nOA = document.querySelector('.numberOfAxles');
nOA.style.display='none';
}
if (formChoose['transportType'].value == 'tracked'){
let permission = form['permission'].checked;
console.log(permission);
listOfTransport[i-1].permission=permission;
let perm = document.querySelector('.permission');
perm.style.display='none';
}
listOfTransport[i-1].name=name;
listOfTransport[i-1].capacity=capacity;
listOfTransport[i-1].fuel=fuel;
form.style.display='none';
form.reset();
let content = document.querySelector('#content');
let p = document.createElement('p');
p.innerText = listOfTransport[i-1].doclad();
content.appendChild(p);
document.getElementById('button1').disabled=false;
}
