import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

const commonReducer = combineReducers({
	reducer: reducer.reducer,
});

const store = configureStore({
	reducer: commonReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	}),
});

export {store};
