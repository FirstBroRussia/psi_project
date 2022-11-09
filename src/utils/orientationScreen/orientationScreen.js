export const getOrientationScreen = () => {
	const widthViewport = window.innerWidth;
	const heightViewport = window.innerHeight;
	const ratioWidthAndHeight = widthViewport / heightViewport;

	if (ratioWidthAndHeight > 1) {
		return 'landscape';
	}
	if (ratioWidthAndHeight < 1) {
		return 'portrait';
	} else {
		return 'square';
	}
	
};
