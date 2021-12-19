class Section {
    constructor(options, containerSelector) {
        this.items = options.items;
        this.renderer = options.renderer;
        this.container = document.querySelector(containerSelector);
    }

    setItems(items) {
        this.items = items;
    }

    addItem(node) {
        this.container.prepend(node);
    }

    render() {
        if (this.items.length === 0 || !this.renderer) {
            return null;
        }

        this.items.forEach((item) => this.renderer(item));
    }
}

export { Section };
