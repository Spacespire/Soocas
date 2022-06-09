{
    // показать скрыть поле формы по его id
    let selects = document.querySelectorAll('[data-show-element-by-id="select"]');
    if (selects.length) {
            selects.forEach(select => {
                select.addEventListener('change', (e) => {
                    let fields = [];
                    Array.from(e.target.options).forEach(i => {
                        if(i.dataset.showElementById) {
                            let el = document.querySelector(`[data-show-element-by-id="element"][data-id="${i.dataset.showElementById}"]`);
                            if(el) {
                                fields.push(el)
                            }
                        }
                    })
                    if(fields.length) {
                        if(e.target.selectedOptions[0].dataset.showElementById) {
                            let field = fields.filter(i => i.dataset.id === e.target.selectedOptions[0].dataset.showElementById)[0];
                            field.classList.remove('d-none');
    
                            fields.forEach(i => {
                                if(i === field) return;
                                i.classList.add('d-none');
                            })
                        } else {
                            fields.forEach(field => {
                                field.classList.add('d-none');
                            })
                        }
                    }
                })
            })
        
    }
}