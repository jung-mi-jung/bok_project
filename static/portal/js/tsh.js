$(function () {

	//일간, 주간 탭
	$(".best-tab a").on('click', function () {
		$(".best-tab a").removeClass("active").removeAttr("title");
		$(this).addClass("active").attr("title", "선택됨")
		// $(".tab-con").hide();
		// let tabid = $(this).attr("rel");
		// $("." + tabid).fadeIn();
	});


	$('.best-box').on('mouseover focusin', function(e) {
		$(".best-layer").show();
		$(".best-layer > ul > li:first-child a").focus();
	});
	$('.best-layer li:last-child a, .best-tsh').on('mouseleave focusout', function(e) {
		$(".best-layer").hide();
	})
	
	var swiper1, swiper2;

	$(".week").on("click", function () {
		try {
			swiper1.destroy(); // 요거 핵심
			swiper2.destroy();
		} catch (error) {}
		$(".mySwiper1_wrap").hide();
		$(".mySwiper2_wrap").show();
		swiper2 = new Swiper(".mySwiper2", {
			direction: "vertical",
			loop: true,
			autoplay: {
				delay: 1000,				
			},
		});
	});

	$(".day").on("click", function () {
		try {
			swiper1.destroy();
			swiper2.destroy();
		} catch (error) {}
		$(".mySwiper1_wrap").show();
		$(".mySwiper2_wrap").hide();
		swiper1 = new Swiper(".mySwiper1", {
			direction: "vertical",
			loop: true,
			autoplay: {
				delay: 1000,				
			},
		});
	})
	.trigger("click");



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
  

	//접근성 추구 작업
	$('.best-box a').on('mouseover focusin', function(e) {
		swiper.autoplay.stop();
		$(".best-layer").show();
		$(".best-layer > ul > li:first-child a").focus();
	});
	$('.best-layer li:last-child a').on('mouseleave focusout', function(e) {
		$(".best-layer").hide();
	})

});


/*	
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

*/