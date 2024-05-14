// ios chrome 100vh 버그 
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", vh + 'px');
$(function () {
	$(window).trigger("orientationchange");
});
$(window).bind("orientationchange", function (e) {
	var orientation = window.orientation;
	if (orientation == 90 || orientation == -90) {
		setTimeout( function() {
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", vh + 'px');
		}, 500);
	} else {
		setTimeout( function() {
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", vh + 'px');
		}, 500);
	}
});


var ismobile = false;
$(".content-row .cont").show();

if (window.innerWidth < 1200) {
	ismobile = true;
	$("body").addClass("mobile");

	var selectedNum = $(".content-row .cont-nav li.on").index();
	$(".content-row .cont").eq(selectedNum).show().siblings().hide();
	
	if( window.innerWidth < 750 ) {
		$(".total-nav").addClass("m-total-nav");
		
	} 
	else {
		$(".total-nav").removeClass("m-total-nav");
	}
}
else {
	ismobile = false;
	$("body").removeClass("mobile");
}


$(window).resize(function () {
	if (window.innerWidth < 1200) {
		ismobile = true;
		$("body").addClass("mobile")

		var selectedNum = $(".content-row .cont-nav li.on").index();
		$(".content-row .cont").eq(selectedNum).show().siblings().hide();
		
		if( window.innerWidth < 750 ) {
			$(".total-nav").addClass("m-total-nav");
		} 
		else {
			$(".total-nav").removeClass("m-total-nav");
		}
	} 
	else {
		ismobile = false;
		$("body").removeClass("mobile")
	}

	return false;
});

//전체메뉴 모바일일때 드롭다운 
$(".total-nav .dp1 > li > .m-dp1").on("click", function(){
	$(this).parent("li").toggleClass("on");
})



// var ismobile = false;
// if (window.innerWidth < 1200) {
// 	ismobile = true;
// }
// if( window.innerWidth < 750 ) {
// 	$(".total-nav").addClass("m-total-nav");
// 	$(".m-total-nav .dp1 > li > a").on("click", function(e){
// 		$(this).parent("li").toggleClass("on");
// 	})
// } 
// $(window).resize(function () {
// 	if (window.innerWidth < 1200) {
// 		ismobile = true;
		
// 		if( window.innerWidth < 750 ) {
// 			$(".total-nav").addClass("m-total-nav");
// 			$(".m-total-nav .dp1 > li > a").on("click", function(e){
// 				$(this).parent("li").toggleClass("on");
// 			})
// 		} 
// 		else {
// 			$(".total-nav").removeClass("m-total-nav");
// 		}
// 	} 
// 	else {
// 		ismobile = false;
// 	}
// });


function isMobile() {
	var UserAgent = navigator.userAgent;
	if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	} else {
		return false;
	}
}

// 레이어 팝업
var currentfocus = null
function lpopOpen(trigger, target) {
	$(target).addClass('active');
	$(target).attr('tabindex',0).focus()
	currentfocus = trigger;
	$('body').addClass('popupOpened');
}

function lpopClose(target) {
	$('body').removeClass('popupOpened');
	$(target).removeClass('active');
	if(currentfocus!==null) currentfocus.focus();
}
$(function () {
	//esc 눌렀을때 레이어 닫기
	$(".modal").on("keydown", function(e){
		if(e.key === "Escape") {
			$("body").removeClass("popupOpened modal-open");
		}
	})


	// 레이어 닫기
	$('.parent-close, .b-close, .close').on('click', function () {
		lpopClose()
		$(this).parent().parent().removeClass('active');
		$("body").removeClass("popupOpened modal-open");
	});
})



//전체메뉴
// var navhtml = $('#gnb > ul').clone()
// navhtml.find('div').removeAttr('id')
// $('.total-nav .nav').html(navhtml.clone())


