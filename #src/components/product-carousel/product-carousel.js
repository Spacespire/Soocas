{
    let productCarouselSliders = document.querySelectorAll('[data-slider="product-carousel-slider"]');
    if(productCarouselSliders.length) {
        productCarouselSliders.forEach(productCarouselSlider => {
            let swiperProductCarouselSlider = new Swiper(productCarouselSlider.querySelector('.swiper'), {
                speed: 800,
                navigation: {
                    nextEl: productCarouselSlider.querySelector('[data-action="slider-next"]'),
                    prevEl: productCarouselSlider.querySelector('[data-action="slider-prev"]'),
                },
                pagination: {
                    el: productCarouselSlider.querySelector('.swiper-pagination'),
                    clickable: true,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    575: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    }
                },
            });
        })
    }
}