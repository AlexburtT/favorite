import { describe, it, expect } from "vitest";
import Button from "./buttonClass";

describe("Button class", () => {
	it("should create a button element with correct tag name", () => {
		const button = new Button({});
		const content = button.getContent();

		expect(content.tagName).toBe("BUTTON");
	});

	it("should set attributes correctly", () => {
		const button = new Button({
			className: "test-class",
			type: "submit",
			id: "test-id",
			label: "Test Label",
		});
		const content = button.getContent();

		const element = content;
		expect(element.className).toBe("test-class");
		expect(element.getAttribute("type")).toBe("submit");
		expect(element.getAttribute("data-id")).toBe("test-id");
		expect(element.getAttribute("data-label")).toBe("Test Label");
	});

	it("should render text content when title is provided", () => {
		const button = new Button({
			title: "Click Me",
		});
		button.getContent(); // Активируем рендеринг

		expect(button.element.textContent).toBe("Click Me");
	});

	it("should render SVG content when svgPath is provided", () => {
		const svgPath = "M19 12H5";
		const button = new Button({
			svgPath,
		});
		button.getContent(); // Активируем рендеринг

		const svg = button.element.querySelector("svg");
		expect(svg).toBeDefined();
		expect(svg.getAttribute("width")).toBe("24");
		expect(svg.getAttribute("height")).toBe("24");
		expect(svg.getAttribute("viewBox")).toBe("0 0 24 24");

		const path = svg.querySelector("path");
		expect(path).toBeDefined();
		expect(path.getAttribute("d")).toBe(svgPath);
		expect(path.getAttribute("stroke-width")).toBe("2");
		expect(path.getAttribute("stroke-linecap")).toBe("round");
		expect(path.getAttribute("stroke-linejoin")).toBe("round");
		expect(path.getAttribute("stroke")).toBe("currentColor");
	});
});
