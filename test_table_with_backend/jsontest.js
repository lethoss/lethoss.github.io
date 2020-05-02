let urlTest = 'http://localhost:3000/tables';
document.querySelector('#takeTable').onclick = function (){
fetch(urlTest)
  .then ((response) => {
    return response.json();
  })
    .then((data) => {
addElement(data);
    });
}

function addElement(data){
  let container = document.querySelector('#content');
    for (i in data){
      let tr = document.createElement('tr');
      container.appendChild(tr);
      let th = document.createElement('th');
      th.innerText = i;
      th.setAttribute('class',i);
      tr.appendChild(th);
      for (j in data[i]){
        let td = document.createElement('td');
        let input = document.createElement('input');
        input.value = data[i][j];
        input.setAttribute('readonly','true');
        input.setAttribute('class',i);
        td.setAttribute('class',i);
        tr.appendChild(td);
        td.appendChild(input);
      }
      let deleteButton = document.createElement('button');
      deleteButton.innerText = 'Удалить строку';
      deleteButton.id = i + 'DeleteButton';
      deleteButton.setAttribute('class','deleteButton' + ' ' + i);
      tr.appendChild(deleteButton);
    }
    let deleteButtonArray =  document.querySelectorAll('.deleteButton');
    deleteButtonArray.forEach((item, i) => {
      item.onclick = function(){
        let rowForDelete = item.id.slice(0,-12);
        console.log(rowForDelete);
        let itemsforDelete = document.querySelectorAll('.'+rowForDelete);
        itemsforDelete.forEach((item, i) => {
          console.log(item);
          item.remove();
        });

      }
    });

  }


let newText = document.createElement('span');
document.querySelector('#newRecordButton').onclick = function (){
document.querySelector('#newRecordButton').setAttribute('disabled', 'true');
  if (newText) {
    newText.remove();
  }
  let newInput = document.createElement('input');
  newInput.setAttribute('type', 'text');
  newInput.setAttribute('placeholder', 'Введите название нового животного');
  newInput.style.width = '250px';
  newInput.setAttribute('value', '');
  let newRecord = document.querySelector('#newRecord');
  newRecord.appendChild(newInput);
  let submitButton = document.createElement('button');
  submitButton.setAttribute('id','submitButton');
  submitButton.innerText = 'Отправить данные';
  newRecord.appendChild(submitButton);
  let newAnimal = '';
  submitButton.onclick = function () {
    if (newAnimal == ''){
      newAnimal = newInput.value;
      newInput.value = '';
      newInput.placeholder = 'Введите вес нового животного';
    } else {
        let newWeight = newInput.value;
        submitButton.remove();
        newInput.remove();
        newText.innerText = 'Запись в базу добавлена!'
        newRecord.appendChild(newText);
        document.querySelector('#newRecordButton').removeAttribute('disabled');
          async function postData(url = '', data = {}) {
            const response = await fetch(url, {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                          'Content-Type': 'application/json'
                        },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
              body: JSON.stringify(data)
            });
            return await response.json();
          }
          postData(urlTest, {
            number: [6],
            animals: [newAnimal],
            weight: [parseInt(newWeight)]
          })
            .then((data) => {
            //  console.log(data);
            });
    }
}
}
