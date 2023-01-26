export default class Card {

    constructor({
                    id,
                    isRemovable,
                    title,
                    link,
                    isLiked,
                    likes = 0,
                    templateSelector,
                    handleCardClick,
                    handleDeleteClick,
                    handleLikeClick
                }) {
        this._id = id;
        this._isRemovable = isRemovable;
        this._title = title;
        this._link = link;
        this._likes = likes;
        this._isLiked = isLiked;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteClick = handleDeleteClick;
        this._likedClass = 'like-button__state_liked';
    }

    getId() {
        return this._id;
    }

    createCard() {
        this._initElements()
        this._setData()
        this._setEventListeners()
        return this._cardElement;
    }

    remove() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    toggleLike() {
        this._likeBtnElement.classList.toggle(this._likedClass)
        this._isLiked = !this._isLiked;
    }

    isLiked() {
        return this._isLiked;
    }

    setLikesCount(count) {
        this._likesCountElement.textContent = count;
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
        this._likesCountElement = this._cardElement.querySelector('.place__like-counter');
        this._initLikeButton();
        this._initDeleteButton();
    }

    _initDeleteButton() {
        this._deleteBtnElement = this._cardElement.querySelector('.place__delete-button');
        if (!this._isRemovable) {
            this._deleteBtnElement.disable = true;
            this._deleteBtnElement.classList.add('place__delete-button_hidden')
        }
    }

    _initLikeButton() {
        this._likeBtnElement = this._cardElement.querySelector('.place__like-button');
        if (this._isLiked) {
            this._likeBtnElement.classList.add(this._likedClass)
        }
    }

    _setData() {
        this._titleElement.textContent = this._title;
        this._imageElement.src = this._link;
        this._imageElement.alt = this._title;
        this.setLikesCount(this._likes.length);
    }


    _setEventListeners() {
        this._imageElement.addEventListener('click', this._handleImageClick);
        this._likeBtnElement.addEventListener('click', () => this._handleLikeClick(this));
        this._deleteBtnElement.addEventListener('click', () => this._handleDeleteClick(this));
    }

    _handleImageClick = () => {
        this._handleCardClick({
            title: this._title,
            imgUrl: this._link
        })
    }

}
