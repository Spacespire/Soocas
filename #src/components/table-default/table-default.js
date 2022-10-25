{
    let tables = document.querySelectorAll('[data-table-show-first-lines]');
    if(tables.length) {
        tables.forEach(table => {
            let value = +table.dataset.tableShowFirstLines || false;
            if(value) {
                if(table.querySelector('tbody').children.length <= value) return;

                let hiddenChildren = Array.from(table.querySelector('tbody').children).slice(value);

                let hiddenTable = document.createElement('table');
                let wrapHiddenTable = document.createElement('div');
                wrapHiddenTable.className = 'hidden-table-wrap';
                hiddenTable.className = `${table.className} table-default--collapse`;
                hiddenTable.append(...hiddenChildren);
                wrapHiddenTable.append(hiddenTable);

                table.after(wrapHiddenTable);
                table.classList.add('mb-0');

                let btnMore = document.createElement('div');
                let hiddenTableBtnWrap = document.createElement('div');
                hiddenTableBtnWrap.className = 'hidden-table-btn-wrap'
                btnMore.className = 'btn btn--secondary';
                btnMore.innerHTML = '<span>Показать еще</span>';
                hiddenTableBtnWrap.append(btnMore);

                wrapHiddenTable.after(hiddenTableBtnWrap);

                btnMore.addEventListener('click', () => {
                    if(hiddenTable.classList.contains('table-default--collapse-show')) {
                        hiddenTable.classList.remove('table-default--collapse-show');
                        this.utils.slideUp(wrapHiddenTable);
                        btnMore.innerHTML = '<span>Показать еще</span>';
                    } else {
                        hiddenTable.classList.add('table-default--collapse-show');
                        this.utils.slideDown(wrapHiddenTable);
                        btnMore.innerHTML = '<span>Скрыть</span>';
                    }
                })
            }
        })
    }

    let tableDefaultAll = document.querySelectorAll('.table-default');
    if(tableDefaultAll.length) {
        tableDefaultAll.forEach(tableDefault => {
            if(tableDefault.hasAttribute('data-table-show-first-lines')) {
                let scrollWrap = document.createElement('div');
                scrollWrap.className = "table-default-scroll-wrap";
                tableDefault.after(scrollWrap);
                scrollWrap.append(tableDefault);
                

                if(scrollWrap.nextElementSibling.classList.contains('hidden-table-wrap')) {
                    scrollWrap.append(scrollWrap.nextElementSibling);
                }
            } else {
                if(tableDefault.classList.contains('in-scroll-wrap')) return;
                if(tableDefault.closest('.hidden-table-wrap')) return;
                
                let scrollWrap = document.createElement('div');
                scrollWrap.className = "table-default-scroll-wrap";
                tableDefault.after(scrollWrap);
                scrollWrap.append(tableDefault);

                const appendTable = () => {
                    if(scrollWrap.nextElementSibling) {
                        if(scrollWrap.nextElementSibling.classList.contains('table-default')) {
                            if(scrollWrap.nextElementSibling.hasAttribute('data-table-show-first-lines')) return;
                            scrollWrap.nextElementSibling.classList.add('in-scroll-wrap')
                            scrollWrap.append(scrollWrap.nextElementSibling);
                            appendTable();
                        } else {
                            return;
                        }
                    } else {
                        return; 
                    }
                }

                appendTable();
            }
        })
    }
}