// 전체메뉴 드롭다운
$(".total-nav .dp3 .dropdown").on("click", function() {
	$(this).toggleClass("on");	

	if( $(this).hasClass("on" )) {
		$(this).children("a").attr("title", "하위메뉴 닫기");
	}
	else {
		$(this).children("a").attr("title", "하위메뉴 열기");
	}
})


$(function () {
	//skip
	$('.skip a[href="#content"]').click(function(event) {
		$('.page-toolbar button').focus();
		event.preventDefault();
	});

/*
	var max_h=0; // 최대 높이 구하기
	$(".gnb > li > a.on + .depth2").each(function(){
		var h = parseInt($(this).css("height"));
		if(max_h<h){ max_h = h; }
	});
	$(".gnb .depth2").each(function(){ // 최대 높이로 설정
		//$(this).css({height:max_h + 160});
		$(this).css({height:max_h});
	});
	$('.gnb_bg').height($('.gnb .depth2').height());  //gnb_bg 높이 구하기
*/
	// gnb stiky
	function goToScroll() {
		// 주 메뉴
		var h = 60;  //96
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


	//전체메뉴 보기
	$(".all-nav-toggle").click(function (e){
		$(window).trigger("resize");

		$(".total-nav .modal-header .close").focus();
	});


	//gnb
	//pc 메뉴
	var tshActive = false;
	var gnb1depth = $('#gnb>ul>li>a');
	//var gnb3depth = $("#gnb .depth3 > ul > li > a")
	gnb1depth.on('mouseover focusin', function (e) {
		if (tshActive == false) {
			$(this).addClass('on').parent().siblings().find('>a').removeClass('on');
			$("body").addClass("gnbOver");
			return false;
		}
	});
	$('#gnb > ul > li').on('mouseleave', function () {
		$('#gnb > ul > li > a').removeClass('on');
		$("body").removeClass("gnbOver");
	});
	$('#gnb .depth2>ul a:last').on('focusout', function (e) {
		gnb1depth.removeClass('on');
		$("body").removeClass("gnbOver");
	});

	$("#gnb .depth3 > ul > li > a.bu").click(function(){
		$(this).parent().toggleClass("active")
		if ($(this).parent().hasClass('active')){
			$(this).attr("title", "하위메뉴 닫기");
		} else {
			$(this).attr("title", "하위메뉴 열기");
		}
	});

	//키보드 접근성 보완
	$("#header h1 a").on('focusin', function (e) {
		$('#gnb>ul>li>a.on').removeClass("on");
	});
});

// 콘텐츠 서비스
$(function () {
	// 달력 언어설정
	if (typeof $.fn.datepicker != 'undefined') {
		$.fn.datepicker.dates.ko = {
			days: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
			daysShort: ['일', '월', '화', '수', '목', '금', '토'],
			daysMin: ['일', '월', '화', '수', '목', '금', '토'],
			months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthsShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			today: '오늘',
			clear: '삭제',
			format: 'yyyy-mm-dd',
			titleFormat: 'yyyy년mm월',
			weekStart: 0,
		};
	}
	inputdate = $('input.sdate,input.edate,input.date');
	inputdate.attr('autocomplete', 'off');
	function formatDate(num) {
		if (!num) return "";
		var formatNum = '';
		// 공백제거
		num = num.replace(/\s/gi, "");
		try {
			if (num.length == 8) {
				formatNum = num.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
			}
		} catch (e) {
			formatNum = num;
			console.log(e);
		}
		formatNum = formatNum == '' ? num : formatNum
		return formatNum;
	}
	// 날짜형태 변환
	$(inputdate).on('keyup', function (event) {
		if(event.target.value.indexOf('-') === -1 && event.target.value.length == 8){
			event.target.value = formatDate(event.target.value)
		}
	});
	// 달력
	if (typeof $.fn.datepicker != 'undefined') {
		inputdate
			.datepicker({
				format: 'yyyy-mm-dd',
				language: 'ko',
				todayHighlight: true,
				autoclose: true,
				templates: {
					leftArrow: '<i class=datepicker-prev role=img aria-label=이전></i>',
					rightArrow: '<i class=datepicker-next role=img aria-label=다음></i>'
				}
			})
			.attr('placeholder', '연도 - 월 - 일')
		$('.month')
			.datepicker({
				format: 'yyyy-mm',
				language: 'ko',
				todayHighlight: true,
				autoclose: true,
				templates: {
					leftArrow: '<i class=datepicker-prev role=img aria-label=이전></i>',
					rightArrow: '<i class=datepicker-next role=img aria-label=다음></i>'
				},
				startView: 2,
				minViewMode: 1
			})
			.attr('placeholder', '연도 - 월')
			.attr('autocomplete', 'off')
	}
	$('input.sdate').attr('title', '검색기간 시작일 연도 - 월 - 일');
	$('input.edate').attr('title', '검색기간 종료일 연도 - 월 - 일');
	$('input.month').attr('title', '검색기간 연도 - 월');
	$('input.smonth').attr('title', '검색기간 시작월 연도 - 월');
	$('input.emonth').attr('title', '검색기간 종료월 연도 - 월');
	$('input.date').each(function () {
		var title = $(this).attr('title') + ' 연도 - 월 - 일'
		$(this).attr('title', title)
	});
	// 달력
	if(!isMobile() && typeof $.fn.datepicker != "undefined"){
		$('input.sdate,input.edate,input.date')
			.datepicker({
				format: "yyyy-mm-dd",
				language: "ko",
				todayHighlight: true,
				autoclose:true
			})
			.attr('placeholder','연도 - 월 - 일')
	}

	// 탭 활성화
	$(".js-tab button").on('click', function(){
		var $parent = $(this).closest(".js-tab");
		var index = $(this).parent().index();
		$(this)
			.attr("aria-pressed", true).parent().addClass("on").attr('title','선택됨')
			.siblings().removeClass("on").find("button").attr("aria-pressed", false).removeAttr('title')
		$parent
			.siblings(".tab-content").find(".con").hide().eq(index).show();
	});

	// 탭 활성화
	$('.tab-list').each(function (index, element) {
		$(this).find('button, a')
			.on('click', function (e) {
				e.preventDefault();
				$(this).attr('aria-selected', true).attr('title','선택됨').siblings().attr('aria-selected', false).removeAttr('title')
				_id = $(this).attr('id')
				$('[aria-labelledby="' + _id + '"]').show().siblings().hide()
			})
	});	

	// 모바일 탭 활성화(스크롤 컨텐츠)
	$(".js-tab2 button").on('click', function(){
		var $parent = $(this).closest(".js-tab2");
		var index = $(this).parent().index();

		$parent.toggleClass("on");
	});

	//콘텐츠 내부 래프트 엥커
	$(".cont-nav li").on("click", function(){
		var thisInx = $(this).index();
		var thisScrollTop = $(".content-row .cont").eq(thisInx).offset().top;
		var currentScrollTop = $(window).scrollTop();
		var selectedTxt = $(this).find("a").text();

		$(this).addClass("on").siblings().removeClass("on");
		$(this).find("a").addClass("on").siblings().removeClass("on");
		$(".js-tab2").removeClass("on").find("button").html(selectedTxt)

		// 1200이상일때
		if ( !$("body").hasClass("mobile") ){
			$("html, body").animate({ scrollTop: thisScrollTop - 60}, 200);
		}
		// 1200미만 일때
		else {
			$(".content-row .cont").eq(thisInx).show().siblings().hide();
		}

		return false;
	})


	// 이미지맵 반응형
	if(typeof $.fn.rwdImageMaps != "undefined"){
		$('img[usemap]').rwdImageMaps();
	}
	// 한글파라미터 인코딩
	$('.linkencode area').each(function (e) {
		_href = encodeURIComponent($(this).attr('href').split('searchWrd=')[1])
		$(this).attr('href', $(this).attr('href').split('searchWrd=')[0] + 'searchWrd=' + _href)
	})


	//다중 첨부파일일대 열고 접기
	var dowButton = $(".down-set .down-button button");
	dowButton.attr("title", "첨부파일 목록 열기");
	dowButton.click(function(e){
		$(this).parent().toggleClass("active");
		if ($(this).parent().hasClass('active')){
			dowButton.attr("title", "첨부파일 목록 닫기");
		} else {
			dowButton.attr("title", "첨부파일 목록 열기");
		}
	})
});

// 게시판 반응형
$(function () {
	$('.bd-list')
		.not('.ovx2')
		.each(function (i, element) {
			_ = $(element);
			if ($(this).find('tr:first th.no:first').length > 0) {
				$(this).find('tr>td:first-child').addClass('no');
			}
			$(this)
				.find('tr')
				.each(function () {
					$(this)
						.find('td')
						.each(function (index) {
							if ($(this).hasClass('title') || $(this).hasClass('no') || $(this).text().trim() == '') {
							} else {
								var txt = '<span class="only-m">' + _.find('th').eq(index).text() + '</span>';
								$(this).prepend(txt);
							}
						});
				});
		});
});
// 게시물결과없음 처리
bdlist = $('.bd-list');
if (bdlist.length > 0) {
	bdlist.each(function () {
		var size = 0;
		$(this)
			.find('thead tr')
			.each(function (index, element) {
				size = size < $(element).find('th').length ? $(element).find('th').length : size;
			});
		$(this).find('td.nodata').not('[colspan]').attr('colspan', size);
	});
}
bdview = $('.bd-view');
if (bdview.length > 0) {
	bdview.each(function () {
		var size = 0;
		$(this)
			.find('dl')
			.each(function (index, element) {
				size = size < $(element).find('dt').length ? $(element).find('dt').length : size;
			});
		if (size == 3) {
			$(this).addClass('type-dt-length-3');
		}
	});
}

// 테이블 스크롤 아이콘 추가
$('.table.ovx2').before('<div class=mobile-scroller-x>');
var windowresizeDefault = (function() {
	'use strict';
	var timeWindow = 500; // time in ms
	var timeout;
	var windowresizeDefault = function(args) {
		if($(window).width() < 750){
			$('.table.ovx').attr('tabindex', 0)
			$('.table.ovx2').attr('tabindex', 0)
		}else{
			$('.table.ovx').removeAttr('tabindex')
			$('.table.ovx2').removeAttr('tabindex')
		}
	};

	return function() {
		var context = this;
		var args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			windowresizeDefault.apply(context, args);
		}, timeWindow);
	};
}())
windowresizeDefault()
$(window).resize(function () {
	windowresizeDefault()
});

