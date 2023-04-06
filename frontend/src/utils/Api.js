class Api {
  constructor(options){
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInfoUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse)
  }

  giveInfoUser(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "about": about,
      })
    }).then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse)
  }

  giveCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "link": link,
      })
    }).then(this._checkResponse)
  }

  deletCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  _giveLike(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  _deletLike(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLiked){
    if(isLiked){
      return this._giveLike(cardId);
    }
    return this._deletLike(cardId);
  }

  giveAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "avatar": link,
      })
    }).then(this._checkResponse)
  }
}


export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-54',
  headers: {
    authorization: '2d501c6a-6776-4e0b-86d9-79075000c37d',
    'Content-Type': 'application/json'
  }
});
