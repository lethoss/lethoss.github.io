
function checkboxFormProcessing(e,idOfDivWithAnsver,rightAnswers){
  e.preventDefault();
  let test1=e.target;
  let temp=[];
    for (i=0; i<test1.length; i++){
      temp[i]=test1[i].checked;
    }
  if(temp.join('') == rightAnswers.join('')){
    rightAnswer(idOfDivWithAnsver,rightAnswers);
  }
else {
  falseAnswer(idOfDivWithAnsver);
}
test1.reset();
}

document.querySelector('#test1').onsubmit=function(e){
    let idOfDivWithAnsver='#test11';
    let rightAnswers=[false,true,false,true,true];
    checkboxFormProcessing(e,idOfDivWithAnsver,rightAnswers);
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
    let idOfDivWithAnsver='#test33';
    let rightAnswers=[true,true,true,false,false];
    checkboxFormProcessing(e,idOfDivWithAnsver,rightAnswers);
}

document.querySelector('#test4').onsubmit=function(e){
    let idOfDivWithAnsver='#test44';
    let rightAnswers=[false,true,false];
    checkboxFormProcessing(e,idOfDivWithAnsver,rightAnswers);
}


document.querySelector('#test5').onsubmit=function(e){
    let idOfDivWithAnsver='#test55';
    let rightAnswers=[false,true,false,true];
    checkboxFormProcessing(e,idOfDivWithAnsver,rightAnswers);
}

document.querySelector('#test6').onsubmit=function(e){
    let idOfDivWithAnsver='#test66';
    let rightAnswers=[false,true,false,true,true,false,true];
    checkboxFormProcessing(e,idOfDivWithAnsver,rightAnswers);
}

document.querySelector('#test7').onsubmit=function(e){
    let idOfDivWithAnsver='#test77';
    let rightAnswers=[true,false,false,false];
    checkboxFormProcessing(e,idOfDivWithAnsver,rightAnswers);
}

document.querySelector('#test8').onsubmit=function(e){
    let idOfDivWithAnsver='#test88';
    let rightAnswers=[false,false,true,false];
    checkboxFormProcessing(e,idOfDivWithAnsver,rightAnswers);
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
       if(rightAnswers[i]==true)  item.style.backgroundColor="green";
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
