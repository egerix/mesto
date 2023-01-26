import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__input');
        this._submitBtn = this._popup.querySelector('.popup__submit')
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(element => {
            this._formValues[element.name] = element.value;
        });
        return this._formValues;
    }

    setInputValues(inputValues) {
        this._inputList.forEach((element) => {
            element.value = inputValues[element.name];
        })
    }

    setEventListeners() {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(evt, this._getInputValues());
        });
    }

    showLoading() {
        this._submitBtn.textContent = 'Сохранение...';
    }

    hideLoading() {
        this._submitBtn.textContent = 'Сохранить';
    }

    close() {
        this._form.reset();
        super.close();
    }
}