// 레이어팝업
var currentfocus = null;
function lpopOpen(trigger, target) {
	$(target).addClass('active');
	$(target).attr('tabindex', 0).focus();
	currentfocus = trigger;
	$('body').addClass('popupOpened');
}
function lpopClose(target) {
	$('body').removeClass('popupOpened');
	$(target).removeClass('active');
	if (currentfocus !== null) currentfocus.focus();
}


// 링크 접근성
$('#content a').each(function () {
	if ($(this).attr('target') == '_blank' && $(this).attr('title') != '') {
		$(this).attr('title', '새창열림');
	}
});

// 접근성 타이틀 제공
if ($('.step-agg .on').text().trim() != '') {
	document.title = $('.step-agg .on').text() + '단계 - ' + document.title
}


// 글자수 제한
$(function() {
	$('.characterLen').each(function(index, el) {
		$(this).parent().append('<p class="characterLenDeco">'+$(this).data().lensize+'자 남음'+'</p>')
		$(this).keyup(function (e){
			var selfintroduction = $(this).val();
			var str = $(this).val();
			var spacecount = count(str)
			var limit = $(this).data().lensize;
			$(this).next().html(limit-spacecount+'자 남음');
			if(limit < spacecount){
				alert("글자수는 "+limit+"자를 초과할수 없습니다.");
				// $(this).val(str.substring(0,limit))
			}
		})
		.next().html(count($(this).val())+'자 남음')
	});
});

