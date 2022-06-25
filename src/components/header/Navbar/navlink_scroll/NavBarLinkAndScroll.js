
// НУЖНО ПЕРЕДАТЬ ЭЛЕМЕНТ NAVBAR
// РЕКОМЕНДУЕТСЯ САМИМ ССЫЛКАМ НУЖНО ПРОПИСАТЬ КЛАСС .nav_link
// НУЖНО СВЯЗАТЬ href ССЫЛКИ И id ЭЛЕМЕНТА К КОТОРОМУ НУЖНО ПЕРЕЙТИ ПО СКРОЛЛУ
// САМ ПЕРЕХОД БУДЕТ ОСНОВАН НА ПОИСКЕ В document ЭЛЕМЕНТА ПО id ЧТО ПРОПИСАН В ПОЛЕ href

// СОСТОЯНИЕ ВИДИМОСТИ БЛОКА header ЗАВИСИТ ОТ АРХИТЕКТУРЫ ПРИЛОЖЕНИЯ, К ПРИМЕРУ react ИЛИ ООП
// РЕКОМЕНДУЮ ИСПОЛЬЗОВАТЬ У ЭЛЕМЕНТА header АТРИБУТ hidden ДЛЯ СКРЫТИЯ ЕГО, ТАК ЛЕГЧЕ ОТСЛЕДИТЬ ЕГО ВИДИМОСТЬ ИЗ ДАННОГО КЛАССА !!!

// ОБЪЕКТ options ПРИНИМАЕТ В СЕБЯ НАЧАЛЬНЫЕ ПАРАМЕТРЫ НАСТРОЙКИ, ЕГО ПАРАМЕТРЫ ЗАДАЮТСЯ ВНУТРИ constructor 

import styles from './NavBarLinkAndScroll.module.scss';

class NavBarLinkAndScroll {
	#options = null;

	#navBarElement = null;
	#definingSelectorForNavLink = null; // ВОТ СЮДА ПРОПИСЫВАЕТСЯ КЛАСС КОТОРЫЙ УКАЗАН У ТЕГА ССЫЛКИ <a>

	#headerElement = null;
	#heightHeaderElement = null;

	constructor (navBarElement, navLinkClassSelector, headerElement, options) {
		this.#options = {
			fadingHeader: false,

		};
		if (options !== undefined) {
			if (typeof options !== 'object') {
				throw new Error('Некорректные данные, ожидаются данные типа Object')
			}
			this.#options = Object.assign(this.#options, options);
		}

		this.#navBarElement = navBarElement;
		this.#definingSelectorForNavLink = navLinkClassSelector;
		document.addEventListener('click', this.#navLinkClickHandler);

		this.#headerElement = headerElement;
		this.#heightHeaderElement = this.#headerElement.getBoundingClientRect().height;

	}

	#navLinkClickHandler = (evt) => {
		evt.preventDefault();
		const targetElement = evt.target;

		if (!targetElement.closest(`.${this.#definingSelectorForNavLink}`)) {
			return;
		}

		const anchorHref = targetElement.href;
		const anchorId = anchorHref.slice(anchorHref.indexOf('/#') + 2);
		const elementById = document.querySelector(`#${anchorId}`);

		const deltaPageYAndElementClientY = Math.abs(window.pageYOffset + elementById.getBoundingClientRect().top);

		if (this.#options.fadingHeader === true) {
			const distanceToTopScreenY = elementById.getBoundingClientRect().top;

			if (distanceToTopScreenY < 0) {
				window.scrollTo(0, deltaPageYAndElementClientY - this.#heightHeaderElement);
			} else {
				window.scrollTo(0, deltaPageYAndElementClientY);
			}
		} else if (this.#options.fadingHeader === false) {
			window.scrollTo(0, deltaPageYAndElementClientY - this.#heightHeaderElement);
		}	
	};


}

export {NavBarLinkAndScroll};
