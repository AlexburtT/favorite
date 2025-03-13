import EventBus from "./EventBus";

class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	#element;
	#eventBus;

	constructor({
		tagName = "div",
		className = "",
		attributes = {},
		eventBus = EventBus.getInstance(),
		...props
	} = {}) {
		this.#eventBus = eventBus;
		this.props = props;
		this.#setupElement(tagName, className, attributes);

		this.#registerEvents();
		this.#eventBus.emit(Block.EVENTS.INIT);
	}

	#registerEvents() {
		this.#eventBus.on(Block.EVENTS.INIT, this.#init.bind(this));
		this.#eventBus.on(
			Block.EVENTS.FLOW_CDM,
			this.#componentDidMount.bind(this)
		);
		this.#eventBus.on(
			Block.EVENTS.FLOW_CDU,
			this.#componentDidUpdate.bind(this)
		);
		this.#eventBus.on(Block.EVENTS.FLOW_RENDER, this.#render.bind(this));
	}

	#unregisterEvents() {
		this.#eventBus.off(Block.EVENTS.INIT, this.#init.bind(this));
		this.#eventBus.off(
			Block.EVENTS.FLOW_CDM,
			this.#componentDidMount.bind(this)
		);
		this.#eventBus.off(
			Block.EVENTS.FLOW_CDU,
			this.#componentDidUpdate.bind(this)
		);
		this.#eventBus.off(Block.EVENTS.FLOW_RENDER, this.#render.bind(this));
	}

	#init() {
		this.init();
		this.#eventBus.emit(Block.EVENTS.FLOW_RENDER);
	}

	init() {}

	#componentDidMount() {
		this.componentDidMount();
	}

	componentDidMount() {}

	#componentDidUpdate(oldProps, newProps) {
		const shouldUpdate = this.componentDidUpdate(oldProps, newProps);

		if (shouldUpdate) {
			this.#eventBus.emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	componentDidUpdate(oldProps, newProps) {
		return JSON.stringify(oldProps) !== JSON.stringify(newProps);
	}

	#setupElement(tagName, className = "", attributes = {}) {
		const element = document.createElement(tagName);

		if (className) {
			element.className = className;
		}

		Object.entries(attributes).forEach(([key, value]) => {
			if (value !== undefined) {
				element.setAttribute(key, value);
			}
		});

		this.#element = element;
	}

	#render() {
		return this.#element;
	}

	getElement() {
		return this.#element;
	}

	setProps(nextProps) {
		if (!nextProps) return;

		const oldProps = { ...this.props };
		this.props = { ...this.props, ...nextProps };

		this.#eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
	}

	getProps() {
		return this.props;
	}

	on(eventName, handler) {
		this.#element?.addEventListener(eventName, handler);
	}

	off(eventName, handler) {
		this.#element?.removeEventListener(eventName, handler);
	}

	emit(event, ...args) {
		this.#eventBus.emit(event, ...args);
	}

	subscribe(event, callback) {
		this.#eventBus.on(event, callback);
	}

	unsubscribe(event, callback) {
		this.#eventBus.off(event, callback);
	}

	destroy() {
		this.#unregisterEvents();
		this.#element?.remove();
		this.#element = null;
	}
}

export default Block;
