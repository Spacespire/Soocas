let technicalInfo = document.querySelector('[data-technical-info]');
if(technicalInfo) {
    let technicalInfoSlider = new Swiper(technicalInfo.querySelector('[data-slider="technical-info-mob-slider"]'), {
        speed: 800,
        loop: true,
        navigation: {
            nextEl: technicalInfo.querySelector('[data-action="slider-next"]'),
            prevEl: technicalInfo.querySelector('[data-action="slider-prev"]'),
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerGroup: 2,
            },
        },
    });
}