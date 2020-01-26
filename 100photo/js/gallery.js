
function add100Photo(){
j=1;
  for (let i=0; i<100; i++){
  //  let newText=document.createElement("div");
    //let div=document.createElement("div");
    //newText.innerHTML="Елемент каталогу № " + (i+1);
  //let newImage=document.createElement("img");
//  newImage.src="images/photo" + j + ".jpg";
  //newImage.style.right=(parseInt(newImage.style.right) || 0) + 300 + 'px';
  let gallery = document.getElementById('gallery');
  if (i%2!=0) {
gallery.insertAdjacentHTML('beforeend',' <div>' +
'<div class="green">Елемент каталогу № '+ (i+1)+' </div>'+
'<img class="border" src=images/photo'+j+'.jpg >' +
  '</div>'  );
}
else
{ gallery.insertAdjacentHTML('beforeend',' <div>' +
'<div>Елемент каталогу № '+ (i+1)+' </div>'+
'<img src=images/photo'+j+'.jpg >' +
  '</div>'  );}
//gallery.appendChild(newText);
//gallery.appendChild(newImage);
    if (j==4) j=0;
    j++;
}
}
