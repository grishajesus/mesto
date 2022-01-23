class Card {
    constructor(
        place,
        templateSelector,
        canDelete,
        isSettedLike,
        handleClickCard,
        handleOpenSureDeleteCard,
        handleCreateLike,
        handleDeleteLike
    ) {
        this._place = place;
        this._template = document.querySelector(templateSelector);
        this._canDelete = canDelete;
        this._isSettedLike = isSettedLike;
        this._handleClickCard = handleClickCard;
        this._handleOpenSureDeleteCard = handleOpenSureDeleteCard;
        this._handleCreateLike = handleCreateLike;
        this._handleDeleteLike = handleDeleteLike;

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

        if (this._isSettedLike) {
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

    _handleToggleLike(event) {
        const isSetLike = event.target.classList.contains(
            "place-card__like-icon_active"
        );

        const setFn = isSetLike
            ? this._handleDeleteLike
            : this._handleCreateLike;

        setFn(this._place._id)
            .then((data) => {
                this._likesCounterBox.textContent = data.likes.length;

                this._element
                    .querySelector(".place-card__like-icon")
                    .classList.toggle("place-card__like-icon_active");
            })
            .catch((error) => {
                console.error(error);
            });
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
            .addEventListener("click", (event) =>
                this._handleToggleLike(event)
            );

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
