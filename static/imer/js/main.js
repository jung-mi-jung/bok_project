$(function () {
	//메인 비쥬얼 영역 swiper 설정
	var section1Visual = new Swiper('.section1-visual', {
		speed: 1000,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		grabCursor: true,
		effect: "creative",
		creativeEffect: {
			prev: {
				shadow: true,
				translate: ["-20%", 0, -1],
			},
			next: {
				translate: ["100%", 0, 0],
			},
		},
		navigation: {
			nextEl: '.section1-visual__swiper-button-next',
			prevEl: '.section1-visual__swiper-button-prev',
		},
		pagination: {
			el: '.pagination_fraction',
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
	});
	//메인 비쥬얼 영역 progress 추가 설정
	section1Visual.on('slideChange',function(){
		$(".progress").removeClass('active first');
		console.log($(".progress").offset());
		$(".progress").addClass('active');
	});
});


//연구포럼 및 세미나
$(function () {
	const board2 = new Swiper('.board-list2', {
		init: false,
		//freeMode: true,
		// Optional parameters
		loop: false,
		slidesPerView : '4',
		spaceBetween : 40,
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
			  spaceBetween: 40,
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
		//autoplay: {
		//	delay: 3000,
		//	disableOnInteraction: false,
		//},
		observer: true,
		observeParents: true,
	});
	board2.init();//초기화	
});