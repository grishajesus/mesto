class Card {
    constructor(
        place,
        currentUser,
        templateSelector,
        handleClickCard,
        handleOpenSureDeleteCard,
        handleCreateLike,
        handleDeleteLike
    ) {
        this._place = place;
        this._currentUser = currentUser;
        this._template = document.querySelector(templateSelector);
        this._handleClickCard = handleClickCard;
        this._handleOpenSureDeleteCard = handleOpenSureDeleteCard;
        this._handleCreateLike = handleCreateLike;
        this._handleDeleteLike = handleDeleteLike;

        this.setLikes = this._setLikes.bind(this);
        this.handleToggleLikeClass = this._handleToggleLikeClass.bind(this);

        this._canDelete = this._place.owner
            ? this._currentUser.id === this._place.owner._id
            : true;

        this._likesCounterBox = null;
    }

    _shapeElementFromTemplate() {
        this._element = this._template.content
            .querySelector(".place-card")
            .cloneNode(true);

        const name = this._element.querySelector(".place-card__name");
        const image = this._element.querySelector(".place-card__image");
        const likes = this._element.querySelector(".place-card__likes");

        if (!this._canDelete) {
            this._element.querySelector(".place-card__delete").remove();
        }

        if (this._isLiked()) {
            this._element
                .querySelector(".place-card__like-icon")
                .classList.add("place-card__like-icon_active");
        }

        name.textContent = this._place.name;
        likes.textContent = (this._place.likes ?? []).length;

        image.src = this._place.link;
        image.alt = this._place.name;

        this._likesCounterBox =
            this._element.querySelector(".place-card__likes");
    }

    _updatePlace(place) {
        this._place = place;
    }

    _setLikes(place) {
        this._updatePlace(place);
        this._likesCounterBox.textContent = place.likes.length;
    }

    _handleToggleLikeClass() {
        this._element
            .querySelector(".place-card__like-icon")
            .classList.toggle("place-card__like-icon_active");
    }

    _handleToggleLike() {
        if (this._isLiked()) {
            this._handleDeleteLike(
                this._place._id,
                this.setLikes.bind(this),
                this.handleToggleLikeClass.bind(this)
            );
        } else {
            this._handleCreateLike(
                this._place._id,
                this.setLikes.bind(this),
                this.handleToggleLikeClass.bind(this)
            );
        }
    }

    _isLiked() {
        return !!this._place.likes.find(
            (like) => like._id === this._currentUser.id
        );
    }

    _handleDeleteCard() {
        this._handleOpenSureDeleteCard.call(
            this,
            this._element,
            this._place._id
        );
    }

    _setListeners() {
        if (this._canDelete) {
            this._element
                .querySelector(".place-card__delete")
                .addEventListener("click", () => this._handleDeleteCard());
        }

        this._element
            .querySelector(".place-card__like-icon")
            .addEventListener("click", () => this._handleToggleLike());

        this._element
            .querySelector(".place-card__image")
            .addEventListener("click", () =>
                this._handleClickCard(this._place.link, this._place.name)
            );
    }

    createDOMNode() {
        this._shapeElementFromTemplate();
        this._setListeners();

        return this._element;
    }
}

export { Card };
