$(function () {
    link = [
		'sublayout_A_type',  //뉴스 및 자료형
		'sublayout_B_type',  //컨텐츠 목차형
		'sublayout_C_type',		//관련자료형
		//'bd-view_type',	//코딩미완료

		//'bd-list-default',  //기본 목록 게시판  (가이드용)
		//'bd-list',	//목록 게시판 (가이드용)		
		'bd-video',	//동영상형
		'bd-view',	//기본 상세 게시판

		'bd-sh',  // 뉴스 및 자료형 (sublayout_A_type 동일)
		'bd-default',	//일반 게시판(목록, 상세)
		'200690',  //게시판 일반형
		'201106', //블로그
		'200390',  //카드뉴스
		//'200184',  //조직도 - 작업중
		'200184_2',	//조직도 - 작업중
		//'200200'  //법규 검색 (외부업체 작업)
    ]
    link.forEach(element => {
        let _s = element.split('/')
        if (_s.length > 1) {
            // dist 폴더에 없는 파일들에 대한 예외 처리
            $('td:contains("' + _s[1] + '")').addClass('ok')
            url = `/static/guide/portal/${element}.html`;
            try {
                $.ajax({
                    url: url,
                    success: function (response) {
                        if (response.indexOf('경로를 다시 확인하시고 이용해 주시기 바랍니다.') > -1) {
                        } else {
                            $('td:contains("' + _s[1] + '")').addClass('page').data('link', url)
                        }
                    },
                });
            } catch (error) { }
        } else {
            $('td:contains("' + element + '")').addClass('ok')
        }
    });

	if ($(this).hasClass('page')) {
        url = !!$(this).data('link')
            ? $(this).data('link')
            : `/static/guide/${SITENAME}/dist/${$(this).text().trim()}.html`;
        window.open(url, 'page');
        $('.currentfocus').removeClass('currentfocus')
        $(this).addClass('currentfocus')
    }
});