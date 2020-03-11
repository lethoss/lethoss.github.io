
let url="https://api.timezonedb.com/v2.1/get-time-zone?key=XWL8KDUPL5N5&format=json&by=zone&zone=Europe/Kiev";
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:  ""
  })
      .then((response) => {
          return response.json();
      }).then((data) => {
          let res = document.querySelector('#clock');
          res.innerText = data.formatted;
          let abc = data.formatted
          return abc;
      });
console.log(abc);
let timerId = setTimeout(function clock(){
console.log(data);
  timerId = setTimeout(clock, 1000);
}, 1000);
