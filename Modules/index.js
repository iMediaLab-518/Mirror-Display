/**
 * 
 * @authors Wang Hanze
 * @date    2018-05-13 01:46:45
 * @version 1.8.0
 */

/* jshint esversion: 6 */

let hintwords = '';

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
      $('#humidity-element').text(weather.now.hum);
    }
  });
}

function voice_assistant(strInput = '') {
  hintwords = '';
  hintwords = strInput;
  console.log(hintwords);
  //$('#assistant-element').fadeIn(1000);
  $('#assistant-element').text('');
  let count = 0;
  let timer = setInterval(event => {
    if (count >= hintwords.length) {
      clearInterval(timer);
      //$('#assistant-element').fadeOut(1000);
    } else {
      //icon_breath();
      $('#assistant-element').text($('#assistant-element').text() + hintwords[count]);
      count++;
    }
  }, 200);
}

function getHealthInfo(GATE = '') {
  let API = 'http://127.0.0.1:12345/' + GATE;
  //console.log(API);
  $.ajax({
    type: 'GET',
    cache: false,
    url: API,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'successCallback',
    success: (data) => {
      let health = data.out;
      console.log(health);
      $('#health-1').text(health);
      $('.healthreport-table').fadeTo(500, 0.8);
    }
  });
}

function getVoiceInfo(GATE = 'voice') {
  voice_assistant('请输入语音指令');
  let API = 'http://127.0.0.1:12345/' + GATE;
  //console.log(API);
  $.ajax({
    type: 'GET',
    cache: false,
    url: API,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'successCallback',
    success: (data) => {
      let voice = data.res;
      console.log(voice);
      $('#health-2').text(voice);
      $('.healthreport-table').fadeTo(500, 0.8);
      if (voice != '' && voice.indexOf('开始'))
        getFaceLogin();
    }
  });
}

function getFaceLogin(GATE = 'face') {
  voice_assistant('请将面部对准摄像头');
  let API = 'http://127.0.0.1:12345/' + GATE;
  //console.log(API);
  $.ajax({
    type: 'GET',
    cache: false,
    url: API,
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'callback',
    jsonpCallback: 'successCallback',
    success: (data) => {
      let user = data.user;
      console.log(user);
      for (let i = 0; i < user.length; i++) {
        if (user[i] != '' && user[i] != 'ERR' && user[i] != 'unknown' && user[i].indexOf('INFO')) {
          voice_assistant('你好，' + user[i] + ',欢迎使用智能健康魔镜');
        } else {
          voice_assistant('对不起，没有识别到认证用户');
        }
      }
    }
  });
}

function playVideo(video = $('#video1')) {
  video.click(() => {
    video.fadeTo(500, 1);
    video.trigger('play');
  });
}

function stopVideo(video = $('#video1')) {
  video.dblclick(() => {
    video.fadeTo(500, 0);
    video.trigger('pause');
  });
}

function startVoice() {
  $('.assistant-table').click(() => {
    getVoiceInfo();
  });
}

$(document).ready(event => {
  //voice_assistant('初始化...');
  $('.healthreport-table').fadeTo(0, 0);
  $('#video1').fadeTo(0, 0);
  fetchContext();
  getWeather();
  getHealthInfo('temperature');

  playVideo();
  stopVideo();
  startVoice();

  let fetchTimer1 = window.setInterval(fetchContext, 1000);
  let fetchTimer2 = window.setInterval(getWeather, 300000);
  let fetchTimer3 = window.setInterval('getHealthInfo("temperature")', 30000);
  voice_assistant('祝您新的一天生活愉快');
  //let fetchTimer4 = window.setInterval('voice_assistant("智能健康魔镜项目演示")', 5000);
  //let fetchTimer5 = window.setInterval(getVoiceInfo, 3000);
});