// 팝업호출
function openPop(argument) {
	$('.js-pop, .b-pop').click(function(event) {
		event.preventDefault();
		// window.open(URL,name,specs,replace)
		var size = $(this).data().size.split(',')
		var scrollbars='';
		if (size[2]!==undefined) {scrollbars=',scrollbars='+size[2]}
		//var myWindow = window.open($(this).attr('href'), $(this).attr('href'),"width="+size[0]+'",height='+size[1]+scrollbars+'"');
		var myWindow = window.open($(this).attr('href'),"newWin","status=yes,toolbar=no,location=no,width="+size[0]+",height="+size[1]+",scrollbars=" + size[2] );
		myWindow.focus();
	});
}
$(function () {
	openPop();
	$('label').each(function(index, el) {
		if ($(this).attr('for')==undefined) {
			$(this).find('input').attr('title',$.trim($(this).text()))
		}
	});
	$('.js-pop').attr('title','새창열림');
	$('.scrolly, .scrollY').attr('tabindex',0);

	//tabs
	var linka= $(".tabs") // 해당 탭리스트 링크 셀렉트
	$(linka).find('a').click(function(){
		$(this).parent().siblings().removeClass('on');
		$(this).parent().addClass('on');
		var k = linka.find('a').length + 1
		for ( i =0 ; k > i ; i ++ )
		{
			$("#tabmenuC" + i).removeClass("in on");
		}
		var index = $(linka).find('a').index(this) + 1;
		$("#tabmenuC" + index).addClass("in on")
		return false;
	});
});

