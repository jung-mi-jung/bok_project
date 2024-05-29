$(function () {
	var crntWidth = $(window).width();

	//일간, 주간 탭
	$(".best-tab a").on('click', function () {
		$(".best-tab a").removeClass("active").removeAttr("title");
		$(this).addClass("active").attr("title", "선택됨")
		// $(".tab-con").hide();
		// let tabid = $(this).attr("rel");
		// $("." + tabid).fadeIn();
	});


	if ( crntWidth > 750 ) {
		$('.best-box').on('mouseover focusin', function(e) {
			$(".best-layer").show();
			$(".best-layer > ul > li:first-child a").focus();
		});
	}
	else {
		$('.best-box').off('mouseover focusin');
	}

	$('.best-box').on('click', function(e) {
		e.preventDefault();
		$(".best-layer").show();
	});


	$(window).resize(function() {
		crntWidth = $(window).width();

		if ( crntWidth > 750 ) {
			$('.best-box').on('mouseover focusin', function(e) {
				$(".best-layer").show();
				$(".best-layer > ul > li:first-child a").focus();
			});
		}
		else {
			$('.best-box').off('mouseover focusin');
		}
	})


	
	$('.best-layer li:last-child a, .best-tsh').on('mouseleave', function(e) {
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
				delay: 3000,				
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
				delay: 3000,				
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
	$('.best-layer li:last-child a').on('mouseleave', function(e) {
		$(".best-layer").hide();
	})
});

function truncateByByteLength(str, maxByteLength) {
    var byteLength = 0;
    var truncatedStr = '';
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        var charByteLength = 0;
        
        if (charCode <= 0x7F) {
            charByteLength = 1;
        } else if (charCode <= 0x7FF) {
            charByteLength = 2;
        } else if (charCode <= 0xFFFF) {
            charByteLength = 3;
        } else {
            charByteLength = 4;
        }

        if (byteLength + charByteLength > maxByteLength) {
			truncatedStr += str.charAt(i);
			truncatedStr = truncatedStr + "...";
            break;
        } else {
			truncatedStr += str.charAt(i);
		}
        byteLength += charByteLength;
    }
    return truncatedStr;
}