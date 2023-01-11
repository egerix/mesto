import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {validationConfig} from "../utils/config";
import {
    initialCards, elements, selectors
} from "../utils/constants";

const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
        const validator = new FormValidator({targetForm: formElement, config})
        const formName = formElement.getAttribute('name')
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};
enableValidation(validationConfig);

const popupWithImage = new PopupWithImage(selectors.popupImageSelector);
const places = new Section(
    {
        items: initialCards,
        renderer: (cardData) => {
            places.addItem({
                item: createCard({title: cardData.name, imgUrl: cardData.link}),
                isAppend: false
            });
        }
    }, selectors.placesListSelector)
places.render();

const userInfo = new UserInfo({
    nameSelector: selectors.profileNameSelector,
    professionSelector: selectors.profileProfessionSelector
});
const profilePopup = new PopupWithForm({
    popupSelector: selectors.popupPersonSelector,
    handleFormSubmit: (evt, value) => {
        evt.preventDefault();
        userInfo.setUserInfo(value);
        profilePopup.close();
        formValidators['person-form'].resetValidationState();
    }
});
profilePopup.setEventListeners();

const addPlacePopup = new PopupWithForm({
    popupSelector: selectors.popupAddPlaceSelector,
    handleFormSubmit: (evt, value) => {
        evt.preventDefault();
        places.addItem({
            item: createCard({title: value['place-name'], imgUrl: value['place-link']}),
            isAppend: false
        });
        addPlacePopup.close();
    }
});
addPlacePopup.setEventListeners();

function handleCardClick({src, title}) {
    popupWithImage.open({src, title})
}
popupWithImage.setEventListeners();

function createCard({title, imgUrl}) {
    return new Card({
        title,
        link: imgUrl,
        templateSelector: selectors.placeTemplateSelector,
        handleCardClick: () => handleCardClick({src: imgUrl, title})
    }).createCard();
}

elements.popupEditProfileBtn.addEventListener('click', () => {
    profilePopup.setInputValues(userInfo.getUserInfo())
    profilePopup.open();
});
elements.popupAddPlaceBtn.addEventListener('click', () => {
    formValidators['add-place-form'].resetValidationState();
    addPlacePopup.open();
});
