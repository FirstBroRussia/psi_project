import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

let Store = null;

class StoreClass {
	#store = null;
	#commonReducer = null;
	#reducer = null;

	constructor () {
		this.#reducer = reducer;
		this.#commonReducer = combineReducers({
			reducer: reducer.reducer,
		});
		this.#store = configureStore({
			reducer: this.#commonReducer,
		});
		Store = this.#store;
	}

	getStore = () => {
		if (this.#store)
		return this.#store;
	};

	getDispatch = () => {
		return this.#store.dispatch;
	};

	getSelector = () => {
		return this.#store.getState;
	};
}

const initStore = () => {
	if (Store !== null) {
		return;
	}

	Store = new StoreClass();
	return Store;
};

export {Store, initStore};
