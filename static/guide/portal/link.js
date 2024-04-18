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
		'200184_2',	//조직도
		//'200200'  //법규 검색 (외부업체 작업)
		'200807_L',	//글로벌 외환시장행동규범 (컨텐츠 있는 게시판) - 기존 게시판 css 작업
		'200688',	//경제용어사전  *디자인 완료
		'200036',	//컨퍼런스/세미나
		'201076',	//참가신청
		'200755',	//통화정책방향 결정회의 (프로그램)
		'certification',	//실명인증
		'200796',	//faq
		'200658',	//faq



		// ### 컨텐츠, 목차형 개발 ###
		'200411',   //텍스트형 컨텐츠			
		'200509',  //임직원 현황
		'200512',		
		'201119',	//신고 안내    #디자인 완료
		'200671', //정보공개제도안내
		'200350',	//감시대상 지급결제시스템  = 컨텐츠 h - *** 디자인 추가함
		'200359',	// 짝수줄 색상 테이블
		'201136',	//CBDC		
		'200499',	// 화폐사랑 콘텐츠 공모전 > 안내		
		'200367', // 화폐 > 현용주화
		'200368',	//기념주화
		//'200371',  //위조방지장치 > 오만원권 (기존코딩)  => ******개편		
		'200186',	//CI소개
		'200511',
		'200608',
		'200513',	// 관련자료다운받기 디자인 ***
		'200514',	// 관련자료다운받기 디자인 ***
		'200515',
		'200516',
		'200517',
		'200518',
		'200969',
		'200970',	//임직원 행동강령 (제1조...) ** 3.27 내용 변경 ** 코딩 다시 할것... ppt 참조
		'200505',
		'200507',	//오시는길
		'200293',
		'200289',		
		'200294',
		'200296',
		'200710',		
		'200712',
		'200713',
		'200297',
		'200302',  //메뉴 통합  #디자인 완료
		'200316',
		'200317',
		'200318',
		'200319',
		'200320',
		'200322',
		'200328',		
		'200330',
		'200331',
		'200323',
		'200324',
		'200339',
		'200340',
		'200341',
		'200326',
		'201069',
		'201068',
		'200017',
		'200377',	//규격 테이블, 권종 width
		'200369',
		'200380',	//화폐	
		'200381',
		'200382',
		'200383',
		'200384',
		'200385',
		'200386',
		'200388',
		'201078',
		'200766',
		'200370',
		'200375',
		'200379',
		'200396',
		'200745',	//이미지 대체 텍스트
		'200991',
		'200391',
		'200392',
		//'200345',	// ***(변동) 개편
		'200346',
		'200347',
		'200353',
		'200354',
		'200770',
		'200349',
		'200720',
		'200727',
		'200352',
		'200721',
		'200361',
		'200362',
		'200406',
		'200407',		
		'200808',
		'200410',
		'200412',
		'200413',
		'200414',
		'200416',
		'201135',
		'200417',
		'200503',
		'200504',	//서비스헌장
		'200496',	//디자인 완료
		'201130',	//바로가기 버튼- 디자인
		'201131',	//바로가기 버튼- 디자인
		'200490',	//바로가기 버튼- 디자인
		'200494',	//바로가기 버튼- 디자인   //이미지 대체 텍스트
		'200495',	//바로가기 버튼- 디자인		//공지사항 ,faq 링크 버튼
		'201084',
		
		'200393',
		'200394',
		'200395',
		'201099',
		'200997',	//화폐교환 한도
		'200158',
		'200159',
		'200160',
		'200665',	//##이미지 대체텍스트
		'200670',		
		'200672',
		'200668',		
		'200400',
		'201121',
		'200172',	//신청버튼 있음
		
		

		
		'200228',	//이용안내
		'200661',	//민원이용안내 *디자인 완료   ##대체텍스트
		'200291',	//#*디자인 완료, #대체텍스트



		//04.04 ~ 컨텐츠 개발 요청 =
		'200181',	//*디자인 완료  = 스크립트 수정할것
		'200288',	//*디자인 완료
		'200291',
		'200656',	//한국은행 기준금리 p
		'200329',	//테이블 캡션태그? 포함
		'200408',
		'200671',
		'201120',
		'200711',	//대체텍스트
		'200831',	//지역본부 > 인사말
		'200832',	//지역본부 > 연혁
		'200833',
		'200834',	//지역본부 > 화폐전시실   /***  추후 디자인
		'200835',
		'200836',
		'200837',
		'200843',	//대구 - 화폐전시실
		'200845',
		'200840',
		'200849',
		'200858',	//광주전남본부
		'200867',	//전북본부장
		'200875',	//대전세종충남본부
		'200883',	//충북본부
		'200892', 	//강원본부
		'200901',	//인천본부
		'200910',	//제주본부
		'200919',	//경기본부
		'200927',	//경남본부
		'200936',	//강릉본부
		'200945',	//울산본부
		'200954',	//포항본부
		'200962',
		'200228',


		//04.11
		'200360',
		'200290',




		'200597',
		'200603',	//금요강좌 신청
		'200603_step2',		//한은금요강좌
		'201119_step2',	//청탁·이해충돌 방지제도 신고
		'201120_step2',	//	실명신고 - 부패·부조리 신고
		'201120_step3',
		'201122_step3',	//	익명신고 - 부패·부조리 신고
		'200035',	//행사일정 - 달력, 모달팝업
		'200419',	//행사참가신청
		'200775',	//월간통계 공표일정 - 달력
		'200776',	//
		'200140',	//
		'201082',	//교환신청 - 달력  (##200597 달력 또있음=>미작업)
		'200378',	//	위조지폐 기번호 검색
		'200752',	//마이페이지 - 금요강좌 신청
		'200753',	//마이페이지 - 수료증발급
		'200262',	//마이페이지
		'200271', 	//마이페이지		


		//추후 디자인 변경
		'200398',	// top 이미지 *** 추후 디자인
		'201072',	//조직가치


		'200196',	//역대총재


	
		//'200415',		//미작업 - 3.27 내용변경 ppt 참조

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
		//200321
		//200291

		//서브 메인
		'200003',
		'200001',
		
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