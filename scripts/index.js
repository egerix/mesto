const personPopup = document.querySelector('#personPopup');
const addPlacePopup = document.querySelector('#addPlacePopup');
const fullImagePopup = document.querySelector('#fullImagePopup');

const personForm = personPopup.querySelector('#personForm');
const personNameInput = personPopup.querySelector('#personNameInput');
const personProfessionInput = personPopup.querySelector('#personProfessionInput');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');

const addPlaceForm = addPlacePopup.querySelector('#addPlaceForm');
const placeNameInput = addPlacePopup.querySelector('#placeNameInput');
const placeLinkInput = addPlacePopup.querySelector('#placeLinkInput');

const popupImage = fullImagePopup.querySelector('.popup__image');
const popupBottomLabel = fullImagePopup.querySelector('.popup__bottom-label');

const placeTemplate = document.querySelector('#placeTemplate');

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
    placeElement.addEventListener('click', () => handleImageClick({imgUrl, title}));
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
    placeLinkInput.value = '';
    placeNameInput.value = '';
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