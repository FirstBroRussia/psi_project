
// НУЖНО ПЕРЕДАТЬ ЭЛЕМЕНТ NAVBAR
// РЕКОМЕНДУЕТСЯ САМИМ ССЫЛКАМ НУЖНО ПРОПИСАТЬ КЛАСС .nav_link
// НУЖНО СВЯЗАТЬ href ССЫЛКИ И id ЭЛЕМЕНТА К КОТОРОМУ НУЖНО ПЕРЕЙТИ ПО СКРОЛЛУ
// САМ ПЕРЕХОД БУДЕТ ОСНОВАН НА ПОИСКЕ В document ЭЛЕМЕНТА ПО id ЧТО ПРОПИСАН В ПОЛЕ href

// СОСТОЯНИЕ ВИДИМОСТИ БЛОКА header ЗАВИСИТ ОТ АРХИТЕКТУРЫ ПРИЛОЖЕНИЯ, К ПРИМЕРУ react ИЛИ ООП
// РЕКОМЕНДУЮ ИСПОЛЬЗОВАТЬ У ЭЛЕМЕНТА header АТРИБУТ hidden ДЛЯ СКРЫТИЯ ЕГО, ТАК ЛЕГЧЕ ОТСЛЕДИТЬ ЕГО ВИДИМОСТЬ ИЗ ДАННОГО КЛАССА !!!

// ОБЪЕКТ options ПРИНИМАЕТ В СЕБЯ НАЧАЛЬНЫЕ ПАРАМЕТРЫ НАСТРОЙКИ, ЕГО ПАРАМЕТРЫ ЗАДАЮТСЯ ВНУТРИ constructor 

import styles from './NavBarLinkAndScroll.module.scss';

import {store} from '../../../../store/store';
import {setIsOpenMobileMenuAction} from '../../../../store/reducer';

class NavBarLinkAndScroll {
	#options = null;

	#navBarElement = null;
	#definingSelectorForNavLink = null; // ВОТ СЮДА ПРОПИСЫВАЕТСЯ КЛАСС КОТОРЫЙ УКАЗАН У ТЕГА ССЫЛКИ <a>

	#headerElement = null;
	#heightHeaderElement = null;

	#headerElementRefMutationObserver = null;

	constructor (navBarElement, navLinkClassSelector, options) {
		this.#options = {
			fadingHeader: false,
			navbarType: null,
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
	}

	setHeaderElement = (headerElement) => {
		if (headerElement) {
		  this.#headerElement = headerElement;
		} else {
		  this.#headerElement = store.getState().reducer.headerElement;
		}

		this.#heightHeaderElement = this.#headerElement.getBoundingClientRect().height;
	};


	#navLinkClickHandler = async (evt) => {
		evt.preventDefault();
		
		if (!this.#headerElement) {
			this.setHeaderElement();
		}

		const targetElement = evt.target;

		if (!targetElement.closest(`.${this.#definingSelectorForNavLink}`)) {
			return;
		}

		const anchorHref = targetElement.getAttribute('href');
		const elementById = document.querySelector(`${anchorHref}`);

		const distanceToTopScreenY = elementById.getBoundingClientRect().top;
		const deltaPageYAndElementClientY = Math.abs(window.pageYOffset + distanceToTopScreenY);
		
		const widthViewport = store.getState().reducer.widthViewport;

		if (this.#options.navbarType === 'mobile' || widthViewport < 690) {
		  await store.dispatch(setIsOpenMobileMenuAction(false));
		  await new Promise (resolve => setTimeout(() => resolve(this.#heightHeaderElement = this.#headerElement.getBoundingClientRect().height), 0));
		  window.scrollTo(0, deltaPageYAndElementClientY - this.#heightHeaderElement);
			
		  return;
		}

		this.#headerElement.hidden && (this.#headerElement.hidden = false);
		await new Promise (resolve => setTimeout(() => resolve(this.#heightHeaderElement = this.#headerElement.getBoundingClientRect().height), 0));

		if (distanceToTopScreenY < 0) {
			window.scrollTo(0, deltaPageYAndElementClientY - this.#heightHeaderElement);
		} else {
			window.scrollTo(0, deltaPageYAndElementClientY);
		}
	};

	setNavbarType = (navbarType) => {
		this.#options.navbarType = navbarType;
	};
}

export {NavBarLinkAndScroll};
