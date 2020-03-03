let flag=0;
document.querySelector('#test1').onsubmit=function(e){
    e.preventDefault();
    let test1=e.target;
    let idOfDivWithAnsver='#test11';
    let rightAnswers=[1,3,4];
if(test1[1].checked == true && test1[3].checked == true && test1[4].checked == true && test1[0].checked == false && test1[2].checked == false) {
rightAnswer(idOfDivWithAnsver,rightAnswers);
}
else {
  falseAnswer(idOfDivWithAnsver);}
test1.reset();
}

  document.querySelector('#test2').onsubmit=function(e){
    e.preventDefault();
    let test2=e.target;
    let idOfDivWithAnsver='#test22';
    if (test2['test2_1'].value == 'бензин'){
       rightAnswer(idOfDivWithAnsver);
      }
    else falseAnswer(idOfDivWithAnsver);
}

document.querySelector('#test3').onsubmit=function(e){
  e.preventDefault();
    let test1=e.target;
    let rightAnswers=[0,1,2];
    let idOfDivWithAnsver='#test33';
if(test1[0].checked == true && test1[1].checked == true && test1[2].checked == true && test1[3].checked == false && test1[4].checked == false) {
rightAnswer(idOfDivWithAnsver,rightAnswers);
}
else {
  falseAnswer(idOfDivWithAnsver);}
test1.reset();
}

document.querySelector('#test4').onsubmit=function(e){
  e.preventDefault();
    let test1=e.target;
    let rightAnswers=[1];
    let idOfDivWithAnsver='#test44';
if(test1[1].checked == true) {
rightAnswer(idOfDivWithAnsver,rightAnswers);
}
else {
  falseAnswer(idOfDivWithAnsver);}
test1.reset();
}

document.querySelector('#test5').onsubmit=function(e){
  e.preventDefault();
    let test1=e.target;
    let rightAnswers=[1,3]
    let idOfDivWithAnsver='#test55';
if(test1[1].checked == true && test1[3].checked && test1[0].checked == false && test1[2].checked == false) {
rightAnswer(idOfDivWithAnsver,rightAnswers);
}
else {
  falseAnswer(idOfDivWithAnsver);}
test1.reset();
}

function rightAnswer(idOfDivWithAnsver,rightAnswers) {
  a=document.querySelector('.false');
  b=document.querySelector('.right');
    if (a) a.remove();
    if (b) b.remove();
     let text = document.createElement('div');
     text.className="right";
     text.innerText='Все верно!';
     document.querySelector(idOfDivWithAnsver).appendChild(text);
     let idOfForm = idOfDivWithAnsver.substring(0, idOfDivWithAnsver.length - 1);
     let form = document.querySelector(idOfForm);
     let greenLabels = form.querySelectorAll('label');
     greenLabels.forEach((item, i) => {
       for (j in rightAnswers){
       if(i==rightAnswers[j])  item.style.backgroundColor="green";}
     });
     let inputs = form.querySelectorAll('input');
     for (i in inputs){
       inputs[i].disabled="true";
     }
     let button = form.querySelector('button');
     button.disabled="true";
}
function falseAnswer(idOfDivWithAnsver) {
  a=document.querySelector('.false');
  b=document.querySelector('.right');
  if (a) a.remove();
  if (b) b.remove();
     let text = document.createElement('div');
     text.className="false";
     text.innerText='Ответ не верный, подумайте еще раз!';
     document.querySelector(idOfDivWithAnsver).appendChild(text);
}

let navMenu = document.querySelectorAll('.list-group-item');
for(i=0; i<navMenu.length; i++){
document.querySelectorAll('.list-group-item')[i].onclick = function (e) {
  for(i=0; i<navMenu.length; i++){
    navMenu[i].className="list-group-item list-group-item-action";
  }
let temp = e.target;
temp.setAttribute('Class', 'list-group-item list-group-item-action active');
}
}

function cyrillicCheck(){
let fuel = document.querySelector("#fuel");
fuel.addEventListener("keypress", (event) => {
  let  a=document.querySelector('.false');
    if (a) a.remove();
if (!event.key.match(/[а-я]/i)) {
    event.preventDefault();
  let textNotCyrillic = document.createElement('span');
  textNotCyrillic.className="false";
  textNotCyrillic.innerText='Ответ может быть записан только кириллицей!';
  document.querySelector('#cyrillicCheck').appendChild(textNotCyrillic);
}
});
}

let img = document.querySelectorAll('.imgWithCaption');
img.forEach((item, i) => {
  item.onclick = function(e){
    let hiddenImg = document.querySelector('#hiddenImg');
    hiddenImg.style.display="block";
    hiddenImg.style.position="fixed";
    hiddenImg.style.top="50%";
    hiddenImg.style.left="50%";
    hiddenImg.style.marginTop="-300px";
    hiddenImg.style.marginLeft="-300px";
    let itemImg = item.querySelector('img');
    let currentImg = hiddenImg.querySelector('#currentImg');
    currentImg.src=itemImg.src;
}
  });

document.querySelector('#closeButton').onclick = function() {
let hiddenImg = document.querySelector('#hiddenImg');
hiddenImg.style.display="none";
}


cyrillicCheck();
