$(function () {
    link = [
        'bd-list-news',
        'bd-view',
        'bd-list-default',
        'bd-list-forum',
        '600285',
        //'600290',
        '600284',
        '600289',
        '600344',
        '600345',
        '600375',
        '600286',
        '600313',
        '600310',
        '600384',
        '600383',
        // '600388' //진행중 링크연결해야함
        '600370',
        '600371',
        '600372',
        '600373',
        '600365',
        '600364',
        '600367',
        '600359',
        '600360',
        '600361',
        '600362',
        '600321',
        '600322',
        '600324',
        '600325',
        '600326',
        '600328',
        '600329',
        '600330',
        '600332',
        '600390',
        '600391',
        '600393',
        '600333',
        '600334',
        '600336',
        '600319',
        '600320',

        
    ]

    link.forEach(element => {
        let _s = element.split('/')
        if (_s.length > 1) {
            // dist 폴더에 없는 파일들에 대한 예외 처리
            $('td:contains("' + _s[1] + '")').addClass('ok')
            url = `/static/guide/imerEng/${element}.html`;
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

