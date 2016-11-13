$().ready(function(){
	console.log('Hello World');
});

//实验左右滑动的手势
function initCarouselSwipeGesture(){
	// 这里使用滑动触发轮播的方法是为左右滑动绑定一个事件；触发轮播事件
	var carouselEvent = document.getElementById('myCarousel');
	var carouselMobileEvent = new Hammer(carouselEvent);
	carouselMobileEvent.on('swipeleft',function(e){
		$('#myCarousel').carousel('next');
	});
	carouselMobileEvent.on('swiperight',function(e){
		$('#myCarousel').carousel('prev');
	});
}
//缩放手势
function initPinchGesture(){
 	var pinchEvent = document.getElementById('pinch');
 	var pinchMobileEvent = new Hammer(pinchEvent);
 	//缩放动作默认是禁止的，需要手动开启
 	pinchMobileEvent.add(new Hammer.Pinch());
 	pinchMobileEvent.on("pinchstart",function(e){
 		console.log(e);
 	});

 	pinchMobileEvent.on("pinchmove",function(e){
 		console.log(e);
 	});

 	pinchMobileEvent.on("pinchend",function(e){
 		console.log(e);
 	});

 	pinchMobileEvent.on("pinchin",function(e){
 		console.log(e);
 	});

 	pinchMobileEvent.on("pinchout",function(e){
 		console.log(e);
 	}); 
}

function initPanGesture(){
	var panEvent = document.getElementById('pan');
	var panMobileEvent = new Hammer(panEvent);
	panMobileEvent.on('pan',function(e){
		console.log(e);
		alert('pan');
	});

	panMobileEvent.on('panup',function(e){
		console.log(e);
		alert('panup');
	});

	panMobileEvent.on('pandown',function(e){
		console.log(e);
		alert('pandown');
	});

	panMobileEvent.on('panleft',function(e){
		console.log(e);
		alert('panleft');
	});

	panMobileEvent.on('panright',function(e){
		console.log(e);
		alert('panright');
	});
}

function initPressGesture(){
	var pressEvent = document.getElementById('press');
	var pressMobileEvent = new Hammer(pressEvent);
	pressMobileEvent.on('press',function(e){
		console.log(e);
		alert('press');
	});

	pressMobileEvent.on('pressup',function(e){
		console.log(e);
		alert('pressup');
	});
}

function initRotateGesture(){
	var rotateEvent = document.getElementById('rotate');
	var rotateMobileEvent = new Hammer(rotateEvent);

	rotateMobileEvent.get('rotate').set({ enable: true });
	
	rotateMobileEvent.add(new Hammer.Rotate());
	rotateMobileEvent.on('rotate',function(){
		alert('rotate');
	});
}

function initTapGesture(){
	var tapEvent = document.getElementById('tap');
	var tapMobileEvent = new Hammer(tapEvent);
	tapMobileEvent.on('tap',function(e){
		alert('tap');
		$('#tap').text(e);
	});
}

function initSwipeGesture(){
	var swipeEvent = document.getElementById('swipe');
	var swipeMobileEvent = new Hammer(swipeEvent);
	swipeMobileEvent.on('swipe',function(ev){
		console.log(ev);
		alert('swipe');
	});

	swipeMobileEvent.on('swipeleft',function(ev){
		console.log(ev);
		alert('swipeleft');
	});

	swipeMobileEvent.on('swiperight',function(ev){
		console.log(ev);
		alert('swiperight');
		$('#swipe').text(ev);
	});
}

function sideBarSwitch(){

	sideBarOff();
	//侧边栏划入划出动作
	var swipeEvent = document.getElementById('main');
	var swipeMobileEvent = new Hammer(swipeEvent);

	swipeMobileEvent.on('swipeleft',function(ev){
		$('.sideBar').removeClass('disappear');
	});

	swipeMobileEvent.on('swiperight',function(ev){
		$('.sideBar').addClass('disappear');
	});
}
	var flag;
function sideBarOff(){
	//我想要在侧栏边其余部分点击就可以关闭侧边栏，判断起来很麻烦，搞了半天；最后使用传入变量的方式来判断点击
	//是不是在侧边栏，做个判断；星期六好无聊 -。-
	
}
