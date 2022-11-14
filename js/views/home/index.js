$(function () {
    handleCarousel();
})

function handleCarousel() {
    $('.js-home-index-carousel').owlCarousel({
        loop: true,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 5000,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1
            }
        }
    })
}
