$(function () {
    handleGoToBtnClick();
    handleGoToBtnVisibility();
})

function handleGoToBtnVisibility() {
    $(window).scroll(function () {
        const $btn = $('.js-go-to-btn')
        const scrollTop = $(window).scrollTop();
        if (scrollTop > 100) {
            $btn.addClass('go-to-btn--active')
            return;
        }
        $btn.removeClass('go-to-btn--active')
    });
}

function handleGoToBtnClick() {
    $('.js-go-to-btn').on('click', function (e) {
        e.preventDefault();

        if ($('.js-fullpage').length == 0) {
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return;
        }

        window.location.href = '/#section1';
    })
}

