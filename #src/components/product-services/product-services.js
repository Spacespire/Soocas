{
    let productsServices = document.querySelectorAll('[data-product-services]');
    if (productsServices.length) {
        productsServices.forEach(productServices => {
            let head = productServices.querySelector('.product-services__head');
            let close = productServices.querySelector('.product-services__close');

            head.addEventListener('click', (e) => {

                e.preventDefault();
                productServices.classList.toggle('product-services--open')

            })
            close.addEventListener('click', (e) => {

                e.preventDefault();
                productServices.classList.remove('product-services--open')

            })
        })
    }
}