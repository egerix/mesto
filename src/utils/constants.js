const elements = {
    personForm: document.querySelector('#person-form'),
    formAddPlace: document.querySelector('#add-place-form'),
    avatarEditProfileBtn: document.querySelector('.profile__avatar-container'),
    popupEditProfileBtn: document.querySelector('.profile__edit-button'),
    popupAddPlaceBtn: document.querySelector('.profile__add-button'),
}

const selectors = {
    popupPersonSelector: '#person-popup',
    popupAvatarSelector: '#change-avatar-popup',
    popupAddPlaceSelector: '#add-place-popup',
    profileNameSelector: '.profile__name',
    profileAvatarSelector: '.profile__avatar',
    confirmDeletePopupSelector: '#confirm-delete-popup',
    popupImageSelector: '#full-image-popup',
    placeTemplateSelector: '#place-template',
    profileProfessionSelector: '.profile__profession',
    placesListSelector: '.places__list',
}


export {
    elements,
    selectors,
}
