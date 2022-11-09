export const getElementScrollWidth = (nodeElement) => {
	const widthScrollbarToElement = Math.floor(Math.abs(nodeElement.offsetWidth - nodeElement.scrollWidth));

	return widthScrollbarToElement;
};
