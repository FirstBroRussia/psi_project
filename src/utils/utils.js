import { setTypeUserDeviceAction } from '../store/reducer';
import { store } from '../store/store';

const userAgentParser = require('ua-parser-js');

const DeviceTypeList = {
	Desktop: 'desktop',
	Mobile: 'mobile',
	Tablet: 'tablet',
	SmartTv: 'smarttv',
};

const deviceTypeSwitch = (userAgentType) => {
	switch (userAgentType) {
		case DeviceTypeList.Tablet : return DeviceTypeList.Tablet;
		case DeviceTypeList.Mobile : return DeviceTypeList.Mobile;
		case DeviceTypeList.SmartTv : return DeviceTypeList.SmartTv;
		default : return DeviceTypeList.Desktop;
	}
};

window.addEventListener('DOMContentLoaded', () => {
	const typeUserDevice = userAgentParser(navigator.userAgent).device.type;
	const deviceType = deviceTypeSwitch(typeUserDevice);
	store.dispatch(setTypeUserDeviceAction(deviceType));
});

window.addEventListener('resize', (evt) => {
	const typeUserDevice = userAgentParser(navigator.userAgent).device.type;
	const deviceType = deviceTypeSwitch(typeUserDevice);
	store.dispatch(setTypeUserDeviceAction(deviceType));
});

export {DeviceTypeList};
