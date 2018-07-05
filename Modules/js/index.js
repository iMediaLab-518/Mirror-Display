/**
 *
 * @authors Wang Hanze
 * @date    2018-05-13 14:22:20
 * @version 1.8.1
 */

 /* jshint esversion: 6 */

//let w;

function fetchContext() {//右下角 日期时间的获取

    let time = moment().format('HH:mm');
    let second = moment().format(':ss');
    let date = moment().format('YYYY-MM-DD');
    let week = moment().format('dddd');
    $('#time-element').text(time);
    $('#second-element').text(second);
    $('#date-element').text(date);
    $('#week-element').text(week);
}

function test(GATE = 'test') {

    let API = 'http://127.0.0.1:12345/' + GATE;
    //console.log(API);
    $.ajax({
        type: 'POST',
        async: true,
        url: API,  
        dataType: 'json',
        success: (data) => {
            let test_info = data.res;
            console.log(test_info);
        }
    });
}

function getWeather() {//本地实时天气

    //百度普通id定位的服务接口
    let bd_KEY = 'c2niE7ExcK2izOZ0RWHxShaVVCuPzXvx';
    let city = '';
    $.get("https://api.map.baidu.com/location/ip?ak="+bd_KEY,function(res){
        city = res.content.address_detail.city;
        //删除“市”字
        if(city.indexOf("市")!=-1){
            city = city.substring(0,city.indexOf("市"));
        }

        let KEY = '5d406a7cf41246108dd72c0986759cbd';
        let API = 'https://free-api.heweather.com/s6/weather';
        let LOCATION = city;
        let url = API + '?location=' + LOCATION + '&key=' + KEY + '&' + 'lang=en' + '&' + 'unit=m';
       
        $.ajax({
        type: 'POST',
        data:{lang:'cn'},
        async: true,
        cache: false,
        url: url,
        dataType: 'json',
        success: (data) => {
            let weather = data.HeWeather6[0].now;
            $('#weather-element').text(weather.cond_txt);
            $('#temp-element').text(weather.tmp);
            $('#humidity-element').text(weather.hum);

            let weather_code = weather.cond_code;
            $("#weather-icon").attr("src","Resource/weather-icon/"+ weather_code +".png");

         }
        });        

    }  ,'jsonp');

}

function voice_assistant(strInput = '') {
    let hintwords = strInput;
    console.log(hintwords);
    //$('#assistant-element').fadeIn(1000);

    //逐字显示欢迎语
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
        type: 'POST',
        async: true,
        url: API,
        dataType: 'json',
        success: (data) => {
            let health = data.out;
            console.log(health);
            if (health != '')
                $('#health-1').text(health);
            $('.healthreport-table').fadeTo(500, 0.8);
        }
    });
    // if (typeof (Worker) !== "undefined") {
    //   if (typeof (w) == "undefined") {
    //     w = new Worker("Modules/js/web_workers/test_workers.js");
    //   }
    //   w.onmessage =  (event) => {
    //     console.log(event.data);
    //     voice_assistant(event.data);
    //     $('.healthreport-table').fadeTo(500, 0.8);
    //   };
    // } else {
    //   console.log('Sorry, your browser does not support Web Workers...');
    // }
}

function getVoiceInfo(GATE = 'voice') {
    voice_assistant('请输入语音指令');
    let API = 'http://127.0.0.1:12345/' + GATE;
    //console.log(API);
    $.ajax({
        type: 'POST',
        async: true,
        url: API,
        dataType: 'json',
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
        type: 'POST',
        async: true,
        url: API,
        dataType: 'json',
        success: (data) => {
            let user = data.user;
            console.log(user);
            for (let i = 0, len = user.length; i < len; i++) {
                if (user[i] != '' && user[i] != 'ERR' && user[i] != 'unknown' && user[i].indexOf('INFO')) {
                    voice_assistant('你好，' + user[i] + ',欢迎使用智能健康魔镜');
                } else if (user[i] != '' && user[i] != 'ERR' && user[i] == 'unknown') {
                    voice_assistant('用户未认证');
                } else {
                    voice_assistant('对不起，没有识别到认证用户');
                }
            }
        },
        error: (e) => {
            voice_assistant('没有识别到人脸');
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

function draw_WeightCurve_Chart(){
    let chart = echarts.init(document.getElementById("weightCurveChart"));
    let option = {
        title:{
            text:"体重变化曲线",
            left:'center',
            textStyle:{
                color:"#ffffff",
                fontSize : '20px'
            }
        },
        textStyle:{
            color:'#ffffff'
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July']            
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [45, 44, 46, 47, 46, 45, 44],
            type: 'line',
            smooth: true
        }]
    };
    chart.setOption(option);
}

function draw_CompositionPie_Chart(){

    let chart = echarts.init(document.getElementById("compositionPieChart"));
    let option = {
    title : {
        text: '身体成分图',
        x:'center',
        textStyle:{
            color:'#ffffff'
        }
    },
    textStyle:{
        color:"#ffffff"
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient:'vertical',
        x : '50px',
        y : '100px',
        data:['水分','肌肉','骨量','脂肪','其他']
    },
   
    calculable : true,
    series : [
        {
            name:'',
            type:'pie',
            radius : [20, 100],
            center : ['60%', '50%'],//圆心xy的位置
            roseType : 'area',
            data:[
                {value:30, name:'水分'},
                {value:20, name:'肌肉'},
                {value:18, name:'骨量'},
                {value:22, name:'脂肪'},
                {value:10,name:'其他'}
            ]
        }
    ]
};

    chart.setOption(option);

}


$(document).ready(event => {

    $(".carousel").carousel('cycle');
    // let carouselID = setInterval(() => {
    //   $(".carousel").carousel('next');
    // }, 1000);
    // $('.healthreport-table').fadeTo(0, 0);
    // $('#video1').fadeTo(0, 0);

    fetchContext();
    // test();
    getWeather();
    // getHealthInfo('temperature');

    // playVideo();
    // stopVideo();
    // startVoice();

    draw_WeightCurve_Chart();
    draw_CompositionPie_Chart();


    let fetchTimer1 = window.setInterval(fetchContext, 1000);
    let fetchTimer2 = window.setInterval(getWeather, 300000);
    let fetchTimer3 = window.setInterval('getHealthInfo("temperature")', 30000);
    voice_assistant('祝您新的一天生活愉快');
    //let fetchTimer4 = window.setInterval('voice_assistant("智能健康魔镜项目演示")', 5000);
    //let fetchTimer5 = window.setInterval(getVoiceInfo, 3000);
});