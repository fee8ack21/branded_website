$(function () {
    handleBurgerToggle();
    handleListLinkHover();
    handleInnerListWrapMouseEnter();
    handleInnerListMouseLeave();
    handleListLinkClick();
    handleWindowResize();
    handleHeaderWheel();
    handleHeaderScroll();
});

function handleBurgerToggle() {
    $('.js-header-burger-link').on('click', function (e) {
        e.preventDefault();

        $('.js-header-list-wrap').toggleClass('main-header__list-wrap--active');
        $('.js-header-mobile-mask').toggleClass('main-header__mobile-mask--active');
        $('.js-header-burger-link').toggleClass('main-header__burger-link--active')
    })
}

function handleListLinkHover() {
    const $listWrapEle = $('.js-header-desktop-sub-list-wrap');
    const listWrapActiveClassname = 'main-header__desktop-sub-list-wrap--active';

    const $listEles = $('.js-header-desktop-sub-list');
    const listActiveClassname = 'main-header__desktop-sub-list--active'

    const $listLinkEles = $('.js-header-list-link')
    const linkActiveClassname = 'main-header__list-link--active';

    $('.js-header-list-link').on('mouseenter', function () {
        const windowWidth = window.innerWidth;
        if (windowWidth < 992) { return }

        const index = $(this).data('index');
        const $listEle = $(`.js-header-desktop-sub-list[data-index='${index}']`);

        let hasChild = $listEle.length > 0;

        $listLinkEles.each(function () {
            const $ele = $(this);

            if ($ele.data('index') == index) {
                $ele.addClass(linkActiveClassname)
                return;
            }
            $ele.removeClass(linkActiveClassname)
        })

        $listEles.each(function () {
            const $ele = $(this);

            if ($ele.data('index') == index) {
                $ele.addClass(listActiveClassname)
                return;
            }
            $ele.removeClass(listActiveClassname)
        });

        if (hasChild) {
            $listWrapEle.addClass(listWrapActiveClassname)
            return;
        }

        $listWrapEle.removeClass(listWrapActiveClassname)
    }).on('mouseleave', function (e) {
        const windowWidth = window.innerWidth;
        if (windowWidth < 992) { return }

        const index = $(this).data('index');
        const $toElement = $(e.toElement)

        if ($toElement.hasClass('js-header-desktop-sub-list')) { return; }
        $(this).removeClass(linkActiveClassname)

        $listWrapEle.removeClass(listWrapActiveClassname)
        $listEles.each(function () {
            const $ele = $(this);

            if ($ele.data('index') == index) {
                $ele.addClass(listActiveClassname)
                return;
            }
            $ele.removeClass(listActiveClassname)
        });
    })
}

function handleListLinkClick() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 992) { return }

    const $listLinkEles = $('.js-header-list-link')
    const linkActiveClassname = 'main-header__list-link--active';

    const $mobileSubListWrapEles = $('.js-header-mobile-sub-list-wrap');
    const mobileSubListWrapActiveClassname = 'main-header__mobile-sub-list-wrap--active'

    $('.js-header-list-link').on('click', function (e) {

        const index = $(this).data('index');
        const $subListWrapEle = $(`.js-header-mobile-sub-list-wrap[data-index='${index}']`);
        let hasChild = $subListWrapEle.length > 0;
        if (!hasChild) { return }

        e.preventDefault();
        $listLinkEles.each(function () {
            const $ele = $(this);

            if ($ele.data('index') == index) {
                handleHeaderListLinkStatus($ele)
                $ele.toggleClass(linkActiveClassname)
                return;
            }

            handleHeaderListLinkStatus($ele, 2)
            $ele.removeClass(linkActiveClassname)
        })

        $mobileSubListWrapEles.each(function () {
            const $ele = $(this);

            if ($ele.data('index') == index) {
                $ele.toggleClass(mobileSubListWrapActiveClassname)
                return;
            }
            $ele.removeClass(mobileSubListWrapActiveClassname)
        })

    })
}

function handleInnerListWrapMouseEnter() {
    $('.js-header-desktop-sub-list-wrap').on('mouseenter', function (e) {
        const target = e.target;
        if ($(target).hasClass('js-header-desktop-sub-list')) { return; }

        const $listWrapEle = $('.js-header-desktop-sub-list-wrap');
        $listWrapEle.removeClass('main-header__desktop-sub-list-wrap--active')
    })
}

function handleInnerListMouseLeave() {
    $('.js-header-desktop-sub-list').on('mouseleave', function (e) {
        const target = e.target;
        if ($(target).hasClass('js-header-list-link')) { return; }

        const $listWrapEle = $('.js-header-desktop-sub-list-wrap');
        $listWrapEle.removeClass('main-header__desktop-sub-list-wrap--active')

        const $listLinkEles = $('.js-header-list-link')
        $listLinkEles.each(function () {
            $(this).removeClass('main-header__list-link--active')
        })
    })
}

function handleWindowResize() {
    $(window).on('resize', function () {
        resetHeaderStatus()
    })
}

function resetHeaderStatus() {
    $('.js-header-list-link').removeClass('main-header__list-link--active')
    $('.js-header-desktop-sub-list-wrap').removeClass('main-header__desktop-sub-list-wrap--active')
    $('.js-header-mobile-sub-list-wrap').removeClass('main-header__mobile-sub-list-wrap--active')
    $('.js-header-list-wrap').removeClass('main-header__list-wrap--active');
    $('.js-header-mobile-mask').removeClass('main-header__mobile-mask--active');
    $('.js-header-burger-link').removeClass('main-header__burger-link--active')
}

function handleHeaderWheel() {
    const $headerEle = $('.js-header')
    if ($headerEle.length == 0) { return }

    $(window).bind('mousewheel', function (e) {
        const classname = "main-header--hide";
        const windowHeight = window.innerHeight;
        const pageHeight = $('html').outerHeight();

        if (pageHeight <= windowHeight) { return; }

        if (e.originalEvent.wheelDelta / 120 > 0) {
            $headerEle.removeClass(classname)
            return;
        }

        if ($(window).scrollTop() < 100) { return }

        if ($('.js-header-desktop-sub-list-wrap').hasClass('main-header__desktop-sub-list-wrap--active')) { return; }
        $headerEle.addClass(classname)
    });
}

function handleHeaderScroll() {
    const $headerEle = $('.js-header')
    if ($headerEle.length == 0) { return }

    $(window).scroll(function () {
        const classname = "main-header--hide";
        const scrollTop = $(window).scrollTop();
        if (scrollTop < 100) {
            $headerEle.removeClass(classname)
            return;
        }
    });
}

function handleHeaderListLinkStatus($ele, action = -1) {
    const status = $ele.attr('data-status');
    if (!status) { return; }

    switch (action) {
        case 1:
            $ele.attr('data-status', "－")
            break;
        case 2:
            $ele.attr('data-status', "＋")
            break;
        default:
            if (status == '＋') {
                $ele.attr('data-status', "－")
                return;
            }
            $ele.attr('data-status', "＋")
            break;
    }
}