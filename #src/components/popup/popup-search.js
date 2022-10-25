{
    let buttonsOpenPopupSearch = document.querySelectorAll('[data-popup="open-popup"][href="#popupSerch"]');
    if(buttonsOpenPopupSearch.length) {
        buttonsOpenPopupSearch.forEach(btn => {
            btn.addEventListener('click', () => {
                let searchInput = document.querySelector('#popupSerch .popup-search__input input');
                if(searchInput) {
                    setTimeout(() => {
                        searchInput.focus();
                        searchInput.select();
                    }, 200)
                } 
            })
        })
    }
}