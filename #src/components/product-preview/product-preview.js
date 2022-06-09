let productPreviewSliderThumbs = document.querySelector('[data-slider="product-preview-slider-thumbs"]');
let productPreviewSliderImages = document.querySelector('[data-slider="product-preview-slider-images"]');
if (productPreviewSliderThumbs && productPreviewSliderImages) {

    let swiperProductPreviewSliderThumbs = new Swiper(productPreviewSliderThumbs, {
        spaceBetween: 12,
        direction: 'vertical',
        slidesPerView: 5,
        slidesPerGroup: 2,
        freeMode: true,
        navigation: {
            nextEl: productPreviewSliderThumbs.querySelector('[data-action="slider-next"]'),
        },
    });

    let swiperProductPreviewSliderImages = new Swiper(productPreviewSliderImages, {
        spaceBetween: 20,
        thumbs: {
            swiper: swiperProductPreviewSliderThumbs
        },
        preloadImages: false,
        lazy: {
            loadOnTranstitionStart: false,
            loadPrevNext: true,
        },
        pagination: {
        	el: productPreviewSliderImages.querySelector('[data-slider-dots]'),
        	clickable: true,
        },
    });
}