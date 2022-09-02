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
const closePopupBtns = document.querySelectorAll('.popup__close');

const placesList = document.querySelector('.places__list');

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

function getPlaceElement({title, imgUrl}) {
    const template = placeTemplate.content.cloneNode(true);
    const placeElement = template.querySelector('.place');
    const placeImage = placeElement.querySelector('.place__photo');
    const likeBtn = placeElement.querySelector('.place__like-button');
    const deleteBtn = placeElement.querySelector('.place__delete-button');

    placeElement.querySelector('.place__name').textContent = title;
    placeImage.src = imgUrl;
    placeImage.alt = title;

    likeBtn.addEventListener('click', (e) => {
        e.target.classList.toggle('like-button__state_liked');
    });
    placeElement.addEventListener('click', (e) => {
        popupImage.src = imgUrl;
        popupBottomLabel.textContent = title;
        openPopup(fullImagePopup);
    });
    deleteBtn.addEventListener('click', () => placeElement.remove());
    return placeElement;
}

function addPlace({title, imgUrl}) {
    placesList.prepend(getPlaceElement({title, imgUrl}))
}

initialCards.reverse().forEach((it) => addPlace({title: it.name, imgUrl: it.link}))

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

closePopupBtns.forEach((btn) => btn.addEventListener('click', closePopup));

// Place popup
function submitAddPlace(e) {
    e.preventDefault();
    addPlace({
        title: placeNameInput.value,
        imgUrl: placeLinkInput.value
    })
    closePopup()
}

addPlaceForm.addEventListener('submit', submitAddPlace);
addPlaceBtn.addEventListener('click', () => openPopup(addPlacePopup));

// Person popup
function submitProfile(e) {
    e.preventDefault();
    profileName.textContent = personNameInput.value;
    profileProfession.textContent = personProfessionInput.value;
    closePopup();
}

editProfileBtn.addEventListener('click', () => {
    personNameInput.value = profileName.textContent;
    personProfessionInput.value = profileProfession.textContent;
    openPopup(personPopup)
});
personForm.addEventListener('submit', submitProfile);
