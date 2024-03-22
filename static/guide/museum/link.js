$(function () {
    link = [
        '700112',
        '700113',
        '700114',
        '700115',
        '700117',
        '700125',
        '700126',
        '700127',
        '700778',
        '700816',
        '700817',
        '700827',
        '700822',
        '700825',
        '700826',
        '700800',
        '700785',
        '700794',
        '700813',
        '700814',
        '700804',
        '700805',
        '700806',
        '700815',
        '700121',
        '700818',
        '700119',
        '700819',
        '700820',
    ]
    link.forEach(element => {
        let _s = element.split('/')
        if (_s.length > 1) {
            // dist 폴더에 없는 파일들에 대한 예외 처리
            $('td:contains("' + _s[1] + '")').addClass('ok')
            url = `/static/guide/museum/${element}.html`;
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