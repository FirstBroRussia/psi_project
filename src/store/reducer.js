import { createSlice } from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from 'next-redux-wrapper';

const initialState = {
	windowObj: null,

};

const reducer = createSlice({
	name: 'reducer',
	initialState: initialState,
	reducers: {
		setWindowObjAction: (state, action) => {
			state.windowObj = action.payload;
		},

	}
});

export {reducer};

export const {setWindowObjAction} = reducer.actions;
