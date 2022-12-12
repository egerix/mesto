import Card from './Card.js'
import FormValidator from './FormValidator.js'

const popupPerson = document.querySelector('#person-popup');
const popupAddPlace = document.querySelector('#add-place-popup');
const popupFullImage = document.querySelector('#full-image-popup');
const personForm = popupPerson.querySelector('#person-form');
const personNameInput = popupPerson.querySelector('#username');
const personProfessionInput = popupPerson.querySelector('#profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const formAddPlace = popupAddPlace.querySelector('#add-place-form');
const placeNameInput = popupAddPlace.querySelector('#place-name');
const placeLinkInput = popupAddPlace.querySelector('#place-link');
const popupImage = popupFullImage.querySelector('.popup__image');
const popupBottomLabel = popupFullImage.querySelector('.popup__bottom-label');
const popupEditProfileBtn = document.querySelector('.profile__edit-button');
const popupAddPlaceBtn = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup')
const popupOpenedSelector = '.popup_opened';
const buttonEscKeycode = 27;

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputInvalidClass: 'popup__input_invalid',
    submitButtonSelector: '.popup__submit',
    submitInactiveClass: 'popup__submit_inactive',
    inputErrorSelector: '.popup__input-error',
    inputErrorVisibleClass: 'popup__input-error_visible',
}

initialCards.reverse().forEach((cardData) => addPlace({title: cardData.name, imgUrl: cardData.link}))

function handleEscKeydown(evt) {
    if (evt.keyCode === buttonEscKeycode) {
        const popupOpened = document.querySelector(popupOpenedSelector)
        closePopup(popupOpened)
    }
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscKeydown);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscKeydown);
}

function handleCardClick({imgUrl, title}) {
    popupImage.src = imgUrl;
    popupImage.alt = title;
    popupBottomLabel.textContent = title;
    openPopup(popupFullImage);
}

function createCard({title, imgUrl}) {
    return new Card({
        title,
        link: imgUrl,
        templateSelector: '#place-template',
        handleCardClick: handleCardClick
    }).createCard();
}

function addPlace({title, imgUrl}) {
    const cardElement = createCard({title, imgUrl});
    placesList.prepend(cardElement)
}

// Place popup
const addPlaceFormValidator = new FormValidator({config: validationConfig, targetForm: formAddPlace});
addPlaceFormValidator.enableValidation();

function handleAddPlaceFormSubmit(e) {
    e.preventDefault();
    addPlace({
        title: placeNameInput.value,
        imgUrl: placeLinkInput.value
    })
    formAddPlace.reset();
    closePopup(popupAddPlace);
}

formAddPlace.addEventListener('submit', handleAddPlaceFormSubmit);
popupAddPlaceBtn.addEventListener('click', () => {
    addPlaceFormValidator.resetValidationState();
    formAddPlace.reset();
    openPopup(popupAddPlace);
});

// Person popup
const personFormValidator = new FormValidator({config: validationConfig, targetForm: personForm});
personFormValidator.enableValidation();

function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = personNameInput.value;
    profileProfession.textContent = personProfessionInput.value;
    closePopup(popupPerson);
}

popupEditProfileBtn.addEventListener('click', () => {
    personNameInput.value = profileName.textContent;
    personProfessionInput.value = profileProfession.textContent;
    personFormValidator.resetValidationState();
    openPopup(popupPerson)
});
personForm.addEventListener('submit', handleProfileFormSubmit);

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
});