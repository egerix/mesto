export default class Section {
    constructor(containerSelector) {
        this._container = document.querySelector(containerSelector);
    }

    addItem({item, isAppend}) {
        if (isAppend) {
            this._container.append(item);
        } else {
            this._container.prepend(item);
        }
    }
}
