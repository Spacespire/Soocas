let promoHeader = document.querySelector('[data-promo-header]');
if (promoHeader) {
    let header = document.querySelector('[data-header]')
    let textSlider = new Swiper(promoHeader.querySelector('[data-slider="promo-header-text-slider"]'), {
        effect: 'fade',
        speed: 400,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 400,
            },
            992: {
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: false,
                speed: 100,
            },
        },
    });

    let linksSlider = new Swiper(promoHeader.querySelector('[data-slider="promo-header-links-slider"]'), {
        effect: 'fade',
        touchRatio: 0,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        on: {
            activeIndexChange: (data) => {
                textSlider.slideTo(data.activeIndex);
            }
        }
    });


    let imagesSlider = new Swiper(promoHeader.querySelector('[data-slider="promo-header-images-slider"]'), {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        touchRatio: 0,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        lazy: {
            loadPrevNext: true,
        },
        pagination: {
            el: promoHeader.querySelector('[data-slider-dots]'),
            clickable: true,
        },
        navigation: {
            nextEl: promoHeader.querySelector('[data-action="slider-next"]'),
            prevEl: promoHeader.querySelector('[data-action="slider-prev"]'),
        },

        on: {
            activeIndexChange: (data) => {
                textSlider.slideTo(data.activeIndex);
                linksSlider.slideTo(data.activeIndex);

                if(data.activeIndex === 0) {
                    header.classList.add('header--text-white');
                } else {
                    header.classList.remove('header--text-white');
                }
            },

            afterInit: () => {
                header.classList.add('header--text-white');
            }
        }
    });

    imagesSlider.controller.control = textSlider
    textSlider.controller.control = imagesSlider
}