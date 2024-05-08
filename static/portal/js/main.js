$(function () {
	//header 오버시
	$('#header, #gnb a').on('mouseover focusin', function () {
		$('#header').addClass('over');
	});
	$('#header, #gnb a').on('mouseleave', function () {
		$('#header').removeClass('over');
	});
});

$(function () {
	const section1Visual = new Swiper('.section1-visual', {
		// Optional parameters
		// direction: 'vertical',
		loop: true,
		speed: 1500,
		autoplay: {
			delay: 10000, // 시간 설정
			disableOnInteraction: false, // false-스와이프 후 자동 재생
			loop: true, //무한반복 할지말지,
		},
		grabCursor: true,
		//effect: "creative",
		effect: "fade",
		fadeEffect: { 
			crossFade: true 
		},
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
		grabCursor: true,		
		//effect: "creative",
		/*effect: "fade",
		fadeEffect: { 
			crossFade: true 
		},
		creativeEffect: {
			prev: {
				shadow: true,
				translate: ["-20%", 0, -1],
			},
			next: {
				translate: ["100%", 0, 0],
			},
		},*/

		// Navigation arrows
		navigation: {
			nextEl: '.section1-visual__swiper-button-next',
			prevEl: '.section1-visual__swiper-button-prev',
		},
		pagination: {
			el: '.section1-visual .swiper-pagination',
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


	$('.section1-visual__swiper-button-stop').on('click', function () {
		$(this).hide().next().show().focus()
		section1Visual.autoplay.stop();
	});
	$('.section1-visual__swiper-button-play').on('click', function () {
		$(this).hide().prev().show().focus()
		section1Visual.autoplay.start();
	});
	$('.section1-visual .swiper-slide').on('mouseover', function(){
		section1Visual.autoplay.stop();
	});
	$('.section1-visual .swiper-slide').on('mouseout', function(){
		section1Visual.autoplay.start();
	});	
});


//bok 이슈
$(function () {
	const issue = new Swiper('.issue', {
		init: false,
		//freeMode: true,
		// Optional parameters
		loop: true,
		slidesPerView : '3.9',
		spaceBetween : 30, 
		loopAdditionalSlides : 1,
		breakpoints: {
			// window 넓이 640px ~ 767px
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			// window 넓이 768px ~ 1023px
			768: {
				slidesPerView: 2.5,
				spaceBetween: 30,
			},
			// window 넓이 1024px ~
			1024: {
				slidesPerView : '3.9',
				spaceBetween: 30,
			},
		},
		navigation: {
			prevEl: '.issue-prev',
			nextEl: '.issue-next',
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
		pagination: {
			el: '.swiper-pagination',
			type: "fraction",
		},
		observer: true,
		observeParents: true,
	});
	issue.init();//초기화
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
			if(winWChk != 'mo' && winW <= 768){ //모바일 버전으로 전환할 때
				sliderAct();
				winWChk = 'mo';
			}
			if(winWChk != 'pc' && winW >= 769){ //PC 버전으로 전환할 때
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
			if (winW > 768){ //PC 버전
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
					//nextEl: $('.slider-' + index).find('.media-next'),
					//prevEl: $('.slider-' + index).find('.media-prev'),
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
$(".tab-sns a").on('click', function () {
	$(".tab-sns a").removeClass("active").removeAttr("title");
	$(this).addClass("active").attr("title", "선택됨")
	$(".tab_list").hide();
	let tabid = $(this).attr("rel");
	$("." + tabid).fadeIn();
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
	$(".board-list1 .swiper-slide").on('mouseover focusin', function (e) {
		$(this).addClass("hover").siblings().removeClass("hover");
	});
	$(".board-list1 .swiper-slide").on('mouseleave', function (e) {
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
		freeMode: true,
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
	$('.popup .swiper-slide').on('mouseover', function(){
		popup.autoplay.stop();
	});
	$('.popup .swiper-slide').on('mouseout', function(){
		popup.autoplay.start();
	});	
});