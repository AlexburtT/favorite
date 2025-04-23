/* eslint-disable no-undef */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { JSDOM } from "jsdom";
import Block from "./Block";
import EventBus from "./EventBus";

const dom = new JSDOM("<!DOCTYPE html><body></body>");
global.document = dom.window.document;
global.Element = dom.window.Element;

describe("Block class", () => {
	let block;
	let eventBus;

	beforeEach(() => {
		eventBus = EventBus.getInstance();
		block = new Block({ tagName: "div", eventBus });
		vi.clearAllMocks();
	});

	afterEach(() => {
		if (block.element) {
			block.element.remove();
		}
		eventBus.clearAllEvents();
	});

	it("should create an element with correct tag name", () => {
		const element = block.element;
		expect(element.tagName).toBe("DIV");
	});

	it("should set the id property correctly", () => {
		const uuidRegex =
			/^[0-9a-f]{8}-[0-9a-f]{4}-[45][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
		expect(block.id).toMatch(uuidRegex);
	});

	it("should emit INIT event on construction", () => {
		const spy = vi.spyOn(eventBus, "emit");
		new Block({ eventBus });
		expect(spy).toHaveBeenCalledWith(Block.EVENTS.INIT);
	});

	it("should register events on initialization", () => {
		const spy = vi.spyOn(eventBus, "on");
		new Block({ eventBus });

		expect(spy).toHaveBeenCalledWith(
			Block.EVENTS.INIT,
			expect.any(Function)
		);
		expect(spy).toHaveBeenCalledWith(
			Block.EVENTS.FLOW_CDM,
			expect.any(Function)
		);
		expect(spy).toHaveBeenCalledWith(
			Block.EVENTS.FLOW_CDU,
			expect.any(Function)
		);
		expect(spy).toHaveBeenCalledWith(
			Block.EVENTS.FLOW_RENDER,
			expect.any(Function)
		);
	});

	it("should render element when calling getContent", () => {
		const content = block.getContent();
		expect(content).toBe(block.element);
	});

	it("should update props correctly", () => {
		const oldProps = { foo: "bar" };
		const newProps = { baz: "qux" };

		block.setProps(oldProps);

		const emitSpy = vi.spyOn(eventBus, "emit");

		block.setProps(newProps);

		expect(block.props).toEqual({ ...oldProps, ...newProps });

		expect(emitSpy).toHaveBeenCalledWith(Block.EVENTS.FLOW_CDU, oldProps, {
			...oldProps,
			...newProps,
		});
	});

	it("should return true when props change", () => {
		block.setProps({ foo: "bar" });
		const result = block.componentDidUpdate({ foo: "bar" }, { foo: "baz" });
		expect(result).toBe(true);
	});

	it("should return false when props do not change", () => {
		block.setProps({ foo: "bar" });
		const result = block.componentDidUpdate({ foo: "bar" }, { foo: "bar" });
		expect(result).toBe(false);
	});

	it("should handle specific EventBus events", () => {
		const openDialogSpy = vi.fn();
		const dialogOpenedSpy = vi.fn();
		const closeDialogSpy = vi.fn();

		eventBus.on(EventBus.EVENTS.OPEN_DIALOG_BTN, openDialogSpy);
		eventBus.on(EventBus.EVENTS.DIALOG_OPENED, dialogOpenedSpy);
		eventBus.on(EventBus.EVENTS.CLOSE_DIALOG, closeDialogSpy);

		eventBus.emit(EventBus.EVENTS.OPEN_DIALOG_BTN);
		eventBus.emit(EventBus.EVENTS.DIALOG_OPENED);
		eventBus.emit(EventBus.EVENTS.CLOSE_DIALOG);

		expect(openDialogSpy).toHaveBeenCalledTimes(1);
		expect(dialogOpenedSpy).toHaveBeenCalledTimes(1);
		expect(closeDialogSpy).toHaveBeenCalledTimes(1);
	});
});
