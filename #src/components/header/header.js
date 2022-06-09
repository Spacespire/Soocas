let header = document.querySelector('[data-header]');
if (header) {
    let burger = document.querySelector('[data-action="toggle-menu-mobile"]');
    let mobileMenu = document.querySelector('[data-menu-mobile]');
    let mobileMenuNavSubItems = mobileMenu.querySelectorAll('[data-toggle-sab]');


    const burgerBtnAnimationToggle = (burger) => {
        burger.children[0].classList.toggle('burger__cross--first')
        burger.children[1].classList.toggle('burger__cross--second')
        burger.children[2].classList.toggle('burger__cross--third')
        burger.children[3].classList.toggle('burger__cross--fourth')
    }

    // открытие/закрытие моб меню
    burger.addEventListener('click', () => {
        burgerBtnAnimationToggle(burger);
        header.classList.toggle('header--menu-is-open');
        mobileMenu.classList.toggle('menu-mobile--open');
        document.body.classList.toggle('overflow-hidden');
    })

    // обработчик моб саб меню
    mobileMenuNavSubItems.forEach(item => {
        let link = item.querySelector('.menu-mobile__link');
        let subMenu = item.querySelector('.sub-menu');

        if (link && subMenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('menu-mobile__list-item--sub-menu-is-open');
                link.classList.toggle('menu-mobile__link--sub-menu-is-open');
                this.utils.slideToggle(subMenu);

                mobileMenuNavSubItems.forEach(i => {
                    if (i === item) return;

                    let link = i.querySelector('.menu-mobile__link');
                    let subMenu = i.querySelector('.sub-menu');

                    i.classList.remove('menu-mobile__list-item--sub-menu-is-open');
                    link.classList.remove('menu-mobile__link--sub-menu-is-open');
                    this.utils.slideUp(subMenu);
                })
            })
        }
    })

    // анимация шапки (header) при скроле
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
    })

}