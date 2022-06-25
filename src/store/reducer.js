import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	typeUserDevice: null,
	headerElement: null,
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

	}
});

export {reducer};

export const {setTypeUserDeviceAction, setHeaderBarElementAction} = reducer.actions;
