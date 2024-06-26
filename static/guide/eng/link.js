$(function () {
    link = [
		//'sublayout_A_type',  //뉴스 및 자료형
		'sublayout_B_type',  //컨텐츠 목차형
		//'sublayout_C_type',		//관련자료형

		'400079',
        '400240',
        '400440',
        '400441',
        '400442',
        '400443',
        '400444',
        '400445',
        '400446',
        '400447',
        '400448',
        '400449',
        '400450',
        '400451',
        '400452',
        '400453',
        '400454',
        '400455',
        '400456',
        '400457',
        '400458',
        '400459',
        '400460',
        '400461',
        '400462',
        '400463',
        '400464',
		'400465',	//금융통화위원회 Monetary Policy Board
		'400468',
		'400469',
		'400470',
		'400471',
		'400244',
		'400474',
		'400475',
		'400476',
		'400477',
		'400478',
		'400479',
		'400472',
		'400473',
		'400242',
		'400243',		
		'400249',	
		'400260',

		
		'400086',
		'400259',
		'400070',
		'400235',
		'400085',
		'400246',
		'400247',
		'400248',
		'400373',
		'400012',
		'400015',
		'400017',
		'400027',
		'400028',	//작업중
		'400018',
		'400024',
		'400029',
		'400019',
		'400020',
		'400037',
		'400038',
		'400039',
		'400098',
		'400097',
		'400099',
		'400101',
		'400102',
		'400103',
		'400399',
		'400044',
		//'400112',  개발서버 완료
		'400113',
		'400114',


		'400116',
		'400117',
		'400118',
		'400119',
		'400120',  //이미지 - 국문확인할것
		'400121', 


		'400055',
		'400058',
		'400170',
		'400057',
		'400045',
		'400108',
		'400188',
		'400191',
		'400196',
		'400414',
		'400198',



		//컨텐츠 업데이트
		'400201',
		'400487',
		'400488',


		//화폐박물관
		'400266',
		'400265',
		'400264',
		'400267',		
		'400278',
		'400277',
		'400276',
		'400274',
		'400273',
		'400272',
		'400271',
		'400270',
		'400269',
		'400490',
		'400491',
		'400492',


		
		

		//이미지 작업 필요
		'400080',
		'400381',
		'400364',



		'400241',
		
    ]
    link.forEach(element => {
        let _s = element.split('/')
        if (_s.length > 1) {
            // dist 폴더에 없는 파일들에 대한 예외 처리
            $('td:contains("' + _s[1] + '")').addClass('ok')
            url = `/static/guide/eng/${element}.html`;
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