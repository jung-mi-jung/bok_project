$(function () {

	const section1Visual = new Swiper('.section1-visual', {
		// Optional parameters
		// direction: 'vertical',
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 20000, // 시간 설정
			disableOnInteraction: false, // false-스와이프 후 자동 재생
			loop: true, //무한반복 할지말지,
			// loop: false, //무한반복 할지말지,

		},
		grabCursor: true,
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				origin: "left center",
				translate: ["-5%", 0, -200],
				rotate: [0, 100, 0],
			},
			next: {
				origin: "right center",
				translate: ["5%", 0, -200],
				rotate: [0, -100, 0],
			},
		},
		// 
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

		// Navigation arrows
		navigation: {
			nextEl: '.section1-visual__swiper-button-next',
			prevEl: '.section1-visual__swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			type: "fraction",
		},
		/*pagination: {   // 페이저 버튼 사용자 설정
			el: '.section1-visual-paging',  // 페이저 버튼을 담을 태그 설정
			clickable: false,  // 버튼 클릭 여부
			type: 'bullets', // 버튼 모양 결정 "bullets", "fraction" 
			// renderBullet: function (index, className) {  // className이 기본값이 들어가게 필수 설정
			//     return '<a href="#" class="' + className + '">' + (index + 1) + '</a>'
			// },
			renderFraction: function (currentClass, totalClass) { // type이 fraction일 때 사용
			    return '<span class="' + currentClass + '"></span>' + '<span class="' + totalClass + '"></span>';
			// }
		},*/
		// nextSlideMessage: '다음'
		a11y: { // 웹접근성 
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
	});

	

	const swiper = new Swiper('.notice-ad__swiper', {
		// Optional parameters
		// direction: 'vertical',
		loop: true,



		// Navigation arrows
		navigation: {
			nextEl: '.notice-ad__swiper-button-next',
			prevEl: '.notice-ad__swiper-button-prev',
		},
		// nextSlideMessage: '다음'
		a11y: { // 웹접근성 
			enabled: true,
			prevSlideMessage: '이전 슬라이드',
			nextSlideMessage: '다음 슬라이드',
			slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
		},
	});

});

//알림판
$(function () {
	const swiper = new Swiper('.popup', {
		init: false,
		freeMode: true,
		// Optional parameters
		loop: true,
		loopAdditionalSlides : 1,
		navigation: {
			prevEl: '.popup-prev',
			nextEl: '.popup-next',
		},
		// And if we need scrollbar
		scrollbar: {
			hide:true
		},
		a11y:{
			enabled:true,
		},
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		observer: true,
		observeParents: true,
		on: {
			init: function (v) {
				var item = $('.popup')
				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
			},
			slideChangeTransitionEnd:function(){
				var item = $('.popup')
				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
			}
		}
	});
	swiper.init();//초기화	
	$('.popup .stop').on('click', function () {
		$(this).hide().next().show().focus()
		swiper.autoplay.stop();
	});
	$('.popup .play').on('click', function () {
		$(this).hide().prev().show().focus()
		swiper.autoplay.start();
	});
	$('.popup .swiper-slide').on('mouseover', function(){
		swiper.autoplay.stop();
	});
	$('.popup .swiper-slide').on('mouseout', function(){
		swiper.autoplay.start();
	});	
});