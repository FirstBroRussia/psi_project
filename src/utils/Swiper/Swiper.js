import styles from './swiper.module.scss';

import {store} from '../../store/store';

const ZERO_VALUE = 0;
const ONE_VALUE = 1;

const MAX_CHANGE_COORDINATE_FOR_CANCELLING_CLICK = 3;
const CHANGE_COORDINATE_AND_WIDTH_PARENT_BLOCK_RATIO = 0.3;
const DEBOUNCE_TIME_FREEZE = 50;
// const TIMEOUT_TRANSFORM_TRANSITION = 300;

function debounceFn () {
	let setTimeoutFn = null;
	
	return (callback, timeFreeze) => {
		if (setTimeoutFn !== null) {
			clearTimeout(setTimeoutFn);
		}
		setTimeoutFn = setTimeout(callback, timeFreeze);
	};
};

const debounce = debounceFn();

const ArrowClickEvent = {
	Back: 'back',
	Forward: 'forward',
};

const MouseEvents = {
	Down: 'down',
	Up: 'up',
};

const SideRubberEvents = {
	Left: 'left',
	Right: 'right',
};

const TouchEvents = {
	TouchStart: 'touchstart',
	TouchMove: 'touchmove',
	TouchEnd: 'touchend',
};


// Кастомный вид опций для класса Slider, ЭТО ОБЪЕКТ!!!
const Options = {
	nextjs : [true, false], // Два значения!!!
};
//


export default class Swiper {
  #options = null;

  #container = null;
  #dataArray = null;

  #swiperBLock = null;
  #arrowLeft = null;
  #arrowRight = null;
  #contentBlock = null;
  #contentWrapper = null;
  #fullScreenImageBlock = null;
  #closeFullScreenImageBlockButton = null;

  #elementsCount = null;
  #currentNumberVisibleElement = null;
  #currentVisibleElement = null;

  #widthContentBlock = null;
  #heightContentBlock = null;

  #widthContentWrapper = null;
  #heightContentWrapper = null;

  #widthCursor = null;
  #heightCursor = null;

  #isMovingContentWrapper = false;

  #isMouseDownInContentBlock = false;

  #prevCoordinateAxisOXPointerInContentBlock = null;
  #prevCoordinateAxisOYPointerInContentBlock = null;
  #currentCoordinateAxisOXPointerInContentBlock = null;
  #currentCoordinateAxisOYPointerInContentBlock = null;
  #currentCoordinateAxisOXPointerDownInContentBlock = null;
  #currentCoordinateAxisOYPointerDownInContentBlock = null;
  #currentCoordinateAxisOXPointerUpInContentBlock = null;
  #currentCoordinateAxisOYPointerUpInContentBlock = null;

  #isScrollPage = null;
  #primaryPrevCoordinateAxisOXPointerInSwiperBlock = null;
  #primaryPrevCoordinateAxisOYPointerInSwiperBlock = null;
  #prevCoordinateAxisOXPointerInSwiperBlock = null;
  #prevCoordinateAxisOYPointerInSwiperBlock = null;
  #currentCoordinateAxisOXPointerInSwiperBlock = null;
  #currentCoordinateAxisOYPointerInSwiperBlock = null;

  #currentTimePointerDownInContentBlock = null;
  #currentTimePointerUpInContentBlock = null;

  #defaultChildCoordinateAxisOX = null;
  #intermediateChildCoordinateAxisOX = null;

  #isRubberSwipe = false;
  #sideRubberEvent = null;

  #arrowTouchStartCoordinate = null;
  #arrowChangeTouchStartCoordinate = null;

  #realTimeClickAction = false;

  #swiperBlockResizeHandler = () => {
	this.#contentWrapper.style.transition = '';

	const parentBlockRect = this.#contentBlock.getBoundingClientRect();
	const width = parentBlockRect.width;
	const height = parentBlockRect.height;

	if (this.#widthContentBlock !== width) {
		this.#widthContentBlock = width;
		this.#widthContentWrapper = this.#contentWrapper.style.width = `${this.#widthContentBlock * this.#elementsCount}px`;
	}
	if (this.#heightContentBlock !== height) {
		this.#heightContentBlock = height;
		this.#heightContentWrapper = this.#contentWrapper.style.height = `${this.#heightContentBlock}px`;
	}

