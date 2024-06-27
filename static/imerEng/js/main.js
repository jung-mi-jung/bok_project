$(function () {
	//메인 헤더 스타일 추가
	$("#header").addClass("main");
	//$("#wrap").trigger("resize"); //강제 리사이징

	var listNum = $(".section1-visual .swiper-slide");
	var linkNum = $(".s1-bottom-set .swiper-slide");
	var options = {};

	if ( $(".section1-visual .swiper-slide").length == 1) {
		options = {
			slidesPerView: 1,	// 보여지는 슬라이드 갯수
			spaceBetween: 0,	// 마진값
			effect: 'true', //슬라이드 이미지가 쌓이는 느낌
			watchOverflow: true,
			loop: false,
			autoplay: false,
			on : {
				init: function(){
					if( this.slides.length == 1 ) {
						$(".swiper-pagination, .section1__swiper-button-stop").css({ display: "none"});
					} 
					else {
						$(".swiper-pagination, .section1__swiper-button-stop").css({ display: "flex"});
						
					}
				}
			}
		}
		$(".section1__ctrl").css({display: "none"});
	} 
	else {
		options = {
			slidesPerView: 1,	// 보여지는 슬라이드 갯수
			spaceBetween: 0,	// 마진값
			effect: 'true', //슬라이드 이미지가 쌓이는 느낌
			watchOverflow: true,
			loop: true,
			autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
				delay : 10000,  //시간 설정
				disableOnInteraction : false,
			},
			loopedSlides: 1,
		}
		$(".section1__ctrl").css({display: "flex"});
	}

	var bannerList = new Swiper(".section1-visual", options)
	var bannerlink = new Swiper(".s1-bottom-set .swiper-container", {
		slidesPerView: 1,	// 보여지는 슬라이드 갯수
		spaceBetween: 0,	// 마진값
		navigation: {	// 버튼 사용자 지정
			prevEl: ".section1__swiper-button-prev",
			nextEl: ".section1__swiper-button-next",
		},
		pagination: {
			el: '.swiper-pagination',
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
		direction: 'vertical',
		centerSlides: true,
		touchRatio: 0,
		loop: true,	// 슬라이드 반복 여부
		loopedSlides: 1,
	})

	bannerList.controller.control = bannerlink;
	bannerlink.controller.control = bannerList;


	$('.section1__swiper-button-stop').on('click', function () {
		$(this).hide().next().show().focus()
		bannerList.autoplay.stop();
		bannerlink.autoplay.stop();
	});

	$('.section1__swiper-button-play').on('click', function () {
		$(this).hide().prev().show().focus()
		bannerList.autoplay.start();
		bannerlink.autoplay.start();
	});



	//스크롤 이벤트
	function goToScroll() {
		// 주 메뉴
		var h = 0;
		if ($(window).scrollTop() > h) {
			$('body').addClass('gnb-stiky');
		} else {
			$('body').removeClass('gnb-stiky');
		}
	}
	goToScroll();
	
	$(window).on('scroll', function () {
		goToScroll();
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
		spaceBetween : 30,
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
			  spaceBetween: 30,
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
		spaceBetween : 30,
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
			  spaceBetween: 30,
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