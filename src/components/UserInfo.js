export default class UserInfo {
    constructor({nameSelector, professionSelector, avatarSelector}) {
        this._avatarElement = document.querySelector(avatarSelector);
        this._nameElement = document.querySelector(nameSelector);
        this._professionElement = document.querySelector(professionSelector);
    }

    getUserInfo() {
        return {
            username: this._nameElement.textContent,
            profession: this._professionElement.textContent,
            id: this._id
        }
    }

    setUserInfo({id, username, profession}) {
        this._nameElement.textContent = username;
        this._professionElement.textContent = profession;
        this._id = id;
    }

    getUserAvatar() {
        return this._avatarSrc;
    }

    setUserAvatar(avatarSrc) {
        this._avatarSrc = avatarSrc;
        this._avatarElement.src = avatarSrc;
    }
}
