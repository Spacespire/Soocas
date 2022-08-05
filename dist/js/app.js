class Utils {
	slideUp(target, duration = 500) {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideDown(target, duration = 500) {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;
		if (display === 'none')
			display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
	slideToggle(target, duration = 500) {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			if (window.getComputedStyle(target).display === 'none') {
				return this.slideDown(target, duration);
			} else {
				return this.slideUp(target, duration);
			}
		}
	}

	Android() {
		return navigator.userAgent.match(/Android/i);
	}
	BlackBerry() {
		return navigator.userAgent.match(/BlackBerry/i);
	}
	iOS() {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	}
	Opera() {
		return navigator.userAgent.match(/Opera Mini/i);
	}
	Windows() {
		return navigator.userAgent.match(/IEMobile/i);
	}
	isMobile() {
		return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
	}
	replaceToInlineSvg(query) {
		let map = new Map();
		const images = document.querySelectorAll(query);
	
		const forEach = (i) => {
			if(i < 0) {
				return
			} else {
				let svg = map.get(images[i].src);
				if (svg) {
					images[i].parentNode.replaceChild(svg.cloneNode(true), images[i]);
					forEach(i - 1)
	
				} else {
					let xhr = new XMLHttpRequest();
					xhr.open('GET', images[i].src);
		
					xhr.onload = () => {
						if (xhr.readyState === xhr.DONE) {
							if (xhr.status === 200) {
								let svg = xhr.responseXML.documentElement;
								images[i].parentNode.replaceChild(svg, images[i]);
		
								map.set(images[i].src, svg);
	
								forEach(i - 1)
							}
						}
					}
					xhr.send(null);
				}
				
			}
		}
	
		forEach(images.length -1);
	}
}
;
// HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
// e.x. data-da=".content__column-garden,992,2"
// https://github.com/FreelancerLifeStyle/dynamic_adapt

class DynamicAdapt {
	constructor(type) {
	  this.type = type;
	}
  
	init() {
	  this.оbjects = [];
	  this.daClassname = '_dynamic_adapt_';
	  this.nodes = [...document.querySelectorAll('[data-da]')];
  
	  this.nodes.forEach((node) => {
		const data = node.dataset.da.trim();
		const dataArray = data.split(',');
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(`${dataArray[0].trim()}`);
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
		оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	  });
  
	  this.arraySort(this.оbjects);
  
	  this.mediaQueries = this.оbjects
		.map(({
		  breakpoint
		}) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
		.filter((item, index, self) => self.indexOf(item) === index);
  
	  this.mediaQueries.forEach((media) => {
		const mediaSplit = media.split(',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];
  
		const оbjectsFilter = this.оbjects.filter(
		  ({
			breakpoint
		  }) => breakpoint === mediaBreakpoint
		);
		matchMedia.addEventListener('change', () => {
		  this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	  });
	}
  
	mediaHandler(matchMedia, оbjects) {
	  if (matchMedia.matches) {
		оbjects.forEach((оbject) => {
		  оbject.index = this.indexInParent(оbject.parent, оbject.element);
		  this.moveTo(оbject.place, оbject.element, оbject.destination);
		});
	  } else {
		оbjects.forEach(
		  ({ parent, element, index }) => {
			if (element.classList.contains(this.daClassname)) {
			  this.moveBack(parent, element, index);
			}
		  }
		);
	  }
	}
  
	moveTo(place, element, destination) {
	  element.classList.add(this.daClassname);
	  if (place === 'last' || place >= destination.children.length) {
		destination.append(element);
		return;
	  }
	  if (place === 'first') {
		destination.prepend(element);
		return;
	  }
	  destination.children[place].before(element);
	}
  
	moveBack(parent, element, index) {
	  element.classList.remove(this.daClassname);
	  if (parent.children[index] !== undefined) {
		parent.children[index].before(element);
	  } else {
		parent.append(element);
	  }
	}
  
	indexInParent(parent, element) {
	  return [...parent.children].indexOf(element);
	}
  
	arraySort(arr) {
	  if (this.type === 'min') {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return -1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return 1;
			}
			return a.place - b.place;
		  }
		  return a.breakpoint - b.breakpoint;
		});
	  } else {
		arr.sort((a, b) => {
		  if (a.breakpoint === b.breakpoint) {
			if (a.place === b.place) {
			  return 0;
			}
			if (a.place === 'first' || b.place === 'last') {
			  return 1;
			}
			if (a.place === 'last' || b.place === 'first') {
			  return -1;
			}
			return b.place - a.place;
		  }
		  return b.breakpoint - a.breakpoint;
		});
		return;
	  }
	}
}
;

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
		let header = document.querySelector('[data-header]');
if (header) {
    let burger = document.querySelector('[data-action="toggle-menu-mobile"]');
    let mobileMenu = document.querySelector('[data-menu-mobile]');
    let mobileMenuNavSubItems = mobileMenu.querySelectorAll('[data-toggle-sab]');


    const burgerBtnAnimationToggle = (burger) => {
        burger.children[0].classList.toggle('burger__cross--first')
        burger.children[1].classList.toggle('burger__cross--second')
        burger.children[2].classList.toggle('burger__cross--third')
        burger.children[3].classList.toggle('burger__cross--fourth')
    }

    // открытие/закрытие моб меню
    burger.addEventListener('click', () => {
        burgerBtnAnimationToggle(burger);
        header.classList.toggle('header--menu-is-open');
        mobileMenu.classList.toggle('menu-mobile--open');
        document.body.classList.toggle('overflow-hidden');
    })

    // обработчик моб саб меню
    mobileMenuNavSubItems.forEach(item => {
        let link = item.querySelector('.menu-mobile__link');
        let subMenu = item.querySelector('.sub-menu');

        if (link && subMenu) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('menu-mobile__list-item--sub-menu-is-open');
                link.classList.toggle('menu-mobile__link--sub-menu-is-open');
                this.utils.slideToggle(subMenu);

                mobileMenuNavSubItems.forEach(i => {
                    if (i === item) return;

                    let link = i.querySelector('.menu-mobile__link');
                    let subMenu = i.querySelector('.sub-menu');

                    i.classList.remove('menu-mobile__list-item--sub-menu-is-open');
                    link.classList.remove('menu-mobile__link--sub-menu-is-open');
                    this.utils.slideUp(subMenu);
                })
            })
        }
    })

    // анимация шапки (header) при скроле
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
    })

};
	}

	popupHandler() {
		// ==== Popup form handler====

const popupLinks = document.querySelectorAll('[data-popup="open-popup"]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('[data-popup="lock-padding"]');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('[data-popup="close-popup"]');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.popup--open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('popup--open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('popup--open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('overflow-hidden');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('[data-popup="add-right-padding"]');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('overflow-hidden');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.popup--open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// добавление API попапа в глобалную видимость
window.popup = {
	open(id) {
		if (!id) return;

		let popup = document.querySelector(id); 

		if (!popup) return;

		popupOpen(popup);
	},
	close(id) {
		if (!id) return;

		let popup = document.querySelector(id);

		if (!popup) return;

		popupClose(popup);
	}
}
;
	}

	slidersInit() {
		let promoHeader = document.querySelector('[data-promo-header]');
if (promoHeader) {
    let header = document.querySelector('[data-header]')
    let textSlider = new Swiper(promoHeader.querySelector('[data-slider="promo-header-text-slider"]'), {
        effect: 'fade',
        speed: 400,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: true,
                speed: 400,
            },
            992: {
                slidesPerView: 1,
                spaceBetween: 0,
                autoHeight: false,
                speed: 100,
            },
        },
    });

    let linksSlider = new Swiper(promoHeader.querySelector('[data-slider="promo-header-links-slider"]'), {
        effect: 'fade',
        touchRatio: 0,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        on: {
            activeIndexChange: (data) => {
                textSlider.slideTo(data.activeIndex);
            }
        }
    });


    let imagesSlider = new Swiper(promoHeader.querySelector('[data-slider="promo-header-images-slider"]'), {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        touchRatio: 0,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        lazy: {
            loadPrevNext: true,
        },
        pagination: {
            el: promoHeader.querySelector('[data-slider-dots]'),
            clickable: true,
        },
        navigation: {
            nextEl: promoHeader.querySelector('[data-action="slider-next"]'),
            prevEl: promoHeader.querySelector('[data-action="slider-prev"]'),
        },

        on: {
            activeIndexChange: (data) => {
                textSlider.slideTo(data.activeIndex);
                linksSlider.slideTo(data.activeIndex);

                if(data.activeIndex === 0) {
                    header.classList.add('header--text-white');
                } else {
                    header.classList.remove('header--text-white');
                }
            },

            afterInit: () => {
                header.classList.add('header--text-white');
            }
        }
    });

    imagesSlider.controller.control = textSlider
    textSlider.controller.control = imagesSlider
};
		let technicalInfo = document.querySelector('[data-technical-info]');
if(technicalInfo) {
    let technicalInfoSlider = new Swiper(technicalInfo.querySelector('[data-slider="technical-info-mob-slider"]'), {
        speed: 800,
        loop: true,
        navigation: {
            nextEl: technicalInfo.querySelector('[data-action="slider-next"]'),
            prevEl: technicalInfo.querySelector('[data-action="slider-prev"]'),
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup: 1,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0,
                slidesPerGroup: 2,
            },
        },
    });
};
		let productPreviewSliderThumbs = document.querySelector('[data-slider="product-preview-slider-thumbs"]');
