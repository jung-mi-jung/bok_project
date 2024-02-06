$('td').on('click', function (e) {
    try {
        navigator.clipboard.writeText(trim($(this).text())).then(
            () => {
                /* clipboard successfully set */
            },
            () => {
                /* clipboard write failed */
            }
        );
        navigator.clipboard.readText().then((clipText) => {
            //   document.querySelector("td").innerText += clipText;
            console.log('복사내용  = ' + clipText);
        });
    } catch (error) {
        console.info(error);
        console.log('로컬호스트 환경이 아닌경우 브라우저 보안설정에서 클립보드 허용이 필요합니다.');
    }
    // 
    if ($(this).hasClass('page')) {
        url = !!$(this).data('link')
            ? $(this).data('link')
            : `/static/guide/${SITENAME}/dist/${$(this).text().trim()}.html`;
 		//debugger
			window.open(url, 'page');
        $('.currentfocus').removeClass('currentfocus')
        $(this).addClass('currentfocus')
    }
});
$('td').each(function () {
    let _this = $(this);
    let k = _this.text().trim().match(new RegExp(/[\da-zA-Z-_]+/));
    if ( k != null && k[0].length === k.input.length ) {
        url = `/static/guide/${SITENAME}/dist/${$(this).text().trim()}.html`;
        $.ajax({
            url: url,
            success: () => _this.addClass('page')
        });
    }
});