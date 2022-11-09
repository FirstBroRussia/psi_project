// В ЗАВИСИМОСТИ ОТ АРХИТЕКТУРЫ СОСТОЯНИЕ ВИДИМОСТИ БЛОКА header БУДЕТ ХРАНИТЬСЯ И ПЕРЕДАВАТЬСЯ ПО РАЗНОМУ
// НАПРИМЕР В react ЭТО ДЕЛАЕТСЯ ЧЕРЕЗ СОСТОЯНИЕ, К ПРИМЕРУ redux

// ОБЪЕКТ options ПРИНИМАЕТ В СЕБЯ НАЧАЛЬНЫЕ ПАРАМЕТРЫ НАСТРОЙКИ, ЕГО ПАРАМЕТРЫ ЗАДАЮТСЯ ВНУТРИ constructor 

// В ДАННОМ СЛУЧАЕ СДЕЛАЕМ ИСЧЕЗНОВЕНИЕ БЛОКА ПО СКРОЛУ ВНИЗ, А ЕГО БЫСТРОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ВВЕРХ


import styles from './HeaderControl.module.scss';

import {store} from '../../store/store';

const ONE_VALUE = 1;


export default class HeaderControl {
	#options = null;

	#scrollElement = null;

	#headerElement = null;

	#widthViewport = null;

	#currentCoordinatePageY = null;


	constructor (headerElement, options) {
		this.#options = {
			fadingHeader: false,
			headerType: null,
		};
		if (options !== undefined) {
			if (typeof options !== 'object') {
				throw new Error('Некорректные данные, ожидаются данные типа Object')
			}
			this.#options = Object.assign(this.#options, options);
		}

		this.#headerElement = headerElement;

		this.#currentCoordinatePageY = window.pageYOffset || window.scrollY;
		document.addEventListener('scroll', this.#documentScrollHandler);
	}

	#documentScrollHandler = () => {
		if (this.#options.fadingHeader === false) {
			return;
		}

		const deltaCoordinatePageY = window.pageYOffset - this.#currentCoordinatePageY;

		const isLockScroll = store.getState().reducer.isLockScroll;

	    // CUSTOM ACTION
		if (isLockScroll) {
			return;
		}
		//-------

		const widthViewport = store.getState().reducer.widthViewport;

		if (this.#options.headerType === 'mobile' || widthViewport < 690) {
		    this.#headerElement.hidden && (this.#headerElement.hidden = false);
			return;
		}

		if (deltaCoordinatePageY > 0) {
			this.#headerElement.hidden = true;
		} else {
			this.#headerElement.hidden = false;
		}

		this.#currentCoordinatePageY = window.pageYOffset || window.scrollY;

		this.#setHeaderElementBackgroundOpacity();
	};

	setHeaderType = (type) => {
		this.#options.headerType = type;
	};

	#setHeaderElementBackgroundOpacity = () => {
		if (!store.getState().reducer.blockOneRef) {
			return;
		}

		const heightBlockOneElement = store.getState().reducer.blockOneRef.getBoundingClientRect().height;
		
		if (this.#currentCoordinatePageY > (heightBlockOneElement - this.#headerElement.getBoundingClientRect().height)) {
			this.#headerElement.classList.add(styles.background_opacity);
		} else {
			this.#headerElement.classList.remove(styles.background_opacity);
		}
	};
}

