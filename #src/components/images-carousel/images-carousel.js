{
    let imagesCarousels = document.querySelectorAll('[data-slider="images-carousel"]');
    if (imagesCarousels.length) {
        imagesCarousels.forEach(imagesCarousel => {
            let swiperImagesCarousel = new Swiper(imagesCarousel, {
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                loop: true,
                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                },
                pagination: {
                    el: imagesCarousel.querySelector('[data-slider-dots]'),
                    clickable: true,
                },
                navigation: {
                    nextEl: imagesCarousel.querySelector('[data-action="slider-next"]'),
                    prevEl: imagesCarousel.querySelector('[data-action="slider-prev"]'),
                },
            });
        })
    }
}