class Card {
    constructor(place, templateSelector, handleCardClick) {
        this._place = place;
        this._template = document.querySelector(templateSelector);
        this._handleCardClick = handleCardClick;
    }

    _shapeElementFromTemplate() {
        this._element = this._template.content.querySelector('.place-card').cloneNode(true);

        const name = this._element.querySelector('.place-card__name');
        const image = this._element.querySelector('.place-card__image');

        name.textContent = this._place.title;
        image.src = this._place.link;
        image.alt = this._place.title || this._place.name;
    }

    _handleDelete() {
	    this._element.remove();
    }

    _handleToggleLike(event) {
        event.target.classList.toggle("place-card__like-icon_active");
    }

    _setListeners() {
        this._element
            .querySelector('.place-card__delete')
            .addEventListener('click', () => this._handleDelete());

        this._element
            .querySelector('.place-card__like-icon')
            .addEventListener('click', () => this._handleToggleLike());

        this._element
            .querySelector('.place-card__image')
            .addEventListener('click', () => this._handleCardClick(this._place.link, this._place.title));
    }

    createDOMNode() {
        this._shapeElementFromTemplate();
        this._setListeners();

        return this._element;
    }
}

export { Card };
