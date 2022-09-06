const personPopup = document.querySelector('#person-popup');
const addPlacePopup = document.querySelector('#add-place-popup');
const fullImagePopup = document.querySelector('#full-image-popup');

const personForm = personPopup.querySelector('#person-form');
const personNameInput = personPopup.querySelector('#username');
const personProfessionInput = personPopup.querySelector('#profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const addPlaceForm = addPlacePopup.querySelector('#add-place-form');
const placeNameInput = addPlacePopup.querySelector('#place-name');
const placeLinkInput = addPlacePopup.querySelector('#place-link');

const popupImage = fullImagePopup.querySelector('.popup__image');
const popupBottomLabel = fullImagePopup.querySelector('.popup__bottom-label');

const placeTemplate = document.querySelector('#place-template');

const editProfileBtn = document.querySelector('.profile__edit-button');
const addPlaceBtn = document.querySelector('.profile__add-button');
const closePersonPopupBtn = personPopup.querySelector('.popup__close');
const closeAddPlacePopupBtn = addPlacePopup.querySelector('.popup__close');
const closeFullImagePopupBtn = fullImagePopup.querySelector('.popup__close');

const placesList = document.querySelector('.places__list');

initialCards.reverse().forEach((cardData) => addPlace({title: cardData.name, imgUrl: cardData.link}))

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
    openPopup(fullImagePopup);
}


function addPlace({title, imgUrl}) {
    placesList.prepend(getPlaceElement({title, imgUrl}))
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

// Place popup
function handleAddPlaceFormSubmit(e) {
    e.preventDefault();
    addPlace({
        title: placeNameInput.value,
        imgUrl: placeLinkInput.value
    })
    addPlaceForm.reset();
    closePopup(addPlacePopup)
}

addPlaceForm.addEventListener('submit', handleAddPlaceFormSubmit);
addPlaceBtn.addEventListener('click', () => openPopup(addPlacePopup));

// Person popup
function handleProfileFormSubmit(e) {
    e.preventDefault();
    profileName.textContent = personNameInput.value;
    profileProfession.textContent = personProfessionInput.value;
    closePopup(personPopup);
}

editProfileBtn.addEventListener('click', () => {
    personNameInput.value = profileName.textContent;
    personProfessionInput.value = profileProfession.textContent;
    openPopup(personPopup)
});
personForm.addEventListener('submit', handleProfileFormSubmit);

closePersonPopupBtn.addEventListener('click', () => closePopup(personPopup));
closeAddPlacePopupBtn.addEventListener('click', () => closePopup(addPlacePopup));
closeFullImagePopupBtn.addEventListener('click', () => closePopup(fullImagePopup));

function handlePopupClick(evt, popup) {
    if (evt.target.closest(".popup__container"))
        evt.stopPropagation();
    else {
        closePopup(popup)
    }
}

function handlePopupKeyDown(evt) {
    if (evt.keyCode === 27) {
        closePopup(personPopup)
        closePopup(addPlacePopup)
        closePopup(fullImagePopup)
    }
}

personPopup.addEventListener('click', (evt) => handlePopupClick(evt, personPopup));
addPlacePopup.addEventListener('click', (evt) => handlePopupClick(evt, addPlacePopup));
fullImagePopup.addEventListener('click', (evt) => handlePopupClick(evt, fullImagePopup));

document.addEventListener('keydown', handlePopupKeyDown);