document.querySelector('#test1').onsubmit=function(e){
  e.preventDefault();
    //let test1=e.target;
    let ans='#test11';
if(test1[1].checked == true && test1[3].checked == true && test1[4].checked == true && test1[0].checked == false && test1[2].checked == false) {
rightAnswer(ans);
}
else {
  falseAnswer(ans);}
test1.reset();
}



  document.querySelector('#test2').onsubmit=function(e){
    e.preventDefault();
    let test2=e.target;
    let  ans='#test22';
    if (test2['test2_1'].value == 'бензин'){
       rightAnswer(ans);
      }
    else falseAnswer(ans);
}

document.querySelector('#test3').onsubmit=function(e){
  e.preventDefault();
    let test1=e.target;
    let ans='#test33';
if(test1[0].checked == true && test1[1].checked == true && test1[2].checked == true && test1[3].checked == false && test1[4].checked == false) {
rightAnswer(ans);

}
else {
  falseAnswer(ans);}
test1.reset();
}

document.querySelector('#test4').onsubmit=function(e){
  e.preventDefault();
    let test1=e.target;
    let ans='#test44';
if(test1[1].checked == true) {
rightAnswer(ans);
}
else {
  falseAnswer(ans);}
test1.reset();
}

document.querySelector('#test5').onsubmit=function(e){
  e.preventDefault();
    let test1=e.target;
    let ans='#test55';
if(test1[1].checked == true && test1[3].checked && test1[0].checked == false && test1[2].checked == false) {
rightAnswer(ans);
}
else {
  falseAnswer(ans);}
test1.reset();
}

function rightAnswer(ans) {
  a=document.querySelector('.false');
  b=document.querySelector('.right');
    if (a) a.remove();
    if (b) b.remove();
     let text = document.createElement('div');
     text.className="right";
     text.innerText='Все верно!';
     document.querySelector(ans).appendChild(text);
}
function falseAnswer(ans) {
  a=document.querySelector('.false');
  b=document.querySelector('.right');
  if (a) a.remove();
  if (b) b.remove();
     let text = document.createElement('div');
     text.className="false";
     text.innerText='Ответ не верный, подумайте еще раз!';
     document.querySelector(ans).appendChild(text);
}

let navMenu = document.querySelectorAll('.list-group-item');
for(i=0; i<navMenu.length; i++){
document.querySelectorAll('.list-group-item')[i].onclick = function (e) {
  for(i=0; i<navMenu.length; i++){
    navMenu[i].className="list-group-item list-group-item-action";
  }
let temp = e.target;
temp.setAttribute('Class', 'list-group-item list-group-item-action active');
  console.log(temp);
}
}
