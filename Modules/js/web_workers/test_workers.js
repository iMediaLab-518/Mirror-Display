/**
 * 
 * @authors Wang Hanze
 * @date    2018-05-13 02:32:58
 * @version 1.0.0
 */

/* jshint esversion: 6 */
importScripts('../jquery.nodom.js')

function test(GATE = 'test') {
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
            let info = data.res;
            console.log('web_worker:' + info);
            //$('#health-1').text(health);
            postMessage(info);
            //setTimeout('test()', 2000);
        }
    });
    close();
}

test();