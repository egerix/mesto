export default class Api {

    constructor({token, groupId, url}) {
        this._groupId = groupId;
        this._token = token;
        this._url = url;
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    _getConfigWithAuth(config) {
        if (!config) {
            config = {}
        }
        if (!config.headers) {
            config.headers = {}
        }
        config.headers.authorization = this._token
        return config;
    }

    _makeRequest(path, config) {
        const configWithAuth = this._getConfigWithAuth(config)
        return fetch(`${this._url}/v1/${this._groupId}/${path}`, configWithAuth)
            .then(this._handleResponse);
    }

    getUserInfo() {
        return this._makeRequest('users/me')
    }

    getCards() {
        return this._makeRequest('cards')
    }

    updateUserInfo({name, about}) {
        return this._makeRequest('users/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
    }

    addCard({name, link}) {
        return this._makeRequest('cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
    }

    removeCard(cardId) {
        return this._makeRequest(`cards/${cardId}`, {
            method: 'DELETE',
        })
    }

    like(cardId) {
        return this._makeRequest(`cards/${cardId}/likes`, {
            method: 'PUT',
        })
    }

    dislike(cardId) {
        return this._makeRequest(`cards/${cardId}/likes`, {
            method: 'DELETE',
        })
    }

    updateAvatar({avatar}) {
        return this._makeRequest('users/me/avatar ', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        })
    }

}
