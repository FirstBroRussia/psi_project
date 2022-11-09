export const getHtmlScrollWidth = () => {
	const scrollWidth = Math.max(
		document.body.scrollWidth, document.documentElement.scrollWidth,
		document.body.offsetWidth, document.documentElement.offsetWidth,
		document.body.clientWidth, document.documentElement.clientWidth
		);
	const scrollbarWidth = window.innerWidth - scrollWidth;

	return scrollbarWidth;
};
