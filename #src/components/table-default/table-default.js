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
}