export default class PeriodicMethodsClass {
	#timeCheckInterval = null;
	#intervalCallback = null;

	#timeRecordData = null;

	#intervalFn = null;

	constructor (callback, timeCheckInterval) {
		this.#intervalCallback = callback;
		this.#timeCheckInterval = timeCheckInterval;
	}

	periodicUpdateTimeRecordData = () => {
		this.#timeRecordData = new Date().getTime();

		if (this.#intervalFn) {
			return;
		}

		this.#intervalFn = setInterval(() => {
			if (new Date().getTime() - this.#timeRecordData < 200) {
				return;
			}

			this.#intervalCallback();
			clearInterval(this.#intervalFn);
			this.#intervalFn = null;
		}, this.#timeCheckInterval)
	};

};
