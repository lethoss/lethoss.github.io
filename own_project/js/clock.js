

let timerId = setTimeout(function clock(){
let url="http://api.timezonedb.com/v2.1/get-time-zone?key=XWL8KDUPL5N5&format=json&by=zone&zone=Europe/Kiev";
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
      });
  timerId = setTimeout(clock, 1000);
}, 1000);
