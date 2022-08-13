const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession');
const editProfileBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closePopupBtn = popup.querySelector('.popup__close');
const form = popup.querySelector('.popup__form');
const popupNameInput = popup.querySelector('#nameInput');
const popupProfessionInput = popup.querySelector('#professionInput');

function togglePopup() {
    if (!popup.classList.contains('popup_opened')) {
        popupNameInput.value = profileName.textContent;
        popupProfessionInput.value = profileProfession.textContent;
    }
    popup.classList.toggle('popup_opened');
}

function submitProfile(e) {
    console.log('afasf')
    e.preventDefault();
    profileName.textContent = popupNameInput.value;
    profileProfession.textContent = popupProfessionInput.value;
    togglePopup();
}

editProfileBtn.addEventListener('click', togglePopup);
closePopupBtn.addEventListener('click', togglePopup);
form.addEventListener('submit', submitProfile);
