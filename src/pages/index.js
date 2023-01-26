import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import ConfirmPopup from '../components/ConfirmPopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
import {apiConfig, validationConfig} from "../utils/config";
import {elements, selectors} from "../utils/constants";


const api = new Api(apiConfig);

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
const places = new Section(selectors.placesListSelector)

const userInfo = new UserInfo({
    nameSelector: selectors.profileNameSelector,
    professionSelector: selectors.profileProfessionSelector,
    avatarSelector: selectors.profileAvatarSelector,
});

const profilePopup = new PopupWithForm({
    popupSelector: selectors.popupPersonSelector,
    handleFormSubmit: (evt, value) => {
        evt.preventDefault();
        profilePopup.showLoading();
        api.updateUserInfo({name: value.username, about: value.profession})
            .then(data => {
                userInfo.setUserInfo({id: data._id, username: data.name, profession: data.about});
                profilePopup.close();
                formValidators['person-form'].resetValidationState();
            })
            .finally(()=> {
                profilePopup.hideLoading();
            })
    }
});

const profileAvatarPopup = new PopupWithForm({
    popupSelector: selectors.popupAvatarSelector,
    handleFormSubmit: (evt, value) => {
        evt.preventDefault();
        profileAvatarPopup.showLoading();
        api.updateAvatar({avatar: value['place-link']})
            .then(data => {
                userInfo.setUserAvatar(data.avatar);
                profileAvatarPopup.close();
                formValidators['change-avatar-form'].resetValidationState();
            })
            .finally(()=> {
                profileAvatarPopup.hideLoading();
            })
    }
});

const confirmDeletePopup = new ConfirmPopup({
    popupSelector: selectors.confirmDeletePopupSelector,
    confirmHandler: (card) => {
        api.removeCard(card.getId()).then(
            () => {
                card.remove();
                confirmDeletePopup.close();
            }
        );
    }
});

const addPlacePopup = new PopupWithForm({
    popupSelector: selectors.popupAddPlaceSelector,
    handleFormSubmit: (evt, value) => {
        evt.preventDefault();
        addPlacePopup.showLoading();
        api.addCard({name: value['place-name'], link: value['place-link']})
            .then(data => {
                places.addItem({
                    item: createCard({
                        id: data._id,
                        isRemovable: userInfo.getUserInfo().id === data.owner._id,
                        title: data.name,
                        imgUrl: data.link,
                        isLiked: false
                    }),
                    isAppend: false
                });
                addPlacePopup.close();
            })
            .finally(()=> {
                addPlacePopup.hideLoading();
            })
    }
});

profilePopup.setEventListeners();
confirmDeletePopup.setEventListeners()
addPlacePopup.setEventListeners();
popupWithImage.setEventListeners();
profileAvatarPopup.setEventListeners();

function handleCardClick({src, title}) {
    popupWithImage.open({src, title})
}

function createCard({id, title, imgUrl, likes, isLiked, isRemovable}) {
    return new Card({
        id,
        title,
        isRemovable,
        link: imgUrl,
        likes: likes,
        isLiked,
        templateSelector: selectors.placeTemplateSelector,
        handleCardClick: () => handleCardClick({src: imgUrl, title}),
        handleDeleteClick: (id) => handleRemoveClick(id),
        handleLikeClick: (card) => handleLikeClick(card)
    }).createCard();
}

const handleRemoveClick = function (element) {
    confirmDeletePopup.setData(element);
    confirmDeletePopup.open();
}

const handleLikeClick = function (card) {
    const request = card.isLiked() ? api.dislike(card.getId()) : api.like(card.getId());
    request.then(
        data => {
            card.setLikesCount(data.likes.length)
            card.toggleLike()
        }
    )
}

elements.popupEditProfileBtn.addEventListener('click', () => {
    profilePopup.setInputValues(userInfo.getUserInfo())
    formValidators['person-form'].resetValidationState();
    profilePopup.open();
});
elements.popupAddPlaceBtn.addEventListener('click', () => {
    formValidators['add-place-form'].resetValidationState();
    addPlacePopup.open();
});
elements.avatarEditProfileBtn.addEventListener('click', () => {
    profileAvatarPopup.setInputValues({
        "place-link": userInfo.getUserAvatar()
    })
    formValidators['change-avatar-form'].resetValidationState();
    profileAvatarPopup.open();
});

Promise.all([api.getUserInfo(), api.getCards()]).then(
    ([userData, cardsData]) => {
        userInfo.setUserInfo({
                id: userData._id,
                username: userData.name,
                profession: userData.about,
            }
        );
        userInfo.setUserAvatar(userData.avatar);
        cardsData.forEach(card => places.addItem(
            {
                item: createCard({
                    id: card._id,
                    isRemovable: userData._id === card.owner._id,
                    title: card.name,
                    imgUrl: card.link,
                    likes: card.likes,
                    isLiked: card.likes.find((like) => userData._id === like._id)
                }),
                isAppend: true
            }
        ));
    }
)
