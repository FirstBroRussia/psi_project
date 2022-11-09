export default class ProportionalScale {
	#elementsObj = null;
	#upperDefinitionArea = null;
	#lowerDefinitionArea = null;
	#deltaDefinitionAreas = null;

	#prevWidthViewport = null;
	#prevHeightViewport = null;
	#currentWidthViewport = null;
	#currentHeightViewport = null;

	#ratioWidth = null;
	#ratioHeight = null;
	

	constructor (elementsObj, lowerDefinitionArea, upperDefinitionArea) {
		this.#elementsObj = elementsObj;
		this.#lowerDefinitionArea = lowerDefinitionArea;
		this.#upperDefinitionArea = upperDefinitionArea;
		this.#deltaDefinitionAreas = this.#upperDefinitionArea - this.#lowerDefinitionArea;
		
		this.#currentWidthViewport = window.innerWidth;
		this.#currentHeightViewport = window.innerHeight;

		window.addEventListener('resize', this.#viewportResizeHandler);
	}

	#viewportResizeHandler = () => {
		this.#prevWidthViewport = this.#currentWidthViewport;
		this.#prevHeightViewport = this.#currentHeightViewport

		this.#currentWidthViewport = window.innerWidth;
		this.#currentHeightViewport = window.innerHeight;

		this.#setProportionalElementsAction();
	};

	#setProportionalElementsAction = () => {
		const deltaWidthViewport = this.#currentWidthViewport - this.#prevWidthViewport;
		const deltaHeightViewport = this.#currentHeightViewport - this.#prevHeightViewport;

		// УСЛОВИЕ SCALE ПО ОСЯМ НУЖНО ВСТАВИТЬ

		this.#ratioWidth = 1 + (deltaWidthViewport / this.#prevWidthViewport);
		this.#ratioHeight = 1 + (deltaHeightViewport / this.#prevHeightViewport);

		for (const item of this.#elementsObj) {
			this.#nestedElements(item, this.#setWidthAndHeightElement);
		}
	};

	#nestedElements = (element, callbackManipulationOfElement) => {
		// Производим манипуляцию над самим элементом element
		callbackManipulationOfElement(element);
		// ------------------

		if (element.nodeName === 'SVG') {
			return;
		}


		if (element.children.length > 0) {
			for (const item of element.children) {
				this.#nestedElements(item, callbackManipulationOfElement);
			}
		}
	};

	#setWidthAndHeightElement = (element) => {
		const widthItem = Number(window.getComputedStyle(element).width.replace(/px/g, ''));
		const heightItem = Number(window.getComputedStyle(element).height.replace(/px/g, ''));

		element.style.width = `${widthItem * this.#ratioWidth}px`;
		element.style.height = `${heightItem * this.#ratioWidth}px`;
	};

}
