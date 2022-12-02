{
    let appReviewBenefits = document.querySelector('[data-slider="app-review-benefits"]');
    if (appReviewBenefits) {
        let swiperAppReviewBenefits;

        function mobileSlider() {
            if (document.documentElement.clientWidth <= 767 && appReviewBenefits.dataset.mobile == 'false') {
                swiperAppReviewBenefits = new Swiper(appReviewBenefits, {
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    slidesPerView: 1,
                    speed: 600,
                });

                appReviewBenefits.dataset.mobile = 'true';
            }

            if (document.documentElement.clientWidth > 767) {
                appReviewBenefits.dataset.mobile = 'false';

                if (appReviewBenefits.classList.contains('swiper-initialized')) {
                    swiperAppReviewBenefits.destroy();
                }
            }
        }

        mobileSlider();

        window.addEventListener('resize', () => {
            mobileSlider();
        })
    }
}