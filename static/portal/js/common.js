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
if (window.innerWidth < 1200) {
	ismobile = true;
}
$(window).resize(function () {
	if (window.innerWidth < 1200) {
		ismobile = true;
	} else {
		ismobile = false;
	}
});

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
	// 레이어 닫기
	$('.parent-close').on('click', function () {
		lpopClose()
		$(this).parent().parent().removeClass('active');
	});
})



//전체메뉴
var navhtml = $('#gnb > ul').clone()
navhtml.find('div').removeAttr('id')
$('.total-nav .nav').html(navhtml.clone())
$(".all-nav-toggle").click(function (e){
	e.preventDefault()
	$(".total-nav").addClass("active");
	$('.total-nav .nav>ul>li:first-child>a').focus()
});
$('.total-nav button').click(function (e) {
	e.preventDefault()
	$(".total-nav").removeClass('active');
	$(".all-nav-toggle").focus();
});
// 모바일 (사용전...)
$('.m-all-nav-toggle').on('click', function (e) {
	e.preventDefault()
	$('.mobileGnb__set').addClass('active')
	$('body').addClass('ovh')
});
$('.mobileGnb__nav').html(navhtml)
$('.mobileGnb .mobileGnb-close').on('click', function (e) {
	e.preventDefault()
	$('.mobileGnb__set').removeClass('active')
	$('body').removeClass('ovh')
});