$(function() {

		// gnb stiky
		function goToScroll() {
			// 주 메뉴
			var h = 146; //96
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


	//navigation  고정용 page-toolbar
	// var toolbarhtml = $('.hgroup .page-toolbar').clone()
	// $(".top-page-toolbar").html(toolbarhtml.clone())


	/*Variables for chache $ chaining*/
	var $root = $("html, body");
	var $window = $(window);

	var fixNav = 60;
	var amountScrolled = 1200; //129
	var backBtn = $(".goTop");
	
/*
	$window.on("scroll", function () {
		//gnbFixed 		//fixLogo
		if ($window.scrollTop() > fixNav) {
			$("body").addClass("nav-stiky");

		}else{
			if($("body").hasClass("nav-stiky")){
				$("body").addClass("nav-stiky");
			}
			$("body").removeClass("nav-stiky");
		}
		if ($window.scrollTop() > amountScrolled) {
				backBtn.fadeIn("slow");
		} else {
				backBtn.fadeOut("slow");
		}
	});
*/
	backBtn.on("click", function () {
		$root.animate({
				scrollTop: 0
		}, 700);
		return false;
	});

	//로그인후
	var userInfoOp = $(".userInfoOpener");
	$(userInfoOp).on("mouseenter keyup", function(){
		$(".userInfoOpBx").addClass("on");
	});
	$(".userInfoOpBxSet").on("mouseleave blur", function(){
		$(".userInfoOpBx").removeClass("on");
	});
	$(".userInfoOpBx .logout").on("focusout", function(){
		$(".userInfoOpBx").removeClass("on");
	});
	$(userInfoOp).bind('keydown', function(e){
		if(e.shiftKey && e.keyCode == 9){
			$(".userInfoOpBx").removeClass("on");
		}
	})
	
	//navigation
	$(".navigation .depth2").prev().addClass("bu");
	$(".navigation a.bu").attr("href", "javascript:void(0)");
	//navigation toggle
	$(".navigation a.bu").click(function(){
		$(this).next().toggleClass("active");
		$(this).parent().siblings().children().removeClass("active"); //요구사항 추가
		if ($(this).next().hasClass('active')){
			$(this).attr("title", "하위메뉴 닫기");
		} else {
			$(this).attr("title", "하위메뉴 열기");
		}
	});

	$(document).click(function(e){
		if (!$(e.target).is('.navigation a.bu')) {
			$('.navigation .depth2.active').removeClass('active');
		}
	});

	//hgroup sns
	$(".sns-toggle").click(function(){
		$(".sns-wrap").addClass("active");		
		$(".sns-wrap__set").slideDown();
	});
	$(".sns-wrap .close").click(function(){
		$(".sns-wrap").removeClass("active");	
		$(".sns-wrap__set").slideUp();	
	});

	//클릭시 레이어 닫기
	$(".total-nav button").click(function(){
		$(".total-nav").removeClass("active");
		$(".all-nav-toggle").focus();
	});


	// *** 게시판 별도 디자인***
	// 일반형 게시판 상세
	$(".bd-view").parents("#content").addClass("bd-view_wrap");
	$(".bd-view").parents("body").addClass("bd-body");
	// 블로그형 
	$(".bd-blog").parents("#content").addClass("bd-blog_wrap");
	//$(".bd-blog").parents("body").addClass("bd-body");


	//셀렉트 레이어형 검색 sh-select
	$("[class^=sh] .btn_select").click(function(){
		$(this).toggleClass("on");
	})
	$(".select-set ul > li > button").each(function(index){
		$(".select-set.select" + index +" > ul > li > button").click(function(){
			$(this).addClass("active").parent().siblings().children("button").removeClass("active");
			$(this).parent().parent().prev("button").removeClass("on");
			var seletxt = $(".select-set.select" + index +" > ul > li > button.active").text()
			$(this).parent().parent().prev().text(seletxt)
		});
	});

	
	//조직도
	$(".email-s").parent().addClass("addtxt");


	//풋더 사이트맵
	$(".site_go button").click(function(){
		$(this).next().toggleClass("active");
		if ($(this).next().hasClass('active')){
			$(this).attr("title", "fmaily site 닫기");
		} else {
			$(this).attr("title", "fmaily site 열기");
		}
	});


	//검색 레이어
	$(".g-info .search, .toggle-set .search").click(function(){
		$(".search_wrap").addClass("active");
		$(".search_wrap .search_wrap_input .search_keyword") .focus();
		$("body").addClass("gnbOver");
	})
	$(".search_wrap .search_close").click(function(){
		$(".search_wrap").removeClass("active");
		$(".g-info .search, .toggle-set .search").focus();
		$("body").removeClass("gnbOver");
	})

	//search_wrap

	//첨부파일
	var filesOv = $(".fileGroupSet>a");
	$(filesOv).on("mouseenter keyup", function(event){
		$(this).next().slideDown();
		event.preventDefault();
	});
	$(".fileGroupSet").on("mouseleave", function(event){
		$(this).find(".fileGoupBox").hide();
		event.preventDefault();
	});
	$(".fileGoupBox .closeLayer").on("click focusout", function(){
		$(this).parent().hide();
	});
	$(filesOv).bind('keydown', function(e){
		if(e.shiftKey && e.keyCode == 9){
			$(".fileGoupBox").hide();
		}
	})

	//게시판 뷰 레이아웃
	$(".dataInfoSet .user + dt + .depart").parent().addClass("type2");

	//faq
	var article = $('.faqList dt>button');
	article.each(function(index, el) {
		$(this).click(function(event) {
			if ($(this).parent().hasClass('open')) {
				$(this).parent().removeClass('open').next().hide();
				$(this).attr('title', '답변 열기')
			} else {
				$(this).parent().addClass('open').next().show();
				$(this).attr('title', '답변 닫기')
			}
		});
		$(this).parent().removeClass('open').next().hide();
	});


	//.table thead 없을 경우 처리 (디자인 처리)
	// $(".table")
	// 	.not("thead")
		
	// 	.each(function () {
	// 		$(this).addClass("table_line");
	// 	});
	
		


/*
	// focus this position // 	ul>li>a[data-rel^='prettyPhoto']
	$("[data-rel^='prettyPhoto']").each(function(n){
		$(this).attr("data-num", n);
	});
	$("[data-rel^='prettyPhoto']").on("click", function(event){
		focusPos = $(this).attr("data-num");
	});
	$("[data-rel^='prettyPhoto']").prettyPhoto({
		animation_speed:'fast', theme:'light_square', slideshow:3000, show_title:false, autoplay_slideshow:false, social_tools:false, allow_resize:false
		// 타이틀 숨김, 확대보기 (allow_resize:true)
	});
*/
});
/*
$(function() {
	$('img').each(function(index, el) {
		$(this).error(function() {
			// console.log($(this),'error!!')
			// $(this).replaceWith('<i class=errimg>');
			$(this).attr('src','/static/commons/img/noimage.png');
		});
		// console.log($(this))
	});
});
*/

//내가 본 콘텐츠
$(function () {

	$(".my_memo .btn").click(function(){
		$(this).next().addClass("active");
	});
	$(".my_memo .close").click(function(){
		$(".my_memo .swiper.active").removeClass("active");
		$(".my_memo .btn").focus();
	});

	const swiper = new Swiper('.my_memo .swiper_body', {
		slidesPerView: 1,
		grid: {
			rows: 4,
		},
		init: false,
		freeMode : true, // 슬라이드 넘길 때 위치 고정 여부
		// Optional parameters
		loop: false,
		spaceBetween: 0,
		slidesPerGroup: 4,	//한번에 슬라이딩될 개수
		navigation: {
			prevEl: '.memo-prev',
			nextEl: '.memo-next',
		},
		pagination: {
			el: '.my_memo .swiper-pagination',
			type: "fraction",
			clickable: true,
		},
		// And if we need scrollbar
		scrollbar: {
			hide:true
		},
		a11y:{
			enabled:true,
		},
		autoplay: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},
		observer: true,
		observeParents: true,
	});
	swiper.init();//초기화	
});


