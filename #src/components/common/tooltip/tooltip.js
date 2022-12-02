let tooltips = document.querySelectorAll('[data-tooltip]');
if (tooltips.length) {
    tooltips.forEach(tooltip => {
        let icon = document.createElement('div');
        icon.className = 'tooltip-icon';
        tooltip.append(icon);

        tippy(icon, {
            content: tooltip.dataset.tooltip,
            arrow: false,
        });
    })
}