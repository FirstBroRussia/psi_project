// ЭТО КОМПОНЕНТ КНОПКИ ПРИ НАЖАТИИ НА КОТОРУЮ ВАША СТРАНИЦА СКРОЛИТСЯ НА САМЫЙ ВЕРХ
// КАСТОМНЫЕ СТИЛИ КНОПКИ ВЫ МОЖЕТЕ ЗАДАТЬ САМИ ЛЮБЫМ ИЗВЕСТНЫМ СПОСОБОМ

// РЕКОМЕНДУЮ ИСПОЛЬЗОВАТЬ SVG В ВИДЕ ИЗОБРАЖЕНИЯ КНОПКИ
// В ДАННОМ СЛУЧАЕ СДЕЛАН SVG ЭЛЕМЕНТ С НАЧАЛЬНЫМИ ПЕРЕДАННЫМИ ЕМУ РАЗМЕРАМИ ПРИ ИНИЦИАЛИЗАЦИИ КОМПОНЕНТА

import styles from './ScrollUpButton.module.scss';

const RATIO_SIZE_BUTTON = 10;

const HEIGHT_VALUE = 200;


export default class ScrollUpButton {
	#parentElement = null;
	#scrollUpButton = null;

	#currentSizesViewport = null;

	#footerElement = null;
	#footerElementHeight = null;
	#footerElementRefMutationObserver = null;

	#isPageEndVisibleScrollUpButton = false;


	constructor (footerElement) {
		this.#parentElement = document.querySelector('html');
		
		window.addEventListener('resize', this.#viewportResizeHandler);
		document.addEventListener('scroll', this.#documentScrollHandler);
		
		this.#currentSizesViewport = this.#getSizesViewport();

		const widthButton = this.#currentSizesViewport.width / RATIO_SIZE_BUTTON;
		const heightButton = this.#currentSizesViewport.height / RATIO_SIZE_BUTTON;
		
		this.#scrollUpButton = this.#createNodeElement(this.#customButtonSvg());
		this.#scrollUpButton.setAttribute('class', `${styles.scroll_up_button}`);
		this.#scrollUpButton.style.width = `${widthButton}px`;
		this.#scrollUpButton.style.height = `${heightButton}px`;
		this.#scrollUpButton.addEventListener('click', this.#scrollUpButtonClickHandler);
		this.#parentElement.appendChild(this.#scrollUpButton);

		if (window.pageYOffset < HEIGHT_VALUE) {
			this.#scrollUpButton.style.display = 'none';
		}

		if (!footerElement) {
			return;
		}
		this.setFooterElement(footerElement);

	}

	#mutationObserverCallback = (evt) => {
		this.#footerElement = evt[0].target;
		this.#footerElementHeight = this.#footerElement.getBoundingClientRect().height;
	};

	#customButtonSvg = () => `
		<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
		<rect width="100" height="100" fill="#D9D9D9" fill-opacity="0.6"/>
		<path d="M90 64.9376L88.7348 67.121L49.4609 34.9826C48.9216 34.5413 48.7676 33.6947 49.117 33.0918C49.4664 32.4888 50.1868 32.3578 50.7261 32.7991L90 64.9376Z" fill="#333399"/>
		<path d="M11.2651 67.2L9.99996 65.0165L49.2739 32.8781C49.8132 32.4368 50.5336 32.5678 50.883 33.1707C51.2323 33.7737 51.0784 34.6202 50.5391 35.0616L11.2651 67.2Z" fill="#333399"/>
		</svg>
	`;

	#createNodeElement = (htmlCode) => {
		const newElement = document.createElement('div');
		newElement.insertAdjacentHTML('afterbegin', htmlCode);
		const nodeElement = newElement.firstElementChild;
	
		return nodeElement;
	};

	#getSizesViewport = () => {
		return {
			width: window.innerWidth,
			height: window.innerHeight,
		}
	};

	#getOrientationScreen = () => {
		const widthViewport = window.innerWidth;
		const heightViewport = window.innerHeight;
		const ratioWidthAndHeight = widthViewport / heightViewport;
	
		if (ratioWidthAndHeight > 1) {
			return 'landscape';
		}
		if (ratioWidthAndHeight < 1) {
			return 'portrait';
		} else{
			return 'square';
		}
	
	};

	#viewportResizeHandler = () => {
		this.#currentSizesViewport = this.#getSizesViewport();

		const widthButton = this.#currentSizesViewport.width / RATIO_SIZE_BUTTON;
		const heightButton = this.#currentSizesViewport.height / RATIO_SIZE_BUTTON;

		this.#scrollUpButton.style.width = `${widthButton}px`;
		this.#scrollUpButton.style.height = `${heightButton}px`;
	};

	#documentScrollHandler = () => {
		if (window.pageYOffset > HEIGHT_VALUE) {
			this.#scrollUpButton.style.display = 'block';
		} else {
			this.#scrollUpButton.style.display = 'none';
		}

		if (this.#isPageEndVisibleScrollUpButton || !this.#footerElement) {
			return;
		}

		const screenHeight = window.screen.availHeight;
		this.#footerElementHeight = this.#footerElement.getBoundingClientRect().height;
		const documentHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);
		const currentScrollHeight = window.pageYOffset + screenHeight;
		
		if (currentScrollHeight >= documentHeight - this.#footerElementHeight) {
			this.#scrollUpButton.style.display = 'none';
		} else if (window.pageYOffset > HEIGHT_VALUE) {
			this.#scrollUpButton.style.display = 'block';
		}
	};

	#scrollUpButtonClickHandler = () => {
		window.scrollTo(0, 0);
	};

	setFooterElement = (footerElement) => {
		if (!footerElement) {
			return;
		}

		this.#footerElement = footerElement;
		this.#footerElementRefMutationObserver = new MutationObserver(this.#mutationObserverCallback);
		this.#footerElementRefMutationObserver.observe(this.#footerElement, {
			childList: true,
		});
	};

	hiddenScrollUpButton = () => {
		this.#scrollUpButton.style.display = 'none';
		document.removeEventListener('scroll', this.#documentScrollHandler);
	};

	visibleScrollUpButton = () => {
		this.#documentScrollHandler();
		document.addEventListener('scroll', this.#documentScrollHandler);
	};

	isPageEndVisibleScrollUpButton = (boolean) => {
		this.#isPageEndVisibleScrollUpButton = boolean;
	};

}
