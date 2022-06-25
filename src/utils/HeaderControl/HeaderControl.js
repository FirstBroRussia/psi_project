// В ЗАВИСИМОСТИ ОТ АРХИТЕКТУРЫ СОСТОЯНИЕ ВИДИМОСТИ БЛОКА header БУДЕТ ХРАНИТЬСЯ И ПЕРЕДАВАТЬСЯ ПО РАЗНОМУ
// НАПРИМЕР В react ЭТО ДЕЛАЕТСЯ ЧЕРЕЗ СОСТОЯНИЕ, К ПРИМЕРУ redux

// ОБЪЕКТ options ПРИНИМАЕТ В СЕБЯ НАЧАЛЬНЫЕ ПАРАМЕТРЫ НАСТРОЙКИ, ЕГО ПАРАМЕТРЫ ЗАДАЮТСЯ ВНУТРИ constructor 

// В ДАННОМ СЛУЧАЕ СДЕЛАЕМ ИСЧЕЗНОВЕНИЕ БЛОКА ПО СКРОЛУ ВНИЗ, А ЕГО БЫСТРОЕ ПОЯВЛЕНИЕ ПРИ СКРОЛЛЕ ВВЕРХ


import styles from './HeaderControl.module.scss';

const ONE_VALUE = 1;


export default class HeaderControl {
	#options = null;

	#headerElement = null;

	#widthViewport = null;

	#currentCoordinatePageY = null;

	constructor (headerElement, options) {
		this.#options = {
			fadingHeader: false,

		};
		if (options !== undefined) {
			if (typeof options !== 'object') {
				throw new Error('Некорректные данные, ожидаются данные типа Object')
			}
			this.#options = Object.assign(this.#options, options);
		}

		this.#headerElement = headerElement;

		this.#widthViewport = Math.max(
			document.body.scrollWidth, document.documentElement.scrollWidth,
			document.body.offsetWidth, document.documentElement.offsetWidth,
			document.body.clientWidth, document.documentElement.clientWidth
		);

		this.#currentCoordinatePageY = window.pageYOffset;
		document.addEventListener('scroll', this.#documentScrollHandler)

	}

	#documentScrollHandler = () => {
		if (this.#options.fadingHeader === false) {
			return;
		}

		const deltaCoordinatePageY = window.pageYOffset - this.#currentCoordinatePageY;
		const currentOpacityHeaderElement = Number(window.getComputedStyle(this.#headerElement).opacity);
		
		if (deltaCoordinatePageY > 0) {
			const opacity = currentOpacityHeaderElement - 0.2;
			this.#headerElement.style.opacity = opacity;
			if (opacity <= 0) {
				this.#headerElement.hidden = true;
			}
		} else {
			if (currentOpacityHeaderElement <= 0) {
				this.#headerElement.hidden = false;
			}
			this.#headerElement.style.opacity = ONE_VALUE;
		}

		this.#currentCoordinatePageY = window.pageYOffset;
	};
}

