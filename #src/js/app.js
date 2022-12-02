@@include('files/utils.js');
@@include('files/dynamic_adapt.js');

class App {
	constructor() {
		this.utils = new Utils();
		this.dynamicAdapt = new DynamicAdapt('max');
	} 

	init() {
		if (this.utils.isMobile()) {
			document.body.classList.add('mobile');
		}
	
		if (this.utils.iOS()) {
			document.body.classList.add('mobile-ios');
		}
		
		this.utils.replaceToInlineSvg('[data-replace-to-inline-svg]');
		this.dynamicAdapt.init();
		this.headerHandler();
		this.popupHandler();
		this.setHtmlFontSize();
		this.inputMaskInit();
		this.timarInit();
		this.tabsInit();
		this.uploadFileHandler();
		this.checkboxPoliticsValidate();
		this.cookiesMessage();
		this.selectScripts();
		this.initTooltipe();
		
		window.addEventListener('load', () => {
			document.body.classList.add('page-is-load');

			this.scrollTgriggerAnimationInit();
			this.zoomInit();
			this.smoothScroll();
			this.slidersInit();
			this.componentsScripts();
		});

	}

	headerHandler() {
		@@include('../components/header/header.js');
	}

	popupHandler() {
		@@include('../components/popup/popup.js');
	}

	slidersInit() {
		@@include('../components/promo-header/promo-header.js');
		@@include('../components/technical-info/technical-info-slider.js');
		@@include('../components/product-preview/product-preview.js');
		@@include('../components/product-details/product-details.js');
		@@include('../components/product-carousel/product-carousel.js');
		@@include('../components/images-carousel/images-carousel.js');
		@@include('../components/grid-banner/grid-banner.js');
		@@include('../components/account-nav/account-nav.js');
	}

	setHtmlFontSize() {
		let max = 2160;
		let min = 992;
		let value = max - min;


		// плавное уменьшение fontSize для масштабирования страницы под малые экраны
		const setSize = () => {
			let width = document.documentElement.clientWidth;
			let percent = (value - (max - width)) / value * 100;
			if (width < max && width >= min) {
				document.documentElement.style.fontSize = 5 + (2.8 / 100) * percent + 'px';
			}

		}

		setSize();

		window.addEventListener('resize', setSize);
	}

