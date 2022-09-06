const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputInvalidClass: 'popup__input_invalid',
    submitButtonSelector: '.popup__submit',
    submitInactiveClass: 'popup__submit_inactive',
    inputErrorSelector: '.popup__input-error',
    inputErrorVisibleClass: 'popup__input-error_visible',
}

function showInputError({formElement, inputElement, config}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputInvalidClass);
    errorElement.classList.add(config.inputErrorVisibleClass);
    if (inputElement.validity.valueMissing) {
        errorElement.textContent = "Вы пропустили это поле.";
    } else if (inputElement.validity.tooShort) {
        errorElement.textContent = "Текст слишком короткий.";
    } else {
        errorElement.textContent = inputElement.validationMessage;
    }
}

function hideInputError({formElement, inputElement, config}) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputInvalidClass);
    errorElement.classList.remove(config.inputErrorVisibleClass);

    errorElement.textContent = '';
}

function validateInput({formElement, inputElement, config}) {
    if (!inputElement.validity.valid) {
        showInputError({formElement, inputElement, config});
    } else {
        hideInputError({formElement, inputElement, config});
    }
}

function setButtonState({inputList, submitBtnElement, config}) {
    const hasErrors = inputList.some((inputElement) => !inputElement.validity.valid)
    if (hasErrors) {
        submitBtnElement.classList.add(config.submitInactiveClass);
        submitBtnElement.setAttribute("disabled", "");
    } else {
        submitBtnElement.classList.remove(config.submitInactiveClass);
        submitBtnElement.removeAttribute("disabled");
    }
}

function setInputEventListeners({formElement, config}) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitBtnElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            validateInput({formElement, inputElement, config});
            setButtonState({inputList, submitBtnElement, config});
        });
    });
}

function enableValidation(config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setInputEventListeners({formElement, config});
    });
}

enableValidation(validationConfig);