// *** 자료형 검색 sh-db ***



$(function () {

	// *** 모바일용 ***

	// body 클릭시 레이어 닫기	
	$(document).click(function(e){
		if (!$(e.target).is('.select-set > button')) {
			$('.select-set > button').removeClass("on");
		}
	});
	/*$(document).click(function(e){
		if (!$(e.target).is('.check-ctrl')) {
			$(".check-ctrl").removeClass("active");
		}
	});*/

	$(".mobile-check-ctrl").click(function(){
		$(this).toggleClass("active");
		$(this).next().toggleClass("active");
	})

	$(".check-list.details").click(function(){
		$(".label-list").removeClass("active");
	})
	
	//lnb-nav 펼치기, 접기
	$(".lnb-nav .mobile__nav__open").on("click", function(){
		$(".lnb-nav").addClass("active");
	})
	$(".lnb-nav .mobile__nav__close").on("click", function(){
		$(".lnb-nav").removeClass("active");
	})
});



//기존 컨텐츠
$(function () {

	$('.selBtn').bind('click', function(e){
		var tabIndex = $('#selbox option:selected').val();
		$('.select_Tab').each(function(){
			var TabId = $(this).attr('id');
			if (tabIndex == TabId) {
				$(this).show();
			}else{
				$(this).hide();
			}
		});
		return false;
	});

	$(".categoryOnOff>button").on("click", function(){
		$(".category").toggleClass('on');
		return false;
	})
	


	var tabtext1 = $(".depth4Tab + .tab>ul>li.active").text();
	var tabtext2= $(".tabsub>ul>li.active").text();
	var tabtext3= $(".depth3Tab + .tab.dept3>ul>li.active").text();
	$(".depth4Tab>a").text(tabtext1);
	$(".depth4Tab>a").click(function() {
		$(this).parent().next(".tab").slideToggle();
		return false;
	})

	$(".depth5Tab>a").text(tabtext2);
	$(".depth5Tab + .tabsub>ul>li>a").on("click", function(){
		var txts = $(this).text();
		var n = $(this).parent().index();
		$(this).parents().parent().parent().next().find("li").eq(n).append("<h3 class='hidden'>"+txts+"</h3>");
		return false;
	})
	$(".depth5Tab>a").click(function() {
		$(this).parent().parent().find(".tabsub").slideToggle();
		return false;
	})

	$(".depth3Tab>a").text(tabtext3);
	$(".depth3Tab>a").click(function() {
		$(this).parent().parent().find(".tab.dept3").slideToggle();
		return false;
	})

	$(".tabsub.type>ul>li>a").on("click", function(){
		$(this).parent().parent().parent().toggleClass('on');
		return false;
	})


	//tabsub Content Tab
	var linka= $(".tabsub ul li")
	$('.tabsub li.active a').attr('title', '선택됨');
	$(linka).find('a').click(function(){
		$(this).parent().siblings().removeClass('active').removeClass('title');
		$(this).parent().addClass('active');

		//안됨
		if ($(this).parent().hasClass('active')){
			$(this).attr("title", "선택됨");
		} else {
			$(this).removeAttr("title");
		}

		var k = linka.find('a').length + 1
		var linkName = $(this).attr("href");
		$(this).parent().parent().parent().parent().find(".tab-content .tab-pane").removeClass("fade in active");
		$(linkName).addClass("fade in active")
		return false;

	});


	//첨부파일
	var filesOv = $(".fileGroupSet>a");
	//$(filesOv).on("mouseenter keyup", function(event){
	$(filesOv).on("click", function(event){
		$(this).next().slideDown();
		event.preventDefault();
	});
	$(".fileGroupSet").on("mouseleave", function(event){
		$(this).find(".fileGoupBox").hide();
		event.preventDefault();
	});
	/*$(".fileGoupBox ul li:last-child a").on("focusout", function(){
		$(this).parent().parent().parent().slideUp();
	});*/
	$(".fileGoupBox .closeLayer").on("click focusout", function(){
		$(this).parent().hide();
	});
	$(filesOv).bind('keydown', function(e){
		if(e.shiftKey && e.keyCode == 9){
			$(".fileGoupBox").hide();
		}
	})

	//목차 없는 컨텐츠일 경우 가로 사이즈 변경에 따른 예외처리
	// $(".bd-view").parents().find(".content").addClass("wild-content");
});


