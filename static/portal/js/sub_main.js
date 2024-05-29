//비주얼
$(function () {
	const popup = new Swiper('.sub-main .section-visual .swiper', {
		init: false,
		//freeMode: true,
		// Optional parameters
		loop: false,
		loopAdditionalSlides : 1,
		slidesPerView : '1',
		navigation: {
			prevEl: '.sub-visual-prev',
			nextEl: '.sub-visual-next',
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
			el: '.sub-main .swiper-pagination',
			type: "fraction",
		},
		observer: true,
		observeParents: true,
		on: {
			init: function (v) {
				var item = $('.sub-main')
				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
				if( this.slides.length == 1 ) {
					$(".swiper-pagination, .sub-main .sub-visual-stop").css({ display: "none"});
				} 
				else {
					$(".swiper-pagination, .sub-main .sub-visual-stop").css({ display: "inline-block"});
				}
			},
			slideChangeTransitionEnd:function(){
				var item = $('.sub-main')
				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
			}
		}
	});
	popup.init();//초기화	
	$('.sub-main .sub-visual-stop').on('click', function () {
		$(this).hide().next().show().focus()
		popup.autoplay.stop();
	});
	$('.sub-main .sub-visual-play').on('click', function () {
		$(this).hide().prev().show().focus()
		popup.autoplay.start();
	});
	$('.sub-main .visual .swiper-slide').on('mouseover', function(){
		popup.autoplay.stop();
	});
	$('.sub-main .visual .swiper-slide').on('mouseout', function(){
		popup.autoplay.start();
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