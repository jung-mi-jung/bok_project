$(function () {
    link = [
        'bd-list-news',
        'bd-view',
        'bd-list-default',
        'bd-list-forum',
        '500215',
        '500784',
        '500531',
        '500422',
        '경제분석안내',
        '500767',
        '500548',
        '500526',
        '500527',
        '500530',
        '500822', //이하 2023 MOEF-BOK-FSC-IMF Conference
        '500824',
        '500824_02', 
        '500826', //
        '500811', //이하 BOK-KEA International Conference 2022	
        '500812',
        '500816',	
        '500814', //
        '500806', //이하 BOK-BIS Conference 2018
        '500807',
        '500808',
        '500809', //
        '500797', //이하 MOSF-BOK-IMF-PIIE Conference 2017
        '500798',
        '500799',
        '500800', //
        '500801', //이하 BOK-KIEP-PIIE Conference 2016
        '500802',
        '500803',
        '500804', //
        '500753', //이하 SED Pre-Conference 진행중 
        '500752', //이하 SED Pre-Conference 진행중, 년도 카테고리는 화폐박물관꺼 갖다쓰기
        



    ]
    link.forEach(element => {
        let _s = element.split('/')
        if (_s.length > 1) {
            // dist 폴더에 없는 파일들에 대한 예외 처리
            $('td:contains("' + _s[1] + '")').addClass('ok')
            url = `/static/guide/imer/${element}.html`;
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