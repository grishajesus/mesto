class Api {
    constructor(options) {
        const { baseUrl, headers } = options;

        this.baseUrl = baseUrl;
        this.headers = headers;

        this.defaultHandleResponse = this._defaultHandleResponse.bind(this);
    }

    async getCurrentUser() {
        const url = this.baseUrl + "/users/me";

        try {
            const response = await fetch(url, { headers: this.headers }).then(
                this.defaultHandleResponse
            );

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async getPlaces() {
        const url = this.baseUrl + "/cards";

        try {
            const response = await fetch(url, { headers: this.headers }).then(
                this.defaultHandleResponse
            );

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async updateUser(data) {
        const url = this.baseUrl + "/users/me";

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    ...this.headers,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(this.defaultHandleResponse);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUserAvatar(avatar) {
        const url = this.baseUrl + "/users/me/avatar";
        const body = { avatar };

        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    ...this.headers,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }).then(this.defaultHandleResponse);

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async createCard(data) {
        const url = this.baseUrl + "/cards";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    ...this.headers,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then(this.defaultHandleResponse);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteCard(id) {
        const url = this.baseUrl + "/cards/" + id;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: this.headers,
            }).then(this.defaultHandleResponse);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async createLike(cardId) {
        const url = this.baseUrl + `/cards/${cardId}/likes`;

        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: this.headers,
            }).then(this.defaultHandleResponse);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    async deleteLike(cardId) {
        const url = this.baseUrl + `/cards/${cardId}/likes`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: this.headers,
            }).then(this.defaultHandleResponse);

            return response;
        } catch (error) {
            console.error(error);
        }
    }

    _defaultHandleResponse(response) {
        if (response.ok) {
            return response.json();
        }

        return Promise.reject(response.status);
    }
}

const api = new Api({
    baseUrl: "https://nomoreparties.co/v1/cohort-28",
    headers: { authorization: "d70652f2-87da-4c2e-8e5b-697807750bdf" },
});

export { Api, api };