	smoothScroll() {
		let anchors = document.querySelectorAll('[data-smooth]');
		if (anchors.length) {
			anchors.forEach(anchor => {
				if (!anchor.getAttribute('href').match(/#\w+$/gi)) return;

				let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
				anchor.addEventListener('click', (e) => {
					let el = document.getElementById(id);
					if (el) {
						e.preventDefault();
						window.scrollTo({
							top: el.offsetTop,
							behavior: 'smooth',
						})
					}

				})
			})
		}
	}

	tabsInit() {
		let tabsContainers = document.querySelectorAll('[data-tabs]');
		if (tabsContainers.length) {
			tabsContainers.forEach(tabsContainer => {
				let triggerItems = tabsContainer.querySelectorAll('[data-tab-trigger]');
				let contentItems = Array.from(tabsContainer.querySelectorAll('[data-tab-content]'));

				const getContentItem = (id) => {
					if (!id.trim()) return;
					return contentItems.filter(item => item.dataset.tabContent === id)[0];
				}

				if (triggerItems.length && contentItems.length) {
					if (!(tabsContainer.dataset.tabs === 'not-init')) {
						triggerItems[0].classList.add('tab-active');
						getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');
					}

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {

							tabsContainer.classList.add('tab-checked');
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})

							if (item.hasAttribute('data-tab-scroll-to-content')) {
								if (document.documentElement.clientWidth < 992) {
									let el = getContentItem(item.dataset.tabTrigger);
									let header = document.querySelector('[data-header]');
									if (el) {
										let top = Math.abs(document.body.getBoundingClientRect().top) + el.getBoundingClientRect().top;


										window.scrollTo({
											top: top - 20,
											behavior: 'smooth',
										})
									}
								}
							}
						})
					})
				}
			})
		}
	}

	spollerInit() {
		let spollers = document.querySelectorAll('[data-spoller]');
		if (spollers.length) {
			spollers.forEach(spoller => {
				let isOneActiveItem = spoller.dataset.spoller.trim() === 'one' ? true : false;
				let triggers = spoller.querySelectorAll('[data-spoller-trigger]');
				if (triggers.length) {
					triggers.forEach(trigger => {
						let parent = trigger.parentElement;
						let content = trigger.nextElementSibling;

						trigger.addEventListener('click', (e) => {
							e.preventDefault();
							parent.classList.toggle('active');
							trigger.classList.toggle('active');
							content && this.utils.slideToggle(content);

							if (isOneActiveItem) {
								triggers.forEach(i => {
									if (i === trigger) return;

									let parent = i.parentElement;
									let content = i.nextElementSibling;

									parent.classList.remove('active');
									i.classList.remove('active');
									content && this.utils.slideUp(content);
								})
							}
						})
					})
				}
			})
		}
	}

	zoomInit() {
		let zoomContainers = document.querySelectorAll('[data-zoom-container]');
        if (zoomContainers.length) {
            zoomContainers.forEach(container => {
				let zoomImages = container.querySelectorAll('[data-zoom-img]');
				if(zoomImages.length) {
					zoomImages.forEach(img => {
						new Drift(img, {
							paneContainer: container.querySelector('[data-zoom-zone]'),
							inlinePane: 900,
							inlineOffsetY: -85,
							containInline: true,
							hoverBoundingBox: true,
							zoomFactor: 2.5,
							sourceAttribute: 'data-zoom-img',
							touchDelay: this.utils.isMobile() ? 500 : 0,
						});
					})
				}
            })
        }
	}

	inputMaskInit() {
		let items = document.querySelectorAll('[data-mask]');
		if (items.length) {
			items.forEach(item => {
				let maskValue = item.dataset.mask;
				let input = item.querySelector('input[type="text"]');

				if (input) {
					Inputmask(maskValue, {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
					}).mask(input);
				}
			})
		}
	}

	scrollTgriggerAnimationInit() {
		// анимация html элементов при скроле страницы
		let wow = new WOW({
			boxClass: 'wow',
			animateClass: 'animated',
			offset: 10, 
		})

		wow.init();
	}

	timarInit() {
		@@include('../components/common/timer/timer.js');
	}

	uploadFileHandler() {
		@@include('../components/common/form-items/form-items.js');
	}

	checkboxPoliticsValidate() {
		let politicsCheckboxAll = document.querySelectorAll('[data-politics-checkbox]');
		if(politicsCheckboxAll.length) {
			politicsCheckboxAll.forEach(politicsCheckbox => {
				let button = politicsCheckbox.closest('form').querySelector('button');

				// init
				if(!politicsCheckbox.checked) {
					button.setAttribute('disabled', 'true');
				}
	
				//handler
				politicsCheckbox.addEventListener('change', (e) => {
					if(e.target.checked) {
						button.removeAttribute('disabled');
					} else {
						button.setAttribute('disabled', 'true');
					}
				})
			})
		}
	}

	cookiesMessage() {
		@@include('../components/cookies-message/cookies-message.js');
	}

	selectScripts() {

		let selects = document.querySelectorAll('select');
		if(selects.length) {
			selects.forEach(select => {
				// visited handler
				select.addEventListener('change', () => {
					select.classList.add('visited');
				})


				// redirect
				select.addEventListener('change', (e) => {
					if(e.target.selectedOptions[0].dataset.redirect) {
						window.location.href = e.target.selectedOptions[0].dataset.redirect;
					}
				})
			})

		}

	}

	componentsScripts() {
		@@include('../components/technical-info/technical-info-sticky-animation.js');
		@@include('../components/common/quantity/quantity.js');
		@@include('../components/common/rating/rating.js');
		@@include('../components/popup/popup-form-scripts.js');
		@@include('../components/popup/popup-search.js');
		@@include('../components/table-default/table-default.js');
		@@include('../components/growup-btn/growup-btn.js');
		@@include('../components/city-selection/city-selection.js');
		@@include('../components/checkout-card/checkout-card.js');
		@@include('../components/alert/alert.js');
		@@include('../components/product-services/product-services.js');
		@@include('../components/payment-method/payment-method.js');
		@@include('../components/history-orders/history-orders.js');
		@@include('../components/common/copy-link/copy-link.js');
	}

	initTooltipe() {
		@@include('../components/common/tooltip/tooltip.js');
	}
}

window.addEventListener('DOMContentLoaded', function () {
	let app = new App();
	app.init();
});  

