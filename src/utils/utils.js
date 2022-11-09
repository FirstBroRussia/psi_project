import {setTypeUserDeviceAction, setWidthViewportAction, setHeightViewportAction, setOrientationScreenAction} from '../store/reducer';
import {store} from '../store/store';
import {getOrientationScreen} from './orientationScreen/orientationScreen';

const userAgentParser = require('ua-parser-js');

const ONE_VALUE = 1;

const DeviceTypeList = {
	Desktop: 'desktop',
	Mobile: 'mobile',
	Tablet: 'tablet',
	SmartTv: 'smarttv',
};

const iconSizes = {
	Eighty: 80,
	Seventy: 70,
	Sixty: 60,
	Fifty: 50,
	Forty: 40,
	Thirty: 30,
	Twenty: 20,
	Ten: 10,
};


const scrollPageWithAccoutingHeaderElement = async (targetElement, headerElement) => {
	const distanceToTopClientY = targetElement.getBoundingClientRect().top;
	const deltaPageYAndElementClientY = Math.abs(window.pageYOffset + distanceToTopClientY);

	headerElement.hidden && (headerElement.hidden = false);
	const headerElementHeight = await new Promise (resolve => setTimeout(() => resolve(headerElement.getBoundingClientRect().height), 0));

	window.scrollTo(0, deltaPageYAndElementClientY - headerElementHeight);
};

const setForcedHeightValue = (elementsList, optionsObj) => {
	const options = optionsObj || null;

	let maxHeight = 0;

	if (options && options.delay) {
		setTimeout(() => {
			for (const item of elementsList) {
				item.style.height = `100%`;
			}
	
			for (const item of elementsList) {
				const currentHeight = item.getBoundingClientRect().height
				if (currentHeight > maxHeight) {
					maxHeight = currentHeight;
				}
			}
	
			for (const item of elementsList) {
				item.style.height = `${maxHeight}px`;
			}

		}, options.delay);
	} else {
		for (const item of elementsList) {
			item.style.height = `100%`;
		}

		for (const item of elementsList) {
			const currentHeight = item.getBoundingClientRect().height
			if (currentHeight > maxHeight) {
				maxHeight = currentHeight;
			}
		}

		for (const item of elementsList) {
			item.style.height = `${maxHeight}px`;
		}
	}
	
};

const deviceTypeSwitch = (userAgentType) => {
	switch (userAgentType) {
		case DeviceTypeList.Tablet : return DeviceTypeList.Tablet;
		case DeviceTypeList.Mobile : return DeviceTypeList.Mobile;
		case DeviceTypeList.SmartTv : return DeviceTypeList.SmartTv;
		default : return DeviceTypeList.Desktop;
	}
};

const deviceScreenInfoCallback = (evt) => {
	const typeUserDevice = userAgentParser(navigator.userAgent).device.type;
	const deviceType = deviceTypeSwitch(typeUserDevice);
	const orientationScreen = getOrientationScreen();

	store.dispatch(setOrientationScreenAction(orientationScreen));
	store.dispatch(setTypeUserDeviceAction(deviceType));
	store.dispatch(setWidthViewportAction(window.innerWidth));
	store.dispatch(setHeightViewportAction(window.innerHeight));
};


export {userAgentParser, ONE_VALUE, DeviceTypeList, iconSizes, deviceScreenInfoCallback, setForcedHeightValue, scrollPageWithAccoutingHeaderElement};
