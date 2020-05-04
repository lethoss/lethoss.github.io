let urlTest = 'http://localhost:3000/tables';
document.querySelector('#takeTable').onclick = function (){   // take data from Server
fetch(urlTest)
  .then ((response) => {
    return response.json();
  })
    .then((data) => {
      data2 = data.addData;
addTable(data2);
    });
}

function deleteRow (){
let deleteButtonArray =  document.querySelectorAll('.deleteButton');
deleteButtonArray.forEach((item, i) => {
  item.onclick = function(){
    let rowForDelete = item.getAttribute('data-row-id');
    let itemsforDelete = document.querySelectorAll('.'+rowForDelete);
    itemsforDelete.forEach((item, i) => {
      item.remove();
    });
  }
});
}

function editRow (){
  let editButtonArray = document.querySelectorAll('.editButton')
  editButtonArray.forEach((item, i) => {
    item.onclick = function(){
      if (item.innerText == 'Редактировать строку'){
        item.innerText = 'Сохранить';
        let rowForEdit = item.getAttribute('data-row-id');
        let itemsforEdit = document.querySelectorAll('input.' + rowForEdit);
        itemsforEdit.forEach((item, i) => {
          item.removeAttribute('readonly');
        });
    } else {
        item.innerText = 'Редактировать строку';
        let rowForEdit = item.getAttribute('data-row-id');
        let itemsforEdit = document.querySelectorAll('input.' + rowForEdit);
        itemsforEdit.forEach((item, i) => {
          item.setAttribute('readonly','true');
        });
      }
    }
  });
}

function addTable(data){    // create Table with data getted from Server
  let container = document.querySelector('#content');
    for (i in data){
      let tr = document.createElement('tr');
      container.appendChild(tr);
      let th = document.createElement('th'); // create Table Headers with row names
      th.innerText = i;
      th.setAttribute('class',i);
      tr.appendChild(th);
      for (j in data[i]){
        let td = document.createElement('td');
        let input = document.createElement('input'); // create Inputs in each table cell
        input.value = data[i][j];
        input.setAttribute('readonly','true');
        input.setAttribute('class',i);
        td.setAttribute('class',i);
        tr.appendChild(td);
        td.appendChild(input);
      }
      let deleteButton = document.createElement('button');
      deleteButton.innerText = 'Удалить строку';
      deleteButton.setAttribute('data-row-id',i);
      deleteButton.setAttribute('class','deleteButton' + ' ' + i);
      tr.appendChild(deleteButton);
      let editButton = document.createElement('button');
      editButton.innerText = 'Редактировать строку';
      editButton.setAttribute('data-row-id',i);
      editButton.setAttribute('class','editButton' + ' ' + i);
      tr.appendChild(editButton);
    }

    deleteRow();

    editRow();

  }


let newText = document.createElement('span');  // create success alert
document.querySelector('#newRecordButton').onclick = function (){
let num = 0;
document.querySelector('#newRecordButton').setAttribute('disabled', 'true');  // disabled button during adding new data
  if (newText) {
    newText.remove();             // delete success alert if we add new data
  }
  let newInput = document.createElement('input');   // create new input for writting new data
  newInput.setAttribute('type', 'text');
  newInput.id = 'newInput';
  let thArrayClass = [];
  let thArray = document.querySelectorAll('th');
  thArray.forEach((item, i) => {
    thArrayClass[i] = item.getAttribute('class'); // create array with Table Headers
  });
  newInput.style.width = '250px';
  newInput.setAttribute('value', '');
  let newRecord = document.querySelector('#newRecord');
  newRecord.appendChild(newInput);
  let submitButton = document.createElement('button');   // create submit button
  submitButton.innerText = 'Отправить данные';
  newRecord.appendChild(submitButton);
  newInput.setAttribute('placeholder', 'Введите новый ' + thArrayClass[num]);   // create plaseholder with name of new data type
  let dataArray = [];
  submitButton.onclick = function () {
    if (newInput.value != ''){     // if try to submit empty input it will turn red, else white
      newInput.style.backgroundColor = 'white';
      dataArray.push(newInput.value);  // add new data until headers won't end
      newInput.value = '';
      num ++;
      newInput.setAttribute('placeholder', 'Введите новый ' + thArrayClass[num]);  // rename plaseholder after every data record
      if (num == thArrayClass.length){  // when headers are over
        let addData = {};
        for (i in thArrayClass){
          addData[thArrayClass[i]] = [dataArray[i]]; // create Associative Arrays, where key = header and value = data from inputs
        }
        for (key in data2){
          let temp = addData[key];
          data2[key].push(temp[0]);  // add created Associative Array with new data to old table data
        }
        addData = data2;
        submitButton.remove();
        newInput.remove();  //delete inputs and submit button
        newText.innerText = 'Запись в базу добавлена!'
        newRecord.appendChild(newText);
        document.querySelector('#newRecordButton').removeAttribute('disabled');

        let deleteButtonArray =  document.querySelectorAll('.deleteButton');
        deleteButtonArray.forEach((item, i) => {
            let rowForDelete = item.getAttribute('data-row-id');
            let itemsforDelete = document.querySelectorAll('.'+rowForDelete);
            itemsforDelete.forEach((item, i) => {
              item.remove();
            });
        });

        addTable(data2);

          async function postData(url = '', data = {}) {  // send request to Server with new data
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
           addData
          })
            .then((data) => {

          });
}
} else {
  newInput.style.backgroundColor = "red";
}
}
}
