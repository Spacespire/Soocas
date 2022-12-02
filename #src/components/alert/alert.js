{
    let alert = document.querySelector('[data-alert]');
    if(alert) {
        let closeButtons = document.querySelectorAll('[data-action="close-alert"],[data-action="close-alert,open-city-selection"]');
        if(closeButtons.length) {
            closeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    alert.classList.remove('alert--show');
                })
            })
        }
    }
}