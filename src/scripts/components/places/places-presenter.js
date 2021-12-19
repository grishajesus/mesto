import {
    placeImagePopup,
    placeCreatePopup,
    placeDeleteSurePopup,
} from "src/scripts/components/popup";
import { placeCreateFormValidator } from "src/scripts/components/validator";
import { Section } from "src/scripts/components/section";
import { Card } from "src/scripts/components/card";

class PlacesPresenter {
    constructor({ listSelector, cardTemplateSelector, createButtonSelector }) {
        this.list = listSelector;
        this.cardTemplate = cardTemplateSelector;
        this.createButton = document.querySelector(createButtonSelector);
        this._handleClickCard = placeImagePopup.open.bind(placeImagePopup);

        this.places = [];
        this.placesSection = null;
        this.callbacks = {};
    }

    setPlaces(places) {
        this.places = places;
    }

    setCallbacks(callbacks) {
        this.callbacks = callbacks;
    }

    render() {
        const { onCanDeleteCard, onLikeSettedByUser } = this.callbacks;

        this._setEventListeners();

        this.placesSection = new Section(
            {
                items: [...this.places].reverse(),
                renderer: (place) => {
                    const card = new Card({
                        place,
                        templateSelector: this.cardTemplate,
                        canDelete: onCanDeleteCard(place.owner._id),
                        likeSetted: onLikeSettedByUser(place.likes),
                        callbacks: {
                            onClickCard: this._handleClickCard,
                            onDeleteCard: this._handleDeleteCard,
                            onSetLike: this._handleSetLike,
                        },
                    });

                    const cardNode = card.createDOMNode();

                    this.placesSection.addItem(cardNode);
                },
            },
            this.list
        );

        this.placesSection.render();
    }

    _handleCreateSubmit = async (formData) => {
        const { onCreateCard } = this.callbacks;

        const response = await onCreateCard({
            name: formData.name,
            link: formData.link,
        });

        const card = new Card({
            place: response,
            templateSelector: this.cardTemplate,
            canDelete: true,
            canSetLike: true,
            callbacks: {
                onClickCard: this._handleClickCard,
                onDeleteCard: this._handleDeleteCard,
                onSetLike: this._handleSetLike,
            },
        });

        const cardNode = card.createDOMNode();

        this.placesSection.addItem(cardNode);
    };

    _handleSetLike = async (cardId, exists) => {
        const { onCreateLike, onDeleteLike } = this.callbacks;

        if (exists) {
            await onDeleteLike(cardId);
        } else {
            await onCreateLike(cardId);
        }
    };

    _handleDeleteCard = (id, callback) => {
        const { onDeleteCard } = this.callbacks;

        const handleDeleteSubmit = async () => {
            await onDeleteCard(id);

            callback();
        };

        placeDeleteSurePopup.setOnSubmitted(handleDeleteSubmit);
        placeDeleteSurePopup.open();
    };

    _handleClickOpenCreatePopup = () => {
        placeCreatePopup.setOnSubmitted(this._handleCreateSubmit);
        placeCreatePopup.setValidator(placeCreateFormValidator);
        placeCreatePopup.open();
    };

    _setEventListeners() {
        this.createButton.addEventListener(
            "click",
            this._handleClickOpenCreatePopup
        );
    }
}

export { PlacesPresenter };
