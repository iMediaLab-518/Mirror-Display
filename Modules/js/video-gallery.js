(function($){
	//视频强度若接口使用数字，可以用字典值进行转换。
	//怎么判断视频强度并进行分组？[todo]
	
	//视频库组件1: 视频强度
	Vue.component('my-intensity',{
		props:['post'],
		template:`
		<div>
			<div class="intensity-txt">
				<h1>
				<span class="glyphicon glyphicon-fire"></span>
				运动强度: 
				</h1>
			</div>
			<div class="intensity-value">
				<h1>
					{{post.intensity}}
				</h1>
			</div>
		</div>
		`
	})
	//视频库组件2: 视频封面+简介
	Vue.component('my-video',{
	  	props: ['post'],
  		template: `
  		<div class="media">
			<!--视频封面-->
			<div class="media-left video-cover">
				<a href="#">
					<img :src="post.imgURL" />
				</a>
			</div>
			<!--视频简介-->
			<div class="media-body video-intro">
				<div class="video-name">
					<span class="glyphicon glyphicon-bookmark"></span>
					{{post.name}}
				</div>
				<div class="video-time-txt">
					<span class="glyphicon glyphicon-time"></span>
					{{post.time}}
				</div>
				<div class="calorie-loss">
					<span class="glyphicon glyphicon-flash"></span>
					约
					<span style="font-size:1.5em">{{post.calorie}}</span>
					千卡
				</div>
			</div>
		</div>
  		`
  		
	})
	//怎么跟接口的数据连起来？
	//视频强度
	new Vue({
		el:'.exercise-intensity',
		data:{
			posts:[
				{id:1,intensity:'1'}
			]
		}
	})
	//视频简介
	new Vue({
		el:".video-gallery-item",
		data:{
			posts:[
		      { id: 1,intensity:'1',name: '热身操1',time:'2分30秒',calorie:'2',imgURL:'Resource/video/cover1.png'},
		      { id: 2,intensity:'1', name: '热身操1',time:'2分30秒',calorie:'2',imgURL:'Resource/video/cover1.png'},
		      { id: 3,intensity:'1', name: '热身操1',time:'2分30秒',calorie:'2',imgURL:'Resource/video/cover1.png'},
			]
		}
	})
	
})(jQuery)
