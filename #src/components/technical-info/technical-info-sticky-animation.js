let technicalInfo = document.querySelector('.technical-info');
if (technicalInfo) {
    let tableTop = technicalInfo.querySelector('.technical-info__table-top');
    if (tableTop) {
        let wrapper;
        let header = document.querySelector('.header');
        let tablet = technicalInfo.querySelector('.technical-info__table');

        const createStickyEl = () => {
            wrapper = document.createElement('div');
            let container = document.createElement('div');
            let table = document.createElement('table');
            let tbody = document.createElement('tbody');

            wrapper.className = 'technical-info-sticky-wrapper';
            container.className = 'container';

            wrapper.append(container);
            container.append(table);
            table.append(tbody);
            tbody.append(tableTop.cloneNode(true));
            document.body.append(wrapper);
        }

        const setPosition = () => {
            wrapper.style.top = header.clientHeight + 'px';
        }

        createStickyEl();
        setPosition();

        window.addEventListener('scroll', () => {
            setPosition();

            if (document.documentElement.clientWidth >= 992) {
                let tableTopY = tableTop.getBoundingClientRect().top;
                let tabletY = tablet.getBoundingClientRect().bottom;

                if ((tableTopY < header.clientHeight) && (tabletY > (header.clientHeight + wrapper.clientHeight))) {
                    wrapper.classList.add('show');
                } else if (tableTopY > header.clientHeight) {
                    wrapper.classList.remove('show');
                } else if (tabletY < (header.clientHeight + wrapper.clientHeight)) {
                    wrapper.classList.remove('show');
                }
            }
        })

        window.addEventListener('resize', () => {
            setPosition();
        })

    }
}