$(function () {
	$(".progress").addClass("first");

	//메인 비쥬얼 영역 swiper 설정
	var section1Visual = new Swiper('.section1-visual', {
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		grabCursor: true,
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				translate: ["-20%", 0, -1],
			},
			next: {
				translate: ["100%", 0, 0],
			},
		},
		navigation: {
			nextEl: '.section1-visual__swiper-button-next',
			prevEl: '.section1-visual__swiper-button-prev',
		},
		pagination: {
			el: '.pagination_fraction',
			type: "fraction",
			formatFractionCurrent: function (number) {
				return ('0' + number).slice(-2);
			},
			formatFractionTotal: function (number) {
				return ('0' + number).slice(-2);
			},
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' + '<span class="' + totalClass + '"></span>';
			}
		},
		a11y: {
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
	});
	//메인 비쥬얼 영역 progress 추가 설정
	section1Visual.on('slideChange',function(){
		$(".progress").removeClass('active first');
		console.log($(".progress").offset());
		$(".progress").addClass('active');
	});


//메인 2번째 섹션 영역 swiper 설정
	var txtLength = $(".section2-txt .swiper-slide").length;
	const section2Txt = new Swiper('.section2-txt', {
		slidesPerView: "auto",
		loop: true,
		loopedSlides: 1,
		watchSlidesProgress: true,
		// resizeObserver: true,
		// updateOnWindowResize: true,
		effect: "fade",
		fadeEffect: {
            crossFade: true
        },
		touchRatio: 0,
		speed: 1000,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
			loop: true,
		},
		navigation: {
			prevEl: '.section2-prev',
			nextEl: '.section2-next',
		},
		pagination: {
			el: '.pagination-fraction',
			type: 'fraction',
			formatFractionCurrent: function (number) {
				return ('0' + number).slice(-2);
			},
			formatFractionTotal: function (number) {
				return ('0' + number).slice(-2);
			},
			renderFraction: function (currentClass, totalClass) {
				return '<span class="' + currentClass + '"></span>' +
					' / ' +
					'<span class="' + totalClass + '"></span>';
			}
		},
		a11y:{
			enabled:true,
		},
	});

	var imgLength = $(".section2-img .swiper-slide").length;
	const section2Img = new Swiper('.section2-img', {
		slidesPerView: "auto",
		loop: true,
		loopedSlides: 4,
		watchSlidesProgress: true,
		// resizeObserver: true,
		// updateOnWindowResize: true,
		speed: 1000,
		a11y:{
			enabled:true,
		},
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
			loop: true,
		},
	});
	section2Txt.controller.control = section2Img;
	section2Img.controller.control = section2Txt;
	

	section2Txt.on('slideChange',function(){
		//window.dispatchEvent(new Event('resize'));
		//console.log("텍스트")
	});
	// section2Imgs.on('slideChange',function(){
	// 	//window.dispatchEvent(new Event('resize'));
	// 	console.log("이미지")
	// });



	// swiper autoplay 멈춤, 재생 이벤트
	// $('.swiper .stop').on('click', function () {
	// 	$(this).hide().next().show().focus()
	// 	swiper.autoplay.stop();
	// });
	// $('.swiper .play').on('click', function () {
	// 	$(this).hide().prev().show().focus()
	// 	swiper.autoplay.start();
	// });
	// $('.video .swiper-slide').on('mouseover', function(){
	// 	swiper.autoplay.stop();
	// });
	// $('.video .swiper-slide').on('mouseout', function(){
	// 	swiper.autoplay.start(); 
	// });	




//동영상
// $(function () {
// 	const swiper = new Swiper('.video', {
// 		init: false,
// 		freeMode: true,
// 		// Optional parameters
// 		loop: true,
// 		loopAdditionalSlides : 1,  // 슬라이드 반복 시
// 		// If we need pagination
// 		// pagination: {
// 		// 	// enabled:false,
// 		// 	// type: "fraction",
// 		// 	el: '.section1-ad-page',
// 		// 	clickable: true,	//버튼 클릭 
// 		// },
// 		// Navigation arrows
// 		navigation: {
// 			prevEl: '.video-prev',
// 			nextEl: '.video-next',
// 		},
// 		// And if we need scrollbar
// 		scrollbar: {
// 			hide:true
// 		},
// 		a11y:{
// 			enabled:true,
// 		},
// 		autoplay: {
// 			delay: 3000,
// 			disableOnInteraction: false,
// 		},
// 		observer: true,
// 		observeParents: true,
// 		on: {
// 			init: function (v) {
// 				var item = $('.video')
// 				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
// 			},
// 			slideChangeTransitionEnd:function(){
// 				var item = $('.video')
// 				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
// 			}
// 		}
// 	});
// 	swiper.init();//초기화	
// 	$('.video .stop').on('click', function () {
// 		$(this).hide().next().show().focus()
// 		swiper.autoplay.stop();
// 	});
// 	$('.video .play').on('click', function () {
// 		$(this).hide().prev().show().focus()
// 		swiper.autoplay.start();
// 	});
// 	$('.video .swiper-slide').on('mouseover', function(){
// 		swiper.autoplay.stop();
// 	});
// 	$('.video .swiper-slide').on('mouseout', function(){
// 		swiper.autoplay.start();
// 	});	
// });

// //알림판
// $(function () {
// 	const swiper = new Swiper('.popup', {
// 		init: false,
// 		freeMode: true,
// 		// Optional parameters
// 		loop: true,
// 		loopAdditionalSlides : 1,
// 		navigation: {
// 			prevEl: '.popup-prev',
// 			nextEl: '.popup-next',
// 		},
// 		// And if we need scrollbar
// 		scrollbar: {
// 			hide:true
// 		},
// 		a11y:{
// 			enabled:true,
// 		},
// 		autoplay: {
// 			delay: 3000,
// 			disableOnInteraction: false,
// 		},
// 		observer: true,
// 		observeParents: true,
// 		on: {
// 			init: function (v) {
// 				var item = $('.popup')
// 				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
// 			},
// 			slideChangeTransitionEnd:function(){
// 				var item = $('.popup')
// 				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
// 			}
// 		}
// 	});
// 	swiper.init();//초기화	
// 	$('.popup .stop').on('click', function () {
// 		$(this).hide().next().show().focus()
// 		swiper.autoplay.stop();
// 	});
// 	$('.popup .play').on('click', function () {
// 		$(this).hide().prev().show().focus()
// 		swiper.autoplay.start();
// 	});
// 	$('.popup .swiper-slide').on('mouseover', function(){
// 		swiper.autoplay.stop();
// 	});
// 	$('.popup .swiper-slide').on('mouseout', function(){
// 		swiper.autoplay.start();
// 	});	
// });



});