let productPreviewSliderImages = document.querySelector('[data-slider="product-preview-slider-images"]');
if (productPreviewSliderThumbs && productPreviewSliderImages) {

    let swiperProductPreviewSliderThumbs = new Swiper(productPreviewSliderThumbs, {
        spaceBetween: 12,
        direction: 'vertical',
        slidesPerView: 5,
        slidesPerGroup: 2,
        freeMode: true,
        navigation: {
            nextEl: productPreviewSliderThumbs.querySelector('[data-action="slider-next"]'),
        },
    });

    let swiperProductPreviewSliderImages = new Swiper(productPreviewSliderImages, {
        spaceBetween: 20,
        thumbs: {
            swiper: swiperProductPreviewSliderThumbs
        },
        preloadImages: false,
        lazy: {
            loadOnTranstitionStart: false,
            loadPrevNext: true,
        },
        pagination: {
        	el: productPreviewSliderImages.querySelector('[data-slider-dots]'),
        	clickable: true,
        },
    });
};
		{
    let productDetailsNav = document.querySelector('[data-slider="product-details-nav"]');
    if(productDetailsNav) {
        let swiperProductDetailsNav = new Swiper(productDetailsNav, {
            observer: true,
            observeParents: true,
            slidesPerView: 'auto',
            speed: 800,
            watchOverflow: true,
            watchSlidesVisibility: true,
            freeMode: true,
            slideToClickedSlide: true,
            // breakpoints: {
            //     320: {
            //         spaceBetween: 40,
            //     },
            //     768: {
            //         spaceBetween: 60,
            //     },
            //     992: {
            //         spaceBetween: 80,
            //     },
            //     1268: {
            //         spaceBetween: 100,
            //     },
            //     1686: {
            //         spaceBetween: 120,
            //     },
            // },
        });
    }
};
		{
    let productCarouselSliders = document.querySelectorAll('[data-slider="product-carousel-slider"]');
    if(productCarouselSliders.length) {
        productCarouselSliders.forEach(productCarouselSlider => {
            let swiperProductCarouselSlider = new Swiper(productCarouselSlider.querySelector('.swiper'), {
                speed: 800,
                navigation: {
                    nextEl: productCarouselSlider.querySelector('[data-action="slider-next"]'),
                    prevEl: productCarouselSlider.querySelector('[data-action="slider-prev"]'),
                },
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    992: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    }
                },
            });
        })
    }
};
		{
    let imagesCarousels = document.querySelectorAll('[data-slider="images-carousel"]');
    if (imagesCarousels.length) {
        imagesCarousels.forEach(imagesCarousel => {
            let swiperImagesCarousel = new Swiper(imagesCarousel, {
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 800,
                loop: true,
                preloadImages: false,
                lazy: {
                    loadPrevNext: true,
                },
                pagination: {
                    el: imagesCarousel.querySelector('[data-slider-dots]'),
                    clickable: true,
                },
                navigation: {
                    nextEl: imagesCarousel.querySelector('[data-action="slider-next"]'),
                    prevEl: imagesCarousel.querySelector('[data-action="slider-prev"]'),
                },
            });
        })
    }
};
		{
    let gridBannerSliderAll = document.querySelectorAll('[data-slider="grid-banner"]');
    if (gridBannerSliderAll.length) {
        gridBannerSliderAll.forEach(gridBannerSlider => {
            let swiperGridBannerSlider;

            function mobileSlider() {
                if (document.documentElement.clientWidth <= 767 && gridBannerSlider.dataset.mobile == 'false') {
                    swiperGridBannerSlider = new Swiper(gridBannerSlider, {
                        slidesPerView: 1,
                        speed: 600,
                        spaceBetween: 40,
                        pagination: {
                            el: gridBannerSlider.querySelector('[data-slider-dots]'),
                            clickable: true,
                        },
                    });
    
                    gridBannerSlider.dataset.mobile = 'true';
                }
    
                if (document.documentElement.clientWidth > 767) {
                    gridBannerSlider.dataset.mobile = 'false';
    
                    if (gridBannerSlider.classList.contains('swiper-initialized')) {
                        swiperGridBannerSlider.destroy();
                    }
                }
            }
    
            mobileSlider();
    
            window.addEventListener('resize', () => {
                mobileSlider();
            })
        })
    }
};
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
					triggerItems[0].classList.add('tab-active');
					getContentItem(triggerItems[0].dataset.tabTrigger).classList.add('tab-active');

					triggerItems.forEach(item => {
						item.addEventListener('click', () => {
							item.classList.add('tab-active');
							getContentItem(item.dataset.tabTrigger).classList.add('tab-active');

							triggerItems.forEach(i => {
								if (i === item) return;

								i.classList.remove('tab-active');
								getContentItem(i.dataset.tabTrigger).classList.remove('tab-active');
							})
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
		{
    let timers = document.querySelectorAll('[data-timer]');
    if (timers.length) {

        timers.forEach(timer => {

            function countdown(container, dateEnd) {
                let timer, days, hours, minutes, seconds;
                let hoursEl = container.querySelector(".timer__hours");
                let minutesEl = container.querySelector(".timer__minutes");
                let secondsEl = container.querySelector(".timer__seconds");

                dateEnd = new Date(dateEnd);
                dateEnd = dateEnd.getTime();

                if (isNaN(dateEnd)) {
                    console.log('%c%s', 'color: red;', 'timer error, incorrect date format, use this option - (12/03/2020 02:00:00 AM)')
                    return;
                }
    
                timer = setInterval(calculate, 1000);
    
                function calculate() {
                    let dateStart = new Date();
                    dateStart = new Date(dateStart.getUTCFullYear(),
                        dateStart.getUTCMonth(),
                        dateStart.getUTCDate(),
                        dateStart.getUTCHours(),
                        dateStart.getUTCMinutes(),
                        dateStart.getUTCSeconds());
                    let timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)
    
                    if (timeRemaining >= 0) {
                        // days = parseInt(timeRemaining / 86400);
                        // timeRemaining = (timeRemaining % 86400);
                        hours = parseInt(timeRemaining / 3600);
                        timeRemaining = (timeRemaining % 3600);
                        minutes = parseInt(timeRemaining / 60);
                        timeRemaining = (timeRemaining % 60);
                        seconds = parseInt(timeRemaining);
    
    
                        //document.getElementById("days").innerHTML = parseInt(days, 10);
                        hoursEl.innerHTML = ("0" + hours).slice(-2);
                        minutesEl.innerHTML = ("0" + minutes).slice(-2);
                        secondsEl.innerHTML = ("0" + seconds).slice(-2);
                    } else {
                        return;
                    }
                }
    
                function display(days, hours, minutes, seconds) { }
            }
    
            countdown(timer ,timer.dataset.timer);
        })
    }
};
	}

	uploadFileHandler() {
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
};
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
		function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


const $cookieEl = document.querySelector('[data-cookies-message]');
if ($cookieEl) {
    let closeBtn = document.querySelector('[data-action="cookies-message-close"]');

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        $cookieEl.classList.remove('cookies-message--show');

        document.cookie = encodeURIComponent('hide-cookie') + "=" + encodeURIComponent('true') + "; path=/; max-age=86400";
    })


    if (!getCookie('hide-cookie')) {
        setTimeout(() => {
            $cookieEl.classList.add('cookies-message--show');
        }, 1000);
    }

};
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
};
		{
    let quantityAll = document.querySelectorAll('[data-quantity]');
    if (quantityAll.length) {
        quantityAll.forEach(quantity => {
            let input = quantity.querySelector('.quantity__input');
            let minus = quantity.querySelector('.quantity__btn--minus');
            let plus = quantity.querySelector('.quantity__btn--plus');

            input.addEventListener('input', (e) => {
                if (!e.target.value.trim()) return;


                // возможность вводить только цифры 
                Inputmask('9{*}', {
                    clearIncomplete: true,
                    clearMaskOnLostFocus: true,
                }).mask(input);


                // убирает возможность ввести меньше 1
                if (e.target.value < 1) {
                    if (e.target.value < 1 && e.target.value.trim()) {
                        e.target.value = 1;
                    }
                }
            })

            input.addEventListener('blur', (e) => {
                if (e.target.value < 1) {
                    input.value = 1;
                }
            })

            plus.addEventListener('click', () => {
                input.value++;
            })
            minus.addEventListener('click', () => {
                if(input.value <= 1) return;

                input.value--;
            })
        })
    }
};
		{
    let ratings = document.querySelectorAll('[data-rating]');
    if(ratings.length) {
        ratings.forEach(rating => {
            let count = rating.dataset.rating > 5 ? 5
                        : rating.dataset.rating ? rating.dataset.rating
                        : 0;
            let stars = rating.querySelectorAll('.rating__star');

            for(let i = 0; i < count; i++) {
                stars[i].classList.add('rating__star--active');
            }
        })
    }
};
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
};
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
                    if(scrollWrap.nextElementSibling.classList.contains('table-default')) {
                        if(scrollWrap.nextElementSibling.hasAttribute('data-table-show-first-lines')) return;
                        scrollWrap.nextElementSibling.classList.add('in-scroll-wrap')
                        scrollWrap.append(scrollWrap.nextElementSibling);
                        appendTable();
                    } else {
                        return;
                    }
                }

                appendTable();
            }
        })
    }
};
	}

}

window.addEventListener('DOMContentLoaded', function () {
	let app = new App();
	app.init();
});  

