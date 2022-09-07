
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
const placeTemplate = document.querySelector('#place-template');
const popupEditProfileBtn = document.querySelector('.profile__edit-button');
const popupAddPlaceBtn = document.querySelector('.profile__add-button');
const popupClosePersonBtn = popupPerson.querySelector('.popup__close');
const popupCloseAddPlaceBtn = popupAddPlace.querySelector('.popup__close');
const popupCloseFullImageBtn = popupFullImage.querySelector('.popup__close');
const placesList = document.querySelector('.places__list');
const formAddPlaceSubmitBtn = document.querySelector('#submit-add-place');
const popupOpenedSelector = '.popup_opened';
const submitInactiveClass = 'popup__submit_inactive';
const buttonEscKeycode = 27;

initialCards.reverse().forEach((cardData) => addPlace({title: cardData.name, imgUrl: cardData.link}))

function disableSubmitBtn(submitBtn) {
    submitBtn.classList.add(submitInactiveClass);
    submitBtn.setAttribute("disabled", "");
}

function handlePopupClick({evt, popup}) {
    if (evt.target.closest(popupOpenedSelector))
        evt.stopPropagation();
    else {
        closePopup(popup)
    }
}

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

function getPlaceElement({title, imgUrl}) {
    const template = placeTemplate.content.cloneNode(true);
    const placeElement = template.querySelector('.place');
    const placeImage = placeElement.querySelector('.place__photo');
    const likeBtn = placeElement.querySelector('.place__like-button');
    const deleteBtn = placeElement.querySelector('.place__delete-button');

    placeElement.querySelector('.place__name').textContent = title;
    placeImage.src = imgUrl;
    placeImage.alt = title;

    likeBtn.addEventListener('click', () => handleLikeBtnClick(likeBtn));
    placeImage.addEventListener('click', () => handleImageClick({imgUrl, title}));
    deleteBtn.addEventListener('click', () => placeElement.remove());
    return placeElement;
}

function handleLikeBtnClick(element) {
    element.classList.toggle('like-button__state_liked');
}

function handleImageClick({imgUrl, title}) {
    popupImage.src = imgUrl;
    popupImage.alt = title;
    popupBottomLabel.textContent = title;
    openPopup(popupFullImage);
}


function addPlace({title, imgUrl}) {
    placesList.prepend(getPlaceElement({title, imgUrl}))
}

// Place popup
function handleAddPlaceFormSubmit(e) {
    e.preventDefault();
    addPlace({
        title: placeNameInput.value,
        imgUrl: placeLinkInput.value
    })
    formAddPlace.reset();
    closePopup(popupAddPlace);
    disableSubmitBtn(formAddPlaceSubmitBtn);
}


formAddPlace.addEventListener('submit', handleAddPlaceFormSubmit);
popupAddPlaceBtn.addEventListener('click', () => openPopup(popupAddPlace));

// Person popup
function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = personNameInput.value;
    profileProfession.textContent = personProfessionInput.value;
    closePopup(popupPerson);
}

popupEditProfileBtn.addEventListener('click', () => {
    personNameInput.value = profileName.textContent;
    personProfessionInput.value = profileProfession.textContent;
    openPopup(popupPerson)
});
personForm.addEventListener('submit', handleProfileFormSubmit);

popupClosePersonBtn.addEventListener('click', () => closePopup(popupPerson));
popupCloseAddPlaceBtn.addEventListener('click', () => closePopup(popupAddPlace));
popupCloseFullImageBtn.addEventListener('click', () => closePopup(popupFullImage));

popupPerson.addEventListener('click', (evt) => handlePopupClick({evt, popup: popupPerson}));
popupAddPlace.addEventListener('click', (evt) => handlePopupClick({evt, popup: popupAddPlace}));
popupFullImage.addEventListener('click', (evt) => handlePopupClick({evt, popup: popupFullImage}));