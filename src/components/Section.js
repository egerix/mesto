export default class Section {
    constructor({containerSelector, renderer}) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addItem({item, isAppend}) {
        if (isAppend) {
            this._container.append(item);
        } else {
            this._container.prepend(item);
        }
    }

    renderItems(items) {
        items.forEach(this._renderer);
    }
}
