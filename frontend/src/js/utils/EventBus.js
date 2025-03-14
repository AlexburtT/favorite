class EventBus {
	static instance = null;

	static getInstance() {
		if (!EventBus.instance) {
			EventBus.instance = new EventBus();
		}
		return EventBus.instance;
	}

	// Статический объект для определения событий
	static EVENTS = {
		OPEN_DIALOG_BTN: "openDialog",
		DIALOG_OPENED: "dialogOpened",
		CLOSE_DIALOG: "closeDialog",
		DIALOG_CLOSED: "dialogClosed",
		UPDATE_DIALOG_CONTENT: "updateDialogContent",
		UPDATE_DIALOG_TITLE: "updateDialogTitle",
		SAVE_MOVIE: "saveMovie",
		EDIT_MOVIE: "editMovie",
		TOGGLE_LIKE: "toggleLike",
		TOGGLE_WATCHED: "toggleWatched",
	};

	// Приватное свойство для хранения событий и их подписчиков
	#events = new Map();

	// Метод для подписки на событие
	on(event, callback, context = null) {
		if (typeof callback !== "function") {
			console.error(
				`Ошибка: переданный обработчик не является функцией для события "${event}".`
			);
			return;
		}

		const boundCallback = context ? callback.bind(context) : callback;

		if (!this.#events.has(event)) {
			this.#events.set(event, []);
		}

		const subscribers = this.#events.get(event);
		if (!subscribers.includes(boundCallback)) {
			subscribers.push(boundCallback);
		}

		console.log(
			`Подписан на событие "${event}". Текущее количество подписчиков: ${subscribers.length}`
		);
	}

	// Метод для отмены подписки на событие
	off(event, callback) {
		if (!this.#events.has(event)) return;

		const subscribers = this.#events.get(event);
		const remainingSubscribers = subscribers.filter(
			(cb) => cb !== callback
		);

		if (remainingSubscribers.length === 0) {
			this.#events.delete(event);
		} else {
			this.#events.set(event, remainingSubscribers);
		}

		console.log(
			`Отменена подписка на событие "${event}". Оставшиеся подписчики: ${remainingSubscribers.length}`
		);
	}

	// Метод для испускания события
	emit(event, ...args) {
		const subscribers = this.#events.get(event);

		if (!subscribers || subscribers.length === 0) {
			console.warn(`Событие "${event}" не имеет подписчиков.`);
			return;
		}

		console.log(`Emit события "${event}" с аргументами:`, args);

		subscribers.forEach((cb, index) => {
			try {
				cb(...args);
			} catch (error) {
				console.error(
					`Ошибка при выполнении обработчика ${index} для события "${event}":`,
					error
				);
			}
		});
	}

	// Метод для отладки состояния событий
	debugEvents() {
		const eventState = {};
		for (const [event, subscribers] of this.#events.entries()) {
			eventState[event] = subscribers.length;
		}
		console.table(eventState);
		return eventState;
	}

	// Метод для очистки всех событий (полезно для тестирования)
	clearAllEvents() {
		this.#events.clear();
		console.log("Все события были удалены.");
	}
}

export default EventBus;
