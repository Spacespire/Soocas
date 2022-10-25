{
    let btn = document.createElement('button');
    btn.className = 'btn-growup';
    btn.innerHTML = '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.4998 0C10.0737 0 0 10.0737 0 22.4998C0 34.9254 10.0735 45 22.4995 45C34.9254 45 45 34.9254 45 22.4998C45 10.0737 34.926 0 22.4998 0ZM32.6525 28.4688C31.832 29.2889 30.5018 29.2893 29.681 28.4688L22.442 21.2284L15.1637 28.5057C14.3437 29.3258 13.0131 29.3262 12.1923 28.5057C11.7826 28.0949 11.5776 27.5576 11.5776 27.02C11.5776 26.4824 11.7826 25.9451 12.193 25.5354L20.6368 17.091C20.7176 16.9653 20.8103 16.8454 20.92 16.7358C21.3394 16.3164 21.8914 16.1145 22.4419 16.1242C22.9912 16.1149 23.5441 16.3164 23.963 16.7362C24.0731 16.8456 24.1654 16.9654 24.2459 17.091L32.6523 25.4973C33.4725 26.3178 33.4731 27.648 32.6525 28.4688Z" fill="black"/></svg>';

    document.body.append(btn);

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })

    window.addEventListener('scroll', () => {
        btn.classList.toggle('btn-growup--show', window.pageYOffset > document.documentElement.clientHeight / 2);
    })
}