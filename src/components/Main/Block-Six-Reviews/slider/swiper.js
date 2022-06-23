import styles from './swiper.module.scss';

const ZERO_VALUE = 0;
const ONE_VALUE = 1;

const MAX_CHANGE_COORDINATE_FOR_CANCELLING_CLICK = 3;
const CHANGE_COORDINATE_AND_WIDTH_PARENT_BLOCK_RATIO = 0.3;
const TIMEOUT_TRANSFORM_TRANSITION = 300;

const closeButtonSvg = require('./img/close-button.svg');

function debounceFn () {
	let setTimeoutFn = null;
	
	return (callback) => {
		if (setTimeoutFn !== null) {
			clearTimeout(setTimeoutFn);
		}
		setTimeoutFn = setTimeout(callback, 150);
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

  #prevCoordinateAxisOXCursorInContentBlock = null;
  #currentCoordinateAxisOXCursorInContentBlock = null;
  #currentCoordinateAxisOXMouseDownInContentBlock = null;
  #currentCoordinateAxisOXMouseUpInContentBlock = null;

  #defaultChildCoordinateAxisOX = null;
  #intermediateChildCoordinateAxisOX = null;

  #isRubberSwipe = false;
  #sideRubberEvent = null;

  #arrowTouchStartCoordinate = null;
  #arrowChangeTouchStartCoordinate = null;

  #swiperBlockResizeHandler = () => {
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
	imageElement.setAttribute('src', data);
	imageElement.setAttribute('alt', 'Изображение');
	imageElement.setAttribute('draggable', 'false');

	const imageWrapper = document.createElement('div');
	imageWrapper.setAttribute('class', `${styles.image_wrapper}`);
	const widthParentBlock = this.#contentBlock.getBoundingClientRect().width;
	imageWrapper.style.width = `${widthParentBlock}px`;
	imageWrapper.appendChild(imageElement);

	return imageWrapper;
  }


  #arrowClickHandler = (evt) => {
	if (evt.type === 'click' && evt.pointerType === 'touch') {
		return;
	}

	const targetElement = evt.target;
	this.#contentWrapper.style.transition = 'transform .3s ease-in-out';

	if (targetElement.getAttribute('data-item') === ArrowClickEvent.Forward) {
		this.#arrowLeft.classList.remove(`${styles.arrow_disabled}`);
		this.#currentNumberVisibleElement += ONE_VALUE;

		if (this.#currentNumberVisibleElement === this.#elementsCount - ONE_VALUE) {
			this.#arrowRight.classList.toggle(`${styles.arrow_disabled}`);
		}
	}
	if (targetElement.getAttribute('data-item') === ArrowClickEvent.Back) {
		this.#arrowRight.classList.remove(`${styles.arrow_disabled}`);
		this.#currentNumberVisibleElement -= ONE_VALUE;

		if (this.#currentNumberVisibleElement === ZERO_VALUE) {
			this.#arrowLeft.classList.toggle(`${styles.arrow_disabled}`);
		}
	}

	const changeCoordinate = Number(this.#widthContentBlock * this.#currentNumberVisibleElement);
	this.#contentWrapper.style.transform = `translateX(-${changeCoordinate}px)`;
	this.#defaultChildCoordinateAxisOX = Number(-changeCoordinate);
  };

  #imageContentClickHandler = (evt) => {
	const changeCoordinates = Math.abs(this.#currentCoordinateAxisOXMouseDownInContentBlock - this.#currentCoordinateAxisOXMouseUpInContentBlock);
	
	if (!evt.target.closest(`.${styles.image}`) || changeCoordinates >= MAX_CHANGE_COORDINATE_FOR_CANCELLING_CLICK || evt.pointerType === 'touch') {
		return;
	}
	const targetImageElement = evt.target.closest(`.${styles.image}`);
	const imageElement = document.createElement('img');
	imageElement.setAttribute('alt', 'Изображение');
	imageElement.setAttribute('src', `${targetImageElement.getAttribute('src')}`);
	imageElement.setAttribute('class', `${styles.full_screen_image}`);
	this.#fullScreenImageBlock.appendChild(imageElement);
	this.#fullScreenImageBlock.appendChild(this.#closeFullScreenImageBlockButton);
	document.querySelector('html').style.overflow = 'hidden';
	document.querySelector('body').appendChild(this.#fullScreenImageBlock);
  };

  #closeFullScreenImageClickHandler = () => {
	this.#fullScreenImageBlock.innerHTML = '';
	document.querySelector('html').style.overflow = 'auto';
	document.querySelector('body').removeChild(this.#fullScreenImageBlock);
  };

  #getCurrentCoordinateAxisOXCursor = (evt) => {
	let currentCoordinateCursorAxisOX;

	if (evt.type.startsWith('touch')) {
		currentCoordinateCursorAxisOX = evt.changedTouches[0].pageX;
	} else {
		currentCoordinateCursorAxisOX = evt.pageX;
	}

	const currentCoordinateParentBlockAxisOX = this.#contentBlock.getBoundingClientRect().left;
	const cursorCoordinateAxisOXRegardingParentBlock = currentCoordinateCursorAxisOX - currentCoordinateParentBlockAxisOX;

	if (evt.type === 'pointerdown' || evt.type === 'touchstart') {
		this.#currentCoordinateAxisOXMouseDownInContentBlock = cursorCoordinateAxisOXRegardingParentBlock;
	}
	if (evt.type === 'pointerup' || evt.type === 'touchend') {
		this.#currentCoordinateAxisOXMouseUpInContentBlock = cursorCoordinateAxisOXRegardingParentBlock;
	}
	if (evt.type === 'pointermove') {
		this.#currentCoordinateAxisOXCursorInContentBlock = cursorCoordinateAxisOXRegardingParentBlock;
	}
	if (evt.type === 'pointerdown' && evt.pointerType === 'touch') {
		this.#currentCoordinateAxisOXCursorInContentBlock = cursorCoordinateAxisOXRegardingParentBlock;
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
		const deltaOX = this.#defaultChildCoordinateAxisOX - this.#intermediateChildCoordinateAxisOX;

		if (deltaOX > 0 && Math.abs(deltaOX) > CHANGE_COORDINATE_AND_WIDTH_PARENT_BLOCK_RATIO * this.#widthContentBlock) {
			this.#arrowLeft.classList.remove(`${styles.arrow_disabled}`);
		        this.#currentNumberVisibleElement += ONE_VALUE;

			if (this.#currentNumberVisibleElement === this.#elementsCount - ONE_VALUE) {
				this.#arrowRight.classList.toggle(`${styles.arrow_disabled}`);
			}
		} else if (deltaOX < 0 && Math.abs(deltaOX) > CHANGE_COORDINATE_AND_WIDTH_PARENT_BLOCK_RATIO * this.#widthContentBlock) {
			this.#arrowRight.classList.remove(`${styles.arrow_disabled}`);
			this.#currentNumberVisibleElement -= ONE_VALUE;

			if (this.#currentNumberVisibleElement === ZERO_VALUE) {
				this.#arrowLeft.classList.toggle(`${styles.arrow_disabled}`);
			}
		}

		const changeCoordinate = Number(this.#widthContentBlock * this.#currentNumberVisibleElement);
		this.#contentWrapper.style.transform = `translateX(-${changeCoordinate}px)`;
		this.#defaultChildCoordinateAxisOX = Number(-changeCoordinate);
		this.#isMovingContentWrapper = false;
  };

  #contentBlockPointerMoveHandler = (evt) => {
	this.#isMovingContentWrapper = false;

	this.#prevCoordinateAxisOXCursorInContentBlock = this.#currentCoordinateAxisOXCursorInContentBlock;
	this.#getCurrentCoordinateAxisOXCursor(evt);
	
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

		const deltaOX = this.#prevCoordinateAxisOXCursorInContentBlock - this.#currentCoordinateAxisOXCursorInContentBlock;

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
	if (this.#isRubberSwipe) {
		this.#rubberSwiper();
	} else if (this.#isMovingContentWrapper) {
		this.#movingContentWrapperBySwipe();
	}
	this.#isMouseDownInContentBlock = false;
  };

  #contentBlockPointerDownHandler = (evt) => {
	this.#widthCursor = evt.width;
	this.#heightCursor = evt.height;
	this.#getCurrentCoordinateAxisOXCursor(evt);
	this.#isMouseDownInContentBlock = true;
  };

  #contentBlockPointerUpHandler = (evt) => {
	if (this.#isRubberSwipe) {
		this.#rubberSwiper();
	} else if (this.#isMovingContentWrapper) {
		this.#movingContentWrapperBySwipe();
	}
	this.#getCurrentCoordinateAxisOXCursor(evt);
	this.#isMouseDownInContentBlock = false;
  };

  #contentWrapperTouchStartHandler = (evt) => {
	this.#getCurrentCoordinateAxisOXCursor(evt);
};

  #contentWrapperTouchEndHandler = (evt) => {
	this.#getCurrentCoordinateAxisOXCursor(evt);
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

	this.#arrowClickHandler(evt);
  };
  

  constructor (container, data, options) {
	this.#options = options;
	typeof container === 'string' ? (this.#container = document.querySelector(container)) : (this.#container = container);
	this.#dataArray = data;

	this.#fullScreenImageBlock = document.createElement('div');
	this.#closeFullScreenImageBlockButton = document.createElement('img');
	this.#fullScreenImageBlock.setAttribute('class', `${styles.full_screen_block}`);
	this.#closeFullScreenImageBlockButton.setAttribute('class', `${styles.close_full_screen_button}`);

	if (this.#options !== null && this.#options.nextjs) {
		this.#closeFullScreenImageBlockButton.setAttribute('src', closeButtonSvg.default.src);
	} else {
		this.#closeFullScreenImageBlockButton.setAttribute('src', closeButtonSvg);
	}
	this.#closeFullScreenImageBlockButton.setAttribute('alt','Крестик выхода');
	this.#closeFullScreenImageBlockButton.addEventListener('click', this.#closeFullScreenImageClickHandler);

	
	this.#swiperBLock = document.createElement('div');
	this.#swiperBLock.setAttribute('class', `${styles.swiper}`);
	this.#container.innerHTML = '';
	this.#container.append(this.#swiperBLock);

	this.#arrowLeft = document.createElement('div');
	this.#arrowLeft.setAttribute('class', `${styles.arrow_left} ${styles.arrow_disabled}`);
	this.#arrowLeft.setAttribute('data-item', `${ArrowClickEvent.Back}`);
	this.#arrowLeft.addEventListener('click', this.#arrowClickHandler);
	this.#arrowLeft.addEventListener('touchstart', this.#arrowTouchStartHandler);
	this.#arrowLeft.addEventListener('touchmove', this.#arrowTouchMoveHandler);
	this.#arrowLeft.addEventListener('touchend', this.#arrowTouchEndHandler);
	this.#swiperBLock.append(this.#arrowLeft);

	this.#contentBlock = document.createElement('div');
	this.#contentBlock.setAttribute('class', `${styles.content_block}`);

	this.#contentBlock.addEventListener('pointermove', this.#contentBlockPointerMoveHandler);
	this.#contentBlock.addEventListener('pointerdown', this.#contentBlockPointerDownHandler);
	this.#contentBlock.addEventListener('pointerup', this.#contentBlockPointerUpHandler);
	this.#contentBlock.addEventListener('pointerleave', this.#contentBlockPointerLeaveHandler);
	this.#swiperBLock.append(this.#contentBlock);

	this.#contentWrapper = document.createElement('div');
	this.#contentWrapper.setAttribute('class', `${styles.content_wrapper}`);
	this.#contentWrapper.addEventListener('click', this.#imageContentClickHandler);
	this.#contentWrapper.addEventListener('touchstart', this.#contentWrapperTouchStartHandler);
	this.#contentWrapper.addEventListener('touchend', this.#contentWrapperTouchEndHandler);
	this.#contentBlock.append(this.#contentWrapper);

	this.#arrowRight = document.createElement('div');
	this.#arrowRight.setAttribute('class', `${styles.arrow_right}`);
	this.#arrowRight.setAttribute('data-item', `${ArrowClickEvent.Forward}`);
	this.#arrowRight.addEventListener('click', this.#arrowClickHandler);
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