class Card {
    constructor({ place, templateSelector, canDelete, likeSetted, callbacks }) {
        this.place = place;
        this.templateSelector = document.querySelector(templateSelector);
        this.canDelete = canDelete;
        this.likeSetted = likeSetted;

        this.element = null;
        this.likesCounterBox = null;
        this.callbacks = callbacks;
    }

    _shapeElementFromTemplate() {
        const template = this.templateSelector.content;

        this.element = template.querySelector(".place-card").cloneNode(true);

        if (!this.canDelete) {
            this.element.querySelector(".place-card__delete").remove();
        }

        const name = this.element.querySelector(".place-card__name");
        const image = this.element.querySelector(".place-card__image");
        const likes = this.element.querySelector(".place-card__likes");

        name.textContent = this.place.name;
        likes.textContent = (this.place.likes ?? []).length;

        image.src = this.place.link;
        image.alt = this.place.name;

        if (this.likeSetted) {
            this.element
                .querySelector(".place-card__like-icon")
                .classList.add("place-card__like-icon_active");
        }

        this.likesCounterBox = this.element.querySelector(".place-card__likes");

        return this.element;
    }

    _handleClickCard = () => {
        const { onClickCard } = this.callbacks;

        onClickCard(this.place.link, this.place.name);
    };

    _handleDelete = () => {
        const { onDeleteCard } = this.callbacks;

        onDeleteCard(this.place._id, () => this.element.remove());
    };

    _handleToggleLike = async (event) => {
        const { onSetLike } = this.callbacks;

        const isset = event.target.classList.contains(
            "place-card__like-icon_active"
        );

        event.target.classList.toggle("place-card__like-icon_active");

        if (isset) {
            this._decreaseLike();
        } else {
            this._increaseLike();
        }

        await onSetLike(this.place._id, isset);
    };

    _increaseLike() {
        const currentLikes = parseInt(this.likesCounterBox.textContent, 10);

        this.likesCounterBox.textContent = currentLikes + 1;
    }

    _decreaseLike() {
        const currentLikes = parseInt(this.likesCounterBox.textContent, 10);

        this.likesCounterBox.textContent = currentLikes - 1;
    }

    _setListeners() {
        const cardDeleteIcon = this.element.querySelector(
            ".place-card__delete"
        );

        if (cardDeleteIcon) {
            cardDeleteIcon.addEventListener("click", this._handleDelete);
        }

        this.element
            .querySelector(".place-card__like-icon")
            .addEventListener("click", this._handleToggleLike);

        this.element
            .querySelector(".place-card__image")
            .addEventListener("click", this._handleClickCard);
    }

    createDOMNode() {
        this._shapeElementFromTemplate();
        this._setListeners();

        return this.element;
    }
}

export { Card };
