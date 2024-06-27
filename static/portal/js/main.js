$(function () {
	//header 오버시
	$('#header, #gnb a').on('mouseover focusin', function () {
		$('#header').addClass('over');
	});
	$('#header, #gnb a').on('mouseleave', function () {
		$('#header').removeClass('over');
	});

	var $window = $(window);
	// gnb stiky
	function goToScroll() {
		// 주 메뉴
		var h = 147;
		if ($(window).scrollTop() > h) {
			$('body').addClass('gnb-stiky');
		} else {
			$('body').removeClass('gnb-stiky');
		}
	}
	$(window).on('scroll', function () {
		goToScroll();
	});
	goToScroll();
});

$(function () {
	
	
	var options = {};

	if ( $(".section1-visual .swiper-slide").length == 1) {
		options = {
			slidesPerView: 1,	// 보여지는 슬라이드 갯수
			watchOverflow: true,
		}
		$(".section1-visual__ctrl").css({display: "none"});
	} else {
		options = {
			loop: false,	
			slidesPerView : 'auto',
			centeredSlides: true,
			speed: 1000,
			autoplay: {
				delay: 10000, // 시간 설정
				disableOnInteraction: false, // false-스와이프 후 자동 재생
				//loop: true, //무한반복 할지말지,
			},
			grabCursor: true,
			//effect: "creative",
			effect: "fade",
			fadeEffect: { 
				crossFade: true 
			},
			// Navigation arrows
			navigation: {
				nextEl: '.section1-visual__swiper-button-next',
				prevEl: '.section1-visual__swiper-button-prev',
			},
			pagination: {
				el: '.pagination_fraction',
				type: "fraction",
				//type: "bullets",
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
			a11y: { // 웹접근성 
				enabled: true,
				prevSlideMessage: '이전 슬라이드',
				nextSlideMessage: '다음 슬라이드',
				slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
			},
			on: {
				init: function(){
					$(".progress").addClass('active');
				},
				slideChangeTransitionStart: function(){
					$(".progress").removeClass('first active');
				},
				slideChangeTransitionEnd: function(){
					$(".progress").addClass('active');
				}
			}
		}
	}

	var section1Visual = new Swiper(".section1-visual", options)



	section1Visual.init();//초기화
	//메인 비쥬얼 영역 progress 추가 설정
	section1Visual.on('slideChange',function(){

		if ( $(".section1-visual").hasClass("current-stop") ) {
			return $(".progress").removeClass('active first');
		}
		//$(".progress").removeClass('active first');
		//console.log($(".progress").offset());
		
		//$(".progress").addClass('active');
	});


	//자동 재생 멈춤
	$('.section1-visual__swiper-button-stop').on('click', function () {
		$(this).parents(".section1-visual").addClass("current-stop");
		$(this).hide().next().show().focus()
		section1Visual.autoplay.stop();
		$(".section1-visual .autoplay-progress .progress").removeClass("active first");
	});
	//자동 재생 플레이
	$('.section1-visual__swiper-button-play').on('click', function () {
		$(this).parents(".section1-visual").removeClass("current-stop");
		$(this).hide().prev().show().focus()
		section1Visual.autoplay.start();
		$(".section1-visual .autoplay-progress .progress").addClass("active");
	});

	$('.section1-visual__swiper-button-next, section1-visual__swiper-button-prev').on('click', function () {
		$(".section1-visual__swiper-button-play").hide().prev().show()
	});

	//마우스 이벤트(웹접근성 보완) - 요청으로 인하여 삭제
	// $('.section1-visual .swiper-slide').on('mouseover', function(){
	// 	section1Visual.autoplay.stop();
	// 	$(".section1-visual .autoplay-progress .progress").removeClass("active first");
	// });
	// $('.section1-visual .swiper-slide').on('mouseout', function(){
	// 	section1Visual.autoplay.start();
	// 	$(".section1-visual .autoplay-progress .progress").addClass("active");
	// });

});


//bok 이슈
$(function () {
	const issue = new Swiper('.issue', {
        init: false,
        //freeMode: true,
        // Optional parameters
        loop: true,
        // slidesPerView: '3.9',
        slidesPerView: 'auto',
        // centeredSlides: true,
        spaceBetween: 30,
        loopAdditionalSlides: 1,
        breakpoints: {
            // window 넓이 640px ~ 767px
            320: {
                slidesPerView: 1,
				//spaceBetween: 10,
                spaceBetween: 30,
            },
            // window 넓이 768px ~ 1023px
            768: {
                slidesPerView: 'auto',
                spaceBetween: 30,
            },
            // window 넓이 1024px ~
            1200: {
                slidesPerView: 'auto',
                spaceBetween: 30,
            },
        },
        navigation: {
            prevEl: '.issue-prev',
            nextEl: '.issue-next',
        },
        // And if we need scrollbar
        scrollbar: {
            hide: true
        },
        a11y: {
            enabled: true,
        },
        //speed: 300,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        // },
        pagination: {
            el: '.swiper-pagination',
            type: "fraction",
        },
        // observer: true,
        // observeParents: true,
    });
    issue.init();//초기화
    issue.on('slideChange', function () {
        var activeSlide = document.querySelector('.issue .swiper-slide-active');
        if (activeSlide) {
            // 활성화된 슬라이드가 센터에 오도록 조정
            var swiperContainerWidth = document.querySelector('.issue .swiper-wrapper').offsetWidth;
            var activeSlideWidth = activeSlide.offsetWidth;
            var slideOffset = (swiperContainerWidth - activeSlideWidth) / 2;
            // swiperContainerWidth.style.transform = 'translateX(' + slideOffset + 'px)';
        }
    });
	// $('.issue-stop').on('click', function () {
	// 	$(this).hide().next().show().focus()
	// 	issue.autoplay.stop();
	// });
	// $('.issue-play').on('click', function () {
	// 	$(this).hide().prev().show().focus()
	// 	issue.autoplay.start();
	// });
	// $('.issue .swiper-slide').on('mouseover', function(){
	// 	issue.autoplay.stop();
	// });
	// $('.issue .swiper-slide').on('mouseout', function(){
	// 	issue.autoplay.start();
	// });	
});


//미디어
/*
$(document).ready(function () {
	slider();
})
function slider(){
	$(".slider").each(function(index){//.slider
		var $this = $(this);
		var winW = window.innerWidth; //화면 가로사이즈
		var swiper = undefined;
		var viewNum = ''; //슬라이드 개수 (옵션)
		var loopChk = ''; //무한반복 체크
		var slideNum =  $this.find('.slider .swiper-slide').length //슬라이드 총 개수
		var slideInx = 0; //현재 슬라이드 index
		//디바이스 체크
		var winWChk = '';
		$(window).on('load resize', function (){
			winW = window.innerWidth;
			if(winWChk != 'mo' && winW <= 750){ //모바일 버전으로 전환할 때 769
				sliderAct();
				winWChk = 'mo';
			}
			if(winWChk != 'pc' && winW >= 750){ //PC 버전으로 전환할 때
				sliderAct();
				winWChk = 'pc';
			}
		})
		function sliderAct(){
			//슬라이드 인덱스 클래스 추가
			$this.addClass("slider-" + index);
			//슬라이드 초기화 
			if (swiper != undefined){ 
				swiper.destroy();
				swiper = undefined;
			}
			//slidesPerView 옵션 설정
			if (winW > 750){ //PC 버전
				viewNum = 3;
			}else{ //mobile 버전
				viewNum = 1;
			}
			//loop 옵션 체크
			if (slideNum > viewNum){
				loopChk = true;
			}else{ 
				loopChk = true;
			}
			swiper = new Swiper('.slider-' + index + ' .inner', {
				slidesPerView: viewNum,
				initialSlide :slideInx,
				//spaceBetween: 0,
				slidesPerGroup: 1,
				loop: loopChk,
				centeredSlides : true,
				effect: 'coverflow',
				coverflowEffect: {
					rotate: 0,
					slideShadows: false,
					stretch: -59,
				},
				// speed : 3000,
				// autoplay: {
				// 	delay: 3000,
				// 	disableOnInteraction: false,
				// },
				navigation: {
					nextEl: '.media-next',
					prevEl: '.media-prev',
				},
				on: {
					activeIndexChange: function () {
						slideInx = this.realIndex; //현재 슬라이드 index 갱신
					}
				},
				observer: true,	//swiper를 초기화
				observeParents: true,
			});
		}        
	});
}
*/


$(function () {

	$(".tab-sns a").on('click', function () {
		$(".tab-sns a").removeClass("active").removeAttr("title");
		$(this).addClass("active").attr("title", "선택됨")
		$(".tab_list").hide();
		let tabid = $(this).attr("rel");
		$("." + tabid).fadeIn();
	});


	swiper1 = new Swiper(".tab01 .inner", {
		slidesPerView: 3,
		//initialSlide :1,
		//slidesPerGroup: 1,
		breakpoints: {
			// window 넓이 640px ~ 767px
			320: {
			slidesPerView: 1,
			},
			// window 넓이 768px ~ 1023px
			768: {
			slidesPerView: 1,
			},
			// window 넓이 1024px ~
			1024: {
			slidesPerView: 3,
			},
		},
		loop: true,
		centeredSlides : true,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			slideShadows: false,
			stretch: -59,
		},
		navigation: {
			nextEl: '.tab01 .media-next',
			prevEl: '.tab01 .media-prev',
		},
		observer: true,	//swiper를 초기화
		observeParents: true,
	});
	swiper1.init();//초기화	


	swiper2 = new Swiper(".tab02 .inner", {
		slidesPerView: 3,
		//initialSlide :1,
		//slidesPerGroup: 1,
		breakpoints: {
			// window 넓이 640px ~ 767px
			320: {
			slidesPerView: 1,
			},
			// window 넓이 768px ~ 1023px
			768: {
			slidesPerView: 1,
			},
			// window 넓이 1024px ~
			1024: {
			slidesPerView: 3,
			},
		},
		loop: true,
		centeredSlides : true,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			slideShadows: false,
			stretch: -59,
		},
		navigation: {
			nextEl: '.tab02 .media-next',
			prevEl: '.tab02 .media-prev',
		},
		observer: true,	//swiper를 초기화
		observeParents: true,
	});
	swiper2.init();//초기화	


	swiper3 = new Swiper(".tab03 .inner", {
		slidesPerView: 3,
		//initialSlide :1,
		//slidesPerGroup: 1,
		breakpoints: {
			// window 넓이 640px ~ 767px
			320: {
			slidesPerView: 1,
			},
			// window 넓이 768px ~ 1023px
			768: {
			slidesPerView: 1,
			},
			// window 넓이 1024px ~
			1024: {
			slidesPerView: 3,
			},
		},
		loop: true,
		centeredSlides : true,
		effect: 'coverflow',
		coverflowEffect: {
			rotate: 0,
			slideShadows: false,
			stretch: -59,
		},
		navigation: {
			nextEl: '.tab03 .media-next',
			prevEl: '.tab03 .media-prev',
		},
		observer: true,	//swiper를 초기화
		observeParents: true,
	});
	swiper3.init();//초기화	


/*
	var swiper1, swiper2, swiper3;

	$(".sns-facebook").on("click", function () {
		try {
			swiper1.destroy(); // 요거 핵심
			swiper2.destroy();
			swiper3.destroy();
		} catch (error) {}
		$(".tab01").show();
		$(".tab02").hide();
		$(".tab03").hide();
		swiper1 = new Swiper(".tab01 .inner", {
			slidesPerView: 3,
			//initialSlide :1,
			//slidesPerGroup: 1,
			breakpoints: {
				// window 넓이 640px ~ 767px
				320: {
				  slidesPerView: 1,
				},
				// window 넓이 768px ~ 1023px
				768: {
				  slidesPerView: 1,
				},
				// window 넓이 1024px ~
				1024: {
				  slidesPerView: 3,
				},
			},
			loop: true,
			centeredSlides : true,
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 0,
				slideShadows: false,
				stretch: -59,
			},
			navigation: {
				nextEl: '.tab01 .media-next',
				prevEl: '.tab01 .media-prev',
			},
			observer: true,	//swiper를 초기화
			observeParents: true,
		});
		swiper1.init();//초기화	
	});

	$(".sns-youtube").on("click", function () {
		try {
			swiper1.destroy(); // 요거 핵심
			swiper2.destroy();
			swiper3.destroy();
		} catch (error) {}
		$(".tab01").hide();
		$(".tab02").show();
		$(".tab03").hide();
		swiper2 = new Swiper(".tab02 .inner", {
			slidesPerView: 3,
			//initialSlide :1,
			//slidesPerGroup: 1,
			loop: true,
			centeredSlides : true,
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 0,
				slideShadows: false,
				stretch: -59,
			},
			navigation: {
				nextEl: '.tab02 .media-next',
				prevEl: '.tab02 .media-prev',
			},
			//on: {
			//	activeIndexChange: function () {
			//		slideInx = this.realIndex; //현재 슬라이드 index 갱신
			//	}
			//},
			observer: true,	//swiper를 초기화
			observeParents: true,
		});
		swiper2.init();//초기화	
	})

	$(".sns-instagram").on("click", function () {
		try {
			swiper1.destroy(); // 요거 핵심
			swiper2.destroy();
			swiper3.destroy();
		} catch (error) {}
		$(".tab01").hide();
		$(".tab02").hide();
		$(".tab03").show();
		swiper3 = new Swiper(".tab03 .inner", {
			slidesPerView: 3,
			//initialSlide :1,
			//slidesPerGroup: 1,
			loop: true,
			centeredSlides : true,
			effect: 'coverflow',
			coverflowEffect: {
				rotate: 0,
				slideShadows: false,
				stretch: -59,
			},
			navigation: {
				nextEl: '.tab03 .media-next',
				prevEl: '.tab03 .media-prev',
			},
			//on: {
			//	activeIndexChange: function () {
			//		slideInx = this.realIndex; //현재 슬라이드 index 갱신
			//	}
			//},
			observer: true,	//swiper를 초기화
			observeParents: true,
		});
		swiper3.init();//초기화	
	})
	//.trigger("click");

*/
	
});


