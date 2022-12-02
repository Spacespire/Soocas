{
    let checkoutCard = document.querySelector('[data-chekcout-card]');
    if(checkoutCard) {
        checkoutCard.closest('._page').classList.add('overflow-visible');
        let btnWrap = checkoutCard.querySelector('.checout-card__btn-wrap');
        let btn = checkoutCard.querySelector('.checout-card__btn');


        if(btnWrap && btn) {
            let footer = document.querySelector('.footer');
            footer.classList.add('footer--pb')

            const toggleBtnSticky = () => {
                let btnPosition = btnWrap.getBoundingClientRect().top;
                if(btnPosition > document.documentElement.clientHeight || btnPosition < (0 - btnWrap.clientHeight)) {
                    btn.classList.add('checout-card__btn--fixed');
                } else {
                    btn.classList.remove('checout-card__btn--fixed');
                }
            }
            toggleBtnSticky();
            window.addEventListener('scroll', toggleBtnSticky);
            window.addEventListener('resize', toggleBtnSticky);
        }
    }
}