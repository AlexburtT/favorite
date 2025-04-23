import { describe, it, expect, beforeEach } from "vitest";
import EventBus from "./EventBus";

describe("EventBus", () => {
	let eventBus;

	// Перед каждым тестом создаем новый экземпляр EventBus
	beforeEach(() => {
		eventBus = EventBus.getInstance();
		eventBus.clearAllEvents(); // Очищаем события перед каждым тестом
	});

	// Тестирование синглтона
	it("должен возвращать один и тот же экземпляр при вызове getInstance()", () => {
		const instance1 = EventBus.getInstance();
		const instance2 = EventBus.getInstance();
		expect(instance1).toBe(instance2);
	});

	// Тестирование подписки на событие
	it("должен корректно подписывать обработчик на событие", () => {
		const callback = vi.fn(); // Создаем мок-функцию
		eventBus.on("testEvent", callback);

		expect(eventBus.debugEvents()).toEqual({ testEvent: 1 });
	});

	// Тестирование отписки от события
	it("должен корректно отписывать обработчик от события", () => {
		const callback = vi.fn();
		eventBus.on("testEvent", callback);
		eventBus.off("testEvent", callback);

		expect(eventBus.debugEvents()).toEqual({});
	});

	// Тестирование испускания события
	it("должен вызывать обработчик при испускании события", () => {
		const callback = vi.fn();
		eventBus.on("testEvent", callback);

		eventBus.emit("testEvent", "arg1", "arg2");

		expect(callback).toHaveBeenCalledWith("arg1", "arg2");
	});

	// Тестирование ошибок в обработчиках
	it("должен логировать ошибки, если обработчик выбрасывает исключение", () => {
		const errorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => { });
		const faultyCallback = () => {
			throw new Error("Test error");
		};

		eventBus.on("testEvent", faultyCallback);
		eventBus.emit("testEvent");

		expect(errorSpy).toHaveBeenCalled();
		errorSpy.mockRestore(); // Восстанавливаем оригинальный console.error
	});

	// Тестирование отладки событий
	it("должен корректно выводить состояние событий", () => {
		eventBus.on("event1", () => { });
		eventBus.on("event2", () => { });
		eventBus.on("event2", () => { });

		const state = eventBus.debugEvents();
		expect(state).toEqual({ event1: 1, event2: 2 });
	});

	// Тестирование очистки всех событий
	it("должен очищать все события", () => {
		eventBus.on("event1", () => { });
		eventBus.on("event2", () => { });

		eventBus.clearAllEvents();

		expect(eventBus.debugEvents()).toEqual({});
	});

	// Тестирование контекста для обработчиков
	it("должен привязывать контекст к обработчику", () => {
		const context = { value: 42 };
		const callback = function () {
			expect(this.value).toBe(42);
		};

		eventBus.on("testEvent", callback, context);
		eventBus.emit("testEvent");
	});

	// Тестирование одноразовых событий (если добавите метод once)
	it("должен вызывать одноразовый обработчик только один раз", () => {
		const callback = vi.fn();

		eventBus.once = (event, cb) => {
			const onceCallback = (...args) => {
				cb(...args);
				eventBus.off(event, onceCallback);
			};
			eventBus.on(event, onceCallback);
		};

		eventBus.once("testEvent", callback);
		eventBus.emit("testEvent");
		eventBus.emit("testEvent");

		expect(callback).toHaveBeenCalledTimes(1);
	});
});
