import EventBus from "./EventBus";

class Block {
	static EVENTS = {
		INIT: "init",
		FLOW_CDM: "flow:component-did-mount",
		FLOW_CDU: "flow:component-did-update",
		FLOW_RENDER: "flow:render",
	};

	id = crypto.randomUUID();
	#element;
	#eventBus;
	props;
	children;
	#isEventsRegistered = false;
	#isInitialized = false;
	#isMounted = false;
	#isRendered = false;

	#boundInit;
	#boundComponentDidMount;
	#boundComponentDidUpdate;
	#boundRender;

	constructor({
		tagName = "div",
		className = "",
		attributes = {},
		eventBus = EventBus.getInstance(),
		...props
	} = {}) {
		this.#eventBus = eventBus;
		this.props = props;
		this.children = this.#getChildren(props);
		this.props = this.#makePropsProxy(props);
		this.#setupElement(tagName, className, attributes);

		this.#boundInit = this.#init.bind(this);
		this.#boundComponentDidMount = this.#componentDidMount.bind(this);
		this.#boundComponentDidUpdate = this.#componentDidUpdate.bind(this);
		this.#boundRender = this.#render.bind(this);

		this.#registerEvents(this.#eventBus);
		this.#eventBus.emit(Block.EVENTS.INIT);
	}

	#setupElement(tagName, className = "", attributes = {}) {
		const el = document.createElement(tagName);
		el.setAttribute("data-id", this.id);

		if (className) {
			el.className = className;
		}

		Object.entries(attributes).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== "") {
				el.setAttribute(key, value);
			}
		});

		this.#element = el;
		//console.log("Элемент создан", this.#element);
	}

	get element() {
		return this.#element;
	}

	getContent() {
		if (!this.#element) {
			console.error("Element is not created. Check #setupElement.");
			this.#render();
		}

		return this.#element;
	}

	setContent(content) {
		//this.#element.replaceWith(content);
		this.#element = content;
	}

	createFragment(...elements) {
		const fragment = new DocumentFragment();
		elements.forEach((element) => {
			if (element) {
				fragment.append(element);
			}
		});
		//console.log("Фрагмент создан", fragment);
		return fragment;
	}

	#render() {
		if (this.#isRendered) return;
		this.#isRendered = true;

		const fragment = this.render();
		this.#removeEvents();

		const newElement = fragment.firstElementChild;
		if (!newElement) {
			console.error(
				"Fragment does not contain any elements. Check the render method."
			);
			return;
		}

		if (this.#element && newElement) {
			this.#element.replaceWith(newElement);
			this.#element = newElement;
		} else if (!this.#element && newElement) {
			this.#element = newElement;
		}

		this.#addEvents();
		//console.log("render", this.#element);
	}

	//Можно переопределить в дочернем классе
	render() {
		if (!this.#element) {
			console.error("Element is not created. Check #setupElement.");
			return new DocumentFragment();
		}

		return this.createFragment(this.#element);
	}

	#getChildren(propsAndChildren) {
		const props = {};
		const children = {};
		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});
		return { props, children };
	}

	#addEvents() {
		const events = this.props.events;
		if (!events) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this.#element?.addEventListener(event, listener);
		});
	}

	#removeEvents() {
		const events = this.props.events;
		if (!events || !this.#element) {
			return;
		}

		Object.entries(events).forEach(([event, listener]) => {
			this.#element?.removeEventListener(event, listener);
		});
	}

	#registerEvents() {
		if (this.#isEventsRegistered) {
			return;
		}
		this.#isEventsRegistered = true;

		this.#eventBus.on(Block.EVENTS.INIT, this.#boundInit);
		this.#eventBus.on(Block.EVENTS.FLOW_CDM, this.#boundComponentDidMount);
		this.#eventBus.on(Block.EVENTS.FLOW_CDU, this.#boundComponentDidUpdate);
		this.#eventBus.on(Block.EVENTS.FLOW_RENDER, this.#boundRender);
		//console.log("registerEvents", this);
	}

	#init() {
		if (this.#isInitialized) return;

		this.#isInitialized = true;

		this.init();
		this.#eventBus.emit(Block.EVENTS.FLOW_RENDER);
		//console.log("init", this);
	}

	init() {
		//Можно переопределить в дочернем классе
	}

	#componentDidMount() {
		if (this.#isMounted) return;
		//console.log("componentDidMount", this);

		this.#isMounted = true;
		this.componentDidMount();
	}

	componentDidMount() {
		//Можно переопределить в дочернем классе
	}

	dispatchComponentDidMount() {
		this.#eventBus.emit(Block.EVENTS.FLOW_CDM);
		console.log("dispatchComponentDidMount", this);

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((ch) => ch.dispatchComponentDidMount());
			} else {
				console.log("child", child);
				child.dispatchComponentDidMount();
			}
		});
	}

	#componentDidUpdate(oldProps, newProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (response) {
			this.#eventBus.emit(Block.EVENTS.FLOW_RENDER);
		}
	}

	componentDidUpdate(oldProps, newProps) {
		if (!oldProps || !newProps) return true;
		return JSON.stringify(oldProps) !== JSON.stringify(newProps);
	}

	setProps(nextProps) {
		if (!nextProps) return;
		const oldProps = { ...this.props };
		Object.assign(this.props, nextProps);

		this.#eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
	}

	#makePropsProxy(props) {
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === "function" ? value.bind(target) : value;
			},
			set(target, prop, value) {
				const oldTarget = { ...target };
				target[prop] = value;
				self.#eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error("Нет доступа");
			},
		});
	}

	destroy() {
		this.#removeEvents();
		this.#element?.remove();
		this.#element = null;

		this.#eventBus.off(Block.EVENTS.INIT, this.#boundInit);
		this.#eventBus.off(Block.EVENTS.FLOW_CDM, this.#boundComponentDidMount);
		this.#eventBus.off(
			Block.EVENTS.FLOW_CDU,
			this.#boundComponentDidUpdate
		);
		this.#eventBus.off(Block.EVENTS.FLOW_RENDER, this.#boundRender);
	}
}

export default Block;
