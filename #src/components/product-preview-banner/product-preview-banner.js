{
    let productPreviewBannerSlider = document.querySelector('[data-product-preview-banner-slider]');
    if(productPreviewBannerSlider) {
        console.log(productPreviewBannerSlider.querySelector('.product-preview-banner__slider-btn-right'));
        let options = {
            speed: 800,
            navigation: {
                nextEl: productPreviewBannerSlider.querySelector('.product-preview-banner__slider-btn--right'),
                prevEl: productPreviewBannerSlider.querySelector('.product-preview-banner__slider-btn--left'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 25,
                    autoHeight: true,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                }
            }
        }

        if(document.documentElement.clientWidth < 992) {
            options = {
                ...options,
                loop: true
            }
        }
        
        let sliderData = new Swiper(productPreviewBannerSlider, options);
    }
}