//최신 보고서
$(function () {
	const board1 = new Swiper('.board-list1', {
		init: false,
		//freeMode: true,
		// Optional parameters
		loop: true,
		slidesPerView : '4',
		spaceBetween : 20, 
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
			  spaceBetween: 20,
			},
		},
		navigation: {
			prevEl: '#section4 .board-list-prev',
			nextEl: '#section4 .board-list-next',
		},
		// And if we need scrollbar
		scrollbar: {
			hide:true
		},
		a11y:{
			enabled:true,
		},
		// speed : 3000,
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false,
		// },
		observer: true,
		observeParents: true,
	});
	board1.init();//초기화	


	//웹접근성 포커스
	var boardHover = $(".board-list1 .swiper-slide, .board-list2 .swiper-slide");
	boardHover.on('mouseover focusin', function (e) {
		$(this).addClass("hover").siblings().removeClass("hover");
	});
	boardHover.on('mouseleave', function (e) {
		$(this).removeClass("hover");
	});
});


//BOK 보도자료
$(function () {
	const board2 = new Swiper('.board-list2', {
		init: false,
		//freeMode: true,
		// Optional parameters
		loop: true,
		slidesPerView : '4',
		spaceBetween : 20,
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
			  spaceBetween: 20,
			},
		},
		navigation: {
			prevEl: '#section5 .board-list-prev',
			nextEl: '#section5 .board-list-next',
		},
		// And if we need scrollbar
		scrollbar: {
			hide:true
		},
		a11y:{
			enabled:true,
		},
		// autoplay: {
		// 	delay: 3000,
		// 	disableOnInteraction: false,
		// },
		observer: true,
		observeParents: true,
	});
	board2.init();//초기화	
});



//알림판
$(function () {
	const popup = new Swiper('.popup', {
		init: false,
		//freeMode: true, 슬라이드 1개씩 보여질때 사용금지
		// Optional parameters
		loop: true,
		loopAdditionalSlides : 1,
		slidesPerView : '1',
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
		pagination: {
			el: '.popup-set .swiper-pagination',
			type: "fraction",
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
	popup.init();//초기화	
	$('.popup-stop').on('click', function () {
		$(this).hide().next().show().focus()
		popup.autoplay.stop();
	});
	$('.popup-play').on('click', function () {
		$(this).hide().prev().show().focus()
		popup.autoplay.start();
	});
	$('.popup .swiper-slide').on('mouseover focusin', function(){
		popup.autoplay.stop();
	});
	$('.popup .swiper-slide').on('mouseout focusout', function(){
		popup.autoplay.start();
	});
});