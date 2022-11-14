$(function () {
    handleFadeInElements()
    handleWindowScroll();
})

function handleWindowScroll() {
    $(window).scroll(function () {
        handleFadeInElements();
    });
}

function handleFadeInElements() {
    const windowHeight = window.innerHeight;
    const windowScrollTop = window.scrollY;
    const $fadeInEles = $('.js-fade-in-on-scroll');

    $fadeInEles.each(function () {
        const eleOffset = $(this).offset().top;
        if (eleOffset - windowScrollTop <= windowHeight / 2)
            $(this).addClass('active')
    })
}