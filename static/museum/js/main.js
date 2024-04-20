$(function () {

	//메인 헤더 스타일 추가
	$("#header").addClass("main");

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
});

$(function () {
	//메인 박물관소식 영역 swiper 설정
	var slideLength = $(".section2-img .swiper-slide").length;
	var section2Img = new Swiper('.section2-img', {
		slidesPerView: "auto",
		//loop: true,
		// loopedSlides: 1,
		spaceBetween: 30,
		loopAdditionalSlide: 1,
		watchSlidesProgress: true,
		slideToClickedSlide: true,
		speed: 1000,
		resizeObserver: true,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
		on: {
			slideChange: function(){
				//마지막 인덱스가 active 됐을때
				if ( (this.activeIndex + 1) == slideLength) {
					$(".section2-img .swiper-slide").eq(this.activeIndex + 1).css({ "margin-left" : 30});
				}
				//alert();
			}
		},
		breakpoints: {
			360: {
				centeredSlides: true,
			},
			750: {
				centeredSlides: false,
			}
		}
	});

	var section2Txt = new Swiper('.section2-txt', {
		slidesPerView: 1,
		//loop: true,
		// loopedSlides: 1,
		loopAdditionalSlide: 1,
		watchSlidesProgress: true,
		effect: "fade",
		speed: 1000,
		touchRatio: 0,
		resizeObserver: true,
		// autoplay: {
		// 	delay: 4000,
		// 	disableOnInteraction: false,
		// },
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
	});
	section2Txt.controller.control = section2Img;
	section2Img.controller.control = section2Txt;

}); //doc end


