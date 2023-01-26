import Popup from "./Popup.js";

export default class ConfirmPopup extends Popup {
    constructor({popupSelector, confirmHandler}) {
        super(popupSelector);
        this._confirmHandler = confirmHandler;
        this._button = this._popup.querySelector('.popup__submit');
    }

    setData(data) {
        this._data = data
    }

    setEventListeners() {
        super.setEventListeners()
        this._button.addEventListener('click', () => {
            this._confirmHandler(this._data)
        });
    }

    removeEventListener() {
        this._button.removeEventListener('click', this._confirmHandler);
    }
}
