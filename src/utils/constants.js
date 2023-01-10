const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const elements = {
    personForm: document.querySelector('#person-form'),
    formAddPlace: document.querySelector('#add-place-form'),
    popupEditProfileBtn: document.querySelector('.profile__edit-button'),
    popupAddPlaceBtn: document.querySelector('.profile__add-button'),
}

const selectors = {
    popupPersonSelector: '#person-popup',
    popupAddPlaceSelector: '#add-place-popup',
    profileNameSelector: '.profile__name',
    popupImageSelector: '#full-image-popup',
    placeTemplateSelector: '#place-template',
    profileProfessionSelector: '.profile__profession',
    placesListSelector: '.places__list',
}


export {
    initialCards,
    elements,
    selectors,
}
