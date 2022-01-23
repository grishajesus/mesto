class Api {
    constructor(options) {
        const { baseUrl, headers } = options;

        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getCurrentUser() {
        const url = this.baseUrl + "/users/me";

        return fetch(url, { headers: this.headers }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    getPlaces() {
        const url = this.baseUrl + "/cards";

        return fetch(url, { headers: this.headers }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    updateUser(data) {
        const url = this.baseUrl + "/users/me";

        return fetch(url, {
            method: "PATCH",
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    updateUserAvatar(avatar) {
        const url = this.baseUrl + "/users/me/avatar";
        const body = { avatar };

        return fetch(url, {
            method: "PATCH",
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    createCard(data) {
        const url = this.baseUrl + "/cards";

        return fetch(url, {
            method: "POST",
            headers: {
                ...this.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteCard(id) {
        const url = this.baseUrl + "/cards/" + id;

        return fetch(url, {
            method: "DELETE",
            headers: this.headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    createLike(cardId) {
        const url = this.baseUrl + `/cards/${cardId}/likes`;

        return fetch(url, {
            method: "PUT",
            headers: this.headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteLike(cardId) {
        const url = this.baseUrl + `/cards/${cardId}/likes`;

        return fetch(url, {
            method: "DELETE",
            headers: this.headers,
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}

const api = new Api({
    baseUrl: "https://nomoreparties.co/v1/cohort-28",
    headers: { authorization: "d70652f2-87da-4c2e-8e5b-697807750bdf" },
});

export { Api, api };
