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

const addPlaceFormValidator = new FormValidator({config: validationConfig, targetForm: elements.formAddPlace});
addPlaceFormValidator.enableValidation();

const personFormValidator = new FormValidator({config: validationConfig, targetForm: elements.personForm});
personFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(selectors.popupImageSelector);
const places = new Section(
    {
        items: initialCards,
        renderer: function (cardData) {
            this.addItem({
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
    handleFormSubmit: function (evt, value) {
        evt.preventDefault();
        userInfo.setUserInfo(value);
        this.close();
        personFormValidator.resetValidationState();
    }
});
profilePopup.setEventListeners();

const addPlacePopup = new PopupWithForm({
    popupSelector: selectors.popupAddPlaceSelector,
    handleFormSubmit: function (evt, value) {
        evt.preventDefault();
        places.addItem({
            item: createCard({title: value['place-name'], imgUrl: value['place-link']}),
            isAppend: false
        });
        this.close();
        addPlaceFormValidator.resetValidationState();
    }
});
addPlacePopup.setEventListeners();

function handleCardClick({src, title}) {
    popupWithImage.setEventListeners();
    popupWithImage.open({src, title})
}

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
    addPlacePopup.open();
});
