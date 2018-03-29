/**
 * 
 * @authors Wang Hanze
 * @date    2018-03-21 17:16:11
 * @version 1.4.0
 */

function fetchContext() {
  let time = moment().format('HH:mm');
  let second = moment().format(':ss');
  let date = moment().format('YYYY-MM-DD');
  let week = moment().format('dddd');
  $('#time-element').text(time);
  $('#second-element').text(second);
  $('#date-element').text(date);
  $('#week-element').text(week);
}

function getWeather(city = 'hangzhou') {
  let KEY = '5d406a7cf41246108dd72c0986759cbd';
  let API = 'https://free-api.heweather.com/s6/weather';
  let LOCATION = city;
  let url = API + '?location=' + LOCATION + '&key=' + KEY + '&' + 'lang=en' + '&' + 'unit=m';
  //console.log(url);
  $.ajax({
    type: 'GET',
    async: false,
    cache: false,
    url: url,
    dataType: 'json',
    success: (data) => {
      let weather = data.HeWeather6[0];
      console.log(weather);
      $('#weather-element').text(weather.now.cond_txt);
      $('#temp-element').text(weather.now.tmp);
      $('#humidity-element').text(weather.hum);
    }
  });
}

function icon_breath() {
  if ($('#icon-assistant').css('opacity') == 1) {
    console.log('1');
    $('#icon-assistant').css('opacity', 0);
  } else {
    console.log('0');
    $('#icon-assistant').css('opacity', 1);
  }
}

function voice_assistant(strInput = '') {
  $('#assistant-element').text('');
  let count = 0;
  let timer = setInterval(event => {
    if (count >= strInput.length) {
      clearInterval(timer);
    } else {
      //icon_breath();
      $('#assistant-element').text($('#assistant-element').text() + strInput[count]);
      count++;
    }
  }, 300);
}

$(document).ready(event => {
  fetchContext();
  getWeather();
  let fetchTimer1 = window.setInterval(fetchContext, 1000);
  let fetchTimer2 = window.setInterval(getWeather, 300000);
});
$(document).ready(voice_assistant('祝你天天有个好心情'));