{
    let orderCards = document.querySelectorAll('[data-order-card]');
    if(orderCards.length) {
        orderCards.forEach(orderCard => {
            let head = orderCard.querySelector('.order-card__head');
            let body = orderCard.querySelector('.order-card__body');

            head.addEventListener('click', () => {
                orderCard.classList.toggle('order-card--open');
                this.utils.slideToggle(body);
            })
        })
    }
}