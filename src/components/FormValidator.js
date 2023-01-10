export default class FormValidator {
    constructor({config, targetForm}) {
        this._config = config;
        this._targetForm = targetForm;
        this._inputList = Array.from(this._targetForm.querySelectorAll(this._config.inputSelector));
        this._errorElementsMap = new Map(
            this._inputList.map((input) =>
                [input.id, this._targetForm.querySelector(`#${input.id}-error`)]
            )
        );
        this._submitBtnElement = this._targetForm.querySelector(this._config.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorElement = this._errorElementsMap.get(inputElement.id);
        inputElement.classList.add(this._config.inputInvalidClass);
        errorElement.classList.add(this._config.inputErrorVisibleClass);
        if (inputElement.validity.valueMissing) {
            errorElement.textContent = "Вы пропустили это поле.";
        } else if (inputElement.validity.tooShort) {
            errorElement.textContent = "Текст слишком короткий.";
        } else {
            errorElement.textContent = inputElement.validationMessage;
        }
    }

    _hideInputError(inputElement) {
        const errorElement = this._errorElementsMap.get(inputElement.id);
        inputElement.classList.remove(this._config.inputInvalidClass);
        errorElement.classList.remove(this._config.inputErrorVisibleClass);
        errorElement.textContent = '';
    }

    _validateInput(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setButtonState() {
        const hasErrors = this._inputList.some((inputElement) => !inputElement.validity.valid)
        if (hasErrors) {
            this._submitBtnElement.classList.add(this._config.submitInactiveClass);
            this._submitBtnElement.setAttribute("disabled", "");
        } else {
            this._submitBtnElement.classList.remove(this._config.submitInactiveClass);
            this._submitBtnElement.removeAttribute("disabled");
        }
    }

    _setInputEventListeners() {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._validateInput(inputElement);
                this._setButtonState();
            });
        });
    }

    enableValidation() {
        this._targetForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setInputEventListeners();
    }

    resetValidationState() {
        this._inputList.forEach(inputElement => this._hideInputError(inputElement));
        this._setButtonState();
    }
}
