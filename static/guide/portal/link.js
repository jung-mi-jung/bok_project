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
		'faq',	//FAQ
		'200690',  //게시판 일반형
		'201106', //블로그
		'200390',  //카드뉴스
		'200184',  //조직도
		'200184_2',	//조직도 - 작업중
		//'200200'  //법규 검색 (외부업체 작업)
		'200411',   //텍스트형 컨텐츠
		'200380',	//화폐
		'200507',	//오시는길
		'200509',  //임직원 현황
		'200512',
		'200514',	//셀렉트 있음(현재 레이어 아닌걸로 적용)
		'201119',	//신고 안내
		'200671', //정보공개제도안내
		'200350',	//감시대상 지급결제시스템
		'200359',	// 짝수줄 색상 테이블
		'201136',	//CBDC
		'200807_L',	//글로벌 외환시장행동규범 (컨텐츠 있는 게시판) - 기존 게시판 css 작업
		'200688',	//경제용어사전
		'200036',	//컨퍼런스/세미나
		'200499',	// 화폐사랑 콘텐츠 공모전 > 안내
		'201076',	//참가신청
		'200367', // 화폐 > 현용주화
		'200368',	//기념주화


		//200307


		//200969
		//200970




		//개편  (미작업)
		//200181
		//200185
		//200781
		//200196 ~ 역대 소개

		//200523
		//200524    --게시판
		//200213

		//디자인
		//200182
		
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