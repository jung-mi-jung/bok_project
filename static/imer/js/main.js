$(function () {
	//비쥬얼 & 컨퍼런스
	var galleryThumbs = new Swiper(".section1-visual", {
		slidesPerView: 1,	// 보여지는 슬라이드 갯수
		spaceBetween: 0,	// 마진값
		loop: true,	// 슬라이드 반복 여부
		//freeMode: true, 
		effect: 'true', //슬라이드 이미지가 쌓이는 느낌
		// autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
		// 	delay : 5000,  //시간 설정
		// 	disableOnInteraction : false,
		// },
		navigation: {	// 버튼 사용자 지정
			prevEl: ".section1__swiper-button-prev",
			nextEl: ".section1__swiper-button-next",
		},
		pagination: {
			el: '.s1-bottom-set .swiper-pagination',
			type: "fraction",
		},
		observer: true, //처음에 보이지 않는 display: none 상태인 요소 포커스 오류 정정
		observeParents: true,
		watchOverflow : true,	//슬라이드가 1개 일 때 pager, button 숨김 여부 설정
		on: {
			init: function (v) {
				var item = $('.s1-bottom-set')
				item.find('.swiper-slide-active a').attr('tabindex',0).siblings().attr('tabindex',-1)
			},
			slideChangeTransitionEnd:function(){
				var item = $('.s1-bottom-set')
				item.find('.swiper-slide-active a').attr('tabindex',0).siblings().attr('tabindex',-1)
			}
		},	
		thumbs: {
			swiper: galleryList,
		},	
	});
	var galleryList = new Swiper(".s1-bottom-set .swiper-container", {
		slidesPerView: 1,	// 보여지는 슬라이드 갯수
		spaceBetween : 0,	// 전체적인 슬라이드의 왼쪽에 0px 공백을 준다.
		direction: 'vertical', // 수직 슬라이드
		touchRatio: 0,  //드래그 금지
		loop: true,
		pagination : false,	//pager 여부
		// autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
		// 	delay : 5000,  //시간 설정
		// 	disableOnInteraction : false,  //true 설정시 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
		// },
		//effect: 'true', //슬라이드 이미지가 쌓이는 느낌
	});
	
	galleryList.controller.control = galleryThumbs;
	galleryThumbs.controller.control = galleryList;

	galleryList.init();//초기화
	galleryThumbs.init();//초기화



	$('.section1__swiper-button-stop').on('click', function () {
		$(this).hide().next().show().focus()
		galleryList.autoplay.stop();
		galleryThumbs.autoplay.stop();
	});
	$('.section1__swiper-button-play').on('click', function () {
		$(this).hide().prev().show().focus()
		galleryList.autoplay.start();
		galleryThumbs.autoplay.start();
	});
	$('.s1-bottom-set .swiper-slide').on('mouseover', function(){
		galleryList.autoplay.stop();
	});
	$('.s1-bottom-set .swiper-slide').on('mouseout', function(){
		galleryList.autoplay.start();
	});
});


//최신 연구자료
$(function () {
	const board1 = new Swiper('.board-list1', {
		init: false,
		//freeMode: true,
		// Optional parameters
		loop: false,
		slidesPerView : '4',
		spaceBetween : 40,
		breakpoints: {
			// window 넓이 640px ~ 767px
			320: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			// window 넓이 768px ~ 1023px
			768: {
			  slidesPerView: 2,
			  spaceBetween: 20,
			},
			// window 넓이 1024px ~
			1024: {
			  slidesPerView: 4,
			  spaceBetween: 40,
			},
		},
		navigation: {
			prevEl: '#section2 .board-list-prev',
			nextEl: '#section2 .board-list-next',
		},
		// And if we need scrollbar
		scrollbar: {
			hide:true
		},
		a11y:{
			enabled:true,
		},
		//autoplay: {
		//	delay: 3000,
		//	disableOnInteraction: false,
		//},
		observer: true,
		observeParents: true,
	});
	board1.init();//초기화	
});


//연구포럼 및 세미나
$(function () {
	const board2 = new Swiper('.board-list2', {
		init: false,
		//freeMode: true,
		// Optional parameters
		loop: false,
		slidesPerView : '4',
		spaceBetween : 40,
		breakpoints: {
			// window 넓이 640px ~ 767px
			320: {
			  slidesPerView: 1,
			  spaceBetween: 20,
			},
			// window 넓이 768px ~ 1023px
			768: {
			  slidesPerView: 2,
			  spaceBetween: 20,
			},
			// window 넓이 1024px ~
			1024: {
			  slidesPerView: 4,
			  spaceBetween: 40,
			},
		},
		navigation: {
			prevEl: '#section3 .board-list-prev',
			nextEl: '#section3 .board-list-next',
		},
		// And if we need scrollbar
		scrollbar: {
			hide:true
		},
		a11y:{
			enabled:true,
		},
		//autoplay: {
		//	delay: 3000,
		//	disableOnInteraction: false,
		//},
		observer: true,
		observeParents: true,
	});
	board2.init();//초기화	
});