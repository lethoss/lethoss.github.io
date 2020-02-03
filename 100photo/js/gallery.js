
function add100Photo(){
let gallery=document.getElementById('gallery');
j=1;
for (let i=1; i<=100; i++){
  let div=document.createElement('div');
  if (i%2==0) div.setAttribute('class','plitka2');
  let img=document.createElement('img');
  let text=document.createElement('div');
  text.innerHTML='Плитка №'+i;
  img.src="images/photo"+j+".jpg";
  gallery.appendChild(div);
  div.appendChild(text);
  div.appendChild(img);
  if (j==5) j=1;
  j++;
}
document.getElementById("button1").disabled="true";
button1.innerHTML="You allredy added 100 photo ";
button1.style.color="blue";
}