$(function () {
	//지역본부 > 화폐전시실(부산)
	const swiper = new Swiper('.gallery__list', {
		init: false,
		freeMode: true,
		// Optional parameters
		loop: true,
		loopAdditionalSlides : 1,
		slidesPerView : '1',
		navigation: {
			prevEl: '.gallery-set .prev',
			nextEl: '.gallery-set .next',
		},
		// And if we need scrollbar
		scrollbar: {
			hide:true
		},
		a11y:{
			enabled:true,
		},
		pagination: {
			el: '.card-photo .swiper-pagination',
			type: "fraction",
		},
		observer: true,
		observeParents: true,
		on: {
			init: function (v) {
				var item = $('.card-photo')
				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
			},
			slideChangeTransitionEnd:function(){
				var item = $('.card-photo')
				item.find('.swiper-slide-active').attr('tabindex',0).siblings().attr('tabindex',-1)
			}
		}
	});
	swiper.init();//초기화	
});



$(function () {
	// *** 동영상 템플릿
	//탭 유튜브 일시정시
	$(document).ready(function () {
		$(".template_wrap .video-tab button").click(function () {
			jQuery("iframe").each(function () {
				jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
			});
		});
	});
	//자막, 내용 (접기, 펼치기)
	$(".template_wrap .subtitle button").click(function(e){
		$(this).toggleClass("active");
		if ($(this).hasClass('active')){
			$(this).attr("title", "자막 닫기");
		} else {
			$(this).attr("title", "자막 열기");
		}
	})
});

// 게시물 이미지
$('.dbdata img')
.each(function (index, element) {
	if($(this).attr('alt').trim() == ''){
		$(this).attr('alt','')
	}
});