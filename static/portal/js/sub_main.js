//비주얼
$(function () {

	var options = {};

	if ( $(".sub-main .section-visual .swiper-slide").length == 1) {
		options = {
			slidesPerView: 1,	// 보여지는 슬라이드 갯수
			spaceBetween: 0,	// 마진값
			watchOverflow: true,
		}
		$(".section1 .ctrl").css({display: "none"});
	} else {
		options = {
			slidesPerView: 1,	// 보여지는 슬라이드 갯수
			spaceBetween: 0,	// 마진값
			effect: 'true', //슬라이드 이미지가 쌓이는 느낌
			watchOverflow: true,
			loop: true,
			loopAdditionalSlides : 1,
			speed : 3000,
			autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
				delay : 3000,  //시간 설정
				disableOnInteraction : false,
			},
			navigation: {
				prevEl: '.sub-visual-prev',
				nextEl: '.sub-visual-next',
			},
			pagination: {
				el: '.sub-main .swiper-pagination',
				type: "fraction",
			},
			/*on: {
				init: function (v) {
					var item = $('.sub-main')
					item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)	
				},
				slideChangeTransitionEnd:function(){
					var item = $('.sub-main')
					item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
				}
			}*/
		}
	}

	var sectionVisual = new Swiper(".sub-main .section-visual .swiper", options)


	sectionVisual.init();//초기화	
	$('.sub-main .sub-visual-stop').on('click', function () {
		$(this).hide().next().show().focus()
		sectionVisual.autoplay.stop();
	});
	$('.sub-main .sub-visual-play').on('click', function () {
		$(this).hide().prev().show().focus()
		sectionVisual.autoplay.start();
	});
	$('.sub-main .visual .swiper-slide').on('mouseover', function(){
		sectionVisual.autoplay.stop();
	});
	$('.sub-main .visual .swiper-slide').on('mouseout', function(){
		sectionVisual.autoplay.start();
	});	
});


$(function () {
	$(".button_link button").click(function(){
		$(this).next().toggleClass("active");
		if ($(this).next().hasClass('active')){
			$(this).attr("title", "지역본부 바로가기 닫기");
		} else {
			$(this).attr("title", "지역본부 바로가기 열기");
		}
	});

	// body 클릭시 레이어 닫기	
	$(document).click(function(e){
		if (!$(e.target).is('.button_link button')) {
			$('.button_link button').next().removeClass("active");
		}
	});


	//동영상 자막
	$(".index-main-video .video-etc .btn_view").click(function(){
		$(".subtitle-set").addClass("active");
		$(this).hide();
		$(".subtitle-set .btn_close").show();
		$(".subtitle").focus();
	});	
	$(".index-main-video .subtitle-set .btn_close").click(function(){
		$(".subtitle-set").removeClass("active");
		$(this).hide();
		$(".video-etc .btn_view").show();
		$(".video-etc .btn_view").focus();
	});	


	//지역본부 바로가기(모바일용)
	$(".mobile-map-button").click(function(){
		$(this).toggleClass("active");
	});

	$(document).click(function(e){
		if (!$(e.target).is('.mobile-map-button')) {
			$('.mobile-map-button').removeClass("active");
		}
	});
});


$(document).ready(function() {
	const container = $(".go_link");
	const buttons = container.find("a");
	let paddingPercentage = 2.4; //패딩 비율(예시로 설정)

	
	function updatePadding() {
		const paddingValue = container.width() * paddingPercentage / 100;
		
		buttons.each(function(index) {
			if (index === 0) {
				$(this).css('padding-right', paddingValue + 'px');
			} else if (index === buttons.length - 1) {
				$(this).css('padding-left', paddingValue + 'px');
			} else {
				$(this).css('padding-left', '0' + paddingValue + 'px');
				$(this).css('padding-right', '0' + paddingValue + 'px');
			}
		});
	}
	//창 크기 변경시 패딩 업데이트
	$(window).resize(function(){
		updatePadding();
	});

	//초기 패딩 설정
	updatePadding();


	

});