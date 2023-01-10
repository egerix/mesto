export default class UserInfo {
    constructor({nameSelector, professionSelector}) {
        this._nameElement = document.querySelector(nameSelector);
        this._professionElement = document.querySelector(professionSelector);
    }

    getUserInfo() {
        return {
            username: this._nameElement.textContent,
            profession: this._professionElement.textContent,
        }
    }

    setUserInfo({username, profession}) {
        this._nameElement.textContent = username;
        this._professionElement.textContent = profession;
    }

}
