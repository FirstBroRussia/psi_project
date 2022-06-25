export const getOrientationScreen = () => {
	const widthViewport = window.visualViewport.width;

	const heightViewport = window.visualViewport.height;

	const ratioWidthAndHeight = widthViewport / heightViewport;

	if (ratioWidthAndHeight > 1) {
		return 'landscape';
	}
	if (ratioWidthAndHeight < 1) {
		return 'portrait';
	}
	if (ratioWidthAndHeight === 1) {
		return 'square';
	}

};
