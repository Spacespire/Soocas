{
    let accountNav = document.querySelector('[data-slider="product-account-nav"]');
    if(accountNav) {
        let elements = Array.from(accountNav.querySelectorAll('.account-nav__item'));
        let startIndex = elements.findIndex(i => i.classList.contains('account-nav__item--active'));
        let swiperaccountNav = new Swiper(accountNav, {
            initialSlide: +startIndex,
            spaceBetween: 40,
            slidesPerView: 'auto',
            speed: 800,
            freeMode: true,
        });
    }
}