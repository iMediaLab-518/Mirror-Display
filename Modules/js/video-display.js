/**
 *
 * @authors He xi
 * @date    2018-09-15 16:46:32
 * @version 1.8.8
 */

(function($){
	$('.Return').on('click',function(e){
		window.location.href='login.html';
	})
	$('.SetUp').on('click',function(e){
		console.log(1);
	})
	function fetchContext() { //右下角 日期时间的获取
		let time = moment().format('HH:mm');
		let second = moment().format(':ss');
		let date = moment().format('YYYY-MM-DD');
		let week = moment().format('dddd');
		$('#time-element').text(time);
		$('#second-element').text(second);
		$('#date-element').text(date);
		$('#week-element').text(week);
	}
	let fetchTimer1 = window.setInterval(fetchContext, 1000);
//	mui('.bottomPopover').popover(status[,anchor]);
})(jQuery)
