let files = []
let inputWrapItems = document.querySelectorAll('[data-file-input]');
if (inputWrapItems.length) {
    inputWrapItems.forEach(inputWrap => {
        let input = inputWrap.querySelector('input[type="file"]');
        let text = inputWrap.querySelector('.file-input__text');

        const changeHandler = (event) => {
            if (!event.target.files.length) {
                return
            }

            files = Array.from(event.target.files);

            let result = files.map(item => item.name);
            text.innerText = 'Загружен файл ' + result.join(', ');
        }

        input.addEventListener('change', changeHandler);

    })
}

let passwordFields = document.querySelectorAll('[data-field-password]');
if(passwordFields.length) {
    passwordFields.forEach(field => {
        let input = field.querySelector('input');

        if(input) {
            let toggleBtn = document.createElement('div');
            toggleBtn.className = 'field-password-toggle-btn';
            field.append(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                if(input.type === 'password') {
                    input.type = 'text';
                    toggleBtn.classList.add('field-password-toggle-btn--show');
                } else if(input.type === 'text') {
                    input.type = 'password';
                    toggleBtn.classList.remove('field-password-toggle-btn--show');
                }
            })
        }
    })
}