$(function () {

	//skip
	$('.skip a[href="#content"]').click(function(event) {
		$('.page-toolbar button').focus();
		event.preventDefault();
	});

	// nav stiky
	function goToScroll() {
		// 주 메뉴
		var h = 53;
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

	//gnb
	//pc 메뉴
	var tshActive = false;
	var gnb1depth = $('#gnb>ul>li>a');
	//var gnb3depth = $("#gnb .depth3 > ul > li > a")
	gnb1depth.on('mouseover focusin', function (e) {
		if (tshActive == false) {
			//$(this).parent().parent().addClass('active').parent().siblings().find('>a').removeClass('active');
			$(this).addClass('on').parent().siblings().find('>a').removeClass('on');
			//안씀 $(".gnb_bg").show();
			return false;
		}
	});
	$('#gnb > ul > li').on('mouseleave', function () {
		$('#gnb > ul > li > a').removeClass('on');
	});
	$('#gnb .depth2>ul a:last').on('focusout', function (e) {
		gnb1depth.removeClass('on');
	});

	//gnb - depth4 있을 경우  depth3에 클래스 추가
	$("#gnb .depth4").prev().addClass("bu");
	$("#gnb .depth3 .bu").attr("href", "javascript:viod(0)");

	$("#gnb .depth3 > ul > li > a").attr("title", "하위 메뉴 열기");
	$("#gnb .depth3 > ul > li.active > a").attr("title", "하위 메뉴 닫기");

	$(".gnb > ul .depth3 > ul > li > a.bu").on("click", function(){
		$(this).next().slideToggle();
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


	// 모바일
	$('#mobileGnb .menu-all').on('click', function (e) {
		e.preventDefault()
		$('.mobileGnb__set').addClass('active')
		$('body').addClass('ovh')
	});
	$('#mobileGnb .mobile-gnb-nav').html(navhtml)

	// 모바일 메뉴
	var mobileNav = $('.mobileGnb__set')
	mobileNav.find('ul').each(function() {
		if($(this).find('li').length==0)
		{
			$(this).remove()
		}
	})
	$(mobileNav)
		.find('.nav > ul > li > a')
		.on('click', function (e) {
			if($(this).parent().find('>div,>ul').length > 0){
				e.preventDefault();
				$(this).parent().toggleClass('on')				
			}
		});
		
	$('.mobileGnb-close').on('click', function (e) {
		e.preventDefault();
		mobileNav.removeClass('active')
		$('body').removeClass('ovh')
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
		$(this).find('button')
			.on('click', function (e) {
				e.preventDefault();
				$(this).attr('aria-selected', true).attr('title','선택됨').siblings().attr('aria-selected', false).removeAttr('title')
				_id = $(this).attr('id')
				$('[aria-labelledby="' + _id + '"]').show().siblings().hide()
			})
	});


	// 이미지맵 반응형
	if(typeof $.fn.rwdImageMaps != "undefined"){
		$('img[usemap]').rwdImageMaps();
	}
	// 한글파라미터 인코딩
	$('.linkencode area').each(function (e) {
		_href = encodeURIComponent($(this).attr('href').split('searchWrd=')[1])
		$(this).attr('href', $(this).attr('href').split('searchWrd=')[0] + 'searchWrd=' + _href)
	})
});

// 게시판 반응형
$(function () {
	$('.bd-list').each(function (i, element) {
		_ = $(element);
		$(this)
			.find('tr')
			.each(function () {
				$(this)
					.find('td')
					.each(function (index) {
						//if ($(this).hasClass('title') || $(this).hasClass('no') || $(this).text().trim() == '') {
						if ($(this).hasClass('title') || $(this).hasClass('no') || $(this).hasClass('no-head') || $(this).hasClass('no-data') || this.childNodes.length == 0) {
						} else {
							var txt = '<span class="only-m">' + _.find('th').eq(index).text() + '</span>';
							$(this).prepend(txt);
						}
					});
			});
	});
});


// 테이블 스크롤 아이콘 추가
$('.table.ovx').before('<div class=mobile-scroller-x>');
var windowresizeDefault = (function () {
	var timeWindow = 500; // time in ms
	var timeout;
	var windowresizeDefault = function (args) {
		if ($(window).width() < 750) {
			$('.table.ovx').attr('tabindex', 0)
		} else {
			$('.table.ovx').removeAttr('tabindex')
		}
	};
	return function () {
		var context = this;
		var args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function () {
			windowresizeDefault.apply(context, args);
		}, timeWindow);
	};
}());
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
// 게시물 이미지
$('.dbdata img')
.each(function (index, element) {
	if($(this).attr('alt').trim() == ''){
		$(this).attr('alt','')
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
	$('.scrolly').attr('tabindex',0);

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

	/*Variables for chache $ chaining*/
	var $root = $("html, body");
	var $window = $(window);

	//var fixMenu = 220;
	//var amountScrolled = 120;
	var backBtn = $("a.goTop");
	
	/*
	$window.on("scroll", function () {
	//gnbFixed 		//fixLogo
	if ($window.scrollTop() > fixMenu) {
		$("#header").addClass("fixMenu");
		//$(".gnbRtSet .logo").addClass("fixLogo");

	}else{
		if($("#header").hasClass("fixMenu")){
			$("#header").addClass("fixMenuOff");
		}
		$("#header").removeClass("fixMenu");
		//$(".gnbRtSet .logo").removeClass("fixLogo");
	}
	if ($window.scrollTop() > amountScrolled) {
			backBtn.fadeIn("slow");
	} else {
			backBtn.fadeOut("slow");
	}
	});
	*/;
	 backBtn.on("click", function () {
			$root.animate({
				 scrollTop: 0
			}, 700);
			return false;
	 });


	
	//lnb
	$(".lnb .depth2").prev().addClass("bu");
	$(".lnb a.bu").attr("href", "javascript:viod(0)");
	//lnb toggle
	$(".lnb a.bu").click(function(){
		$(this).next().toggleClass("active");
		if ($(this).next().hasClass('active')){
			$(this).attr("title", "하위메뉴 닫기");
		} else {
			$(this).attr("title", "하위메뉴 열기");
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


	//footer 관련사이트
	$('.site_go button').on('click', function () {
		var _v = $(this).prev().val()
		if(_v==null || _v==""){
			alert('fmaily site를 선택해 주세요');
			return false;
		}else{
			window.open(_v,'_blank');
		}
	})


});