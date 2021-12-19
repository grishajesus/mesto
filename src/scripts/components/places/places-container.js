import { api } from "src/scripts/api";

import { PlacesPresenter } from "./places-presenter";

class PlacesContainer {
    constructor(api, presenter) {
        this.api = api;
        this.presenter = presenter;

        this.userService = null;
    }

    async init() {
        const places = await this.api.getPlaces();

        this.presenter.setPlaces(places);
        this.presenter.setCallbacks({
            onCreateCard: this.api.createCard.bind(api),
            onDeleteCard: this.api.deleteCard.bind(api),
            onCreateLike: this.api.createLike.bind(api),
            onDeleteLike: this.api.deleteLike.bind(api),
            onCanDeleteCard: this._canDeleteCard,
            onLikeSettedByUser: this._likeSettedByUser,
        });
        this.presenter.render();
    }

    setUserService(service) {
        this.userService = service;
    }

    _canDeleteCard = (id) => {
        return this.userService.getUserId() === id;
    };

    _likeSettedByUser = (likes) => {
        const userId = this.userService.getUserId();

        const result = !!likes.find((like) => like._id === userId);

        return result;
    };
}

const placesContainer = new PlacesContainer(
    api,
    new PlacesPresenter({
        listSelector: "#places-list",
        cardTemplateSelector: "#place-card-template",
        createButtonSelector: ".profile__add-button",
    })
);

export { placesContainer };
