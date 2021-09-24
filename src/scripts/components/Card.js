class Card {
    constructor(place, templateSelector, handleCardClick) {
        this.place = place;
        this.templateSelector = document.querySelector(templateSelector);
        this.handleCardClick = handleCardClick;
    }

    _shapeElementFromTemplate() {
        const template = this.templateSelector.content;
        const element = template.querySelector('.place-card').cloneNode(true);

        const name = element.querySelector('.place-card__name');
        const image = element.querySelector('.place-card__image');

        name.textContent = this.place.title;
        image.src = this.place.link;
        image.alt = this.place.title || this.place.name;

        return element;
    }

    _handleDelete(element) {
	    element.remove();
    }

    _handleToggleLike(event) {
        event.target.classList.toggle("place-card__like-icon_active");
    }

    _setListeners(element) {
        element
            .querySelector('.place-card__delete')
            .addEventListener('click', () => this._handleDelete(element));

        element
            .querySelector('.place-card__like-icon')
            .addEventListener('click', event => this._handleToggleLike(event));

        element
            .querySelector('.place-card__image')
            .addEventListener('click', () => this.handleCardClick(this.place.link, this.place.title));
    }

    createDOMNode() {
        const element = this._shapeElementFromTemplate();

        this._setListeners(element);

        return element;
    }
}

export { Card };
