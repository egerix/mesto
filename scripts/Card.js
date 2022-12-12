export default class Card {

    constructor({title, link, templateSelector, handleCardClick}) {
        this._title = title;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    createCard() {
        this._initElements()
        this._setData()
        this._setEventListeners()
        return this._cardElement;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .cloneNode(true);
    }

    _initElements() {
        const template = this._getTemplate();
        this._cardElement = template.querySelector('.place');
        this._titleElement = this._cardElement.querySelector('.place__name');
        this._imageElement = this._cardElement.querySelector('.place__photo');
        this._likeBtnElement = this._cardElement.querySelector('.place__like-button');
        this._deleteBtnElement = this._cardElement.querySelector('.place__delete-button');
    }

    _setData() {
        this._titleElement.textContent = this._title;
        this._imageElement.src = this._link;
        this._imageElement.alt = this._title;
    }

    _setEventListeners() {
        this._likeBtnElement.addEventListener('click', this._toggleLike);
        this._deleteBtnElement.addEventListener('click', this._deleteCard);
        this._imageElement.addEventListener('click', this._handleImageClick);
    }

    _toggleLike = () => {
        this._likeBtnElement.classList.toggle('like-button__state_liked')
    }

    _deleteCard = () => {
        this._cardElement.remove()
    }

    _handleImageClick = () => {
        this._handleCardClick({
            title: this._title,
            imgUrl: this._link
        })
    }
}