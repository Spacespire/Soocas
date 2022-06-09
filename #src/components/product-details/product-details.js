{
    let productDetailsNav = document.querySelector('[data-slider="product-details-nav"]');
    if(productDetailsNav) {
        let swiperProductDetailsNav = new Swiper(productDetailsNav, {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            freeMode: true,
            slideToClickedSlide: true,
            // breakpoints: {
            //     320: {
            //         spaceBetween: 40,
            //     },
            //     768: {
            //         spaceBetween: 60,
            //     },
            //     992: {
            //         spaceBetween: 80,
            //     },
            //     1268: {
            //         spaceBetween: 100,
            //     },
            //     1686: {
            //         spaceBetween: 120,
            //     },
            // },
        });
    }
}