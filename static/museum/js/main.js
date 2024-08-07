$(function () {
	//메인 헤더 스타일 추가
	$("#header").addClass("main");
	$(window).trigger("resize"); //강제 리사이징

	//메인 비쥬얼 영역 swiper 설정
	var section1Visual = new Swiper('.section1-visual', {
		speed: 1000,
		autoplay: {
			delay: 10000,
			disableOnInteraction: false,
		},
		grabCursor: true,
		loop: true,
		// effect: "creative",
		// creativeEffect: {
		// 	prev: {
		// 		shadow: true,
		// 		translate: ["-20%", 0, -1],
		// 	},
		// 	next: {
		// 		translate: ["100%", 0, 0],
		// 	},
		// },
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
	});
	//메인 비쥬얼 영역 progress 추가 설정
	section1Visual.on('slideChange',function(){

		if ( $(".section1-visual").hasClass("current-stop") ) {
			return $(".progress").removeClass('active first');
			
		}
		$(".progress").removeClass('active first');
		console.log($(".progress").offset());
		
		$(".progress").addClass('active');
	});


	//자동 재생 멈춤
	$('.section1-visual__swiper-button-stop').on('click', function () {
		$(this).parents(".swiper").addClass("current-stop");

		$(this).hide().next().show().focus()
		section1Visual.autoplay.stop();
		// $(".section1-visual .autoplay-progress .progress").css({ "animation": "none"});

		$(".section1-visual .autoplay-progress .progress").removeClass("active first");
	});

	//자동 재생 플레이
	$('.section1-visual__swiper-button-play').on('click', function () {
		$(this).parents(".swiper").removeClass("current-stop");
		
		$(this).hide().prev().show().focus()
		section1Visual.autoplay.start();

		$(".section1-visual .autoplay-progress .progress").addClass("active");
	});

	//스크롤 이벤트
	function goToScroll() {
		// 주 메뉴
		var h = 0;
		if ($(window).scrollTop() > h) {
			$('body').addClass('gnb-stiky');
			$(".mouseWrap").css({ opacity: 0});
		} else {
			$('body').removeClass('gnb-stiky');
			$(".mouseWrap").css({ opacity: 1});
		}
	}
	goToScroll();
	
	$(window).on('scroll', function () {
		goToScroll();
	});
});

$(function () {
	//메인 박물관소식 영역 swiper 설정

	var museumNews = new Swiper('#section2 .swiper', {
		slidesPerView: "auto",
		loop: true,
		speed: 1000,
		navigation: {
			prevEl: '.section2__swiper-button-prev',
			nextEl: '.section2__swiper-button-next',
		},
	});



	// var slideLength = $(".section2-img .swiper-slide").length;
	// var section2Img = new Swiper('.section2-img', {
	// 	loopAdditionalSlide: 1,
	// 	watchSlidesProgress: true,
	// 	slideToClickedSlide: true,
	// 	speed: 1000,
	// 	resizeObserver: true,
	// 	centeredSlides: true,
	// 	slidesPerView: "auto",
	// 	// on: {
	// 	// 	slideChange: function(){
	// 	// 		//마지막 인덱스가 active 됐을때
	// 	// 		//console.log( this.activeIndex )

	// 	// 		if ( (this.activeIndex + 1) == slideLength) {
	// 	// 			$(".section2-img .swiper-slide").eq(slideLength - 1).css({ "margin-left" : -90});
	// 	// 		}
	// 	// 		else {
	// 	// 			$(".section2-img .swiper-slide").eq(slideLength - 1).css({ "margin-left" : 0});
	// 	// 		}
	// 	// 	}
	// 	// },
	// 	breakpoints: {
	// 		360: {
	// 			slidesPerView: "auto",
	// 			centeredSlides: true,
	// 			spaceBetween: 30,

	// 		},
	// 		1200: {
	// 			slidesPerView: 1,
	// 			centeredSlides: false,
	// 		}
	// 	}
	// });

	// var section2Txt = new Swiper('.section2-txt', {
	// 	slidesPerView: 1,
	// 	loopAdditionalSlide: 1,
	// 	watchSlidesProgress: true,
	// 	effect: "fade",
	// 	speed: 1000,
	// 	touchRatio: 0,
	// 	resizeObserver: true,
	// 	navigation: {
	// 		prevEl: '.section2-prev',
	// 		nextEl: '.section2-next',
	// 	},
	// 	pagination: {
	// 		el: '.pagination-fraction',
	// 		type: 'fraction',
	// 		formatFractionCurrent: function (number) {
	// 			return ('0' + number).slice(-2);
	// 		},
	// 		formatFractionTotal: function (number) {
	// 			return ('0' + number).slice(-2);
	// 		},
	// 		renderFraction: function (currentClass, totalClass) {
	// 			return '<span class="' + currentClass + '"></span>' +
	// 				' / ' +
	// 				'<span class="' + totalClass + '"></span>';
	// 		}
	// 	},
	// });
	// section2Txt.controller.control = section2Img;
	// section2Img.controller.control = section2Txt;

}); //doc end


