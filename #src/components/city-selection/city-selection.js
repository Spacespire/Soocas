{
    let citySelection = document.querySelector('[data-city-selection]');
    if (citySelection) {
        let head = citySelection.querySelector('.city-selection__head');
        let btnClose = citySelection.querySelector('.city-selection__close');
        let buttonsOpen = document.querySelectorAll('[data-action="open-city-selection"],[data-action="close-alert,open-city-selection"]');

        head.addEventListener('click', () => {
            citySelection.classList.add('city-selection--open');

            if (document.documentElement.clientWidth < 768) {
                document.body.classList.add('overflow-hidden');
            }
        })
        btnClose.addEventListener('click', () => {
            citySelection.classList.remove('city-selection--open');

            if (document.documentElement.clientWidth < 768) {
                document.body.classList.remove('overflow-hidden');
            }
        })

        if(buttonsOpen.length) {
            buttonsOpen.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    citySelection.classList.add('city-selection--open');

                    if (document.documentElement.clientWidth < 768) {
                        document.body.classList.add('overflow-hidden');
                    }
                })
            })
        }

        window.addEventListener('scroll', () => {
            citySelection.classList.toggle('city-selection--is-scroll', window.pageYOffset > 50);
        })
    }
}