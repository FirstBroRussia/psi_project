const createNodeElement = (htmlCode) => {
	const newElement = document.createElement('div');
	newElement.insertAdjacentHTML('afterbegin', htmlCode);
	const nodeElement = newElement.firstElementChild;

	return nodeElement;
};