	const childElements = this.#contentWrapper.querySelectorAll(`.${styles.image_wrapper}`);
	childElements.forEach((item) => {
		item.style.width = `${width}px`;
		item.style.height = `${height}px`;
	});

	this.#contentWrapper.style.transform = `translateX(-${this.#widthContentBlock * this.#currentNumberVisibleElement}px)`;
  };

  #renderImageItem = (data) => {
	const imageElement = document.createElement('img');
	imageElement.setAttribute('class', `${styles.image}`);
	imageElement.setAttribute('width', 'auto');
	imageElement.setAttribute('height', 'auto');
	imageElement.setAttribute('src', data);
	imageElement.setAttribute('alt', 'Изображение');
	imageElement.setAttribute('draggable', 'false');
	
	const imageWrapper = document.createElement('div');
	imageWrapper.setAttribute('class', `${styles.image_wrapper}`);
	const widthParentBlock = this.#contentBlock.getBoundingClientRect().width;
	const heightParentBlock = this.#contentBlock.getBoundingClientRect().height;
	imageWrapper.style.width = `${widthParentBlock}px`;
	imageWrapper.style.height = `${heightParentBlock}px`;
	imageWrapper.appendChild(imageElement);

	return imageWrapper;
  }


  #arrowClickHandler = (evt) => {
	// if (evt.type === 'click' && evt.pointerType === 'touch') {
	// 	return;
	// }
		
	const targetElement = evt.target;
	this.#contentWrapper.style.transition = 'transform .3s ease-in-out';

	if (targetElement.getAttribute('data-item') === ArrowClickEvent.Forward) {
		if (this.#currentNumberVisibleElement === this.#elementsCount - ONE_VALUE) {
			return;
		}

		this.#arrowLeft.classList.remove(`${styles.arrow_disabled}`);
		this.#currentNumberVisibleElement += ONE_VALUE;

		if (this.#currentNumberVisibleElement === this.#elementsCount - ONE_VALUE) {
			this.#arrowRight.classList.toggle(`${styles.arrow_disabled}`);
		}
	}
	if (targetElement.getAttribute('data-item') === ArrowClickEvent.Back) {
		if (this.#currentNumberVisibleElement === ZERO_VALUE) {
			return;
		}

		this.#arrowRight.classList.remove(`${styles.arrow_disabled}`);
		this.#currentNumberVisibleElement -= ONE_VALUE;

		if (this.#currentNumberVisibleElement === ZERO_VALUE) {
			this.#arrowLeft.classList.toggle(`${styles.arrow_disabled}`);
		}
	}

	const changeCoordinate = Number(this.#widthContentBlock * this.#currentNumberVisibleElement);
	this.#contentWrapper.style.transform = `translateX(-${changeCoordinate}px)`;
	this.#defaultChildCoordinateAxisOX = Number(-changeCoordinate);

	// setTimeout(() => {this.#realTimeClickAction = false;}, 500);
  };

  #createFullScreenReviewImage = (targetImageElement) => {
	const imageElement = document.createElement('img');
	imageElement.setAttribute('alt', 'Изображение');
	imageElement.setAttribute('src', `${targetImageElement.getAttribute('src')}`);
	imageElement.setAttribute('class', `${styles.full_screen_image}`);
	this.#fullScreenImageBlock.appendChild(imageElement);
	this.#fullScreenImageBlock.appendChild(this.#closeFullScreenImageBlockButton);
	document.querySelector('html').style.overflow = 'hidden';
	document.querySelector('body').appendChild(this.#fullScreenImageBlock);

	store.getState().reducer.ScrollUpButtonClass.hiddenScrollUpButton();
  };

  #imageContentClickHandler = (evt) => {
	if (!this.#options.swipe) {
		const imageList = evt.target.querySelectorAll(`.${styles.image}`);
		const targetElement = imageList[this.#currentNumberVisibleElement];
		this.#createFullScreenReviewImage(targetElement);

		return;
	}

	const changeCoordinatesOX = Math.abs(this.#currentCoordinateAxisOXPointerDownInContentBlock - this.#currentCoordinateAxisOXPointerUpInContentBlock);
	const changeCoordinatesOY = Math.abs(this.#currentCoordinateAxisOYPointerDownInContentBlock - this.#currentCoordinateAxisOYPointerUpInContentBlock);
	
	if (!evt.target.closest(`.${styles.image}`) || changeCoordinatesOX >= MAX_CHANGE_COORDINATE_FOR_CANCELLING_CLICK || changeCoordinatesOY >= MAX_CHANGE_COORDINATE_FOR_CANCELLING_CLICK || evt.pointerType === 'touch') {
		return;
	}
	const targetImageElement = evt.target.closest(`.${styles.image}`);
	this.#createFullScreenReviewImage(targetImageElement);
  };

  #closeFullScreenImageClickHandler = () => {
	this.#fullScreenImageBlock.innerHTML = '';
	document.querySelector('html').style.overflow = 'auto';
	document.querySelector('body').removeChild(this.#fullScreenImageBlock);

	store.getState().reducer.ScrollUpButtonClass.visibleScrollUpButton();
  };

  #setCurrentCoordinateAxisCursor = (evt) => {
	let currentCoordinateCursorAxisOX;
	let currentCoordinateCursorAxisOY;

	if (evt.type.startsWith('touch')) {
		currentCoordinateCursorAxisOX = evt.changedTouches[0].pageX;
		currentCoordinateCursorAxisOY = evt.changedTouches[0].pageY;
	} else {
		currentCoordinateCursorAxisOX = evt.pageX;
		currentCoordinateCursorAxisOY = evt.pageY;
	}

	const currentCoordinateParentBlockAxisOX = this.#contentBlock.getBoundingClientRect().left;
	const currentCoordinateParentBlockAxisOY = this.#contentBlock.getBoundingClientRect().top;
	const cursorCoordinateAxisOXRegardingParentBlock = currentCoordinateCursorAxisOX - currentCoordinateParentBlockAxisOX;
	const cursorCoordinateAxisOYRegardingParentBlock = currentCoordinateCursorAxisOY - currentCoordinateParentBlockAxisOY;

	if (evt.type === 'pointerdown' || evt.type === 'touchstart') {
		this.#currentCoordinateAxisOXPointerDownInContentBlock = cursorCoordinateAxisOXRegardingParentBlock;
		this.#currentCoordinateAxisOYPointerDownInContentBlock = cursorCoordinateAxisOYRegardingParentBlock;
	}
	if (evt.type === 'pointerup' || evt.type === 'touchend') {
		this.#currentCoordinateAxisOXPointerUpInContentBlock = cursorCoordinateAxisOXRegardingParentBlock;
		this.#currentCoordinateAxisOYPointerUpInContentBlock = cursorCoordinateAxisOYRegardingParentBlock;
	}
	if (evt.type === 'pointermove') {
		this.#currentCoordinateAxisOXPointerInContentBlock = cursorCoordinateAxisOXRegardingParentBlock;
		this.#currentCoordinateAxisOYPointerInContentBlock = cursorCoordinateAxisOYRegardingParentBlock;
	}
	if (evt.type === 'pointerdown' && evt.pointerType === 'touch') {
		this.#currentCoordinateAxisOXPointerInContentBlock = cursorCoordinateAxisOXRegardingParentBlock;
		this.#currentCoordinateAxisOYPointerInContentBlock = cursorCoordinateAxisOYRegardingParentBlock;
	}
  };

  #setCurrentTimePointerUoAndDown = (evt) => {
	if (evt.type === 'pointerdown' || evt.type === 'touchstart') {
		this.#currentTimePointerDownInContentBlock = Date.now();
	}
	if (evt.type === 'pointerup' || evt.type === 'touchend') {
		this.#currentTimePointerUpInContentBlock = Date.now();
	}
  };

  #rubberSwiper = () => {
	this.#contentWrapper.style.transition = 'transform .3s ease-in-out';

	if (this.#sideRubberEvent === SideRubberEvents.Right) {
		const parentWidth = this.#contentBlock.getBoundingClientRect().width;
		const childWidth = this.#contentWrapper.getBoundingClientRect().width;
		const changeCoordinate = childWidth - parentWidth;
		this.#contentWrapper.style.transform = `translateX(-${changeCoordinate}px)`;
		this.#defaultChildCoordinateAxisOX = Number(-changeCoordinate);
	}
	if (this.#sideRubberEvent === SideRubberEvents.Left) {
		this.#contentWrapper.style.transform = `translateX(${ZERO_VALUE}px)`;
		this.#defaultChildCoordinateAxisOX = ZERO_VALUE;
	}

	this.#sideRubberEvent = null;
  };

  #movingContentWrapperBySwipe = () => {
	this.#contentWrapper.style.transition = 'transform .3s ease-in-out';

	const changeFastMovingTime = this.#currentTimePointerUpInContentBlock - this.#currentTimePointerDownInContentBlock;
	const deltaOX = this.#currentCoordinateAxisOXPointerDownInContentBlock - this.#currentCoordinateAxisOXPointerUpInContentBlock;

	if (changeFastMovingTime < 200 && Math.abs(deltaOX) > 0.05 * this.#widthContentBlock) {
		if (deltaOX > 0) {
			this.#arrowRight.click();
		} 
		if (deltaOX < 0) {
			this.#arrowLeft.click();
		}

		this.#isMovingContentWrapper = false;
		return;
	}

	if (Math.abs(deltaOX) > CHANGE_COORDINATE_AND_WIDTH_PARENT_BLOCK_RATIO * this.#widthContentBlock) {
		if (deltaOX > 0) {
			this.#arrowRight.click();
		} 
		if (deltaOX < 0) {
			this.#arrowLeft.click();
		}

		this.#isMovingContentWrapper = false;
		return;
	}

	const changeCoordinate = Number(this.#widthContentBlock * this.#currentNumberVisibleElement);
	this.#contentWrapper.style.transform = `translateX(-${changeCoordinate}px)`;
	this.#defaultChildCoordinateAxisOX = Number(-changeCoordinate);
	this.#isMovingContentWrapper = false;
  };

  #contentBlockPointerMoveHandler = (evt) => {
	this.#isMovingContentWrapper = false;

	this.#prevCoordinateAxisOXPointerInContentBlock = this.#currentCoordinateAxisOXPointerInContentBlock;
	this.#setCurrentCoordinateAxisCursor(evt);

	if (!this.#options.swipe) {
		return;
	}
	
	const parentWidth = this.#contentBlock.getBoundingClientRect().width;
	const borderWidthParentBlock = Number(window.getComputedStyle(this.#contentBlock).borderWidth.replace(/px/g, ''));
	const childWidth = this.#contentWrapper.getBoundingClientRect().width;
	const parentCoordinateAxisOX = this.#contentBlock.getBoundingClientRect().left;
	const childCoordinateAxisOX = this.#contentWrapper.getBoundingClientRect().left - borderWidthParentBlock;
	const childRegardingParentCoordinateAxisOX = childCoordinateAxisOX - parentCoordinateAxisOX; // Координата блока относительно родительского блока по оси ОХ

	if (this.#isMouseDownInContentBlock) {
		this.#contentWrapper.style.transition = '';

		this.#isMovingContentWrapper = true;
		this.#isRubberSwipe = false;

		const deltaOX = this.#prevCoordinateAxisOXPointerInContentBlock - this.#currentCoordinateAxisOXPointerInContentBlock;

		let changeCoordinate;

		if (deltaOX > ZERO_VALUE) {
			if (Math.abs(childRegardingParentCoordinateAxisOX) >= childWidth - parentWidth) {
				this.#isRubberSwipe = true;
				this.#sideRubberEvent = SideRubberEvents.Right;

				const coordinateParentBlockRelativeScreenX = this.#contentBlock.getBoundingClientRect().right;
				const coordinateChildBlockRelativeScreenX = this.#contentWrapper.getBoundingClientRect().right - borderWidthParentBlock;

				const changeRelativeCoordinate = Number(coordinateParentBlockRelativeScreenX - coordinateChildBlockRelativeScreenX);
				const growthRelation = 4 + changeRelativeCoordinate;

				changeCoordinate = Number(childRegardingParentCoordinateAxisOX - Math.abs(deltaOX / growthRelation));
				this.#contentWrapper.style.transform = `translateX(${changeCoordinate}px)`;
				return;
			}

			changeCoordinate = Number(childRegardingParentCoordinateAxisOX - Math.abs(deltaOX));
		}
		if (deltaOX < ZERO_VALUE) {
			if (childRegardingParentCoordinateAxisOX >= 0) {
				this.#isRubberSwipe = true;
				this.#sideRubberEvent = SideRubberEvents.Left;

				const changeRelativeCoordinate = Number(childCoordinateAxisOX - parentCoordinateAxisOX);
				const growthRelation = 4 + changeRelativeCoordinate;

				changeCoordinate = Number(childRegardingParentCoordinateAxisOX + Math.abs(deltaOX / growthRelation));
				this.#contentWrapper.style.transform = `translateX(${changeCoordinate}px)`;
				return;
			}

			changeCoordinate = Number(childRegardingParentCoordinateAxisOX + Math.abs(deltaOX));
		}

		this.#intermediateChildCoordinateAxisOX = changeCoordinate;
		this.#contentWrapper.style.transform = `translateX(${changeCoordinate}px)`;
	}

	
  };

  #contentBlockPointerLeaveHandler = () => {
	if (this.#options.swipe) {
		if (this.#isRubberSwipe) {
			this.#rubberSwiper();
		} else if (this.#isMovingContentWrapper) {
			this.#movingContentWrapperBySwipe();
		}
	}
	this.#isMouseDownInContentBlock = false;
  };

  #contentBlockPointerDownHandler = (evt) => {
	this.#setCurrentCoordinateAxisCursor(evt);
	if (this.#options.swipe) {
		this.#setCurrentTimePointerUoAndDown(evt);
	}
	this.#isMouseDownInContentBlock = true;
  };

  #contentBlockPointerUpHandler = (evt) => {
	this.#setCurrentCoordinateAxisCursor(evt);
	this.#setCurrentTimePointerUoAndDown(evt);
	if (this.#options.swipe) {
		if (this.#isRubberSwipe) {
			this.#rubberSwiper();
		} else if (this.#isMovingContentWrapper) {
			this.#movingContentWrapperBySwipe();
		}
	}
	this.#isMouseDownInContentBlock = false;
  };

  #contentWrapperTouchStartHandler = (evt) => {
	this.#setCurrentCoordinateAxisCursor(evt);
};

  #contentWrapperTouchEndHandler = (evt) => {
	this.#setCurrentCoordinateAxisCursor(evt);
	this.#imageContentClickHandler(evt);
  };

  #arrowTouchStartHandler = (evt) => {
	this.#arrowTouchStartCoordinate = {
		pageX: evt.changedTouches[0].pageX,
		pageY: evt.changedTouches[0].pageY,
	}

	this.#arrowChangeTouchStartCoordinate = {
		pageX: evt.changedTouches[0].pageX,
		pageY: evt.changedTouches[0].pageY,
	}
  };

  #arrowTouchMoveHandler = (evt) => {
	this.#arrowChangeTouchStartCoordinate = {
		pageX: evt.changedTouches[0].pageX,
		pageY: evt.changedTouches[0].pageY,
	}
  };
  
  #arrowTouchEndHandler = (evt) => {
	const deltaOX = Math.abs(this.#arrowTouchStartCoordinate.pageX - this.#arrowChangeTouchStartCoordinate.pageX);
	const deltaOY = Math.abs(this.#arrowTouchStartCoordinate.pageY - this.#arrowChangeTouchStartCoordinate.pageY);
	if (deltaOX > 3 || deltaOY > 3) {
		return;
	}

	debounce(() => {
		this.#arrowClickHandler(evt)
	}, DEBOUNCE_TIME_FREEZE);
  };

  #swiperBlockPointerActionHandler = (evt) => {
	let pointerClientX;
	let pointerClientY;

	if (evt.type.startsWith('touch')) {
		pointerClientX = evt.changedTouches[0].clientX;
		pointerClientY = evt.changedTouches[0].clientY;
	} else {
		pointerClientX = evt.clientX;
		pointerClientY = evt.clientY;
	}
	
	if (evt.type === 'pointerdown' || evt.type === TouchEvents.TouchStart) {
		this.#primaryPrevCoordinateAxisOXPointerInSwiperBlock = pointerClientX;
		this.#primaryPrevCoordinateAxisOYPointerInSwiperBlock = pointerClientY;
		this.#prevCoordinateAxisOXPointerInSwiperBlock = pointerClientX;
		this.#prevCoordinateAxisOYPointerInSwiperBlock = pointerClientY;
		this.#currentCoordinateAxisOXPointerInSwiperBlock = pointerClientX;
		this.#currentCoordinateAxisOYPointerInSwiperBlock = pointerClientY;
	} else if (evt.type === TouchEvents.TouchMove || evt.type === 'pointermove') {
		console.log(pointerClientY - this.#primaryPrevCoordinateAxisOYPointerInSwiperBlock);
		if (Math.abs(pointerClientY - this.#primaryPrevCoordinateAxisOYPointerInSwiperBlock) > 10 && !this.#isScrollPage) {
			console.log('AAAAAA-SCROLL');
			this.#isScrollPage = true;
			this.#swiperBLock.style.pointerEvents = 'none';
			window.scroll(0, evt.changedTouches[0].pageY);
		}
		return;
	} else if (evt.type === 'pointerup' || evt.type === TouchEvents.TouchEnd) {
		console.log(evt.type);
		this.#isScrollPage = false;
		this.#contentBlock.style.pointerEvents = 'auto';
	}
  };


  rerender = (container) => {
	container.innerHTML = '';
	this.#container = container;
	this.#container.appendChild(this.#swiperBLock);
  };

  destroy = () => {
	window.removeEventListener('resize', this.#swiperBlockResizeHandler);

  };
  

  #primary = null;
  #prev = null;
  #current = null;

  #pointerDownHandler = (evt) => {
	console.log(evt);

	let clientY;

	if (evt.pageY) {
		clientY = evt.clientY;
	} else if (evt.changedTouches[0].clientY) {
		clientY = evt.changedTouches[0].clientY;
	}

	this.#primary = clientY;
	this.#prev = clientY;
  };

  #pointerMoveHandler = (evt) => {
	console.log(evt);

	let clientY;

	if (evt.clientY) {
		clientY = evt.clientY;
	} else if (evt.changedTouches[0].clientY) {
		clientY = evt.changedTouches[0].clientY;
	}

	console.log(this.#prev);
	console.log(clientY);

	const deltaOY = clientY - this.#prev;
	
	if (deltaOY > 2) {
		window.scrollBy(0, deltaOY);
		this.#prev = clientY;
	} else if (deltaOY < -2) {
		window.scrollBy(0, deltaOY);
		this.#prev = clientY;
	}

	// this.#prev = screenY;
  };

  constructor (container, data, options) {
	this.#options = {
		nextjs: false,
		swipe: false,

	};
	if (options !== undefined) {
		if (typeof options !== 'object') {
			throw new Error('Некорректные данные, ожидаются данные типа Object')
		}

		this.#options = Object.assign(this.#options, options);
	}
	
	typeof container === 'string' ? (this.#container = document.querySelector(container)) : (this.#container = container);
	this.#dataArray = data;

	this.#fullScreenImageBlock = document.createElement('div');
	this.#closeFullScreenImageBlockButton = document.createElement('img');
	this.#fullScreenImageBlock.setAttribute('class', `${styles.full_screen_block}`);
	this.#closeFullScreenImageBlockButton.setAttribute('class', `${styles.close_full_screen_button}`);
	this.#closeFullScreenImageBlockButton.setAttribute('alt','Крестик выхода');
	this.#closeFullScreenImageBlockButton.addEventListener('click', this.#closeFullScreenImageClickHandler);

	
	this.#swiperBLock = document.createElement('div');
	this.#swiperBLock.setAttribute('class', `${styles.swiper}`);
	this.#container.innerHTML = '';
	this.#container.append(this.#swiperBLock);


	this.#arrowLeft = document.createElement('div');
	this.#arrowLeft.setAttribute('class', `${styles.arrow_left} ${styles.arrow_disabled}`);
	this.#arrowLeft.setAttribute('data-item', `${ArrowClickEvent.Back}`);
	this.#arrowLeft.addEventListener('click', (evt) => {
		debounce(() => {
			this.#arrowClickHandler(evt);
		}, DEBOUNCE_TIME_FREEZE);
	});
	this.#arrowLeft.addEventListener('touchstart', this.#arrowTouchStartHandler);
	this.#arrowLeft.addEventListener('touchmove', this.#arrowTouchMoveHandler);
	this.#arrowLeft.addEventListener('touchend', this.#arrowTouchEndHandler);
	this.#swiperBLock.append(this.#arrowLeft);


	this.#contentBlock = document.createElement('div');
	this.#contentBlock.setAttribute('class', `${styles.content_block}`);
	this.#contentBlock.addEventListener('click', this.#imageContentClickHandler); // ПОЛНОЭКРАННЫЙ ОТЗЫВ КАРТИНКА

	// this.#contentBlock.addEventListener('pointerdown', this.#pointerDownHandler);
	// this.#contentBlock.addEventListener('touchstart', this.#pointerDownHandler);
	// this.#contentBlock.addEventListener('pointermove', this.#pointerMoveHandler);
	// this.#contentBlock.addEventListener('touchmove', this.#pointerMoveHandler);

	this.#swiperBLock.append(this.#contentBlock);


	this.#contentWrapper = document.createElement('div');
	this.#contentWrapper.setAttribute('class', `${styles.content_wrapper}`);

	if (this.#options.swipe) {
		this.#contentWrapper.addEventListener('touchstart', this.#contentWrapperTouchStartHandler);
		this.#contentWrapper.addEventListener('touchend', this.#contentWrapperTouchEndHandler);

		this.#contentWrapper.addEventListener('pointermove', this.#contentBlockPointerMoveHandler);
		this.#contentWrapper.addEventListener('pointerdown', this.#contentBlockPointerDownHandler);
		this.#contentWrapper.addEventListener('pointerup', this.#contentBlockPointerUpHandler);
		this.#contentWrapper.addEventListener('pointerleave', this.#contentBlockPointerLeaveHandler);
	} else {
		this.#contentWrapper.style.pointerEvents = 'none';
	}

	this.#contentBlock.append(this.#contentWrapper);


	this.#arrowRight = document.createElement('div');
	this.#arrowRight.setAttribute('class', `${styles.arrow_right}`);
	this.#arrowRight.setAttribute('data-item', `${ArrowClickEvent.Forward}`);
	this.#arrowRight.addEventListener('click', (evt) => {
		debounce(() => {
			this.#arrowClickHandler(evt);
		}, DEBOUNCE_TIME_FREEZE);
	});
	this.#arrowRight.addEventListener('touchstart', this.#arrowTouchStartHandler);
	this.#arrowRight.addEventListener('touchmove', this.#arrowTouchMoveHandler);
	this.#arrowRight.addEventListener('touchend', this.#arrowTouchEndHandler);
	this.#swiperBLock.append(this.#arrowRight);

	const containerItems = new DocumentFragment();

	if (this.#options !== null && this.#options.nextjs) {
		for (const key in data) {
		  containerItems.append(this.#renderImageItem(data[key].default.src));
		}
	} else {
		for (const key in data) {
		  containerItems.append(this.#renderImageItem(data[key]));
		}
	}

	this.#contentWrapper.append(containerItems);
	
	this.#elementsCount = Number(this.#contentWrapper.childNodes.length);
	this.#currentNumberVisibleElement = 0;

	// допы

	const parentBlockRect = this.#contentBlock.getBoundingClientRect();
	this.#widthContentBlock = parentBlockRect.width;
	this.#heightContentBlock = parentBlockRect.height;
	this.#widthContentWrapper = this.#contentWrapper.style.width = `${this.#widthContentBlock * this.#elementsCount}px`;
	this.#heightContentWrapper = this.#contentWrapper.style.height = `${this.#heightContentBlock}px`;
	this.#defaultChildCoordinateAxisOX = this.#contentWrapper.offsetLeft;

	//----

	window.addEventListener('resize', this.#swiperBlockResizeHandler);

	
  }

}
