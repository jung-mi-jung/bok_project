$(function () {
	$('.best-box').on('mouseover focusin', function(e) {
		$(".best-layer").show();
		$(".best-layer > ul > li:first-child a").focus();
	});
	$('.best-layer li:last-child a, .best-tsh').on('mouseleave focusout', function(e) {
		$(".best-layer").hide();
	})
	//일간, 주간 탭
	$(".best-tab a").on('click', function () {
		$(".best-tab a").removeClass("active").removeAttr("title");
		$(this).addClass("active").attr("title", "선택됨")
		$(".tab-con").hide();
		//$(".tab-con").css("opacity", "1");
		let tabid = $(this).attr("rel");
		$("." + tabid).fadeIn();
	});
	// $(".a-tab1").on('click', function () {
	// 	swiper1.autoplay.start();
	// 	swiper2.autoplay.stop();
	// 	$(this).css("border", "1px solid red")
	// });
	// $(".a-tab2").on('click', function () {
	// 	swiper2.autoplay.start();
	// 	swiper1.autoplay.stop();
	// });
	//상세검색
	var detailBtn = $(".detailSearchClose");
	detailBtn.on('click', function () {
		$(this).toggleClass("active");
		$(".detail-box").toggleClass("active");
		if ($(".detail-box").hasClass('active')){
			$(this).attr("title", "검색창 레이어 닫기");
		} else {
			$(this).attr("title", "검색창 레이어 열기");
		}
	});
	$(".tsh-btn .close").on('click', function () {
		$(".detail-box").removeClass("active");
		detailBtn.removeClass("active");
		detailBtn.attr("title", "검색창 레이어 열기");
		detailBtn.focus();
	});
});


$(document).ready(function () {
	slider();
})

function slider(){
	$(".slider").each(function(index){
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
				viewNum = 1;
			}else{ //mobile 버전
				viewNum = 1;
			}
			//loop 옵션 체크
			if (slideNum > viewNum){
				loopChk = true;
			}else{ 
				loopChk = true;
			}
			swiper = new Swiper('.slider-' + index + ' .best-box', {
				slidesPerView: viewNum,
				initialSlide :slideInx,
				spaceBetween: 0,
				slidesPerGroup: 1,
				loop: loopChk,
				direction: 'vertical', // 수직 슬라이드
				navigation: {
					nextEl: $('.slider-' + index).find('.swiper-button-next'),
					prevEl: $('.slider-' + index).find('.swiper-button-prev'),
				},
				autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
					delay : 5000,  //시간 설정
					disableOnInteraction : false,  //true 설정시 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
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

//접근성 추구 작업
// $('.best-box').on('mouseover', function(){
// 	swiper.autoplay.stop();
// });
$('.global__right').on('mouseout', function(){
	swiper.autoplay.start();
});

$('.best-box a').on('mouseover focusin', function(e) {
	swiper.autoplay.stop();
	$(".best-layer").show();
	$(".best-layer > ul > li:first-child a").focus();
});
$('.best-layer li:last-child a').on('mouseleave focusout', function(e) {
	$(".best-layer").hide();
})
// $('.best-layer .colse button').click(function() {
// 	$(".best-layer").hide();
// })


/*
function slider(){
	$(".slider .best-box").each(function(index){
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
				viewNum = 1;
			}else{ //mobile 버전
				viewNum = 1;
			}
			//loop 옵션 체크
			if (slideNum > viewNum){
				loopChk = false;
			}else{
				loopChk = false;
			}
			swiper = new Swiper('.slider-' + index + ' .best-box', {
				slidesPerView: 1,	// 보여지는 슬라이드 갯수
				spaceBetween : 0,	// 전체적인 슬라이드의 왼쪽에 0px 공백을 준다.
				direction: 'vertical', // 수직 슬라이드
				loop: true,	// 슬라이드 반복 여부 (무한 돌릴 경우 웹접근성 위배) ** pagination 버튼 type 이 bullets일 경우 false **
				//loopAdditionalSlides : 1,	// 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
				//loopedSlides: 1,
				//loopedSlides: swiperNum.length, //loop 시 파라미터 duplicate 개수 - 정적으로 숫자 4 표현 가능
				pagination : false,	//pager 여부
				autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
					delay : 5000,  //시간 설정
					disableOnInteraction : false,  //true 설정시 쓸어 넘기거나 버튼 클릭 시 자동 슬라이드 정지.
				},
				// navigation: {	// 버튼 사용자 지정
				// 	prevEl: ".visual-prev",
				// 	nextEl: ".visual-next",
				// },
				effect: 'true', //슬라이드 이미지가 쌓이는 느낌

				observer: true, //처음에 보이지 않는 display: none 상태인 요소 포커스 오류 정정
				observeParents: true,
				//watchOverflow : true,	//슬라이드가 1개 일 때 pager, button 숨김 여부 설정
				on: {
					activeIndexChange: function () {
						slideInx = this.realIndex; //현재 슬라이드 index 갱신
					}
				},
				// on: {
				// 	init: function (v) {
				// 		var item = $('.best-box')
				// 		item.find('.swiper-slide-active a').attr('tabindex',0).siblings().attr('tabindex',-1)
				// 	},
				// 	slideChangeTransitionEnd:function(){
				// 		var item = $('.best-box')
				// 		item.find('.swiper-slide-active a').attr('tabindex',0).siblings().attr('tabindex',-1)
				// 	}
				// },
			});

		}
	});
}
*/