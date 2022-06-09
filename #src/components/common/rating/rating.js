{
    let ratings = document.querySelectorAll('[data-rating]');
    if(ratings.length) {
        ratings.forEach(rating => {
            let count = rating.dataset.rating > 5 ? 5
                        : rating.dataset.rating ? rating.dataset.rating
                        : 0;
            let stars = rating.querySelectorAll('.rating__star');

            for(let i = 0; i < count; i++) {
                stars[i].classList.add('rating__star--active');
            }
        })
    }
}