import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	typeUserDevice: null,
	widthViewport: null,
	heightViewport: null,
	orientationScreen: null,
	headerElement: null,
	isOpenMobileMenu: null,
	footerElement: null,
	setOpenMobileMenu: null,
	firstBlockVideoPromo: null,
	sevenBlockVideo: null,
	ScrollUpButtonClass: null,
	isLockScroll: null,
	CSSDOMisLoad: null,
	blockOneRef: null,
};

const reducer = createSlice({
	name: 'reducer',
	initialState: initialState,
	reducers: {
		setTypeUserDeviceAction: (state, action) => {
			state.typeUserDevice = action.payload;
		},
		setHeaderBarElementAction: (state, action) => {
			state.headerElement = action.payload;
		},
		setIsOpenMobileMenuAction: (state, action) => {
			state.isOpenMobileMenu = action.payload;
		},
		setFooterElementAction: (state, action) => {
			state.footerElement = action.payload;
		},
		setWidthViewportAction: (state, action) => {
			state.widthViewport = action.payload;
		},
		setHeightViewportAction: (state, action) => {
			state.heightViewport = action.payload;
		},
		setOrientationScreenAction: (state, action) => {
			state.orientationScreen = action.payload;
		},
		setFirstBlockVideoAction: (state, action) => {
			state.firstBlockVideoPromo = action.payload;
		},
		setSevenBlockVideoAction: (state, action) => {
			state.sevenBlockVideo = action.payload;
		},
		setScrollUpButtonClassAction: (state, action) => {
			state.ScrollUpButtonClass = action.payload;
		},
		setIsLockScrollAction: (state, action) => {
			state.isLockScroll = action.payload;
		},
		setCSSDOMLoadAction: (state, action) => {
			state.CSSDOMisLoad = action.payload;
		},
		setBlockOneRefAction: (state, action) => {
			state.blockOneRef = action.payload;
		},
	}
});

export {reducer};

export const {setTypeUserDeviceAction, setHeaderBarElementAction, setIsOpenMobileMenuAction, setFooterElementAction, setWidthViewportAction, setHeightViewportAction, setOrientationScreenAction, setFirstBlockVideoAction, setSevenBlockVideoAction, setScrollUpButtonClassAction, setIsLockScrollAction, setCSSDOMLoadAction, setBlockOneRefAction} = reducer.actions;
