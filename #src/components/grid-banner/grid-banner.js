{
    let gridBannerSliderAll = document.querySelectorAll('[data-slider="grid-banner"]');
    if (gridBannerSliderAll.length) {
        gridBannerSliderAll.forEach(gridBannerSlider => {
            let swiperGridBannerSlider;

            function mobileSlider() {
                if (document.documentElement.clientWidth <= 767 && gridBannerSlider.dataset.mobile == 'false') {
                    swiperGridBannerSlider = new Swiper(gridBannerSlider, {
                        slidesPerView: 1,
                        speed: 600,
                        spaceBetween: 16,
                        pagination: {
                            el: gridBannerSlider.querySelector('[data-slider-dots]'),
                            clickable: true,
                        },
                    });
    
                    gridBannerSlider.dataset.mobile = 'true';
                }
    
                if (document.documentElement.clientWidth > 767) {
                    gridBannerSlider.dataset.mobile = 'false';
    
                    if (gridBannerSlider.classList.contains('swiper-initialized')) {
                        swiperGridBannerSlider.destroy();
                    }
                }
            }
    
            mobileSlider();
    
            window.addEventListener('resize', () => {
                mobileSlider();
            })
        })
    }
}