import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popup.querySelector('.popup__image');
        this._descriptionElement = this._popup.querySelector('.popup__bottom-label');
    }

    open({src, title}) {
        this._src = src;
        this._title = title;
        this._imageElement.src = this._src;
        this._imageElement.alt = this._title;
        this._descriptionElement.textContent = this._title;
        super.open();
    }

}
