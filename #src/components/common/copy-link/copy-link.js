{
    let walletCode = document.querySelector('[data-copy-link]');
    if(walletCode) {
        let code = walletCode.querySelector('.copy-link__text');
        let btnCopy = walletCode.querySelector('.copy-link__btn');

        btnCopy.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(code.innerText);
            btnCopy.classList.add('copied');

            setTimeout(() => {
                btnCopy.classList.remove('copied');
            }, 1000)
        })
    }
}