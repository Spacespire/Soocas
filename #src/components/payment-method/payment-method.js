{
    let radioSpollers = document.querySelectorAll('[data-spoller-radio]');
    if (radioSpollers.length) {
        radioSpollers.forEach(radioSpoller => {
            let triggers = radioSpoller.querySelectorAll('[data-spoller-radio-trigger]');
            if(radioSpoller.dataset.spollerRadio !== 'sub') {
                triggers = Array.from(triggers).filter(item => !item.closest('[data-spoller-radio="sub"]'));
            }
            if (triggers.length) {
                // init
                triggers.forEach(trigger => {
                    let parent = trigger.parentElement;
                    let input = trigger.querySelector('input');
                    let collapseContent = trigger.nextElementSibling;

                    if (input.checked) {
                        
                        parent.classList.add('active');
                        trigger.classList.add('active');
                        collapseContent && this.utils.slideDown(collapseContent, 300);
                    } else {
                        parent.classList.remove('active');
                        trigger.classList.remove('active');
                        collapseContent && this.utils.slideUp(collapseContent, 300);
                    }
                })


                triggers.forEach(trigger => {
                    let input = trigger.querySelector('input');
                    trigger.addEventListener('click', (e) => {
                        e.preventDefault();
                        let parent = trigger.parentElement;
                        let input = trigger.querySelector('input');
                        let collapseContent = trigger.nextElementSibling;

                        if (input.checked) return;

                        input.checked = true;

                        parent.classList.add('active');
                        trigger.classList.add('active');
                        collapseContent && this.utils.slideDown(collapseContent, 300);

                        let event = new Event("change", { bubbles: true });
                        input.dispatchEvent(event);

                        triggers.forEach(i => {
                            if (i === trigger) return;
                            i.parentElement.classList.remove('active');
                            i.classList.remove('active');
                            i.nextElementSibling && this.utils.slideUp(i.nextElementSibling, 300);
                        })
                    })
                })

            }
        })
    }
}