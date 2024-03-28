$(function () {
    link = [
        '700112',
        '700114',
        '700115',
        '700783',
        '700128',
        '700780',
        '700779',
        'bd-list-default',
        'photo-list',
        'bd-list-search',
        'bd-list-tab',
        'bd-view',
        'bd-view-qna',
        'bd-pdf',
        'bd-vr',
        'bd-photo_type1',
        'bd-photo_type2',
        'bd-video-type1',
        'bd-video-type2',
        'bd-blog',
        'faq',
        '700791',
        '700792',
        '700830',
        '700831',
        '700833',
        '700834',
        '700124',
        '700778',
        '700129'
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