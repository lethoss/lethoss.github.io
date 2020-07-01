
let url = 'https://api.timezonedb.com/v2.1/get-time-zone?key=XWL8KDUPL5N5&format=json&by=zone&zone=Europe/Kiev';
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: ''
})
  .then((response) => {
    return response.json()
  })
  .then((data) => {
    const res = document.querySelector('#clock')
    let gettedTime = Date.parse(data.formatted)
    const currentTime = new Date()
    currentTime.setTime(gettedTime)
    let timerId = setTimeout(function clock () {
      gettedTime += 1000
      currentTime.setTime(gettedTime)
      const textTime = currentTime.toString()
      res.innerText = textTime.substring(16, 24)
      timerId = setTimeout(clock, 1000)
    }, 1000)
  })
